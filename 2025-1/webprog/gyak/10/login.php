<?php
session_start();

include("auth.php");
include("utils.php");
include_once("userstorage.php");
//print_r($_POST);
// functions
function validate($post, &$data, &$errors): bool
{
    $data = [
        'username' => trim($post["username"] ?? ''),
        'password' => $post["password"] ?? '',
    ];

    if ($data['username'] === "") {
        $errors["username"] = "A felh. meg. köt.";
    }

    if ($data['password'] === "") {
        $errors["password"] = "A jelszó. meg. köt.";
    }
    return count($errors) === 0;
}
// main
$user_storage=new Userstorage;
$auth=new Auth($user_storage);
$data = [];
$errors = [];
if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
     $auth_user=$auth ->authenticate($data['username'],$data['password'] );
        if(!$auth_user){
            $errors['global']='user-pass. nem megfe';
        }
        else {
            $auth->login($auth_user);
        
            if(isset($_GET["redirect_url"])){
                redirect($_GET["redirect_url"]);
            }
            else{
                    redirect("index.php");
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        input~span {
            color: red;
            font-size: smaller;
        }
    </style>
</head>

<body>
    <h1>Névjegyek</h1>
    <h2>Bejelentkezés</h2>
    <?php if (isset($errors["global"])) : ?>
        <span><?= $errors["global"] ?></span>
    <?php endif ?>
    <form action="" method="post" novalidate>
        Felhasználónév: <input type="text" name="username" value="<?= $data['username'] ?? '' ?>" required> <br>
        <?php if (isset($errors["username"])) : ?>
            <span><?= $errors["username"] ?></span>
        <?php endif ?>
        <br>
        Jelszó: <input type="password" name="password" required> <br>
        <?php if (isset($errors["password"])) : ?>
            <span><?= $errors["password"] ?></span>
        <?php endif ?>
        <br>
        <button>Bejelentkezés</button>
    </form>
</body>

</html>