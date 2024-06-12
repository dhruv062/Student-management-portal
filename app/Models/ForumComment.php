<?php

// app/Models/ForumComment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForumComment extends Model
{
    use HasFactory;

    protected $table = 'forum_comments';

    protected $fillable = [
        'forumid', 'comment', 'userid', 'dateposted',
    ];

    // Define relationships or additional methods if needed
}
