<?php

const DATE_MIN = "2000-01-01";
const DATE_MAX = "2020-12-31";
const SECONDS_PER_DAY = 60 * 60 * 24;

session_start();

function new_date() {
  $date = rand(strtotime(DATE_MIN), strtotime(DATE_MAX));
  return $date - $date % SECONDS_PER_DAY;
}

if (!isset($_SESSION["date_to_guess"])) {
  $_SESSION["date_to_guess"] = new_date();
}

if (isset($_GET["guess"])) {
  $guess = $_GET["guess"];

  if (!strtotime($guess)) {
    http_response_code(300);
    print(json_encode(["error" => "Invalid input format"]));
    exit;
  }

  $guess_time = strtotime($guess);

  if ($guess_time < $_SESSION["date_to_guess"]) {
    $response = "Later";
  } else if ($guess_time > $_SESSION["date_to_guess"]) {
    $response = "Earlier";
  } else {
    $response = "That's it!";
    $_SESSION["date_to_guess"] = new_date();
  }

  http_response_code(200);
  print(json_encode(["guess" => $response]));
  exit;
} else {
  http_response_code(300);
  print(json_encode(["error" => "No guess recieved"]));
  exit;
}
