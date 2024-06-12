<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\AssignmentsAndExams;
use Carbon\Carbon;


class AssignmentsController extends Controller
{
   public function addAssignment(Request $request)
{
    $data = $request->json()->all();

    // Retrieve user input for adding an assignment/exam
    $classID = $data['class_id'];
    $assignmentName = $data['assignment_name'];
    $dueDate = Carbon::parse($data['assignment_due_date']);
    $availableDate = Carbon::parse($data['assignment_available_date']);
    $published = $data['assignment_published'];
    $content = $data['assignment_content'];
    $totalMarks = $data['assignment_total_marks'];
    $type = $data['assignment_type'];
    $attachments = $data['attachments']; // Assuming you have attachments in the JSON data

    // Check if the due date is earlier than the available date
    if ($dueDate->greaterThanOrEqualTo($availableDate)) {
        return response()->json(["error" => "Due date must be earlier than the available date."], 400);
    }

    // Check if the due date is in the future
    if ($dueDate->lessThanOrEqualTo(now())) {
        return response()->json(["error" => "Due date must be in the future."], 400);
    }

    // Check if the available date is in the future
    if ($availableDate->lessThanOrEqualTo(now())) {
        return response()->json(["error" => "Available date must be in the future."], 400);
    }

    // Query the database to add an assignment/exam
    try {
        DB::table('assignments_and_exams')->insert([
            'class_id' => $classID,
            'Title' => $assignmentName,
            'DueDate' => $dueDate,
            'AvailableDate' => $availableDate,
            'Published' => $published,
            'Content' => $content,
            'Attachments' => $attachments,
            'TotalMarks' => $totalMarks,
            'Type' => $type,
        ]);

        // Return a success message
        return response()->json(["message" => "Assignment/Exam added successfully"]);
    } catch (\Exception $e) {
        // Handle database errors
        return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
    }
}

