<?php
require __DIR__ . '/vendor/autoload.php';
require_once 'config.php';

Flight::register('db', 'PDO',
    ['mysql:host='.$config->db->host.';dbname='.$config->db->database.';charset='.$config->db->charset,
    $config->db->user, $config->db->pass],
    function ($db) {
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
});

Flight::route('OPTIONS *', function () {
    return null;
});

Flight::map('errorCheck', function ($condition, $message = null, $code = 422) {
    $hasError = false;

    switch (gettype($condition)) {
        case 'array':
            if (count($condition)) {
                $hasError = true;
                $message = $condition;
            }
            break;
        case 'boolean':
            if ($condition) {
                $hasError = true;
            }
            break;
        case 'NULL':
            $hasError = true;
            break;
    }

    if ($hasError) {
        Flight::halt($code, Flight::json(['error' => $message]));
        exit();
    }
});

Flight::map('auth', function () {
    $httpAuthorization = $_SERVER['HTTP_AUTHORIZATION'];

    Flight::errorCheck($httpAuthorization, 'Unauthorized', 401);

    preg_match('/Bearer\s(\S+)/i', $httpAuthorization, $authorization);
    $token = $authorization[1] ?? null;

    Flight::errorCheck($token, 'Unauthorized', 401);

    try {
        $jwtVerifier = (new \Okta\JwtVerifier\JwtVerifierBuilder())
            ->setAdaptor(new \Okta\JwtVerifier\Adaptors\SpomkyLabsJose())
            ->setAudience('api://default')
            ->setClientId($config->auth->clientId)
            ->setIssuer($config->auth->issuer)
            ->build();

        $jwt = $jwtVerifier->verify($token);
    } catch (Exception $e) {
        Flight::halt(401, 'Unauthorized');
        exit();
    }


    Flight::errorCheck($jwt->getClaims()['cid'] != $config->auth->clientId, 'Unauthorized', 401);
});

Flight::route('PUT /order/@order', function ($order) {
    Flight::auth();
    $db = Flight::db();

    $exists = $db->prepare('SELECT COUNT(*) FROM `purchase` WHERE `id` = :order');
    $exists->bindParam(':order', $order, PDO::PARAM_INT);
    $exists->execute();

    Flight::errorCheck(!(bool)$exists->fetchColumn(), 'Order not found', 404);

    $update = $db->prepare('UPDATE `purchase` SET `finished` = 1 WHERE `id` = :order');
    $update->bindParam(':order', $order, PDO::PARAM_INT);

    if ($update->execute()) {
        Flight::json(['success' => true]);
    } else {
        Flight::json(['error' => 'Could not update the order']);
    }
});

Flight::route('DELETE /order/@order', function ($order) {
    Flight::auth();
    $db = Flight::db();

    $exists = $db->prepare('SELECT COUNT(*) FROM `purchase` WHERE `id` = :order');
    $exists->bindParam(':order', $order, PDO::PARAM_INT);
    $exists->execute();

    Flight::errorCheck(!(bool)$exists->fetchColumn(), 'Order not found', 404);

    $delete = $db->prepare('DELETE FROM `purchase` WHERE `id` = :order');
    $delete->bindParam(':order', $order, PDO::PARAM_INT);

    if ($delete->execute()) {
        Flight::json(['success' => true]);
    } else {
        Flight::json(['error' => 'Could not delete the order']);
    }
});

