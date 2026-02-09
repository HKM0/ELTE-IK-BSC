<?php
require_once 'src/utils.php';
require_once 'src/projectstorage.php';

$projectStorage = new ProjectStorage();
$voteStorage = new VoteStorage();

$selectedCategory = isset($_GET['category']) && $_GET['category'] !== '' ? intval($_GET['category']) : null;

$projects = $projectStorage->getApprovedProjects();

// szures kategoria szerint
if ($selectedCategory !== null) {
    $projects = array_filter($projects, function($p) use ($selectedCategory) {
        return $p['category'] == $selectedCategory;
    });
}

// csop. kategoria szerint
$projectsByCategory = [];
foreach ($projects as $project) {
    $cat = $project['category'];
    if (!isset($projectsByCategory[$cat])) {
        $projectsByCategory[$cat] = [];
    }
    $projectsByCategory[$cat][] = $project;
}

$errors = [];
$success = '';

// szavazas kezeles
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['vote'])) {
    if (!isLoggedIn()) {
        $errors[] = "Be kell jelentkezned a szavazáshoz.";
    } else {
        $projectId = $_POST['project_id'];
        $project = $projectStorage->findById($projectId);
        
        if (!$project) {
            $errors[] = "A projekt nem található.";
        } elseif (!canVoteOnProject($project)) {
            $errors[] = "Erre a projektre már nem lehet szavazni.";
        } else {
            $userId = $_SESSION['user']['id'];
            
            // ellenorizem hogy szavazott -e mar
            if ($voteStorage->hasVoted($userId, $projectId)) {
                $errors[] = "Már szavaztál erre a projektre.";
            } else {
                // ellenorzom hogy max 3 szavazata lehessen a kategoriaban
                $votesInCategory = $voteStorage->getVotesByUserInCategory($userId, $project['category']);
                
                if ($votesInCategory >= 3) {
                    $errors[] = "Ebben a kategóriában már leadtál 3 szavazatot.";
                } else {
                    $voteStorage->insert([
                        'user' => $userId,
                        'project' => $projectId
                    ]);
                    $success = "Sikeresen szavaztál!";
                    header("Location: index.php?category=" . ($selectedCategory ?? ''));
                    exit();
                }
            }
        }
    }
}

// szavazat torles
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['unvote'])) {
    if (isLoggedIn()) {
        $projectId = $_POST['project_id'];
        $userId = $_SESSION['user']['id'];
        $voteStorage->removeVote($userId, $projectId);
        $success = "Szavazat visszavonva.";
        header("Location: index.php?category=" . ($selectedCategory ?? ''));
        exit();
    }
}
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Budapest Közösségi Költségvetés</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Budapest Közösségi Költségvetés</h1>
            <div class="user-info">
                <?php if (isLoggedIn()): ?>
                    <span>Üdv, <?php echo $_SESSION['user']['username']; ?>!</span>
                    <a href="projects-own.php" class="btn btn-secondary">Projektjeim</a>
                    <a href="project-new.php" class="btn btn-success">Új projekt</a>
                    <?php if (isAdmin()): ?>
                        <a href="projects-admin.php" class="btn btn-secondary">Admin</a>
                        <a href="statistics.php" class="btn btn-secondary">Statisztikák</a>
                    <?php endif; ?>
                    <a href="logout.php" class="btn btn-secondary">Kijelentkezés</a>
                <?php else: ?>
                    <a href="login.php" class="btn">Bejelentkezés</a>
                <?php endif; ?>
            </div>
        </header>

        <?php if ($errors): ?>
            <?php foreach ($errors as $error): ?>
                <div class="error"><?php echo $error; ?></div>
            <?php endforeach; ?>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="success"><?php echo $success; ?></div>
        <?php endif; ?>

        <div class="filter">
            <label>Szűrés kategóriára: </label>
            <form method="GET" action="index.php">
                <select name="category" onchange="this.form.submit()">
                    <option value="">Összes projekt</option>
                    <?php foreach (CATEGORIES as $id => $name): ?>
                        <option value="<?php echo $id; ?>" <?php echo $selectedCategory === $id ? 'selected' : ''; ?>>
                            <?php echo $name; ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </form>
        </div>

        <?php if (empty($projectsByCategory)): ?>
            <p>Még nincsenek közzétett projektek.</p>
        <?php else: ?>
            <?php foreach ($projectsByCategory as $catId => $catProjects): ?>
                <div class="category-section">
                    <h2 class="category-title">
                        <?php echo CATEGORIES[$catId]; ?>
                        <?php if (isLoggedIn()): ?>
                            <?php 
                                $votesInCategory = $voteStorage->getVotesByUserInCategory($_SESSION['user']['id'], $catId);
                                $remainingVotes = 3 - $votesInCategory;
                            ?>
                            <span class="cat-info">
                                (Még <?php echo $remainingVotes; ?> szavazatod van ebben a kategóriában)
                            </span>
                        <?php endif; ?>
                    </h2>
                    <ul class="project-list">
                        <?php foreach ($catProjects as $project): ?>
                            <?php 
                                $voteCount = $projectStorage->countVotes($project['id']);
                                $canVote = canVoteOnProject($project);
                                $hasVoted = isLoggedIn() ? $voteStorage->hasVoted($_SESSION['user']['id'], $project['id']) : false;
                            ?>
                            <li class="project-item">
                                <a href="project.php?id=<?php echo $project['id']; ?>" class="project-title">
                                    <?php echo $project['title']; ?>
                                </a>
                                <div class="project-info">
                                    <span class="vote-count"><?php echo $voteCount; ?> szavazat</span>
                                    <?php if (isLoggedIn()): ?>
                                        <?php if ($canVote): ?>
                                            <?php if ($hasVoted): ?>
                                                <form method="POST" class="inline">
                                                    <input type="hidden" name="project_id" value="<?php echo $project['id']; ?>">
                                                    <button type="submit" name="unvote" class="btn btn-danger btn-small">Visszavonás</button>
                                                </form>
                                            <?php else: ?>
                                                <form method="POST" class="inline">
                                                    <input type="hidden" name="project_id" value="<?php echo $project['id']; ?>">
                                                    <button type="submit" name="vote" class="btn btn-success btn-small">Szavazok</button>
                                                </form>
                                            <?php endif; ?>
                                        <?php else: ?>
                                            <span class="voting-closed">Szavazás lezárva</span>
                                        <?php endif; ?>
                                    <?php endif; ?>
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
