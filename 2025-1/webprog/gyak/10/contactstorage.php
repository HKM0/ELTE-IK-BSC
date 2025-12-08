<?php
include_once("storage.php");
//betöltöd az általános adattárolási osztályt. Mivel a ContactStorage ebből származik, örökölni fogja az összes CRUD metódust.

class ContactStorage extends Storage {
  public function __construct() {
    //ContactStorage a névjegyeket a contacts.json fájlban tárolja, JSON formátumban.”
    parent::__construct(new JsonIO('contacts.json'));
  }
}