<?php

// app/Models/PasswordReset.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    protected $table = 'password_reset';

    protected $primaryKey = 'email'; // Assuming 'email' is the primary key

    public $incrementing = false; // To indicate that the primary key is not auto-incrementing

    protected $fillable = [
        'email', 'token', 'expiry_time',
    ];

    protected $dates = ['expiry_time'];

    // Define relationships or additional methods if needed
}

