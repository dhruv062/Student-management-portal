<?php

// app/Models/Theme.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Themes extends Model
{
    use HasFactory;

    protected $table = 'themes';

    protected $fillable = [
        'name',
    ];

    // Define relationships or additional methods if needed
}
