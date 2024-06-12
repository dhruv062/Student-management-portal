<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactRequest; // Assuming you have a ContactRequest model

class ContactController extends Controller
{
    public function addContact(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->all();

            $contactRequest = new ContactRequest();
            $contactRequest->first_name = $data['firstName'];
            $contactRequest->last_name = $data['lastName'];
            $contactRequest->email = $data['email'];
            $contactRequest->description = $data['description'];

            try {
                $contactRequest->save();

                // Send email notification
                // Use Laravel Mail facade here

                return response()->json(["success" => true, "message" => "Contact request added successfully"]);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        }
    }
}
