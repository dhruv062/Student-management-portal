<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Themes; // Adjust the model namespace based on your project structure

class ThemesController extends Controller
{
    public function getThemes(Request $request)
    {
        // Start a session to manage user authentication (if needed)
        // session_start();

        if ($request->isMethod('post')) {
            try {
                // Query the database to retrieve all themes
                $themes = Themes::where('id', 1)->get();

                return response()->json($themes);
            } catch (\Exception $e) {
                // Handle database errors
                return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
            }
        } else {
            // Invalid request method
            return response()->json(["error" => "Invalid request method"], 405);
        }
    }
    public function updateTheme(Request $request)
    {
        // Retrieve the theme name from the request data
        $themeName = $request->input('name');

        try {
            // Update the theme with ID 1
            $theme = Themes::find(1);
            $theme->name = $themeName;
            $theme->save();

            return response()->json(["message" => "Theme updated successfully"]);
        } catch (\Exception $e) {
            // Handle database errors
            return response()->json(["error" => "Database error: " . $e->getMessage()], 500);
        }
    }
}
