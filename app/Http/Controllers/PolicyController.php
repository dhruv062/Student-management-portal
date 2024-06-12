<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Policies;

class PolicyController extends Controller
{
    public function addPolicies(Request $request)
    {
        // Retrieve policy data from the request
        $title = $request->input('Title');
        $createdByID = $request->input('id');
        $description = $request->input('Description');

        try {
            // Create a new Policies instance
            $policy = new Policies([
                'Title' => $title,
                'CreatedByID' => $createdByID,
                'Description' => $description,
                'Timestamp' => now(),
            ]);

            // Save the policy to the database
            $policy->save();

            // Return a success message
            return response()->json(["success" => true, "message" => "Policy added successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
    public function deletePolicies(Request $request)
    {
        // Retrieve policy ID from the request
        $policyID = $request->input('PoliciesID');

        try {
            // Find the policy by ID and delete it
            $policy = Policies::find($policyID);

            if ($policy) {
                $policy->delete();
                // Return a success message
                return response()->json(["success" => true, "message" => "Policies deleted successfully"]);
            } else {
                // Policies not found, return an error message
                return response()->json(["error" => "Policies not found"], 404);
            }
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
public function getAllPolicies()
{
    try {
        // Retrieve all policies
        $policies = Policies::all();

        // Return policies as JSON
        return response()->json($policies);
    } catch (\Exception $e) {
        // Handle database errors
        return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
    }
}

public function updatePolicies(Request $request)
{
    try {
        // Extract update data from the request
        $policyID = $request->input('PoliciesID');
        $newTitle = $request->input('NewTitle');
        $newDescription = $request->input('NewDescription');

        // Find the policy by ID
        $policy = Policies::find($policyID);

        // Check if the policy exists
        if ($policy) {
            // Update the policy
            $policy->update([
                'Title' => $newTitle,
                'Description' => $newDescription,
            ]);

            // Return success message
            return response()->json(["success" => true, "message" => "Policies updated successfully"]);
        } else {
            // Policies not found, return an error message
            return response()->json(["error" => "Policies not found"], 404);
        }
    } catch (\Exception $e) {
        // Handle database errors
        return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
    }
}


}
