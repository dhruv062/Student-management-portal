<?php

namespace App\Http\Controllers;

use App\Models\User; // Adjust the namespace and model class based on your Laravel project structure
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function getUserProfile(Request $request)
    {
        try {
            // Retrieve user input (e.g., user ID)
            $id = $request->input('id');

            // Find the user by ID
            $user = User::find($id);

            if ($user) {
                // Output user data as JSON
                return response()->json($user);
            } else {
                // User not found, return an error message
                return response()->json(['error' => "User with ID $id not found."], 400);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(['error' => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function updateUserProfile(Request $request)
    {
        try {
            // Retrieve user input (e.g., user ID, updated profile data)
            $id = $request->input('ID');
            $updatedProfileData = $request->all(); // Replace with the updated profile data received in the request

            // Find the user by ID
            $user = User::find($id);

            if (!$user) {
                // User not found, return an error message
                return response()->json(['error' => "User with ID $id not found."], 400);
            }

            // Update user profile data
            $user->update($updatedProfileData);

            // Successful update, return success message
            return response()->json(["success" => true, "message" => "Profile updated successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(['error' => "Database error: " . $e->getMessage()], 500);
        }
    }

}
