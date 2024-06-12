<?php

namespace Database\Seeders;

// database/seeders/ClassesTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Classes;

class ClassesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $classes = [
            [1, '2023-01-10', '2023-04-30', 2, 'Mon/Wed 9:00 AM - 10:30 AM', 'Syllabus for Class 1', '0001'],
            [2, '2023-02-15', '2023-05-30', 2, 'Tue/Thu 11:00 AM - 12:30 PM', 'Syllabus for Class 2', '0002'],
            [3, '2023-01-05', '2023-04-20', 2, 'Mon/Wed 1:00 PM - 2:30 PM', 'Syllabus for Class 3', '0003'],
            [4, '2023-03-01', '2023-06-15', 5, 'Wed/Fri 3:00 PM - 4:30 PM', 'Syllabus for Class 4', '0004'],
            [5, '2023-01-15', '2023-05-01', 7, 'Thu 2:00 PM - 4:00 PM', 'Syllabus for Class 5', '0005'],
            [6, '2023-02-10', '2023-05-25', 9, 'Tue/Thu 9:30 AM - 11:00 AM', 'Syllabus for Class 6', '0006'],
            [7, '2023-01-20', '2023-04-30', 5, 'Mon/Wed 10:00 AM - 11:30 AM', 'Syllabus for Class 7', '0007'],
            [8, '2023-02-05', '2023-05-20', 7, 'Fri 1:00 PM - 3:00 PM', 'Syllabus for Class 8', '0008'],
            [9, '2023-01-25', '2023-05-10', 9, 'Tue 11:00 AM - 1:00 PM', 'Syllabus for Class 9', '0009'],
            [10, '2023-02-20', '2023-05-30', 5, 'Thu 1:30 PM - 3:30 PM', 'Syllabus for Class 10', '0010'],
        ];

        foreach ($classes as $class) {
            Classes::create([
                'course_id'     => $class[0],
                'START_DATE'    => $class[1],
                'END_DATE'      => $class[2],
                'instructor_id' => $class[3],
                'Schedule'      => $class[4],
                'syllabus'      => $class[5],
                'class_number'  => $class[6],
            ]);
        }
    }
}
