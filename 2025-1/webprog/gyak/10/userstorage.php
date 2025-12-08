<?php
include_once("storage.php");


class UserStorage extends Storage {
  public function __construct() {

    parent::__construct(new JsonIO('users.json'));
  }
}