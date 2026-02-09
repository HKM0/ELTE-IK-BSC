<?php

class Storage {
    protected $filepath;

    public function __construct($filepath) {
        $this->filepath = $filepath;
    }

    public function findAll() {
        $data = $this->read();
        return array_values($data);
    }

    public function findById($id) {
        $data = $this->read();
        return $data[$id] ?? null;
    }

    public function insert($record) {
        $data = $this->read();
        $record['id'] = uniqid();
        $data[$record['id']] = $record;
        $this->write($data);
        return $record['id'];
    }

    public function update($id, $record) {
        $data = $this->read();
        if (isset($data[$id])) {
            $data[$id] = array_merge($data[$id], $record);
            $this->write($data);
            return true;
        }
        return false;
    }

    public function delete($id) {
        $data = $this->read();
        if (isset($data[$id])) {
            unset($data[$id]);
            $this->write($data);
            return true;
        }
        return false;
    }

    public function findOne($condition) {
        $data = $this->read();
        foreach ($data as $record) {
            $match = true;
            foreach ($condition as $key => $value) {
                if (!isset($record[$key]) || $record[$key] !== $value) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                return $record;
            }
        }
        return null;
    }

    public function findMany($condition) {
        $data = $this->read();
        $results = [];
        foreach ($data as $record) {
            $match = true;
            foreach ($condition as $key => $value) {
                if (!isset($record[$key]) || $record[$key] !== $value) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                $results[] = $record;
            }
        }
        return $results;
    }

    protected function read() {
        if (!file_exists($this->filepath)) {
            return [];
        }
        $content = file_get_contents($this->filepath);
        return json_decode($content, true) ?: [];
    }

    protected function write($data) {
        $content = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        file_put_contents($this->filepath, $content);
    }
}
