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
    abort(["error" => "Invalid content type(only JSON is allowed)"], 400);
  }
}

function allowMethod($method) {
  if ($_SERVER["REQUEST_METHOD"] != $method) {
    abort(["error" => "Method is not allowed"], 405);
  }
}

function abort($message = [], $statusCode = 400) {
  send($message, $statusCode);
}

function send($data, $statusCode = 200) {
  header("Content-Type: application/json");
  http_response_code($statusCode);
  $json = json_encode($data);
  echo $json;
  exit();
}
?>
