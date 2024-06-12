<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment; 
use App\Models\Classes;


class EnrollmentController extends Controller
{
    public function dropFromClass(Request $request)
    {
        if ($request->isMethod('post')) {
            $user_id = $request->input('user_id');
            $class_id = $request->input('class_id');

            $enrollment = Enrollment::where('user_id', $user_id)
                ->where('class_id', $class_id)
                ->first();

            if (!$enrollment) {
                return response()->json(["error" => "Enrollment not found"], 404);
            }

            try {
                $enrollment->delete();

                // Return success response
                return response()->json(["success" => true, "message" => "Dropped from the class"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Drop from the class failed"], 500);
            }
        }
    }

    public function enrollInClass(Request $request)
    {
        if ($request->isMethod('post')) {
            $user_id = $request->input('user_id');
            $class_id = $request->input('class_id');

            try {
                Enrollment::create([
                    'user_id' => $user_id,
                    'class_id' => $class_id,
                ]);

                // Return success response
                return response()->json(["success" => true, "message" => "Enrollment successful"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Enrollment failed"], 500);
            }
        }
    }

    public function getEnrolledClasses(Request $request)
    {
        if ($request->isMethod('post')) {
            $userID = $request->input('id');

            $enrolledClasses = Classes::select(
                    'classes.ID AS class_id',
                    'classes.course_id',
                    'classes.START_DATE',
                    'classes.END_DATE',
                    'classes.Schedule',
                    'classes.class_number',
                    'courses.Number AS course_number',
                    'courses.Name AS course_name',
                    'courses.Description AS course_description',
                    'classes.instructor_id',
                    'users.FirstName AS instructor_first_name',
                    'users.LastName AS instructor_last_name'
                )
                ->leftJoin('courses', 'classes.course_id', '=', 'courses.ID')
                ->leftJoin('users', 'classes.instructor_id', '=', 'users.ID')
                ->join('enrollment', 'classes.ID', '=', 'enrollment.class_id')
                ->where('enrollment.user_id', '=', $userID)
                ->get();

            if (!$enrolledClasses->isEmpty()) {
                // Output enrolled classes as JSON
                return response()->json($enrolledClasses);
            } else {
                // No classes found for the student, return an empty array
                return response()->json([]);
            }
        }
    }
}
