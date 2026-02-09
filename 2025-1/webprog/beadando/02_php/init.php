<?php

//Csak az admin felhasznalohoz kellett, de akkor mar raktam ide nehany masik adatot is.

require_once 'src/userstorage.php';
require_once 'src/projectstorage.php';

$userStorage = new UserStorage();
$projectStorage = new ProjectStorage();
$voteStorage = new VoteStorage();

// admin felhasznalo
$adminId = $userStorage->insert([
    'username' => 'admin',
    'email' => 'admin@budapest.hu',
    'password' => password_hash('admin', PASSWORD_DEFAULT),
    'is_admin' => true
]);

// sima felhasznalo
$user1Id = $userStorage->insert([
    'username' => 'user',
    'email' => 'user@pelda.com',
    'password' => password_hash('user', PASSWORD_DEFAULT),
    'is_admin' => false
]);

// jovahagyott projekt 
$project1Id = $projectStorage->insert([
    'status' => 3,
    'title' => 'Ingyen wifi a köztereknél',
    'description' => 'ingyenes gyors és megbízható hálózat kiépítése a közterek közelében, hogy a közösség mindenhol kapcsolódva maradhasson.',
    'category' => 1,
    'postal_code' => '1051',
    'image' => 'https://matrica.shop/img/44997/lgk1156/500x500/lgk1156.jpg?time=1740037003',
    'owner' => $user1Id,
    'submitted' => '2025-12-08 11:00:00',
    'approved' => '2025-12-12 09:00:00'
]);

// fuggoben levo projekt
$project2Id = $projectStorage->insert([
    'status' => 0,
    'title' => 'Kulturális központ a nyolckerben',
    'description' => 'Egy új kulturális központ sokaknak ilyen olyan dolgokkal és kikapcsolodásra alkalmas más dolgokkal is.',
    'category' => 2,
    'postal_code' => '1082',
    'image' => 'https://korosi.org/wp-content/uploads/2023/10/koros-1200x800.jpg',
    'owner' => $user1Id,
    'submitted' => '2025-12-20 14:00:00',
    'approved' => null
]);

// szavazatok
$voteStorage->insert(['user' => $user1Id, 'project' => $project1Id]);
$voteStorage->insert(['user' => $user1Id, 'project' => $project2Id]);

echo "Admin felhasználó:<br>";
echo "Felhasználónév: admin<br>";
echo "Jelszó: admin<br><br>";

echo "Teszt felhasználó:<br>";
echo "Felhasználónév: user, Jelszó: user<br>";

echo "<a href='index.php'>Tovább a főoldalra</a>";
