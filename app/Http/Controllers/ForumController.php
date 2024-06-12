<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ForumComment; // Assuming you have a ForumComment model
use App\Models\Forum;
use Illuminate\Support\Facades\DB;



class ForumController extends Controller
{
    public function addComment(Request $request)
    {
        if ($request->isMethod('post')) {
            $forumID = $request->input('forum_id');
            $comment = $request->input('comment');
            $userID = $request->input('id');

            try {
                ForumComment::create([
                    'forumid' => $forumID,
                    'comment' => $comment,
                    'userid' => $userID,
                    'dateposted' => now(),
                ]);

                // Return success response
                return response()->json(["success" => true, "message" => "Comment added successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Comment insertion failed"], 500);
            }
        }
    }
    public function createForum(Request $request)
    {
        if ($request->isMethod('post')) {
            $classID = $request->input('class_id');
            $forumTitle = $request->input('Title');
            $forumDescription = $request->input('Description');

            try {
                Forum::create([
                    'class_id' => $classID,
                    'Title' => $forumTitle,
                    'Description' => $forumDescription,
                    'CreatedAt' => now(),
                    'LastUpdated' => now(),
                ]);

                // Return success response
                return response()->json(["message" => "Forum created successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }
    }
    public function deleteForum(Request $request)
    {

            $data = $request->all();

            $forumID = $data['ID']; // Assuming the ID is sent in the request

            try {
                // Use raw SQL to delete the forum
                DB::delete('DELETE FROM `forum` WHERE ID = ?', [$forumID]);

                // Return success response
                return response()->json(["message" => "Forum deleted successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Failed to delete the forum".$e], 500);
            }

    }

    public function getForumComments(Request $request)
    {
        if ($request->isMethod('post')) {
            $forumID = $request->input('forum_id');

            try {
                $comments = ForumComment::where('forumid', $forumID)
                    ->join('users', 'forum_comments.userid', '=', 'users.ID')
                    ->select('forum_comments.*', 'users.FirstName as user_first_name', 'users.LastName as user_last_name')
                    ->get();

                // Output comments data as JSON
                return response()->json($comments);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }
    }
    public function getForumById(Request $request)
    {
        if ($request->isMethod('post')) {
            $forumID = $request->input('forum_id');

            try {
                $forum = Forum::find($forumID);

                if ($forum) {
                    // Output forum data as JSON
                    return response()->json($forum);
                } else {
                    // Forum not found, return an empty response or an error message
                    return response()->json(["message" => "Forum not found"]);
                }
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }
    }
    public function getUserForums(Request $request)
    {
        if ($request->isMethod('post')) {
            $userID = $request->input('id');

            try {
                $forums = Forum::select('forum.id as forum_id', 'forum.title as forum_title', 'forum.description as forum_description',
                    'classes.id as class_id', 'classes.course_id', 'classes.class_number', 'courses.name as course_name',
                    'classes.start_date as class_start_date', 'classes.end_date as class_end_date', 'classes.schedule as class_schedule',
                    'classes.syllabus as class_syllabus', 'users.FirstName as instructor_first_name', 'users.LastName as instructor_last_name')
                    ->join('classes', 'forum.class_id', '=', 'classes.id')
                    ->join('enrollment', 'classes.id', '=', 'enrollment.class_id')
                    ->join('courses', 'classes.course_id', '=', 'courses.id')
                    ->leftJoin('users', 'classes.instructor_id', '=', 'users.id')
                    ->where('enrollment.user_id', $userID)
                    ->get();

                return response()->json($forums);
            } catch (\Exception $e) {
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }
    }
    public function getClassForums(Request $request)
    {
        if ($request->isMethod('post')) {
            // Retrieve the class ID from the JSON data
            $classID = $request->input('class_id');

            try {
                // Query the database to get all forums of the class
                $forums = Forum::where('class_id', $classID)->get();

                // Return the forum data as JSON
                return response()->json($forums);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }
    }
    public function updateForum(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $forumID = $data['ID'];
            $newTitle = $data['Title'];
            $newDescription = $data['Description'];

            try {
                // Use raw SQL to update the forum
                DB::update('UPDATE `forum` SET Title = ?, Description = ?, LastUpdated = NOW() WHERE ID = ?', [$newTitle, $newDescription, $forumID]);

                // Return success response
                return response()->json(["message" => "Forum updated successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Failed to update the forum".$e], 500);
            }
        }
    }


}
