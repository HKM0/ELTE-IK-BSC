<?php

require_once 'storage.php';

class UserStorage extends Storage {
    public function __construct() {
        parent::__construct('data/users.json');
    }

    public function authenticate($username, $password) {
        $users = $this->findAll();
        foreach ($users as $user) {
            if ($user['username'] === $username && password_verify($password, $user['password'])) {
                return $user;
            }
        }
        return null;
    }

    public function usernameExists($username) {
        $user = $this->findOne(['username' => $username]);
        return $user !== null;
    }
}
