<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        // Query the database to retrieve all users
        $users = DB::table('users')->select('ID as user_id', 'FirstName', 'LastName', 'Email', 'Dob as Date', 'Address', 'Password', 'PhoneNumber', 'Role')->get();

        // Return user data as JSON
        return response()->json( $users->toArray());
    }
    // app/Http/Controllers/UserController.php


    public function insertUser(Request $request)
    {
        // Handle POST request to insert a new user
        $data = $request->all();

        // Extract user data from the request
        $firstName = $data['FirstName'];
        $lastName = $data['LastName'];
        $email = $data['Email'];
        $password = $data['Password'];
        $dob = $data['Date'];
        $address = $data['Address'];
        $phoneNumber = $data['PhoneNumber'];
        $role = $data['Role'];

        try {
            // Insert the user into the database
            $user = new User([
                'FirstName' => $firstName,
                'LastName' => $lastName,
                'Email' => $email,
                'Password' => $password,
                'Dob' => $dob,
                'Address' => $address,
                'PhoneNumber' => $phoneNumber,
                'Role' => $role,
            ]);

            $user->save();

            // Successful user insertion, return success message
            return response()->json(["success" => true, "message" => "User inserted successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getUsersByRole(Request $request)
    {
        // Handle POST request to retrieve users by role
        $data = $request->all();

        // Retrieve the role from the request
        $role = $data['role']; // Assuming you have the role in the request

        try {
            // Query the database to retrieve users with the specified role
            $users = User::where('Role', $role)->get();

            if ($users->isNotEmpty()) {
                // Output user data as JSON
                return response()->json($users);
            } else {
                // No users found for the specified role, return an empty array
                return response()->json([]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function getUserById(Request $request)
    {
        // Handle POST request to retrieve a user by ID
        $data = $request->all();

        // Retrieve the user ID from the request
        $userId = $data['user_id']; // Assuming you have the user ID in the request

        try {
            // Query the database to retrieve the user with the specified ID
            $user = User::find($userId);

            if ($user) {
                // Output user data as JSON
                return response()->json($user);
            } else {
                // User not found, return an empty response or an error message
                return response()->json(["message" => "User not found"]);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function updateUser(Request $request)
    {

            $data = $request->all();

            // Retrieve user input (e.g., user ID, updated profile data)
            $userID = $data['user_id']; // Assuming you have a user ID stored in the session
            $updatedUserData = $data; // Replace with the updated user data received in the request

            // Find the user by ID
            $user = User::find($userID);

            if (!$user) {
                return response()->json(["error" => "User not found"], 404);
            }

            // Update user profile
            try {
                $user->update([
                    'FirstName' => $updatedUserData['FirstName'],
                    'LastName' => $updatedUserData['LastName'],
                    'Email' => $updatedUserData['Email'],
                    'Dob' => $updatedUserData['Date'],
                    'Address' => $updatedUserData['Address'],
                    'PhoneNumber' => $updatedUserData['PhoneNumber'],
                    'Role' => $updatedUserData['Role'],
                ]);

                // Return success response
                return response()->json(["message" => "User profile updated successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "User profile update failed"], 500);
            }

    }

    public function deleteUser(Request $request)
    {

            $data = $request->all();

            // Extract user ID from the request data
            $userId = $data['user_id'];

            // Find the user by ID
            $user = User::find($userId);

            if (!$user) {
                return response()->json(["error" => "User not found"], 404);
            }

            // Delete the user
            try {
                $user->delete();

                // Return success response
                return response()->json(["message" => "User deleted successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "User deletion failed"], 500);
            }

    }
}

