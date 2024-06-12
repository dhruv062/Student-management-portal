<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AssignmentsController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\ForumController;  
use App\Http\Controllers\IssueController; 
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\SyllabusController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\ThemesController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ChatsController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\SignUpController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('/users')->group(function () {
    Route::get('/get_all_users', [UserController::class, 'index']);
    Route::post('/add_user', [UserController::class, 'insertUser']);
    Route::post('/get_users_by_role', [UserController::class, 'getUsersByRole']);
    Route::post('/get_user_by_id', [UserController::class, 'getUserById']);
    Route::post('/update_user', [UserController::class, 'updateUser']);
    Route::post('/delete_user', [UserController::class, 'deleteUser']);


});
Route::post('/get_all_users', [UserController::class, 'index']);


Route::post('/analytics/get_all_course_progress', [AnalyticsController::class, 'getClassCounts']);
Route::post('/analytics/get_coordinator_progress', [AnalyticsController::class, 'getCoordinatorProgress']);
Route::post('/analytics/get_course_progress_of_instructor', [AnalyticsController::class, 'getCourseProgress']);
Route::get('/analytics/get_no_of_classes', [AnalyticsController::class, 'getNoOfClasses']);
Route::get('/analytics/get_no_of_users', [AnalyticsController::class, 'getUserCountsByRole']);
Route::post('/analytics/get_qao_progress', [AnalyticsController::class, 'getqaoProgress']);
Route::post('/analytics/get_student_stats', [AnalyticsController::class, 'getStudentStats']);
Route::post('/analytics/get_total_no_of_assignments_and_exams', [AnalyticsController::class, 'getTotalAssignmentsExams']);

Route::post('/assignments/add_assignment', [AssignmentsController::class, 'addAssignment']);
Route::post('/assignments/delete_assignment', [AssignmentsController::class, 'deleteAssignment']);
Route::post('/assignments/update_assignment', [AssignmentsController::class, 'updateAssignment']);
Route::post('/assignments/get_assignment_by_id', [AssignmentsController::class, 'getAssignmentById']);
Route::post('/assignments/get_assignments_by_class', [AssignmentsController::class, 'getAssignmentsByClass']);
Route::post('/assignments/get_assignments_by_student', [AssignmentsController::class, 'getAssignmentsForStudent']);
Route::post('/assignments/get_published_assignments_by_class', [AssignmentsController::class, 'getPublishedAssignmentsForClass']);

Route::prefix('/classes')->group(function () {
    Route::post('/add_class_by_instructor', [ClassesController::class , 'addClass']);
    Route::post('/delete_class', [ClassesController::class , 'deleteClass']);
    Route::get('/get_all_classes', [ClassesController::class , 'getAllClasses']);
    Route::post('/get_class_info', [ClassesController::class , 'getClassInfo']);
    Route::post('/get_instructor_classes', [ClassesController::class , 'getClassesByInstructor']);
    Route::post('/get_student_grades_in_class', [ClassesController::class , 'getStudentGrades']);
    Route::post('/get_students_in_class', [ClassesController::class , 'getClassStudents']);
    Route::post('/get_user_enrolled_classes', [ClassesController::class , 'getUserEnrolledClasses']);
    Route::post('/total_classes_enrolled_by_id', [ClassesController::class , 'getUserEnrollmentCount']);
    Route::post('/update_class_by_instructor', [ClassesController::class , 'updateClass']);
});



Route::prefix('/courses')->group(function () {
    Route::post('/add_course', [CourseController::class, 'addCourse']);
    Route::post('/delete_course', [CourseController::class, 'deleteCourse']);
    Route::post('/get_all_courses', [CourseController::class, 'getAllCourses']);
    Route::post('/get_instructor_courses', [CourseController::class, 'getClassesByInstructor']);
    Route::post('/update_course', [CourseController::class, 'updateCourse']);
});



Route::post('/contact/add_contact_request', [ContactController::class, 'addContact']);

Route::prefix('/enrollments')->group(function () {
    Route::post('/drop', [EnrollmentController::class , 'dropFromClass']);
    Route::post('/enroll', [EnrollmentController::class , 'enrollInClass']);
    Route::post('/get_enrollments_by_student', [EnrollmentController::class , 'getEnrolledClasses']);

});

Route::prefix('/feedback')->group(function () {
    Route::post('/add_feedback', [FeedbackController::class , 'addFeedback']);
    Route::post('/feed_back_already_exists', [FeedbackController::class , 'checkFeedbackExistence']);
    Route::post('/get_class_feedback', [FeedbackController::class , 'getInstructorFeedback']);
});

