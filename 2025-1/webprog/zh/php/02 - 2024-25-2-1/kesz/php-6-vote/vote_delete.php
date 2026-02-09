<?php
$votes = json_decode(file_get_contents('votes.json'));
$new_votes = (object)[];
foreach($votes as $index => $vote) {
    if($index != $_GET['id']) {
        $new_votes->$index = $vote;
    }
}
file_put_contents('votes.json', json_encode($new_votes, JSON_PRETTY_PRINT));
header('Location: index.php');