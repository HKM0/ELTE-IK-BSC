<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this -> seedFromFile('schools');
        $this -> seedFromFile('students');
        $this -> seedFromFile('subjects', false);
        $this -> seedFromFile('student_subject', false);
    }

    private function seedFromFile(string $table, bool $timestamps = true){
        $data = json_decode(file_get_contents(database_path("sources/{$table}.json")), true);
        if ($timestamps)
            $data = array_map(function($d) {
                $d['created_at'] = now();
                $d['updated_at'] = $d['created_at'];
                return $d;
            }, $data);
        DB::table($table) -> insert($data);
    }
}
