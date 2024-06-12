<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentsAndExams extends Model
{
    use HasFactory;

    protected $table = 'assignments_and_exams';

    protected $fillable = [
        'class_id', 'Title', 'DueDate', 'AvailableDate', 'Published', 'Content', 'Attachments', 'TotalMarks', 'Type'
    ];

}
