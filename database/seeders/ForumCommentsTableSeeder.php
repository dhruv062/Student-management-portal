<?php

namespace Database\Seeders;

// database/seeders/ForumCommentsTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\ForumComment;

class ForumCommentsTableSeeder extends Seeder
{
    public function run()
    {
        $comments = [
            ['forumid' => 1, 'comment' => 'This is a comment for forum 1 by user 1', 'userid' => 1, 'dateposted' => now()],
            ['forumid' => 1, 'comment' => 'Another comment for forum 1 by user 4', 'userid' => 4, 'dateposted' => now()],
            ['forumid' => 1, 'comment' => 'Yet another comment for forum 1 by user 6', 'userid' => 6, 'dateposted' => now()],
            ['forumid' => 2, 'comment' => 'Comment for forum 2 by user 1', 'userid' => 1, 'dateposted' => now()],
            ['forumid' => 2, 'comment' => 'Comment for forum 2 by user 4', 'userid' => 4, 'dateposted' => now()],
            ['forumid' => 2, 'comment' => 'Comment for forum 2 by user 6', 'userid' => 6, 'dateposted' => now()],
        ];

        foreach ($comments as $comment) {
            ForumComment::create($comment);
        }
    }
}
