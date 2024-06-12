<?php

// app/Http/Controllers/Analytics/AnalyticsController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class AnalyticsController extends Controller
{
    public function getClassCounts()
    {
        try {
            $sql = "SELECT
                        classes.ID AS class_id,
                        classes.course_id,
                        courses.Name AS course_name,
                        classes.class_number,
                        classes.START_DATE,
                        classes.END_DATE,
                        classes.instructor_id,
                        classes.Schedule,
                        COUNT(DISTINCT modules.ID) AS module_count,
                        COUNT(DISTINCT CASE WHEN ae.Type = 'assignment' THEN ae.Id END) AS assignment_count,
                        COUNT(DISTINCT CASE WHEN ae.Type = 'exam' THEN ae.Id END) AS exam_count,
                        COUNT(DISTINCT forum.ID) AS forum_count
                    FROM
                        classes
                    LEFT JOIN courses ON classes.course_id = courses.Id
                    LEFT JOIN modules ON classes.ID = modules.class_id
                    LEFT JOIN assignments_and_exams ae ON classes.ID = ae.class_id
                    LEFT JOIN forum ON classes.ID = forum.class_id
                    GROUP BY
                        classes.ID, classes.course_id, courses.Name, classes.class_number, classes.START_DATE, classes.END_DATE, classes.instructor_id, classes.Schedule";

            $classCounts = DB::select($sql);

            if (!empty($classCounts)) {
                return response()->json($classCounts);
            } else {
                return response()->json([]);
            }
        } catch (\Exception $e) {
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getCoordinatorProgress(Request $request)
    {
        try {
            // Retrieve the coordinator ID from the JSON input
            $data = $request->json()->all();
            $coordinatorId = $data['coordinator_id'];
            $stmt = DB::select(
          "SELECT
                        SUM(CASE WHEN i.Assigned_for = 'pc' THEN 1 ELSE 0 END) AS pc_total_issues,
                        SUM(CASE WHEN i.Cleared_by_user_id = ".$coordinatorId." AND i.Status = 'closed' THEN 1 ELSE 0 END) AS individual_solved_issues,
                        SUM(CASE WHEN i.Cleared_by_user_id <> ".$coordinatorId." AND i.Status = 'closed' AND i.Assigned_for = 'pc' THEN 1 ELSE 0 END) AS other_pc_solved_issues,
                        SUM(CASE WHEN i.Assigned_for = 'pc' AND i.Status <> 'closed' THEN 1 ELSE 0 END) AS not_closed_pc_issues
                    FROM
                        issues i"

           , ['coordinator_id' => $coordinatorId]);

            $issueCounts = $stmt ? $stmt[0] : [];

            return response()->json($issueCounts);
        } catch (\Exception $e) {
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getCourseProgress(Request $request)
    {
        try {
            // Retrieve the instructor ID from the JSON input
            $instructorId = $request->input('instructor_id');

            // Query the database to retrieve the counts of modules, assignments, exams, forums, and course name separately in classes taught by the specified instructor
            $classCounts = DB::select("
                SELECT
                classes.ID AS class_id,
                classes.course_id,
                courses.Name AS course_name,  -- Include course name
                classes.class_number,
                classes.START_DATE,
                classes.END_DATE,
                classes.instructor_id,
                classes.Schedule,
                COUNT(DISTINCT modules.ID) AS module_count,
                COUNT(DISTINCT CASE WHEN ae.Type = 'assignment' THEN ae.Id END) AS assignment_count,
                COUNT(DISTINCT CASE WHEN ae.Type = 'exam' THEN ae.Id END) AS exam_count,
                COUNT(DISTINCT forum.ID) AS forum_count
            FROM
                classes
            LEFT JOIN courses ON classes.course_id = courses.Id  -- Join with courses table to get course name
            LEFT JOIN modules ON classes.ID = modules.class_id
            LEFT JOIN assignments_and_exams ae ON classes.ID = ae.class_id
            LEFT JOIN forum ON classes.ID = forum.class_id
            WHERE
                classes.instructor_id = :instructor_id
            GROUP BY
                classes.ID, classes.course_id, courses.Name, classes.class_number, classes.START_DATE, classes.END_DATE, classes.instructor_id, classes.Schedule
            ", ['instructor_id' => $instructorId]);

            if (!empty($classCounts)) {
                // Output the class details along with counts and course name as JSON
                return response()->json($classCounts);
            } else {
                // No classes found for the instructor, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getNoofClasses()
    {
        try {
            // Query the database to retrieve course information along with class counts
            $courseClassCounts = DB::select("
                SELECT c.Name AS CourseName, COUNT(cl.ID) AS ClassesTaught
                FROM courses c
                LEFT JOIN classes cl ON c.ID = cl.course_id
                GROUP BY c.Name
            ");

            if (!empty($courseClassCounts)) {
                // Output course class counts as JSON
                return response()->json($courseClassCounts);
            } else {
                // No course class counts found, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getUserCountsByRole(Request $request)
    {
        try {
            // Query the database to retrieve user counts by role
            $userCounts = DB::select("SELECT Role, COUNT(*) AS user_count FROM users GROUP BY Role");

            if (!empty($userCounts)) {
                // Output user counts by role as JSON
                return response()->json($userCounts);
            } else {
                // No user counts found, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    

    public function getqaoProgress(Request $request)
    {
        try {
            // Retrieve the user ID from the JSON input
            $data = $request->json()->all();
            $userId = $data['user_id'];

            // Query the database to retrieve the counts of policies and reports
            $userCounts = DB::select("
                SELECT
                    u.ID AS User_ID,
                    (SELECT COUNT(*) FROM policies WHERE CreatedByID = u.ID) AS User_Policies,
                    (SELECT COUNT(*) FROM reports WHERE User_ID = u.ID) AS User_Reports,
                    (SELECT COUNT(*) FROM policies) AS Total_Policies,
                    (SELECT COUNT(*) FROM reports) AS Total_Reports
                FROM
                    users u
                WHERE
                    u.ID = :user_id
            ", ['user_id' => $userId]);

            if (!empty($userCounts)) {
                // Output the counts as JSON
                return response()->json($userCounts[0]);
            } else {
                // No data found, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    
    public function getStudentStats(Request $request)
    {
        try {
            // Retrieve the student ID from the JSON input
            $data = $request->json()->all();
            $studentId = $data['student_id'];

            // Query the database to retrieve student's assignments (graded and ungraded) along with course names for the courses the student is enrolled in
            $studentAssignments = DB::select("
                SELECT
                    ae.Title AS assignment_or_exam_name,
                    ae.Type AS assignment_or_exam_type,
                    ae.TotalMarks AS assignment_or_exam_total_marks,
                    COALESCE(g.grade, 0) AS assignment_or_exam_grade,  -- Replace NULL with 0
                    courses.Name AS course_name
                FROM
                    assignments_and_exams ae
                LEFT JOIN classes c ON ae.class_id = c.ID
                LEFT JOIN courses ON c.course_id = courses.Id
                LEFT JOIN grades g ON ae.Id = g.assignment_id AND g.user_id = ?
                LEFT JOIN enrollment e ON c.ID = e.class_id
                WHERE
                    e.user_id = ?
            ", [$studentId, $studentId]);

            if (!empty($studentAssignments)) {
                // Output the assignment/exam names, course names, total marks, and grades (with NULL replaced by 0) for the student in the courses they are enrolled in as JSON
                return response()->json($studentAssignments);
            } else {
                // No data found for the student, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getTotalAssignmentsExams(Request $request)
    {
        try {
            // Query the database to calculate the total number of assignments and exams for all classes
            $result = DB::select("
                SELECT
                    COUNT(CASE WHEN ae.Type = 'assignment' THEN 1 ELSE NULL END) AS assignments,
                    COUNT(CASE WHEN ae.Type = 'exam' THEN 1 ELSE NULL END) AS exams
                FROM `assignments_and_exams` ae
            ");

            if (!empty($result)) {
                // Output total assignments and exams data as JSON
                return response()->json($result[0]);
            } else {
                // No data found, return an empty response
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

}
