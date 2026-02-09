<?php
require_once 'src/utils.php';
require_once 'src/projectstorage.php';

if (!isAdmin()) {
    redirect('index.php');
}

$projectStorage = new ProjectStorage();
$voteStorage = new VoteStorage();

$allProjects = $projectStorage->findAll();

// legtobb szavazat
$topProject = null;
$topVotes = 0;
foreach ($allProjects as $project) {
    if ($project['status'] == 3) {
        $votes = $projectStorage->countVotes($project['id']);
        if ($votes > $topVotes) {
            $topVotes = $votes;
            $topProject = $project;
        }
    }
}

// top 3 projekt kategoriankent
$topByCategory = [];
foreach (CATEGORIES as $catId => $catName) {
    $categoryProjects = [];
    foreach ($allProjects as $project) {
        if ($project['status'] == 3 && $project['category'] == $catId) {
            $votes = $projectStorage->countVotes($project['id']);
            $categoryProjects[] = [
                'project' => $project,
                'votes' => $votes
            ];
        }
    }
    
    usort($categoryProjects, function($a, $b) {
        return $b['votes'] - $a['votes'];
    });
    
    $topByCategory[$catId] = array_slice($categoryProjects, 0, 3);
}

// projekt szam ketegoriankent, allapotkent
$projectsByStatus = [];
foreach (CATEGORIES as $catId => $catName) {
    $projectsByStatus[$catId] = [];
    foreach (STATUSES as $statusId => $statusName) {
        $count = 0;
        foreach ($allProjects as $project) {
            if ($project['category'] == $catId && $project['status'] == $statusId) {
                $count++;
            }
        }
        $projectsByStatus[$catId][$statusId] = $count;
    }
}
?>
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statisztikák</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Statisztikák</h1>
            <div>
                <a href="projects-admin.php" class="btn btn-secondary">Admin oldal</a>
                <a href="index.php" class="btn">Vissza a főoldalra</a>
            </div>
        </header>

        <?php if ($topProject): ?>
            <div class="top-project">
                <h3>Összesen legtöbb szavazatot kapó projekt</h3>
                <a href="project.php?id=<?php echo $topProject['id']; ?>" class="project-link">
                    <?php echo $topProject['title']; ?>
                </a>
                <span class="vote-badge"><?php echo $topVotes; ?> szavazat</span>
            </div>
        <?php else: ?>
            <p>Még nincs szavazott projekt.</p>
        <?php endif; ?>

        <h2>Top 3 projektek kategóriánként</h2>
        <?php foreach (CATEGORIES as $catId => $catName): ?>
            <div class="category-section">
                <h3><?php echo $catName; ?></h3>
                <?php if (empty($topByCategory[$catId])): ?>
                    <p>Még nincs projekt ebben a kategóriában.</p>
                <?php else: ?>
                    <ul class="top-list">
                        <?php foreach ($topByCategory[$catId] as $index => $item): ?>
                            <li class="top-item">
                                <div class="flex-row">
                                    <span class="rank <?php $ranks = ['first', 'second', 'third']; echo $ranks[$index] ?? ''; ?>">
                                        <?php echo $index + 1; ?>
                                    </span>
                                    <a href="project.php?id=<?php echo $item['project']['id']; ?>" class="project-link">
                                        <?php echo $item['project']['title']; ?>
                                    </a>
                                </div>
                                <span class="vote-badge"><?php echo $item['votes']; ?> szavazat</span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>

        <h2>Projektek száma kategóriánként és státuszonként</h2>
        <table>
            <thead>
                <tr>
                    <th>Kategória</th>
                    <th>Függőben</th>
                    <th>Elutasítva</th>
                    <th>Javításra</th>
                    <th>Jóváhagyva</th>
                    <th>Összesen</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach (CATEGORIES as $catId => $catName): ?>
                    <tr>
                        <td><strong><?php echo $catName; ?></strong></td>
                        <td class="status-cell"><?php echo $projectsByStatus[$catId][0]; ?></td>
                        <td class="status-cell"><?php echo $projectsByStatus[$catId][1]; ?></td>
                        <td class="status-cell"><?php echo $projectsByStatus[$catId][2]; ?></td>
                        <td class="status-cell"><?php echo $projectsByStatus[$catId][3]; ?></td>
                        <td class="status-cell"><strong><?php echo array_sum($projectsByStatus[$catId]); ?></strong></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>
