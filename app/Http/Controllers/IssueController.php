<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Issues;


class IssueController extends Controller
{
    public function addIssue(Request $request)
    {
        // Retrieve input data from the request
        $subject = $request->input('Subject');
        $description = $request->input('Description');
        $addedBy = $request->input('id');
        $assignedFor = $request->input('Assigned_for');

        // Set the "Status" to "Open" and calculate the "Time_Stamp" at the current time
        $status = "Open";
        $timeStamp = now(); // Current timestamp

        try {
            // Create a new issue using Eloquent
            $issue = new Issues;
            $issue->Time_Stamp = $timeStamp;
            $issue->subject = $subject;
            $issue->Description = $description;
            $issue->Status = $status;
            $issue->Cleared_by_user_id = null;
            $issue->Cleared_by_Time_Stamp = null;
            $issue->Reply_Message = null;
            $issue->Added_by = $addedBy;
            $issue->Assigned_for = $assignedFor;
            $issue->save();

            // Return a success message
            return response()->json(["message" => "Issue added successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function getAllIssues(Request $request)
    {
        // Retrieve assigned_for value from the request
        $assignedFor = $request->input('assigned_for');

        // Query the database to retrieve issues assigned to the specified value
        $issues = DB::select("SELECT *,id as Id FROM issues WHERE Assigned_for = :assigned_for", ['assigned_for' => $assignedFor]);

        try {
            if (!empty($issues)) {
                // Output issues data as JSON
                return response()->json($issues);
            } else {
                // No issues found, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function getIssueById(Request $request)
    {
        // Retrieve issue ID from the request
        $issueID = $request->input('issue_id');

        // Query the database to retrieve the issue by its ID
        $issue = DB::select("SELECT * FROM issues WHERE ID = :issue_id", ['issue_id' => $issueID]);

        try {
            if (!empty($issue)) {
                // Output the issue data as JSON
                return response()->json($issue[0]);
            } else {
                // Issue not found, return an error response
                return response()->json(["error" => "Issue not found"], 404);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function getIssuesByUser(Request $request)
    {
        // Retrieve user ID from the request
        $userID = $request->input('id');

        // Query the database to retrieve all issues added by the specified user
        $issues = DB::select("SELECT *,id as Id FROM issues WHERE Added_by = :user_id", ['user_id' => $userID]);

        try {
            if (!empty($issues)) {
                // Output issues data as JSON
                return response()->json($issues);
            } else {
                // No issues found for the user, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function updateIssue(Request $request)
    {
        // Retrieve the issue ID and other update fields from the request
        $issueId = $request->input('issue_id');
        $newStatus = "closed"; // Always set the status to "Open"
        $replyMessage = $request->input('reply_message');

        // Update the issue in the database
        $affectedRows = DB::update("UPDATE issues
            SET Status = :status,
                Reply_Message = :reply_message
            WHERE Id = :issue_id", [
            'status' => $newStatus,
            'reply_message' => $replyMessage,
            'issue_id' => $issueId,
        ]);

        try {
            // Check if any rows were affected
            if ($affectedRows > 0) {
                // Issue updated successfully
                return response()->json(["message" => "Issue updated successfully"]);
            } else {
                // No rows were updated (issue not found or no changes made)
                return response()->json(["message" => "No changes made to the issue"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
