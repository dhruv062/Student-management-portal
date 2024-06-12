<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Classes; 

class SyllabusController extends Controller
{
    public function getSyllabusByClassId(Request $request)
    {
        // Handle POST request to fetch syllabus by class ID
        $data = $request->json()->all();

        // Check if the request contains the "class_id" parameter
        if (isset($data["class_id"])) {
            $classID = $data["class_id"];

            try {
                // Query the database to get syllabus by class ID using Eloquent
                $class = Classes::where('ID', $classID)->first();

                if ($class) {
                    $syllabus = $class->syllabus;
                    // Return the syllabus as JSON response
                    return response()->json(["syllabus" => $syllabus]);
                } else {
                    // Class not found
                    return response()->json(["error" => "Class not found"], 404);
                }
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        } else {
            // If the "class_id" is not provided in the request, return an error response
            return response()->json(["error" => "Missing 'class_id' in the request"], 400);
        }
    }

    public function updateSyllabus(Request $request)
    {
        // Handle POST request to update syllabus for a specific class
        $data = $request->json()->all();

        // Check if the required data is provided in the request
        if (isset($data["class_id"]) && isset($data["syllabus"])) {
            $classID = $data["class_id"];
            $newSyllabus = $data["syllabus"];

            try {
                // Update the syllabus in the database using Eloquent
                $class = Classes::find($classID);

                if ($class) {
                    $class->syllabus = $newSyllabus;
                    $class->save();
                    // Return a success message as JSON response
                    return response()->json(["message" => "Syllabus updated successfully"]);
                } else {
                    // Class not found
                    return response()->json(["error" => "Class not found"], 404);
                }
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        } else {
            // If the required data is not provided in the request, return an error response
            return response()->json(["error" => "Missing 'class_id' or 'syllabus' in the request"], 400);
        }
    }

}
