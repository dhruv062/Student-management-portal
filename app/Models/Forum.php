<?php

// app/Models/Forum.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;

    protected $table = 'forum';

    protected $fillable = [
        'Title', 'Description', 'class_id', 'CreatedAt', 'LastUpdated',
    ];

    // Define relationships or additional methods if needed
}
