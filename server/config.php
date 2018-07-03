<?php
$config = new stdClass;
$config->auth = new stdClass;
$config->db = new stdClass;

$config->uploadDir = '/uploads/';

$config->auth->issuer = '';
$config->auth->clientId = '';

$config->db->host = 'localhost';
$config->db->database = '';
$config->db->user = '';
$config->db->pass = '';
$config->db->charset = 'utf8';
?>