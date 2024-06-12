<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grades extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'assignment_id', 'grade', 'comments',
    ];

    // Define relationships or additional methods if needed
}
