<?php
require_once 'src/utils.php';
require_once 'src/projectstorage.php';

if (!isLoggedIn()) {
    redirect('index.php');
}

$projectStorage = new ProjectStorage();
$projects = $projectStorage->getProjectsByOwner($_SESSION['user']['id']);
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Saját projektek</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Saját projektek</h1>
            <a href="index.php" class="btn">Vissza a főoldalra</a>
        </header>

        <?php if (empty($projects)): ?>
            <p>Még nem adtál le projektet. <a href="project-new.php">Adj le egyet most!</a></p>
        <?php else: ?>
            <ul class="project-list">
                <?php foreach ($projects as $project): ?>
                    <li class="project-item <?php echo STATUSES[$project['status']]; ?>">
                        <a href="project.php?id=<?php echo $project['id']; ?>" class="project-title">
                            <?php echo $project['title']; ?>
                        </a>
                        <span class="status-badge status-<?php echo STATUSES[$project['status']]; ?>">
                            <?php
                            switch($project['status']) {
                                case 0: echo 'Függőben'; break;
                                case 1: echo 'Elutasítva'; break;
                                case 2: echo 'Javításra visszaküldve'; break;
                                case 3: echo 'Jóváhagyva'; break;
                            }
                            ?>
                        </span>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </div>
</body>
</html>
