<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course; // Assuming you have a Course model
use Illuminate\Support\Facades\DB;
use App\Models\Classes;


class CourseController extends Controller
{
    public function addCourse(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $course = new Course();
            $course->Number = $data['Number'];
            $course->Name = $data['Name'];
            $course->Description = $data['Description'];
            $course->CourseObjectives = $data['CourseObjectives'];
            $course->CourseContent = $data['CourseContent'];
            $course->AdditionalInformation = $data['AdditionalInformation'];

            try {
                $course->save();

                // Return success response
                return response()->json(["message" => "Course created successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Failed to create the course"], 500);
            }
        }
    }

    public function deleteCourse(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $course = Course::find($data['Id']);

            if (!$course) {
                return response()->json(["error" => "Course not found"], 404);
            }

            try {
                $course->delete();

                // Return success response
                return response()->json(["message" => "Course deleted successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Failed to delete the course"], 500);
            }
        }
    }

    public function getAllCourses()
    {
        $courses = Course::all();

        if (!$courses->isEmpty()) {
            // Output courses data as JSON
            return response()->json($courses);
        } else {
            // No courses found, return an empty array
            return response()->json([]);
        }
    }

    public function getClassesByInstructor(Request $request)
    {
        if ($request->isMethod('post')) {
            $userID = $request->input('id');

            $classes = Classes::select(
                    'classes.ID AS class_id',
                    'classes.course_id',
                    'classes.START_DATE',
                    'classes.END_DATE',
                    'classes.Schedule',
                    'classes.syllabus',
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
                ->where('classes.instructor_id', '=', $userID)
                ->get();

            if (!$classes->isEmpty()) {
                // Output courses data as JSON
                return response()->json($classes);
            } else {
                // No courses found for the user, return an empty array
                return response()->json([]);
            }
        }
    }

    public function updateCourse(Request $request)
    {

            $data = $request->all();

            // Retrieve course data from the request
            $courseId = $data['Id'];
            $courseNumber = $data['Number'];
            $courseName = $data['Name'];
            $courseDescription = $data['Description'];
            $courseObjectives = $data['CourseObjectives'];
            $courseContent = $data['CourseContent'];
            $additionalInformation = $data['AdditionalInformation'];

            // Update the course in the database
            try {
                DB::table('courses')
                    ->where('id', $courseId)
                    ->update([
                        'Number' => $courseNumber,
                        'Name' => $courseName,
                        'Description' => $courseDescription,
                        'CourseObjectives' => $courseObjectives,
                        'CourseContent' => $courseContent,
                        'AdditionalInformation' => $additionalInformation,
                    ]);

                // Return success response
                return response()->json(["message" => "Course updated successfully"]);
            } catch (\Exception $e) {
                // Return error response
                return response()->json(["error" => "Failed to update the course"], 500);
            }
    }
}
