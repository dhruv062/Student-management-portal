<?php

// app/Models/StudentFeedback.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentFeedback extends Model
{
    use HasFactory;

    protected $table = 'student_feedback';

    protected $fillable = [
        'class_id', 'student_id', 'all_questions',
    ];

    protected $casts = [
        'all_questions' => 'json', // Assuming the 'all_questions' field contains JSON data
    ];

    // Define relationships or additional methods if needed
}
