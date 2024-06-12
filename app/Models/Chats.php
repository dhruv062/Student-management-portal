<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chats extends Model
{
    use HasFactory;

    protected $primaryKey = 'ChatID'; // Specify the custom primary key
    protected $fillable = [
        'SenderID', 'ReceiverID', 'Message', 'TimeStamp', 'Viewed',
    ];

    // Define relationships or additional methods if needed
}