    public function getAssignmentById(Request $request)
    {
        // Retrieve assignment ID from the JSON input
        $assignmentID = $request->json()->get('assignment_id');

        // Query the database to retrieve the assignment by its ID
        try {
            $assignment = DB::table('assignments_and_exams')
                ->select([
                    'ID as assignment_id',
                    'class_id',
                    'Title as assignment_name',
                    'DueDate as assignment_due_date',
                    'AvailableDate as assignment_available_date',
                    'Published as assignment_published',
                    'Content as assignment_content',
                    'Attachments as attachments',
                    'TotalMarks as assignment_total_marks',
                    'Type as assignment_type',
                ])
                ->where('ID', $assignmentID)
                ->first();

            if (!empty($assignment)) {
                // Output assignment data as JSON
                return response()->json($assignment);
            } else {
                // Assignment not found, return an empty response or an error message
                return response()->json(["message" => "Assignment not found"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getAssignmentsByClass(Request $request)
    {
        // Retrieve class ID from the JSON input
        $classID = $request->json()->get('class_id');

        // Query the database to retrieve all assignments and exams of the specified class, including attachments
        try {
            $assignments = DB::table('assignments_and_exams')
                ->select([
                    'ID as assignment_id',
                    'class_id',
                    'Title as assignment_name',
                    'DueDate as assignment_due_date',
                    'AvailableDate as assignment_available_date',
                    'Published as assignment_published',
                    'Content as assignment_content',
                    'Attachments as attachments',
                    'TotalMarks as assignment_total_marks',
                    'Type as assignment_type',
                ])
                ->where('class_id', $classID)
                ->get();

            if (!empty($assignments)) {
                // Output assignments data as JSON
                return response()->json($assignments);
            } else {
                // No assignments found for the class, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getAssignmentsForStudent(Request $request)
    {
        // Retrieve user ID from the session (assuming it's stored during authentication)
        $userID = $request->json()->get('id');// Replace 'user_id' with the actual session variable name

        // Query the database to retrieve all assignments and exams for the student
        try {
            $assignments = DB::table('assignments_and_exams as ae')
                ->select([
                    'ae.ID as assignment_id',
                    'ae.class_id',
                    'ae.Title as assignment_name',
                    'ae.DueDate as assignment_due_date',
                    'ae.AvailableDate as assignment_available_date',
                    'ae.Published as assignment_published',
                    'ae.Content as assignment_content',
                    'ae.TotalMarks as assignment_total_marks',
                    'ae.Type as assignment_type',
                    'c.course_id',
                    'c.START_DATE',
                    'c.END_DATE',
                    'c.Schedule',
                    'co.Number as course_number',
                    'co.Name as course_name',
                    'co.Description as course_description',
                    'c.instructor_id',
                    'u.FirstName as instructor_first_name',
                    'u.LastName as instructor_last_name',
                ])
                ->join('enrollment as e', 'ae.class_id', '=', 'e.class_id')
                ->join('classes as c', 'ae.class_id', '=', 'c.ID')
                ->join('courses as co', 'c.course_id', '=', 'co.ID')
                ->leftJoin('users as u', 'c.instructor_id', '=', 'u.ID')
                ->where('e.user_id', $userID)
                ->get();

            if (!empty($assignments)) {
                // Output assignments as JSON
                return response()->json($assignments);
            } else {
                // No assignments and exams found for the student, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getPublishedAssignmentsForClass(Request $request)
    {
        // Validate the request if needed

        $classID = $request->input('class_id');

        try {
            $assignmentsAndExams = AssignmentsAndExams::select(
                'id as assignment_id',
                'class_id',
                'Title as assignment_name',
                'DueDate as assignment_due_date',
                'AvailableDate as assignment_available_date',
                'Published as assignment_published',
                'Content as assignment_content',
                'Attachments as attachments',
                'TotalMarks as assignment_total_marks',
                'Type as assignment_type'
            )
            ->where('class_id', $classID)
            ->where('published', 1)
            ->get();

            return response()->json($assignmentsAndExams);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        }
    }

    public function deleteAssignment(Request $request)
    {
        // Retrieve assignment ID from the JSON input
        $assignmentID = $request->input('assignment_id');

        // Query the database to delete the assignment/exam
        try {
            $assignment = AssignmentsAndExams::find($assignmentID);

            if ($assignment) {
                $assignment->delete();

                // Return a success message
                return response()->json(["message" => "Assignment/Exam deleted successfully"]);
            } else {
                // Assignment not found, return an empty response or an error message
                return response()->json(["message" => "Assignment not found"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }



    public function updateAssignment(Request $request)
    {
        // Retrieve user input for updating an assignment/exam
        $assignmentID = $request->input('assignment_id');
        $title = $request->input('assignment_name');
        $dueDate = Carbon::parse($request->input('assignment_due_date'));
        $availableDate = Carbon::parse($request->input('assignment_available_date'));
        $published = $request->input('assignment_published');
        $content = $request->input('assignment_content');
        $totalMarks = $request->input('assignment_total_marks');
        $type = $request->input('assignment_type');
        $attachments = $request->input('attachments');

        // Check if the due date is earlier than the available date
        if ($dueDate->greaterThanOrEqualTo($availableDate)) {
            return response()->json(["error" => "Due date must be earlier than the available date."], 400);
        }

        // Check if due date and available date are in the future
        if ($availableDate->lessThanOrEqualTo(now())) {
            return response()->json(["error" => "Available date must be in the future."], 400);
        }

        // Update the assignment/exam, including attachments
        try {
            $assignment = AssignmentsAndExams::find($assignmentID);

            if ($assignment) {
                $assignment->update([
                    'Title' => $title,
                    'DueDate' => $dueDate,
                    'AvailableDate' => $availableDate,
                    'Published' => $published,
                    'Content' => $content,
                    'TotalMarks' => $totalMarks,
                    'Type' => $type,
                    'Attachments' => $attachments,
                ]);

                // Return a success message
                return response()->json(["message" => "Assignment/Exam updated successfully"]);
            } else {
                // Assignment not found, return an empty response or an error message
                return response()->json(["message" => "Assignment not found"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

}
