<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $primaryKey = 'ID';
    protected $fillable = [
        'FirstName', 'LastName', 'Email', 'Password', 'Dob', 'Address', 'PhoneNumber', 'Role',
    ];

    // Other model properties and methods...
}
