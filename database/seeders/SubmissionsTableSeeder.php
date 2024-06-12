<?php

namespace Database\Seeders;

// database/seeders/SubmissionsTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Submissions;

class SubmissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $submissions = [
            [1, 1, now()->subDay(), 'My midterm exam submission content.', '/uploads/module.zip'],
            [1, 4, now()->subDay(), 'My midterm exam submission content.', '/uploads/module.zip'],
            [2, 1, now()->subDay(), 'My homework 1 submission content.', '/uploads/module.zip'],
            [2, 4, now()->subDay(), 'My homework 1 submission content.', '/uploads/module.zip'],
            [3, 6, now(), 'My Quiz 1 submission content.', 'http://127.0.0.1/uploads/module.zip'],
            [3, 8, now(), 'My Quiz 1 submission content.', 'https://example.com/quiz1_submission2.pdf'],
            [4, 6, now(), 'My Lab Report submission content.', 'https://example.com/labreport_submission1.pdf'],
            [4, 8, now(), 'My Lab Report submission content.', 'https://example.com/labreport_submission2.pdf'],
            [5, 6, now(), 'My Research Paper submission content.', 'https://example.com/researchpaper_submission1.pdf'],
            [5, 8, now(), 'My Research Paper submission content.', 'https://example.com/researchpaper_submission2.pdf'],
        ];

        foreach ($submissions as $submission) {
            Submissions::create([
                'assignment_id'   => $submission[0],
                'user_id'         => $submission[1],
                'submission_date' => $submission[2],
                'Content'         => $submission[3],
                'AttachmentsLink' => $submission[4],
            ]);
        }
    }
}
