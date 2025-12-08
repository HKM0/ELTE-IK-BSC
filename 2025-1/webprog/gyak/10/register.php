<?php
session_start();

include("auth.php");
include("utils.php");
include_once("userstorage.php");

function validate($post, &$data, &$errors): bool
{
    $data = [
        'username'  => trim($post["username"] ?? ''),
        'password'  => $post["password"] ?? '',
        'password2' => $post["password2"] ?? '',
        'fullname'  => trim($post["fullname"] ?? ''),
    ];

    if ($data['username'] === "") {
        $errors["username"] = "A felh. név kötelező.";
    }

    if ($data['password'] === "") {
        $errors["password"] = "A jelszó kötelező.";
    }

    if ($data['password'] !== $data['password2']) {
        $errors["password2"] = "A jelszavak nem egyeznek.";
    }

    if ($data['fullname'] === "") {
        $errors["fullname"] = "A teljes név kötelező.";
    }

    return count($errors) === 0;
}

$user_storage = new UserStorage;
$auth = new Auth($user_storage);
$data = [];
$errors = [];

if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        if ($auth->user_exists($data['username'])) {
            $errors['global'] = 'A felhasználónév már foglalt.';
        } else {
            $auth->register($data);
            redirect("login.php");
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
    <h2>Regisztráció</h2>
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
        Jelszó újra: <input type="password" name="password2" required> <br>
        <?php if (isset($errors["password2"])) : ?>
            <span><?= $errors["password2"] ?></span>
        <?php endif ?>
        <br>
        Teljes név: <input type="text" name="fullname" value="<?= $data['fullname'] ?? '' ?>" required> <br>
        <?php if (isset($errors["fullname"])) : ?>
            <span><?= $errors["fullname"] ?></span>
        <?php endif ?>
        <br>
        <button>Regisztráció</button>
    </form>
</body>

</html>
