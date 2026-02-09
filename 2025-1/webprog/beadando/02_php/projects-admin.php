<?php
require_once 'src/utils.php';
require_once 'src/projectstorage.php';

if (!isAdmin()) {
    redirect('index.php');
}

$projectStorage = new ProjectStorage();
$projects = $projectStorage->getPendingProjects();

//kategoria szerinti csop.
$projectsByCategory = [];
foreach ($projects as $project) {
    $cat = $project['category'];
    if (!isset($projectsByCategory[$cat])) {
        $projectsByCategory[$cat] = [];
    }
    $projectsByCategory[$cat][] = $project;
}
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Függőben lévő projektek</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Függőben lévő projektek</h1>
            <div>
                <a href="statistics.php" class="btn btn-secondary">Statisztikák</a>
                <a href="index.php" class="btn">Vissza a főoldalra</a>
            </div>
        </header>

        <?php if (empty($projectsByCategory)): ?>
            <p>Nincsenek függőben lévő projektek.</p>
        <?php else: ?>
            <?php foreach ($projectsByCategory as $catId => $catProjects): ?>
                <div class="category-section">
                    <h2 class="category-title"><?php echo CATEGORIES[$catId]; ?></h2>
                    <ul class="project-list">
                        <?php foreach ($catProjects as $project): ?>
                            <li class="project-item">
                                <a href="project.php?id=<?php echo $project['id']; ?>" class="project-title">
                                    <?php echo $project['title']; ?>
                                </a>
                                <div class="submitted-date">
                                    Leadva: <?php echo $project['submitted']; ?>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</body>
</html>
