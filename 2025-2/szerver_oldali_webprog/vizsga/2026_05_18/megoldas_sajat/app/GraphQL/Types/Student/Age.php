<?php declare(strict_types=1);

namespace App\GraphQL\Types\Student;

use App\Models\Student;

final readonly class Age
{
    /*
    ---------task 13------------------
    */
    /** @param  array{}  $args */
    public function __invoke(Student $student, array $args)
    {
        $szuletett = Student::find($student->birthdate);
        $mai_napon = new DateTime("now");
        $kor_most = $szuletett->date_diff($mai_napon);
        return $kor_most ?? null;
    }
}