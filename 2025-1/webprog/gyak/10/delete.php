<?php
include_once("contactstorage.php");
if(!isset($_POST["id"])){
  header("Location: index.php");
    exit();
}

$id=$_POST["id"];
$cs=new ContactStorage();
$contact=$cs->delete($id);
 header("Location: index.php");
    exit();

