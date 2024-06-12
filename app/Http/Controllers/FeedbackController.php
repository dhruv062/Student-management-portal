<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StudentFeedback; // Assuming you have a StudentFeedback model

class FeedbackController extends Controller
{
    public function addFeedback(Request $request)
    {
        if ($request->isMethod('post')) {
            $classID = $request->input('class_id');
            $studentID = $request->input('student_id');
            $feedback = $request->input('all_questions');

            try {
                StudentFeedback::create([
                    'class_id' => $classID,
                    'student_id' => $studentID,
                    'all_questions' => $feedback,
                ]);

                // Return success response
                return response()->json(["success" => true, "message" => "Feedback added successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Feedback insertion failed ".$e], 500);
            }
        }
    }
    public function checkFeedbackExistence(Request $request)
    {
        if ($request->isMethod('post')) {
            $classID = $request->input('class_id');
            $studentID = $request->input('student_id');

            // Check if feedback with the same class_id and student_id already exists
            $existingFeedback = StudentFeedback::where('class_id', $classID)
                ->where('student_id', $studentID)
                ->first();

            if ($existingFeedback) {
                // Feedback record already exists
                return response()->json(["message" => "Already exists"]);
            } else {
                // Feedback record does not exist
                return response()->json(["message" => "Does not exist"]);
            }
        }
    }
     public function getInstructorFeedback(Request $request)
    {
        if ($request->isMethod('post')) {
            $instructorUserID = $request->input('user_id');

            // Retrieve feedback for classes taught by the instructor
            $feedbackData = StudentFeedback::select('student_feedback.*')
                ->join('classes', 'student_feedback.class_id', '=', 'classes.ID')
                ->where('classes.instructor_id', $instructorUserID)
                ->get();

            if (!$feedbackData->isEmpty()) {
                // Output feedback data as JSON
                return response()->json($feedbackData);
            } else {
                // No feedback found for the instructor's classes, return an empty array
                return response()->json([]);
            }
        }
    }
}
