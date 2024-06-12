<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function registerUser(Request $request)
    {
        // Handle POST request for user registration
        $data = $request->all();

        $firstName = $data['firstname'];
        $lastName = $data['lastname'];
        $email = $data['email'];
        $password = $data['password'];
        $dob = $data['dob'];
        $address = $data['address'];
        $phoneNumber = $data['phoneNumber'];
        $role = $data['role'];

        // Check if the email already exists in the database
        $emailExists = DB::table('users')->where('Email', $email)->exists();

        if ($emailExists) {
            // Email already exists in the database
            return response()->json(["error" => "Email already exists"], 400); // Bad Request
        }

        // Check if the phone number already exists in the database
        $phoneExists = DB::table('users')->where('PhoneNumber', $phoneNumber)->exists();

        if ($phoneExists) {
            // Phone number already exists in the database
            return response()->json(["error" => "Phone number already exists"], 400); // Bad Request
        }

        // Check if an email with the same details exists in TemporaryUsers
        $emailCount = DB::table('TemporaryUsers')->where('Email', $email)->count();

        if ($emailCount > 0) {
            // Email with the same details exists in TemporaryUsers
            return response()->json(["message" => "An email with the provided details already exists in our system. Please check your email for verification instructions."]);
        }

        // Generate a unique verification token
        $verificationToken = bin2hex(random_bytes(32)); // Generates a 64-character token

        // Set the token expiry (e.g., 24 hours from now)
        $tokenExpiry = now()->addDay();

        // Insert user details into the TemporaryUsers table
        try {
            DB::table('TemporaryUsers')->insert([
                'FirstName' => $firstName,
                'LastName' => $lastName,
                'Email' => $email,
                'Password' => $password,
                'Dob' => $dob,
                'Address' => $address,
                'PhoneNumber' => $phoneNumber,
                'Role' => $role,
                'VerificationToken' => $verificationToken,
                'TokenExpiry' => $tokenExpiry,
            ]);

            // User registration successful; send the verification email
            $to = $email;
            $subject = 'Email Verification';
            $message = 'Thank you for registering with our website. Please click the following link to verify your email: ' . 
                       'https://axp2333.uta.cloud/api/verify.php?token=' . $verificationToken;
            $headers = 'From: your@email.com';

            Mail::raw($message, function ($mail) use ($to, $subject, $headers) {
                $mail->to($to)->subject($subject)->from('your@email.com')->headers($headers);
            });

            return response()->json(["message" => "User registration successful. Check your email for verification."]);
        } catch (\Exception $e) {
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        if ($request->method() === "GET" && $request->has('token')) {
            $verificationToken = $request->input('token');

            // Check if the token exists in TemporaryUsers and is not expired
            $tokenCount = DB::table('TemporaryUsers')
                ->where('VerificationToken', $verificationToken)
                ->where('TokenExpiry', '>=', now())
                ->count();

            if ($tokenCount > 0) {
                // Token is valid; move user to the main USERS table and mark their email as verified
                $userDetails = DB::table('TemporaryUsers')
                    ->where('VerificationToken', $verificationToken)
                    ->first();

                // Insert user details into the main USERS table and mark email as verified
                try {
                    DB::table('USERS')->insert([
                        'FirstName' => $userDetails->FirstName,
                        'LastName' => $userDetails->LastName,
                        'Email' => $userDetails->Email,
                        'Password' => $userDetails->Password,
                        'Dob' => $userDetails->Dob,
                        'Address' => $userDetails->Address,
                        'PhoneNumber' => $userDetails->PhoneNumber,
                        'Role' => $userDetails->Role,
                    ]);

                    // Delete the user from TemporaryUsers after successful transfer
                    DB::table('TemporaryUsers')
                        ->where('VerificationToken', $verificationToken)
                        ->delete();

                    // Redirect to the sign-in page with a success message
                    return redirect('/login')->with('message', 'Verification successful. You can now sign in.');
                } catch (\Exception $e) {
                    return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
                }
            } else {
                // Redirect to the sign-in page with an error message
                return redirect('/login')->with('error', 'Email verification failed. The verification link is either expired or invalid.');
            }
        } else {
            return response()->json(["error" => "Invalid request."], 400);
        }
    }
}
