<?php

// app/Http/Controllers/ClassController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassesController extends Controller
{
    public function addClass(Request $request)
    {
        // Retrieve user input for adding a class
        $courseID = $request->input("course_id");
        $schedule = $request->input("Schedule");
        $startDate = $request->input("START_DATE", '2023-01-01');
        $endDate = $request->input("END_DATE", '2023-12-31');
        $syllabus = $request->input("syllabus");
        $classNumber = $request->input("class_number");
        $instructorID = $request->input("id");

        // Check if the class number already exists
        $existingClass = DB::table('classes')->where('class_number', $classNumber)->first();
        if ($existingClass) {
            return response()->json(["error" => "Class number already exists."], 400);
        }

        // Check if the end date is not earlier than the start date
        if (strtotime($endDate) < strtotime($startDate)) {
            return response()->json(["error" => "End date cannot be earlier than the start date."], 400);
        }

        // The class number is unique, and the end date is valid; proceed with adding the class
        // Construct the data array based on the presence of instructor_id
        $data = [
            'course_id' => $courseID,
            'START_DATE' => $startDate,
            'END_DATE' => $endDate,
            'Schedule' => $schedule,
            'syllabus' => $syllabus,
            'class_number' => $classNumber,
        ];

        if ($instructorID !== null) {
            $data['instructor_id'] = $instructorID;
        }

        try {
            // Insert the data into the 'classes' table
            DB::table('classes')->insert($data);

            // Return a success message
            return response()->json(["message" => "Class added successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function deleteClass(Request $request)
    {
        // Retrieve the class ID to delete
        $classID = $request->input('class_id');

        // Check if the class exists before attempting to delete
        $checkResult = DB::table('classes')->where('ID', $classID)->count();

        if ($checkResult > 0) {
            // The class exists, proceed with the deletion
            try {
                DB::table('classes')->where('ID', $classID)->delete();

                // Return a success message
                return response()->json(['message' => 'Class deleted successfully']);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        } else {
            // The class does not exist
            return response()->json(['error' => 'Class not found'], 404);
        }
    }

    public function getAllClasses()
    {
        // Query the database to retrieve classes with joined course, instructor, and class number data
        $classes = DB::table('classes as c')
            ->leftJoin('courses as co', 'c.course_id', '=', 'co.ID')
            ->leftJoin('users as u', 'c.instructor_id', '=', 'u.ID')
            ->select(
                'c.ID as class_id',
                'c.course_id',
                'c.START_DATE',
                'c.END_DATE',
                'c.Schedule',
                'c.class_number', // Include the class_number field
                'c.Syllabus as syllabus',
                'co.Number as course_number',
                'co.Name as course_name',
                'co.Description as course_description',
                'c.instructor_id',
                'u.FirstName as instructor_first_name',
                'u.LastName as instructor_last_name'
            )
            ->get();

        if ($classes->isNotEmpty()) {
            // Return classes data as JSON
            return response()->json($classes);
        } else {
            // No classes found, return an empty array
            return response()->json([]);
        }
    }

    public function getClassInfo(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();
            $classID = $data['class_id'];

            try {
                $modules = DB::table('classes as c')
                    ->leftJoin('courses as co', 'c.course_id', '=', 'co.ID')
                    ->leftJoin('users as u', 'c.instructor_id', '=', 'u.ID')
                    ->select(
                        'c.ID as class_id',
                        'c.course_id',
                        'c.START_DATE',
                        'c.END_DATE',
                        'c.Schedule',
                        'c.class_number',
                        'co.Number as course_number',
                        'co.Name as course_name',
                        'co.Description as course_description',
                        'c.instructor_id',
                        'u.FirstName as instructor_first_name',
                        'u.LastName as instructor_last_name'
                    )
                    ->where('c.ID', $classID)
                    ->get();

                return response()->json($modules);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Invalid request method'], 400);
    }

    public function getClassesByInstructor(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();
            $userID = $data["user_id"];

            try {
                $courses = DB::table('classes as c')
                    ->leftJoin('courses as co', 'c.course_id', '=', 'co.ID')
                    ->leftJoin('users as u', 'c.instructor_id', '=', 'u.ID')
                    ->select(
                        'c.ID as class_id',
                        'c.course_id',
                        'c.START_DATE',
                        'c.END_DATE',
                        'c.Schedule',
                        'c.class_number',
                        'co.Number as course_number',
                        'co.Name as course_name',
                        'co.Description as course_description',
                        'c.instructor_id',
                        'u.FirstName as instructor_first_name',
                        'u.LastName as instructor_last_name'
                    )
                    ->where('c.instructor_id', $userID)
                    ->get();

                return response()->json($courses);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Invalid request method'], 400);
    }

    public function getStudentgrades(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();

            // Retrieve the class ID and student ID from the JSON input
            $classId = $data['class_id'];
            $studentId = $data['student_id'];

            try {
                $assignmentgrades = DB::table('assignments_and_exams as ae')
                    ->leftJoin('grades as g', function ($join) use ($studentId) {
                        $join->on('ae.Id', '=', 'g.assignment_id')
                            ->where('g.user_id', '=', $studentId);
                    })
                    ->select('ae.Id as assignment_id', 'ae.Title as assignment_name', 'g.grade', 'g.comments')
                    ->where('ae.class_id', $classId)
                    ->get();

                return response()->json($assignmentgrades);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Invalid request method'], 400);
    }

    public function getClassStudents(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();

            // Retrieve the class ID from the JSON input
            $classId = $data['class_id'];

            try {
                $enrolledusers = DB::table('users as u')
                    ->join('enrollment as e', 'u.ID', '=', 'e.user_id')
                    ->select('u.ID', 'u.FirstName', 'u.LastName', 'u.Email')
                    ->where('e.class_id', $classId)
                    ->get();

                return response()->json($enrolledusers);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Invalid request method'], 400);
    }

    public function getUserEnrolledClasses(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();

            // Retrieve the user ID from the JSON input
            $userId = $data['user_id'];

            try {
                $classDetails = DB::table('classes as c')
                    ->join('enrollment as e', 'c.ID', '=', 'e.class_id')
                    ->join('courses as co', 'c.course_id', '=', 'co.Id')
                    ->leftJoin('users as u', 'c.instructor_id', '=', 'u.ID')
                    ->select('c.*', 'co.*', 'u.FirstName as instructor_first_name', 'u.LastName as instructor_last_name')
                    ->where('e.user_id', $userId)
                    ->get();

                return response()->json($classDetails);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Invalid request method'], 400);
    }

    public function getUserEnrollmentCount(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();

            // Get the user ID from the JSON data
            $userID = $data['id']; // Replace 'user_id' with the actual JSON key

            try {
                $result = DB::table('enrollment')
                    ->where('user_id', $userID)
                    ->count();

                return response()->json(['num_classes' => $result]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
            }
        }

        return response()->json(['error' => 'Invalid request method'], 400);
    }

    public function updateClass(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->json()->all();

            // Retrieve user input for updating a class
            $classID = $data["class_id"]; // Assuming you have class ID in the JSON data
            $startDate = isset($data["START_DATE"]) ? $data["START_DATE"] : '2023-01-01'; // Default start date
            $endDate = isset($data["END_DATE"]) ? $data["END_DATE"] : '2023-12-31'; // Default end date
            $schedule = $data["Schedule"]; // Assuming you have schedule in the JSON data
            $courseID = $data["course_id"]; // Assuming you have course ID in the JSON data
            $syllabus = $data["syllabus"]; // Assuming you have syllabus in the JSON data
            $classNumber = $data["class_number"]; // New input for class number
            $instructorID = isset($data["instructor_id"]) ? $data["instructor_id"] : null; // Instructor ID (if available)

            try {
                // Check if the end date is not earlier than the start date
                if (strtotime($endDate) < strtotime($startDate)) {
                    return response()->json(["error" => "End date cannot be earlier than the start date."], 400);
                }

                // Check if the class number already exists for a different class
                $checkExisting = DB::table('classes')
                    ->where('class_number', $classNumber)
                    ->where('ID', '!=', $classID)
                    ->count();

                if ($checkExisting > 0) {
                    return response()->json(["error" => "Class number already exists for another class."], 400);
                }

                // The class number is unique, and the end date is valid; proceed with the update
                DB::table('classes')
                    ->where('ID', $classID)
                    ->update([
                        'course_id' => $courseID,
                        'START_DATE' => $startDate,
                        'END_DATE' => $endDate,
                        'Schedule' => $schedule,
                        'syllabus' => $syllabus,
                        'class_number' => $classNumber,
                        'instructor_id' => $instructorID,
                    ]);

                // Return a success message
                return response()->json(["message" => "Class updated successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }

        return response()->json(["error" => "Invalid request method"], 400);
    }
}
