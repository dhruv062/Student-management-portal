<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Modules;

class ModuleController extends Controller
{
    public function addModule(Request $request)
    {
        // Retrieve user input for adding a module
        $classID = $request->input('class_id');
        $moduleName = $request->input('Name');
        $dateAdded = now(); // Use Laravel's helper function for the current timestamp
        $content = $request->input('content');
        $attachments = $request->input('Attachments'); // Assuming you have attachments in the request

        // Check if the "publish_module" checkbox is checked
        $isPublished = $request->input('publish_date') === 'true';

        // Set the date_published based on the checkbox state
        $datePublished = $isPublished ? now() : null;

        // Insert the module into the database
        $affectedRows = DB::table('modules')->insert([
            'class_id' => $classID,
            'Name' => $moduleName,
            'date_added' => $dateAdded,
            'date_published' => $datePublished,
            'Attachments' => $attachments,
            'content' => $content,
        ]);

        try {
            // Check if any rows were affected
            if ($affectedRows > 0) {
                // Module added successfully
                return response()->json(["message" => "Module added successfully"]);
            } else {
                // No rows were inserted
                return response()->json(["message" => "No changes made to the module"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function deleteModule(Request $request)
    {
        // Retrieve the module ID from the JSON data
        $moduleID = $request->input('Id'); // Assuming you have module ID in the JSON data

        // Query the database to delete the module
        try {
            $deletedRows = DB::table('modules')->where('ID', $moduleID)->delete();

            // Check if any rows were affected
            if ($deletedRows > 0) {
                // Module deleted successfully
                return response()->json(["message" => "Module deleted successfully"]);
            } else {
                // No rows were deleted
                return response()->json(["message" => "No module found with the given ID"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function getmodulesByClass(Request $request)
    {
        // Retrieve class ID from the JSON input
        $classID = $request->input('class_id'); // Assuming you have the class ID in the JSON data

        // Query the database to retrieve all modules of the specified class
        try {
            $modules = DB::table('modules')->where('class_id', $classID)->get();

            if (!$modules->isEmpty()) {
                // Output modules data as JSON
                return response()->json($modules);
            } else {
                // No modules found for the class, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function getPublishedModulesByClass(Request $request)
    {
        // Retrieve class ID from the JSON input
        $classID = $request->input('class_id'); // Assuming you have the class ID in the JSON data

        try {
            // Query the database to retrieve all modules of the specified class with a non-null date_published
            $modules = Modules::where('class_id', $classID)->whereNotNull('date_published')->get();

            if (!$modules->isEmpty()) {
                // Output modules data as JSON
                return response()->json($modules);
            } else {
                // No modules found for the class, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function updateModule(Request $request)
    {
        // Retrieve user input for updating a module
        $moduleID = $request->input('Id'); // Assuming you have module ID in the JSON data
        $moduleName = $request->input('Name'); // Assuming you have module name in the JSON data
        $content = $request->input('content'); // Assuming you have module content in the JSON data
        $attachments = $request->input('Attachments'); // Assuming you have attachments in the JSON data

        // Check if the "publish_date" radio option is selected
        $isPublishing = $request->input('publish_date') === 'true';
        $datePublished = $isPublishing ? now() : null;

        try {
            // Update the module using Eloquent
            $module = Modules::find($moduleID);
            if ($module) {
                $module->Name = $moduleName;
                $module->content = $content;
                $module->date_published = $datePublished;
                $module->Attachments = $attachments; // You may need to adjust this data type based on how attachments are stored
                $module->save();

                // Return a success message
                return response()->json(["message" => "Module updated successfully"]);
            } else {
                // Module not found, return an error response
                return response()->json(["error" => "Module not found"], 404);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
