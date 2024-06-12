<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
         $this->call([
            UsersTableSeeder::class,
            CoursesTableSeeder::class,
            ClassesTableSeeder::class,
            EnrollmentTableSeeder::class,
            AssignmentsAndExamsTableSeeder::class,
            SubmissionsTableSeeder::class,
            GradesTableSeeder::class,
            ModulesTableSeeder::class,
            IssuesTableSeeder::class,
            ChatsTableSeeder::class,
            PoliciesTableSeeder::class,
            ReportsTableSeeder::class,
            ForumsTableSeeder::class,
            ForumCommentsTableSeeder::class,
            StudentFeedbackTableSeeder::class,
            ThemesTableSeeder::class,
            PermissionsTableSeeder::class,
            // Add more seeder classes here
        ]);
    }
}
