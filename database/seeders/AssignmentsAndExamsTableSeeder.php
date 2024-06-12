<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AssignmentsAndExams;

class AssignmentsAndExamsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $assignmentsAndExams = [
            [1, 'Midterm Exam', now()->subDays(2), now(), 1, 'Midterm exam content goes here.', '/uploads/module.zip', 100, 'exam'],
            [1, 'Homework 1', now()->subDays(3), now(), 1, 'Homework 1 content goes here.', '/uploads/module.zip', 50, 'assignment'],
            [2, 'Final Project', now()->subDays(1), now()->addDays(10), 1, 'Final project content goes here.', '/uploads/module.zip', 80, 'assignment'],
            [3, 'Quiz 1', now()->subDays(5), now()->addDays(2), 1, 'Quiz 1 content goes here.', '/uploads/module.zip', 30, 'exam'],
            [4, 'Lab Report', now()->subDays(1), now()->addDays(5), 1, 'Lab report content goes here.', 'http://127.0.0.1/uploads/module.zip', 75, 'assignment'],
            [5, 'Research Paper', now()->subDays(6), now()->addDays(5), 1, 'Research paper content goes here.', 'http://127.0.0.1/uploads/module.zip', 90, 'assignment'],
            [6, 'Assignment 1', now()->subDays(1), now()->addDays(5), 1, 'Assignment 1 content goes here.', 'http://127.0.0.1/uploads/module.zip', 60, 'assignment'],
            [7, 'Midterm Exam', now()->subDays(2), now()->addDays(6), 1, 'Midterm exam content goes here.', null, 60, 'exam'],
            [8, 'Project Presentation', now()->subDays(2), now()->addDays(6), 1, 'Project presentation content goes here.', null, 120, 'assignment'],
            [9, 'Quiz 2', now()->subDays(3), now()->addDays(5), 1, 'Quiz 2 content goes here.', null, 40, 'exam'],
            // Add more entries as needed
        ];

        foreach ($assignmentsAndExams as $assignmentAndExam) {
            AssignmentsAndExams::create([
                'class_id'       => $assignmentAndExam[0],
                'Title'          => $assignmentAndExam[1],
                'DueDate'        => $assignmentAndExam[2],
                'AvailableDate'  => $assignmentAndExam[3],
                'Published'      => $assignmentAndExam[4],
                'Content'        => $assignmentAndExam[5],
                'Attachments'    => $assignmentAndExam[6],
                'TotalMarks'     => $assignmentAndExam[7],
                'Type'           => $assignmentAndExam[8],
            ]);
        }
    }
}
