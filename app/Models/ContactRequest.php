<?php

// app/Models/ContactRequest.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name', 'last_name', 'email', 'description', 'date_requested', 'reply', 'replied_date',
    ];

    // Define relationships or additional methods if needed
}
