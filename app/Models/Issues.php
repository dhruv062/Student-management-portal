<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issues extends Model
{
    use HasFactory;

    protected $fillable = [
        'Time_Stamp', 'subject', 'Description', 'Status', 'Cleared_by_user_id', 'Cleared_by_Time_Stamp',
        'Reply_Message', 'Added_by', 'Assigned_for',
    ];

    // Define relationships or additional methods if needed
}

