<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    protected $table = 'classes';
    protected $fillable = [
        'CourseID', 'StartDate', 'EndDate', 'StartTime', 'EndTime', 'Location', 'InstructorID', 'Capacity', 'Price', 'Status'
    ];

}
