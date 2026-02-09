<?php
require_once 'src/utils.php';
require_once 'src/projectstorage.php';

if (!isLoggedIn()) {
    redirect('login.php');
}

$projectStorage = new ProjectStorage();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $description = trim($_POST['description'] ?? '');
    $category = intval($_POST['category'] ?? -1);
    $postalCode = trim($_POST['postal_code'] ?? '');
    $image = trim($_POST['image'] ?? '');
    
    $error = validateProjectTitle($title);
    if ($error) $errors[] = $error;
    
    $error = validateProjectDescription($description);
    if ($error) $errors[] = $error;
    
    $error = validateCategory($category);
    if ($error) $errors[] = $error;
    
    $error = validatePostalCode($postalCode);
    if ($error) $errors[] = $error;
    
    $error = validateImageUrl($image);
    if ($error) $errors[] = $error;
    
    if (empty($errors)) {
        $projectStorage->insert([
            'status' => 0,
            'title' => $title,
            'description' => $description,
            'category' => $category,
            'postal_code' => $postalCode,
            'image' => $image,
            'owner' => $_SESSION['user']['id'],
            'submitted' => date('Y-m-d H:i:s'),
            'approved' => null
        ]);
        
        redirect('projects-own.php');
    }
}
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új projekt leadása</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Új projekt leadása</h1>
        
        <?php if ($errors): ?>
            <div class="error">
                <?php foreach ($errors as $error): ?>
                    <div><?php echo $error; ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label>Projekt címe *</label>
                <input type="text" name="title" value="<?php echo $_POST['title'] ?? ''; ?>" required>
                <div class="help-text">Legalább 10 karakter</div>
            </div>

            <div class="form-group">
                <label>Projekt leírása *</label>
                <textarea name="description" required><?php echo $_POST['description'] ?? ''; ?></textarea>
                <div class="help-text">Legalább 150 karakter</div>
            </div>

            <div class="form-group">
                <label>Kategória *</label>
                <select name="category" required>
                    <option value="">Válassz kategóriát</option>
                    <?php foreach (CATEGORIES as $id => $name): ?>
                        <option value="<?php echo $id; ?>" <?php echo isset($_POST['category']) && $_POST['category'] == $id ? 'selected' : ''; ?>>
                            <?php echo $name; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group">
                <label>Irányítószám *</label>
                <input type="text" name="postal_code" value="<?php echo $_POST['postal_code'] ?? ''; ?>" required>
                <div class="help-text">Budapesti irányítószám (pl. 1051)</div>
            </div>

            <div class="form-group">
                <label>Kép URL (opcionális)</label>
                <input type="url" name="image" value="<?php echo $_POST['image'] ?? ''; ?>">
                <div class="help-text">Teljes URL a projekt képéhez</div>
            </div>

            <div>
                <a href="index.php" class="btn btn-secondary">Mégse</a>
                <button type="submit" class="btn">Projekt leadása</button>
            </div>
        </form>
    </div>
</body>
</html>