Route::prefix('/forums')->group(function () {
    Route::post('/add_forum_comment', [ForumController::class , 'addComment']);
    Route::post('/add_forum', [ForumController::class , 'createForum']);
    Route::post('/delete_forum', [ForumController::class , 'deleteForum']);
    Route::post('/get_all_forum_comments', [ForumController::class , 'getForumComments']);
    Route::post('/get_forum_by_id', [ForumController::class , 'getForumById']);
    Route::post('/get_forums_of_all_classes', [ForumController::class , 'getUserForums']);
    Route::post('/get_forums_of_class', [ForumController::class , 'getClassForums']);
    Route::post('/update_forum', [ForumController::class , 'updateForum']);
});

Route::prefix('/issues')->group(function () {
    Route::post('/add_issue_by_user', [IssueController::class , 'addIssue']);
    Route::post('/get_all_issues', [IssueController::class , 'getAllIssues']);
    Route::post('/get_issue_by_id', [IssueController::class , 'getIssueById']);
    Route::post('/get_issues_by_user', [IssueController::class , 'getIssuesByUser']);
    Route::post('/update_issue_by_id', [IssueController::class , 'updateIssue']);
});

Route::prefix('/modules')->group(function () {
    Route::post('/add_module', [ModuleController::class , 'addIssuaddModule']);
    Route::post('/delete_module', [ModuleController::class , 'deleteModule']);
    Route::post('/get_modules_by_class', [ModuleController::class , 'getModulesByClass']);
    Route::post('/get_published_modules_by_class', [ModuleController::class , 'getPublishedModulesByClass']);
    Route::post('/update_module', [ModuleController::class , 'updateModule']);
});

Route::prefix('/policies')->group(function () {
    Route::post('/add_policy', [PolicyController::class , 'addPolicy']);
    Route::post('/delete_policy', [PolicyController::class , 'deletePolicy']);
    Route::post('/get_all_policies', [PolicyController::class , 'getAllPolicies']);
    Route::post('/update_policy', [PolicyController::class , 'updatePolicy']);

});

Route::prefix('/profile')->group(function () {
    Route::post('/get_profile', [ProfileController::class , 'getUserProfile']);
    Route::post('/update_profile', [ProfileController::class , 'updateUserProfile']);

});

Route::prefix('/reports')->group(function () {
    Route::post('/add_report', [ReportController::class , 'addReport']);
    Route::post('/delete_report', [ReportController::class , 'deleteReport']);
    Route::post('/get_all_reports', [ReportController::class , 'getReports']);
    Route::post('/update_report', [ReportController::class , 'updateReport']);


});

Route::prefix('/submissions')->group(function () {
    Route::post('/add_submission', [SubmissionController::class , 'addSubmission']);
    Route::post('/get_all_grades_for_id', [SubmissionController::class , 'getGrades']);
    Route::post('/get_all_published_grades_for_id', [SubmissionController::class , 'getPublishedGrades']);
    Route::post('/get_submission_for_assignment_by_user', [SubmissionController::class , 'getSubmissionsForAssignmentByuser']);
    Route::post('/get_submissions_for_assignment', [SubmissionController::class , 'getLatestSubmissionsForAssignment']);
    Route::post('/update_grade', [SubmissionController::class , 'updateOrInsertGrade']);


});

Route::prefix('/syllabus')->group(function () {
    Route::post('/get_syllabus_by_id', [SyllabusController::class , 'getSyllabusByClassId']);
    Route::post('/update_syllabus', [SyllabusController::class , 'updateSyllabus']);
   

});

Route::prefix('/themeandpermissions')->group(function () {
    Route::post('/get_permissions', [PermissionsController::class , 'getPermissions']);
    Route::post('/update_permissions', [PermissionsController::class , 'updatePermission']);
    Route::post('/get_theme', [ThemesController::class , 'getThemes']);
    Route::post('/update_theme', [ThemesController::class , 'updateTheme']);

   

});

Route::prefix('/chats')->group(function () {
    Route::post('/get_all_chats_by_id', [ChatsController::class , 'getChatsByID']);
    Route::post('/get_unviewed_messages', [ChatsController::class, 'getLastUnviewedMessages']);
    Route::post('/mark_as_viewed', [ChatsController::class, 'markMessagesAsViewed']);
    Route::post('/send_message', [ChatsController::class, 'sendChatMessage']);

});

Route::post('/login', [LoginController::class , 'login']);
Route::post('/update_password', [LoginController::class , 'updatePassword']);
Route::post('/signup', [signUpController::class , 'registerUser']);
Route::post('/verify', [signUpController::class , 'verifyEmail']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

