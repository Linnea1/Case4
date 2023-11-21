<?php

function allowCORS() {
  if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Origin: *");
    exit();
  } else {
    header("Access-Control-Allow-Origin: *");
  }
}

function allowJSON() {
  if ($_SERVER["CONTENT_TYPE"] != "application/json") {
    abort(400, ["error" => "Invalid content type(only JSON is allowed)"]);
  }
}

function allowMethod($method) {
  if ($_SERVER["REQUEST_METHOD"] != $method) {
    abort(405, ["error" => "Method is not allowed"]);
  }
}

function abort($statusCode = 400, $message = []) {
  send($statusCode, $message);
}

function send($statusCode = 200, $data) {
  header("Content-Type: application/json");
  http_response_code($statusCode);
  $json = json_encode($data);
  echo $json;
  exit();
}

?>
