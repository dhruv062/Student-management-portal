<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        // Query the database to check if the user exists
        $user = DB::table('users')->where('Email', $email)->where('Password',$password )->first();

        if ($user) {
            // If the user exists, return user details
            return response()->json([
                "success" => true,
                "message" => $user->FirstName,
                "role" => $user->Role,
                "id" => $user->ID,
            ]);
        } else {
            // Authentication failed, display an error message
            return response()->json([
                "success" => false,
                "error" => "Invalid email or password. Please try again.",
            ], 400);
        }
    }

    public function updatePassword(Request $request)
    {
        if ($request->method() === "POST") {
            $data = $request->all();
            $token = $data['token'];
            $newPassword = $data['password'];

            // Check if the token is valid and not expired
            $now = now();

            // Verify the token and get the associated email
            $verification = DB::table('password_reset')
                ->where('token', $token)
                ->where('expiry_time', '>', $now)
                ->first();

            if ($verification) {
                // The token is valid
                $email = $verification->email;

                // Hash the new password (make sure to use appropriate hashing, e.g., bcrypt)
                $hashedPassword = bcrypt($newPassword);

                // Update the user's password in the database
                try {
                    DB::table('users')
                        ->where('Email', $email)
                        ->update(['Password' => $hashedPassword]);

                    // Remove the token from the password_reset table
                    DB::table('password_reset')
                        ->where('token', $token)
                        ->delete();

                    return response()->json(["message" => "Password updated successfully."]);
                } catch (\Exception $e) {
                    return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
                }
            } else {
                return response()->json(["error" => "Invalid or expired token."]);
            }
        } else {
            return response()->json(["error" => "Invalid request."], 400);
        }
    }
}
