<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    // Ide dolgozz!

    // Segédfüggvény a 7. feladathoz, ne töröld ki!
    private function formatSubjectList(array $subjects): string {
        return match (count($subjects)) {
            0 => '-',
            1 => $subjects[0],
            2 => $subjects[0] . ' és ' . $subjects[1],
            default => implode(', ', array_slice($subjects, 0, -1)) . ' és ' . end($subjects)
        };
    }
}
