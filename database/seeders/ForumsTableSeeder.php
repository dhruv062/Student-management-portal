<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Forum;

class ForumsTableSeeder extends Seeder
{
    public function run()
    {
        $forums = [
            ['Title' => 'Forum 1', 'Description' => 'Discussion about Topic A', 'class_id' => 1],
            ['Title' => 'Forum 2', 'Description' => 'Discussion about Topic B', 'class_id' => 2],
            ['Title' => 'Forum 3', 'Description' => 'Discussion about Topic C', 'class_id' => 3],
            ['Title' => 'Forum 4', 'Description' => 'Discussion about Topic D', 'class_id' => 4],
            ['Title' => 'Forum 5', 'Description' => 'Discussion about Topic E', 'class_id' => 5],
            ['Title' => 'Forum 6', 'Description' => 'Discussion about Topic F', 'class_id' => 6],
            ['Title' => 'Forum 7', 'Description' => 'Discussion about Topic G', 'class_id' => 7],
            ['Title' => 'Forum 8', 'Description' => 'Discussion about Topic H', 'class_id' => 8],
            ['Title' => 'Forum 9', 'Description' => 'Discussion about Topic I', 'class_id' => 9],
            ['Title' => 'Forum 10', 'Description' => 'Discussion about Topic J', 'class_id' => 10],
        ];

        foreach ($forums as $forum) {
            Forum::create([
                'Title' => $forum['Title'],
                'Description' => $forum['Description'],
                'class_id' => $forum['class_id'],
                'CreatedAt' => now(),
                'LastUpdated' => now(),
            ]);
        }
    }
}
