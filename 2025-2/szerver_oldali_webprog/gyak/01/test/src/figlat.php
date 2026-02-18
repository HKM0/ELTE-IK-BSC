<?php
require __DIR__ . '/../vendor/autoload.php';

use Povils\Figlet\Figlet;

$figlet = new \Povils\Figlet\Figlet();
echo $figlet->render("HEKI");