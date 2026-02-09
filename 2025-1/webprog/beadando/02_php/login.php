<?php
require_once 'src/utils.php';
require_once 'src/userstorage.php';

$userStorage = new UserStorage();
$errors = [];
$isRegister = isset($_GET['register']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['login'])) {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        
        if (empty($username) || empty($password)) {
            $errors[] = "Minden mező kitöltése kötelező.";
        } else {
            $user = $userStorage->authenticate($username, $password);
            if ($user) {
                $_SESSION['user'] = $user;
                redirect('index.php');
            } else {
                $errors[] = "Helytelen felhasználónév vagy jelszó.";
            }
        }
    } elseif (isset($_POST['register'])) {
        $username = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $password2 = $_POST['password2'] ?? '';
        
        if (empty($username) || empty($email) || empty($password) || empty($password2)) {
            $errors[] = "Minden mező kitöltése kötelező.";
        } else {
            $error = validateUsername($username);
            if ($error) $errors[] = $error;
            
            $error = validateEmail($email);
            if ($error) $errors[] = $error;
            
            $error = validatePassword($password);
            if ($error) $errors[] = $error;
            
            if ($password !== $password2) {
                $errors[] = "A két jelszó nem egyezik meg.";
            }
            
            if ($userStorage->usernameExists($username)) {
                $errors[] = "Ez a felhasználónév már foglalt.";
            }
            
            if (empty($errors)) {
                $userId = $userStorage->insert([
                    'username' => $username,
                    'email' => $email,
                    'password' => password_hash($password, PASSWORD_DEFAULT),
                    'is_admin' => false
                ]);
                
                $user = $userStorage->findById($userId);
                $_SESSION['user'] = $user;
                redirect('index.php');
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $isRegister ? 'Regisztráció' : 'Bejelentkezés'; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body class="login-body">
    <div class="login-container">
        <h1><?php echo $isRegister ? 'Regisztráció' : 'Bejelentkezés'; ?></h1>
        
        <?php if ($errors): ?>
            <div class="error">
                <?php foreach ($errors as $error): ?>
                    <div><?php echo $error; ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <?php if ($isRegister): ?>
            <form method="POST">
                <div class="form-group">
                    <label>Felhasználónév:</label>
                    <input type="text" name="username" value="<?php echo $_POST['username'] ?? ''; ?>" required>
                </div>
                <div class="form-group">
                    <label>E-mail:</label>
                    <input type="email" name="email" value="<?php echo $_POST['email'] ?? ''; ?>" required>
                </div>
                <div class="form-group">
                    <label>Jelszó:</label>
                    <input type="password" name="password" required>
                </div>
                <div class="form-group">
                    <label>Jelszó megerősítése:</label>
                    <input type="password" name="password2" required>
                </div>
                <button type="submit" name="register" class="btn">Regisztráció</button>
            </form>
            <div class="toggle">
                <a href="login.php">Már van fiókom, bejelentkezés</a>
            </div>
        <?php else: ?>
            <form method="POST">
                <div class="form-group">
                    <label>Felhasználónév:</label>
                    <input type="text" name="username" value="<?php echo $_POST['username'] ?? ''; ?>" required>
                </div>
                <div class="form-group">
                    <label>Jelszó:</label>
                    <input type="password" name="password" required>
                </div>
                <button type="submit" name="login" class="btn">Bejelentkezés</button>
            </form>
            <div class="toggle">
                <a href="login.php?register">Még nincs fiókom, regisztráció</a> | 
                <a href="index.php">Vissza a főoldalra</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