Flight::route('POST /add', function () {
    Flight::auth();
    $db = Flight::db();

    $error = [];

    $data = Flight::request()->data->getData();
    $files = Flight::request()->files->getData();

    $commentRequired = $data['commentRequired'] == 'true' ? 1 : 0;
    $url = filter_var($data['url'], FILTER_SANITIZE_URL);
    $name = $data['name'];
    $url = $data['url'];
    $price = filter_var($data['price'], FILTER_VALIDATE_FLOAT);
    $description = $data['description'];

    $urlCheckQuery = $db->prepare('SELECT COUNT(*) FROM `products` WHERE `url` = :url');
    $urlCheckQuery->bindParam(':url', $url);
    $urlCheckQuery->execute();

    if (strlen($name) < 2 || strlen($name) > 255) {
        $error['name'] = true;
    }

    if (strlen($url) < 2 || strlen($url) > 255 || $urlCheckQuery->fetchColumn()) {
        $error['url'] = true;
    }

    if ($price < 1) {
        $error['price'] = true;
    }

    Flight::errorCheck($error);

    $insert = $db->prepare('INSERT INTO `products` (`name`, `price`, `description`, `url`, `comment_required`)
        VALUES (:name, :price, :description, :url, :commentRequired)');
    $insert->bindParam(':name', $name);
    $insert->bindParam(':price', $price, 7);
    $insert->bindParam(':description', $description);
    $insert->bindParam(':url', $url);
    $insert->bindParam(':commentRequired', $commentRequired, PDO::PARAM_INT, 1);

    if ($insert->execute()) {
        $lastId = $db->lastInsertId();
        if (!file_exists(__DIR__ . "/" . $lastId)) {
            mkdir(__DIR__ . $config->uploadDir.$lastId);
        }
        if (array_key_exists('images', $files)) {
            $images = $files['images'];

            for ($i = 0; $i < count($images['tmp_name']); ++$i) {
                $tmp = $images['tmp_name'][$i];
                $name = md5(mt_rand());
                $extension = explode('/', $images['type'][$i])[1];
                $currentDir = $config->uploadDir.$lastId;
                $fullName = "$name.$extension";
                $outputFile = "$currentDir/$fullName";

                if (move_uploaded_file($tmp, __DIR__ . $outputFile)) {
                    $theurl = "http://localhost".$outputFile;
                    $insertImage = $db->prepare('INSERT INTO `images` (`product_id`, `link`) VALUES (:product, :link)');
                    $insertImage->bindParam(':product', $lastId, PDO::PARAM_INT);
                    $insertImage->bindParam(':link', $theurl);
                    $insertImage->execute();
                }
            }
        }
        Flight::json(['success' => true]);
    }
});

Flight::route('POST /order', function () {
    $db = Flight::db();

    $data = Flight::request()->data->getData();

    $date = time();
    $name = $data['name'];
    $url = $data['productUrl'];
    $quantity = $data['quantity'];
    $phone = $data['phone'];
    $email = $data['email'];
    $city = $data['city'];
    $address = $data['address'];
    $comment = $data['comment'];

    $product = $db->prepare('SELECT `id` FROM `products` WHERE `url` = :url');
    $product->bindParam(':url', $url);
    $product->execute();
    $productId = $product->fetchColumn();

    $purchase = $db->prepare('INSERT INTO `purchase`
        (`product_id`, `quantity`, `customer`, `phone`, `email`, `city`, `address`, `comment`, `date`)
        VALUES (:productId, :quantity, :customer, :phone, :email, :city, :address, :comment, :date)
    ');
    $purchase->bindParam(':productId', $productId, PDO::PARAM_INT);
    $purchase->bindParam(':quantity', $quantity, PDO::PARAM_INT);
    $purchase->bindParam(':customer', $name);
    $purchase->bindParam(':phone', $phone);
    $purchase->bindParam(':email', $email);
    $purchase->bindParam(':city', $city);
    $purchase->bindParam(':address', $address);
    $purchase->bindParam(':comment', $comment);
    $purchase->bindParam(':date', $date);

    if ($purchase->execute()) {
        Flight::json(['ordered' => true]);
    } else {
        Flight::json(['ordered' => false]);
    }
});

Flight::route('GET /orders', function () {
    Flight::auth();
    $db = Flight::db();

    $finished = [];
    $unfinished = [];

    $orderQuery = $db->query('SELECT `o`.`id`, `o`.`quantity`, `o`.`customer`, `o`.`phone`, `o`.`email`, `o`.`city`, `o`.`address`,
        `o`.`comment`, `o`.`date`, `o`.`finished`, `p`.`name` AS `productName`, `p`.`price` AS `productPrice`
        FROM `purchase` AS `o` LEFT JOIN `products` AS `p` ON `o`.`product_id` = `p`.`id` ORDER BY `o`.`date` DESC, `o`.`id` DESC');
    $orders = $orderQuery->fetchAll();

    foreach ($orders as $order) {
        $order->id += 0;
        $order->date += 0;
        $order->productPrice += 0;
        $order->quantity += 0;
        $order->finished += 0;

        if ($order->finished) {
            $finished[] = $order;
        } else {
            $unfinished[] = $order;
        }
    }

    $sorted = ['unfinished' => $unfinished, 'finished' => $finished];
    Flight::json($sorted);
});

Flight::route('GET /products', function () {
    $db = Flight::db();

    $products = $db->query('SELECT `p`.*, `i`.`link` AS `image` FROM `products` AS `p`
        LEFT JOIN `images` as `i` ON `p`.`id` = `i`.`product_id` GROUP BY `p`.`id`
        ORDER BY `p`.`id` DESC');

    Flight::json($products->fetchAll());
});

Flight::route('GET /product/@url', function ($url) {
    $db = Flight::db();

    $productQuery = $db->prepare('SELECT `id`, `name`, `description`, `price`, `comment_required` AS `commentRequired`
        FROM `products` WHERE `url` = :url');
    $productQuery->bindParam(':url', $url);
    $productQuery->execute();

    $product = $productQuery->fetch();

    if ($product) {
        $images = $db->prepare('SELECT `link` FROM `images` WHERE `product_id` = :product');
        $images->bindParam(':product', $product->id, PDO::PARAM_INT);
        $images->execute();

        $product->images = [];
        unset($product->id);

        foreach ($images->fetchAll() as $image) {
            $product->images[] = $image->link;
        }

        $product->commentRequired = (bool)$product->commentRequired;
        Flight::json($product);
        exit();
    }

    Flight::json(['error' => 'Product not found']);
});

Flight::start();

?>