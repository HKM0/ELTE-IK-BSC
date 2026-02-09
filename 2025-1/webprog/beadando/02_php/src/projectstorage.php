<?php

require_once 'storage.php';

class ProjectStorage extends Storage {
    public function __construct() {
        parent::__construct('data/projects.json');
    }

    public function getApprovedProjects() {
        return $this->findMany(['status' => 3]);
    }

    public function getProjectsByOwner($userId) {
        return $this->findMany(['owner' => $userId]);
    }

    public function getPendingProjects() {
        return $this->findMany(['status' => 0]);
    }

    public function countVotes($projectId) {
        $voteStorage = new VoteStorage();
        $votes = $voteStorage->findMany(['project' => $projectId]);
        return count($votes);
    }
}

class VoteStorage extends Storage {
    public function __construct() {
        parent::__construct('data/votes.json');
    }

    public function hasVoted($userId, $projectId) {
        $vote = $this->findOne(['user' => $userId, 'project' => $projectId]);
        return $vote !== null;
    }

    public function getVotesByUser($userId) {
        return $this->findMany(['user' => $userId]);
    }

    public function getVotesByUserInCategory($userId, $category) {
        $projectStorage = new ProjectStorage();
        $userVotes = $this->getVotesByUser($userId);
        
        $count = 0;
        foreach ($userVotes as $vote) {
            $project = $projectStorage->findById($vote['project']);
            if ($project && $project['category'] == $category) {
                $count++;
            }
        }
        return $count;
    }

    public function removeVote($userId, $projectId) {
        $data = $this->read();
        foreach ($data as $id => $vote) {
            if ($vote['user'] === $userId && $vote['project'] === $projectId) {
                unset($data[$id]);
                $this->write($data);
                return true;
            }
        }
        return false;
    }
}
