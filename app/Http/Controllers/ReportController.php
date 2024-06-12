<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function insertReport(Request $request)
    {
        try {
            // Extract report data from the request
            $user_id = $request->input('id');
            $title = $request->input('Title');
            $report_data = $request->input('ReportData');
            $generation_date = now(); // Laravel helper function to get the current timestamp

            // Create a new report instance
            $report = new Reports([
                'User_ID' => $user_id,
                'Title' => $title,
                'ReportData' => $report_data,
                'GenerationDate' => $generation_date,
            ]);

            // Save the new report to the database
            $report->save();

            // Successful report insertion, return success message
            return response()->json(["success" => true, "message" => "Report inserted successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(['error' => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function deleteReport(Request $request)
    {
        try {
            // Extract the report ID from the request
            $reportId = $request->input('Report_ID');

            // Find the report by ID
            $report = Reports::find($reportId);

            if (!$report) {
                // Report not found, return an error response
                return response()->json(["error" => "Report not found"], 404);
            }

            // Delete the report
            $report->delete();

            // Successful report deletion, return success message
            return response()->json(["success" => true, "message" => "Report deleted successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(['error' => "Database error: " . $e->getMessage()], 500);
        }
    }

     public function getReports()
    {
        try {
            // Fetch all reports as an array
            $reports = Reports::all()->toArray();

            // Return the reports as JSON
            return response()->json($reports);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(['error' => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function updateReport(Request $request)
    {
        try {
            // Extract update data from the JSON input
            $reportId = $request->input('Report_ID'); // Assuming you have a Report_ID to identify reports
            $newTitle = $request->input('Title');
            $newReportData = $request->input('ReportData');

            // Find the report by ID
            $report = Reports::find($reportId);

            if (!$report) {
                // Report not found, return an error response
                return response()->json(["error" => "Report not found"], 404);
            }

            // Update the report
            $report->update([
                'Title' => $newTitle,
                'ReportData' => $newReportData,
            ]);

            // Successful report update, return success message
            return response()->json(["success" => true, "message" => "Report updated successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(['error' => "Database error: " . $e->getMessage()], 500);
        }
    }

}
