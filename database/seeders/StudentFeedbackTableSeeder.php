<?php

namespace Database\Seeders;

// database/seeders/StudentFeedbackSeeder.php

use Illuminate\Database\Seeder;
use App\Models\StudentFeedback;

class StudentFeedbackTableSeeder extends Seeder
{
    public function run()
    {
        $feedbackData = [
            [
                'class_id' => 1,
                'student_id' => 1,
                'all_questions' => '{
                    "q1": 5,
                    "q2": 4,
                    "q3": 5,
                    "q4": 4,
                    "q5": 5,
                    "q6": 4,
                    "q7": 5,
                    "q8": 4,
                    "q9": "The course content was well-organized and easy to follow.",
                    "q10": "The instructor explained the material clearly and effectively.",
                    "q11": "The instructor was knowledgeable about the subject matter."
                }',
            ],
            [
                'class_id' => 1,
                'student_id' => 4,
                'all_questions' => '{
                    "q1": 4,
                    "q2": 5,
                    "q3": 4,
                    "q4": 5,
                    "q5": 4,
                    "q6": 5,
                    "q7": 4,
                    "q8": 5,
                    "q9": "Enjoyed the course overall.",
                    "q10": "The course materials (e.g., textbooks, handouts) were helpful.",
                    "q11": "Some areas need improvement."
                }',
            ],
            [
                'class_id' => 1,
                'student_id' => 6,
                'all_questions' => '{
                    "q1": 3,
                    "q2": 4,
                    "q3": 3,
                    "q4": 4,
                    "q5": 3,
                    "q6": 4,
                    "q7": 3,
                    "q8": 4,
                    "q9": "Found the course challenging.",
                    "q10": "Would appreciate more practice exercises.",
                    "q11": "Instructors availability for questions was limited."
                }',
            ],
            [
                'class_id' => 2,
                'student_id' => 2,
                'all_questions' => '{
                    "q1": 4,
                    "q2": 3,
                    "q3": 4,
                    "q4": 3,
                    "q5": 4,
                    "q6": 3,
                    "q7": 4,
                    "q8": 3,
                    "q9": "The course content was somewhat disorganized.",
                    "q10": "The instructors explanations were sometimes unclear.",
                    "q11": "The instructor lacked depth in subject knowledge."
                }',
            ],
            [
                'class_id' => 2,
                'student_id' => 5,
                'all_questions' => '{
                    "q1": 5,
                    "q2": 4,
                    "q3": 5,
                    "q4": 4,
                    "q5": 5,
                    "q6": 4,
                    "q7": 5,
                    "q8": 4,
                    "q9": "The course content was well-organized and easy to follow.",
                    "q10": "The instructor explained the material clearly and effectively.",
                    "q11": "The instructor was knowledgeable about the subject matter."
                }',
            ],
            [
                'class_id' => 6,
                'student_id' => 3,
                'all_questions' => '{
                    "q1": 3,
                    "q2": 2,
                    "q3": 3,
                    "q4": 2,
                    "q5": 3,
                    "q6": 2,
                    "q7": 3,
                    "q8": 2,
                    "q9": "The course content was confusing and disorganized.",
                    "q10": "The instructors explanations were often unclear.",
                    "q11": "The instructors knowledge gaps were evident."
                }',
            ],
            [
                'class_id' => 5,
                'student_id' => 7,
                'all_questions' => '{
                    "q1": 2,
                    "q2": 3,
                    "q3": 2,
                    "q4": 3,
                    "q5": 2,
                    "q6": 3,
                    "q7": 2,
                    "q8": 3,
                    "q9": "The course content needs improvement.",
                    "q10": "The instructors explanations were somewhat clear.",
                    "q11": "The instructor had some knowledge gaps."
                }',
            ],
        ];

        foreach ($feedbackData as $feedback) {
            StudentFeedback::create($feedback);
        }
    }
}

