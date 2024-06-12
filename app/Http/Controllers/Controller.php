<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function readAndParseJSONData(\Illuminate\Http\Request $request)
    {
        // Implement your logic to read and parse JSON data from the request
        // For example, using $request->json()->all()

        return $request->json()->all();
    }
    
}
