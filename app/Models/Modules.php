<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    use HasFactory;
    
    protected $primaryKey = 'Id';

    protected $fillable = [
        'class_id', 'Name', 'date_added', 'date_published', 'Attachments', 'content',
    ];

    // Define relationships or additional methods if needed
}
