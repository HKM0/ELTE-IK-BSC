<?php
require __DIR__ . '/../vendor/autoload.php';

$figlet = new \Povils\Figlet\Figlet();
echo $figlet->render("Hello Blanka!");
