<?php

$votes = json_decode(file_get_contents('votes.json'));
$id = uniqid();
$votes->$id = [
    'nation' => $_POST['nation'],
    'vote' => $_POST['vote']
];
file_put_contents('votes.json', json_encode($votes, JSON_PRETTY_PRINT));
header('Location: index.php');