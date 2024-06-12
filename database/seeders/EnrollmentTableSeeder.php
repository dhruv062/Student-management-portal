<?php

namespace Database\Seeders;

// database/seeders/EnrollmentTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Enrollment;

class EnrollmentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $enrollments = [
            [1, 1],
            [1, 2],
            [1, 3],
            [4, 1],
            [4, 2],
            [6, 6],
            [6, 1],
            [8, 1],
            [8, 9],
            [8, 10],
        ];

        foreach ($enrollments as $enrollment) {
            Enrollment::create([
                'user_id'  => $enrollment[0],
                'class_id' => $enrollment[1],
            ]);
        }
    }
}
