<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submissions extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'assignment_id', 'submission_date', 'Content', 'AttachmentsLink'
    ];

    
}
