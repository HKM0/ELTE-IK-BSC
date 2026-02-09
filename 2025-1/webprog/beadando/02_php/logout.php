<?php
require_once 'src/utils.php';

session_destroy();
redirect('index.php');
