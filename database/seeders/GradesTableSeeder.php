<?php

namespace Database\Seeders;

// database/seeders/GradesTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Grades;

class GradesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $grades = [
            [1, 1, 92.5, 'Excellent work!'],
            [1, 4, 88.0, 'Well done.'],
            [2, 1, 45.0, 'Good effort.'],
            [2, 4, 49.5, 'You can improve.'],
            [3, 6, 28.5, 'Nice try.'],
            [3, 8, 29.0, 'Keep it up.'],
            [4, 6, 72.0, 'Great job!'],
            [4, 8, 73.5, 'Impressive.'],
            [5, 6, 88.0, 'Outstanding work!'],
            [5, 8, 89.5, 'Excellent presentation.'],
        ];

        foreach ($grades as $grade) {
            Grades::create([
                'assignment_id' => $grade[0],
                'user_id'       => $grade[1],
                'grade'         => $grade[2],
                'comments'      => $grade[3],
            ]);
        }
    }
}
