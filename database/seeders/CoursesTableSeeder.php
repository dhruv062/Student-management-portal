<?php

namespace Database\Seeders;

// database/seeders/CoursesTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Course;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = [
            ['CS 601', 'Algorithms and Data Structures', 'Advanced algorithms and data structures.', 'Explore advanced algorithms and data structures.', 'Topics include algorithm design, data structures, and algorithm analysis.', 'Prerequisites - Data Structures and Algorithms (CS 201).'],
            ['CS 602', 'Machine Learning', 'Introduction to machine learning concepts and techniques.', 'Introduce fundamental machine learning concepts.', 'Topics include supervised and unsupervised learning, deep learning, and practical applications.', 'Prerequisites - Linear algebra, statistics, and programming skills.'],
            ['CS 603', 'Database Management', 'Database design, management, and optimization.', 'Learn database design and management.', 'Topics include SQL, database optimization, and data modeling.', 'Prerequisites - Database Systems (CS 301).'],
            ['CS 604', 'Operating Systems', 'Operating system principles and design.', 'Study operating system principles and design.', 'Topics include process management, memory management, and file systems.', 'Prerequisites - Computer Organization (CS 302).'],
            ['CS 605', 'Software Engineering', 'Software development methodologies and best practices.', 'Understand software development methodologies.', 'Topics include agile development, software testing, and software project management.', 'Prerequisites - Software Development (CS 303).'],
            ['CS 606', 'Computer Networks', 'Fundamentals of computer networking.', 'Explore computer networking fundamentals.', 'Topics include network protocols, network security, and network design.', 'Prerequisites - Data Communication and Computer Networks (CS 304).'],
            ['CS 607', 'Artificial Intelligence', 'Artificial intelligence and neural networks.', 'Study artificial intelligence and neural networks.', 'Topics include AI algorithms, machine learning, and neural network architectures.', 'Prerequisites - Machine Learning (CS 602).'],
            ['CS 608', 'Cloud Computing', 'Cloud computing and virtualization technologies.', 'Learn about cloud computing and virtualization.', 'Topics include cloud services, virtualization, and cloud security.', 'Prerequisites - Computer Networks (CS 606).'],
            ['CS 609', 'Mobile App Development', 'Development of mobile applications.', 'Develop mobile applications for various platforms.', 'Topics include app design, development, and mobile user experience.', 'Prerequisites - Software Engineering (CS 605).'],
            ['CS 610', 'Capstone Project', 'Final project integrating knowledge and skills.', 'Complete a capstone project.', 'Integrate knowledge and skills gained throughout the program.', 'Prerequisites - Completion of program coursework.'],
        ];

        foreach ($courses as $course) {
            Course::create([
                'Number'              => $course[0],
                'Name'                => $course[1],
                'Description'         => $course[2],
                'CourseObjectives'    => $course[3],
                'CourseContent'       => $course[4],
                'AdditionalInformation' => $course[5],
            ]);
        }
    }
}
