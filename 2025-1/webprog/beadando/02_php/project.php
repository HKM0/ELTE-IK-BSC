<?php
require_once 'src/utils.php';
require_once 'src/projectstorage.php';
require_once 'src/userstorage.php';

$projectId = $_GET['id'] ?? null;
if (!$projectId) {
    redirect('index.php');
}

$projectStorage = new ProjectStorage();
$userStorage = new UserStorage();
$voteStorage = new VoteStorage();

$project = $projectStorage->findById($projectId);
if (!$project) {
    redirect('index.php');
}

// csak admin vagy tulaj lathatja
if ($project['status'] != 3) {
    if (!isLoggedIn()) {
        redirect('index.php');
    }
    $isOwner = $_SESSION['user']['id'] === $project['owner'];
    $isAdminUser = isAdmin();
    
    if (!$isOwner && !$isAdminUser) {
        redirect('index.php');
    }
}

$owner = $userStorage->findById($project['owner']);
$voteCount = $projectStorage->countVotes($projectId);
$canVote = canVoteOnProject($project);
$hasVoted = isLoggedIn() ? $voteStorage->hasVoted($_SESSION['user']['id'], $projectId) : false;

$errors = [];
$success = '';

// adminkent
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isAdmin()) {
    if (isset($_POST['approve'])) {
        $projectStorage->update($projectId, [
            'status' => 3,
            'approved' => date('Y-m-d H:i:s')
        ]);
        $success = "Projekt jóváhagyva és közzétéve!";
        $project = $projectStorage->findById($projectId);
    } elseif (isset($_POST['reject'])) {
        $projectStorage->update($projectId, [
            'status' => 1
        ]);
        $success = "Projekt elutasítva.";
        $project = $projectStorage->findById($projectId);
    } elseif (isset($_POST['rework'])) {
        $comment = trim($_POST['admin_comment'] ?? '');
        if (empty($comment)) {
            $errors[] = "A komment megadása kötelező a javításra visszaküldéshez.";
        } else {
            $projectStorage->update($projectId, [
                'status' => 2,
                'admin_comment' => $comment
            ]);
            $success = "Projekt visszaküldve javításra.";
            $project = $projectStorage->findById($projectId);
        }
    }
}

// projekt modositas
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_project'])) {
    if (!isLoggedIn() || $_SESSION['user']['id'] !== $project['owner'] || $project['status'] != 2) {
        $errors[] = "Nincs jogosultságod a projekt módosításához.";
    } else {
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
            $projectStorage->update($projectId, [
                'status' => 0,
                'title' => $title,
                'description' => $description,
                'category' => $category,
                'postal_code' => $postalCode,
                'image' => $image,
                'admin_comment' => null
            ]);
            $success = "Projekt frissítve és újra elküldve jóváhagyásra!";
            $project = $projectStorage->findById($projectId);
        }
    }
}

