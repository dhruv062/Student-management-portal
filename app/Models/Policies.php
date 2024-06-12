<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policies extends Model
{
    use HasFactory;

    protected $primaryKey = 'PolicyID'; // Specify the custom primary key
    protected $fillable = [
        'Title', 'CreatedByID', 'Description', 'Timestamp',
    ];

    // Define relationships or additional methods if needed
}
