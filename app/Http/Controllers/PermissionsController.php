<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permissions; // Adjust the model namespace based on your project structure

class PermissionsController extends Controller
{
    public function getPermissions(Request $request)
    {
        // Start a session to manage user authentication (if needed)
        // session_start();

        if ($request->isMethod('post')) {
            try {
                // Query the database to retrieve all permissions
                $permissions = Permissions::where('id', 1)->get();

                return response()->json($permissions);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        } else {
            // Invalid request method
            return response()->json(["error" => "Invalid request method"], 405);
        }
    }

    public function updatePermission(Request $request)
    {
        // Retrieve the permission name from the request data
        $permissionName = $request->input('name');

        try {
            // Update the permission with ID 1
            $permission = Permissions::find(1);
            $permission->name = $permissionName;
            $permission->save();

            return response()->json(["message" => "Permission updated successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
