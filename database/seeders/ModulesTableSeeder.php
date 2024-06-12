<?php

namespace Database\Seeders;

// database/seeders/ModulesTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Modules;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = [
            [1, 'Module 1: Introduction', '2023-01-12', '2023-01-15', 'Introduction to the course.','/uploads/module.zip'],
            [1, 'Module 2: Algebra', '2023-01-20', '2023-01-25', 'Algebraic concepts and equations.','/uploads/module.zip'],
            [2, 'Module 1: Introduction to Programming', '2023-02-20', '2023-02-25', 'Introduction to programming languages.','/uploads/module.zip'],
            [2, 'Module 2: Data Types', '2023-02-26', '2023-03-02', 'Data types and variables.','http://127.0.0.1/uploads/module.zip'],
            [3, 'Module 1: Ancient History', '2023-01-10', '2023-01-15', 'Overview of ancient civilizations.','http://127.0.0.1/uploads/module.zip'],
            [3, 'Module 2: Medieval History', '2023-01-20', '2023-01-25', 'Medieval history and events.','http://127.0.0.1/uploads/module.zip'],
            [4, 'Module 1: Mechanics', '2023-03-05', '2023-03-10', 'Mechanical principles.','http://127.0.0.1/uploads/module.zip'],
            [5, 'Module 1: Art Movements', '2023-01-18', '2023-01-23', 'Exploring art movements.','http://127.0.0.1/uploads/module.zip'],
            [5, 'Module 2: Famous Artists', '2023-01-28', '2023-02-02', 'Profiles of famous artists.','http://127.0.0.1/uploads/module.zip'],
            [6, 'Module 1: Chemical Reactions', '2023-02-12', '2023-02-17', 'Chemical reactions and equations.','http://127.0.0.1/uploads/module.zip'],
        ];

        foreach ($modules as $module) {
            Modules::create([
                'class_id'      => $module[0],
                'Name'          => $module[1],
                'date_added'    => $module[2],
                'date_published'=> $module[3],
                'content'       => $module[4],
                'Attachments'   => $module[5],
            ]);
        }
    }
}