// szavazas
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['vote'])) {
    if (!isLoggedIn()) {
        $errors[] = "Be kell jelentkezned a szavazáshoz.";
    } elseif (!canVoteOnProject($project)) {
        $errors[] = "Erre a projektre már nem lehet szavazni.";
    } else {
        $userId = $_SESSION['user']['id'];
        
        if ($voteStorage->hasVoted($userId, $projectId)) {
            $errors[] = "Már szavaztál erre a projektre.";
        } else {
            $votesInCategory = $voteStorage->getVotesByUserInCategory($userId, $project['category']);
            
            if ($votesInCategory >= 3) {
                $errors[] = "Ebben a kategóriában már leadtál 3 szavazatot.";
            } else {
                $voteStorage->insert([
                    'user' => $userId,
                    'project' => $projectId
                ]);
                $success = "Sikeresen szavaztál!";
                header("Location: project.php?id=$projectId");
                exit();
            }
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['unvote'])) {
    if (isLoggedIn()) {
        $userId = $_SESSION['user']['id'];
        $voteStorage->removeVote($userId, $projectId);
        $success = "Szavazat visszavonva.";
        header("Location: project.php?id=$projectId");
        exit();
    }
}

$isOwner = isLoggedIn() && $_SESSION['user']['id'] === $project['owner'];
$isAdminUser = isAdmin();
$canEdit = $isOwner && $project['status'] == 2;
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $project['title'] ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <a href="index.php" class="btn btn-secondary">Vissza a főoldalra</a>
            <?php if ($isOwner): ?>
                <a href="projects-own.php" class="btn btn-secondary">Saját projektek</a>
            <?php endif; ?>
        </header>

        <?php if ($errors): ?>
            <div class="error">
                <?php foreach ($errors as $error): ?>
                    <div><?= $error ?></div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="success"><?= $success ?></div>
        <?php endif; ?>

        <?php if (!$canEdit): ?>
            <span class="status-badge status-<?= STATUSES[$project['status']] ?>">
                <?php
                switch($project['status']) {
                    case 0: echo 'Függőben'; break;
                    case 1: echo 'Elutasítva'; break;
                    case 2: echo 'Javításra visszaküldve'; break;
                    case 3: echo 'Jóváhagyva'; break;
                }
                ?>
            </span>

            <h1><?= $project['title'] ?></h1>

            <div class="meta">
                <div class="meta-item"><strong>Kategória:</strong> <?= CATEGORIES[$project['category']] ?></div>
                <div class="meta-item"><strong>Irányítószám:</strong> <?= $project['postal_code'] ?></div>
                <div class="meta-item"><strong>Projektet leadta:</strong> <?= $owner['username'] ?></div>
                <div class="meta-item"><strong>Leadás dátuma:</strong> <?= $project['submitted'] ?></div>
                <?php if ($project['approved']): ?>
                    <div class="meta-item"><strong>Közzététel dátuma:</strong> <?= $project['approved'] ?></div>
                <?php endif; ?>
            </div>

            <?php if ($project['image']): ?>
                <img src="<?= $project['image'] ?>" alt="Projekt kép" class="project-image">
            <?php endif; ?>

            <div class="description"><?= $project['description'] ?></div>

            <?php if ($project['status'] == 3): ?>
                <div class="vote-section">
                    <div class="vote-count"><?= $voteCount ?> szavazat</div>
                    <?php if (isLoggedIn()): ?>
                        <?php if ($canVote): ?>
                            <?php if ($hasVoted): ?>
                                <form method="POST" class="inline">
                                    <button type="submit" name="unvote" class="btn btn-danger">Szavazat visszavonása</button>
                                </form>
                            <?php else: ?>
                                <form method="POST" class="inline">
                                    <button type="submit" name="vote" class="btn btn-success">Szavazok erre a projektre</button>
                                </form>
                            <?php endif; ?>
                        <?php else: ?>
                            <p class="voting-closed">A szavazás lezárult (2 hét telt el a közzététel óta).</p>
                        <?php endif; ?>
                    <?php else: ?>
                        <p><a href="login.php">Jelentkezz be</a> a szavazáshoz!</p>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if ($isAdminUser && $project['status'] == 0): ?>
                <div class="admin-panel">
                    <h3>Admin műveletek</h3>
                    <form method="POST" class="inline">
                        <button type="submit" name="approve" class="btn btn-success">Jóváhagy és közzétesz</button>
                    </form>
                    <form method="POST" class="inline">
                        <button type="submit" name="reject" class="btn btn-danger">Elutasít</button>
                    </form>
                    
                    <h4>Vagy visszaküldés javításra:</h4>
                    <form method="POST">
                        <textarea name="admin_comment" placeholder="Írj egy kommentet a projekt leadójának, hogy mit kell javítania..."></textarea>
                        <button type="submit" name="rework" class="btn btn-rework">Visszaküldés javításra</button>
                    </form>
                </div>
            <?php endif; ?>

        <?php else: ?>
            <?php if (isset($project['admin_comment'])): ?>
                <div class="admin-comment">
                    <strong>Admin megjegyzés:</strong>
                    <p><?= $project['admin_comment'] ?></p>
                </div>
            <?php endif; ?>

            <h1>Projekt szerkesztése</h1>
            
            <form method="POST">
                <div class="form-group">
                    <label>Projekt címe *</label>
                    <input type="text" name="title" value="<?= $project['title'] ?>" required>
                    <div class="help-text">Legalább 10 karakter</div>
                </div>

                <div class="form-group">
                    <label>Projekt leírása *</label>
                    <textarea name="description" class="tall" required><?= $project['description'] ?></textarea>
                    <div class="help-text">Legalább 150 karakter</div>
                </div>

                <div class="form-group">
                    <label>Kategória *</label>
                    <select name="category" required>
                        <?php foreach (CATEGORIES as $id => $name): ?>
                            <option value="<?= $id ?>" <?= $project['category'] == $id ? 'selected' : '' ?>>
                                <?= $name ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label>Irányítószám *</label>
                    <input type="text" name="postal_code" value="<?= $project['postal_code'] ?>" required>
                    <div class="help-text">Budapesti irányítószám (pl. 1051)</div>
                </div>

                <div class="form-group">
                    <label>Kép URL (opcionális)</label>
                    <input type="url" name="image" value="<?= $project['image'] ?? '' ?>">
                </div>

                <button type="submit" name="update_project" class="btn btn-success">Mentés és újraküldés jóváhagyásra</button>
            </form>
        <?php endif; ?>
    </div>
</body>
</html>
