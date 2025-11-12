<?php
include("Storage.php");

class ContactStorage extends Storage{

    public function __construct(){
        parent::__construct(new JsonIO('contacts.json'));    
    }

}
