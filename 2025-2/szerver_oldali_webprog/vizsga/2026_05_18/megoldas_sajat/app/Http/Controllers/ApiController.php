<?php

namespace App\Http\Controllers;

use App\Models\School;
use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use PHPUnit\Framework\MockObject\Builder\Stub;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    // Ide dolgozz!
    //task 1
    public function task1()
    {
        return Student::all();
    }

    //task 2
    public function task2($id)
    {
        if (!is_numeric($id) || intval($id) != $id){
            return response()->json(['error'=> 'invalid student ID'], 422);
        }

        // elvileg ez 404 ha nincs ilyen.
        $student = Student::findOrFail($id); 

        $school_id = $student->school_id;
        return School::find($school_id);
    }

    //task 3
    public function task3(Request $request)
    {
        // 422 innen jön
        $validated = $request->validate([
            'id' => 'required|integer|min:70000000000|max:79999999999',
            'family_name' => 'required|string|min:2',
            'given_name' => 'required|string|min:2',
            'mother_name' => 'required|string|min_words:2',
            'birthday' => 'required|date',
            'birthplace' => 'required|string',
            'school_id' => 'required|integer|exists:schools,id'
        ]);

        $student = Student::create($validated);

        return response()->json($student, 201);

    }

    //task 4
    public function task4()
    {

        $targyak= Subject::withSum('students as diakszam', 'subject_student.amount')
        ->get()
        ->map(function ($targy){
            return [
                'id' => $targy->id,
                'name' => $targy->name,
                'student_count' => $targy->diakszam ?? 0,
                'average_result' => $targy->avg()
            ];
        })
        ->sortByDesc('average_result')
        ->values();

        return response()->json($targyak);
    }

    //task 5
    public function task5(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if (!Auth::attempt($validated)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Token létrehozása
        $customer = Auth::user();
        $token = $customer->createToken('student-api')->plainTextToken; //nem találtam meg miért nem jó
        //return response()->json([], 201);
        return response()->json(['token'=>$token], 201);
    }

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
