<?php

namespace App\Http\Controllers;

use App\Models\Submission;
use Illuminate\Http\Request;
use App\Models\AssignmentsAndExams;
use Illuminate\Support\Facades\DB;



class SubmissionController extends Controller
{
    public function addSubmission(Request $request)
    {
        try {
            // Extract submission data from the request
            $assignmentId = $request->input('assignment_id');
            $userId = $request->input('user_id');
            $submissionDate = now(); // Use Laravel's now() function to get the current date and time
            $content = $request->input('content');
            $attachmentsLink = $request->input('attachments_link');

            // Check if a submission already exists for the same assignment and user
            $submission = Submission::where('assignment_id', $assignmentId)
                ->where('user_id', $userId)
                ->first();

            if ($submission) {
                // Update the existing submission
                $submission->update([
                    'submission_date' => $submissionDate,
                    'content' => $content,
                    'attachments_link' => $attachmentsLink,
                ]);

                return response()->json(["success" => true, "message" => "Submission updated successfully"]);
            } else {
                // Insert a new submission
                Submission::create([
                    'assignment_id' => $assignmentId,
                    'user_id' => $userId,
                    'submission_date' => $submissionDate,
                    'content' => $content,
                    'attachments_link' => $attachmentsLink,
                ]);

                return response()->json(["success" => true, "message" => "Submission added successfully"]);
            }
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => "An error occurred: " . $e->getMessage()], 500);
        }
    }

    public function getGrades(Request $request)
    {
        try {
            // Handle POST request to retrieve assignments, exams, submissions, grades, and student details for a specific user and class
            $data = $request->json()->all();

            // Retrieve user ID and class ID from the JSON data
            $userID = $data['user_id']; // Replace 'user_id' with the actual JSON key
            $classID = $data['class_id']; // Replace 'class_id' with the actual JSON key

            // Retrieve assignments, exams, submissions, grades, and student details using Eloquent
            $assignments = AssignmentsAndExams::select(
                    'assignments_and_exams.ID AS assignment_id',
                    'assignments_and_exams.class_id',
                    'assignments_and_exams.Title AS assignment_name',
                    'assignments_and_exams.DueDate AS assignment_due_date',
                    'assignments_and_exams.AvailableDate AS assignment_available_date',
                    'assignments_and_exams.Published AS assignment_published',
                    'assignments_and_exams.Content AS assignment_content',
                    'assignments_and_exams.TotalMarks AS assignment_total_marks',
                    'assignments_and_exams.Type AS assignment_type',
                    'classes.course_id',
                    'classes.START_DATE',
                    'classes.END_DATE',
                    'classes.Schedule',
                    'courses.Number AS course_number',
                    'courses.Name AS course_name',
                    'courses.Description AS course_description',
                    'classes.instructor_id',
                    'instructors.FirstName AS instructor_first_name',
                    'instructors.LastName AS instructor_last_name',
                    'submissions.ID AS submission_id',
                    'submissions.submission_date',
                    'submissions.Content AS submission_content',
                    'submissions.AttachmentsLink AS submission_attachments',
                    'grades.grade',
                    'grades.comments',
                    'students.FirstName AS student_first_name',
                    'students.LastName AS student_last_name',
                    'students.Email AS student_email'
                )
                ->join('classes', 'assignments_and_exams.class_id', '=', 'classes.ID')
                ->join('courses', 'classes.course_id', '=', 'courses.ID')
                ->leftJoin('users AS instructors', 'classes.instructor_id', '=', 'instructors.ID')
                ->leftJoin('submissions', function ($join) use ($userID) {
                    $join->on('assignments_and_exams.ID', '=', 'submissions.assignment_id')
                        ->where('submissions.user_id', '=', $userID);
                })
                ->leftJoin('grades', function ($join) use ($userID) {
                    $join->on('assignments_and_exams.ID', '=', 'grades.assignment_id')
                        ->where('grades.user_id', '=', $userID);
                })
                ->leftJoin('users AS students', function ($join) use ($userID) {
                    $join->on(\DB::raw($userID), '=', 'students.ID');
                })
                ->where('assignments_and_exams.class_id', '=', $classID)
                ->get();

            return response()->json($assignments);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => "An error occurred: " . $e->getMessage()], 500);
        }
    }

    public function getPublishedGrades(Request $request)
    {
        try {
            // Handle POST request to retrieve assignments, exams, submissions, grades, and student details for a specific user and class
            $data = $request->json()->all();

            // Retrieve user ID and class ID from the JSON data
            $userID = $data['user_id']; // Replace 'user_id' with the actual JSON key
            $classID = $data['class_id']; // Replace 'class_id' with the actual JSON key

            // Retrieve assignments, exams, submissions, grades, and student details using Eloquent
            $assignments = AssignmentsAndExams::select(
                'assignments_and_exams.ID AS assignment_id',
                'assignments_and_exams.class_id',
                'assignments_and_exams.Title AS assignment_name',
                'assignments_and_exams.DueDate AS assignment_due_date',
                'assignments_and_exams.AvailableDate AS assignment_available_date',
                'assignments_and_exams.Published AS assignment_published',
                'assignments_and_exams.Content AS assignment_content',
                'assignments_and_exams.TotalMarks AS assignment_total_marks',
                'assignments_and_exams.Type AS assignment_type',
                'classes.course_id',
                'classes.START_DATE',
                'classes.END_DATE',
                'classes.Schedule',
                'courses.Number AS course_number',
                'courses.Name AS course_name',
                'courses.Description AS course_description',
                'classes.instructor_id',
                'instructors.FirstName AS instructor_first_name',
                'instructors.LastName AS instructor_last_name',
                'submissions.ID AS submission_id',
                'submissions.submission_date',
                'submissions.Content AS submission_content',
                'submissions.AttachmentsLink AS submission_attachments',
                'grades.grade',
                'grades.comments',
                'students.FirstName AS student_first_name',
                'students.LastName AS student_last_name',
                'students.Email AS student_email'
            )
                ->join('classes', 'assignments_and_exams.class_id', '=', 'classes.ID')
                ->join('courses', 'classes.course_id', '=', 'courses.ID')
                ->leftJoin('users AS instructors', 'classes.instructor_id', '=', 'instructors.ID')
                ->leftJoin('submissions', function ($join) use ($userID) {
                    $join->on('assignments_and_exams.ID', '=', 'submissions.assignment_id')
                        ->where('submissions.user_id', '=', $userID);
                })
                ->leftJoin('grades', function ($join) use ($userID) {
                    $join->on('assignments_and_exams.ID', '=', 'grades.assignment_id')
                        ->where('grades.user_id', '=', $userID);
                })
                ->leftJoin('users AS students', function ($join) use ($userID) {
                    $join->on(\DB::raw($userID), '=', 'students.ID');
                })
                ->where('assignments_and_exams.class_id', '=', $classID)
                ->where('assignments_and_exams.Published', '=', 1) // Filter for published classes
                ->get();

            return response()->json($assignments);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => "An error occurred: " . $e->getMessage()], 500);
        }
    }

    public function getSubmissionsForAssignmentByuser(Request $request)
    {
        try {
            // Handle POST request to retrieve submissions for a specific assignment by user ID
            $data = $request->json()->all();

            // Extract assignment ID and user ID from the JSON input
            $assignmentID = $data['assignment_id']; // Assuming you have the assignment ID in the JSON data
            $userID = $data['user_id']; // Assuming you have the user ID in the JSON data

            // Retrieve submissions using Eloquent
            $submissions = Submission::where('assignment_id', $assignmentID)
                ->where('user_id', $userID)
                ->get();

            return response()->json($submissions);
        } catch (\Exception $e) {
            // Handle any errors
            return response()->json(['error' => "An error occurred: " . $e->getMessage()], 500);
        }
    }

    public function getLatestSubmissionsForAssignment(Request $request)
    {
    // Handle POST request to retrieve the latest submissions for a given assignment
    $data = $request->all();

    // Specify the desired assignment ID from the request data
    $assignmentID = $data['assignment_id'];

    // Use raw SQL query to retrieve data
    $submissions = DB::select("
        SELECT
            u.ID AS user_id,
            u.FirstName AS first_name,
            u.LastName AS last_name,
            e.class_id AS course_id,
            ae.ID AS assignment_id,
            ae.Title AS assignment_title,
            sag.ID AS submission_id,
            sag.submission_date,
            sag.Content AS submission_content,
            sag.AttachmentsLink AS submission_attachments,
            g.grade,
            g.comments,
            ae.TotalMarks AS assignment_total_marks
        FROM
            users u
            INNER JOIN enrollment e ON u.ID = e.user_id
            INNER JOIN `assignments_and_exams` ae ON e.class_id = ae.class_id
            LEFT JOIN (
                SELECT
                    user_id,
                    assignment_id,
                    MAX(submission_date) AS max_submission_date
                FROM
                    Submissions
                GROUP BY
                    user_id, assignment_id
            ) latest_submission ON u.ID = latest_submission.user_id AND ae.ID = latest_submission.assignment_id
            LEFT JOIN Submissions sag ON latest_submission.user_id = sag.user_id
                AND latest_submission.assignment_id = sag.assignment_id
                AND latest_submission.max_submission_date = sag.submission_date
            LEFT JOIN Grades g ON u.ID = g.user_id AND ae.ID = g.assignment_id
            WHERE
            e.class_id = (
                SELECT class_id FROM `assignments_and_exams` WHERE ID = :assignment_id
            )
            AND ae.ID = :assignment_id
    ", ['assignment_id' => $assignmentID]);

    if (!empty($submissions)) {
        // Output submissions as JSON
        return response()->json($submissions);
    } else {
        // No submissions found for the assignment, return an empty array
        return response()->json([]);
    }
}

    public function updateOrInsertGrade(Request $request)
    {
        try {
            // Handle POST request to update or insert grades for a specific user and assignment
            $data = $request->json()->all();

            // Get user ID and assignment ID from the JSON data
            $userID = $data['user_id']; // Replace 'user_id' with the actual JSON key
            $assignmentID = $data['assignment_id']; // Replace 'assignment_id' with the actual JSON key

            // Get the grade and comments from the JSON data
            $grade = $data['grade']; // Replace 'grade' with the actual JSON key
            $comments = $data['comments']; // Replace 'comments' with the actual JSON key

            // Check if a grade record already exists for the user and assignment using Eloquent
            $existingGrade = Grade::where('user_id', $userID)
                ->where('assignment_id', $assignmentID)
                ->first();

            if ($existingGrade) {
                // If a grade record exists, update it using Eloquent
                $existingGrade->update([
                    'grade' => $grade,
                    'comments' => $comments,
                ]);
            } else {
                // If no grade record exists, insert a new one using Eloquent
                Grade::create([
                    'user_id' => $userID,
                    'assignment_id' => $assignmentID,
                    'grade' => $grade,
                    'comments' => $comments,
                ]);
            }

            // Successfully updated or inserted the grade
            return response()->json(["message" => "Grade updated or inserted successfully"]);
        } catch (\Exception $e) {
            // Failed to update or insert the grade, handle the error
            return response()->json(['error' => "Failed to update or insert the grade: " . $e->getMessage()], 500);
        }
    }
}
