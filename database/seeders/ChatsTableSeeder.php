<?php

namespace Database\Seeders;

// database/seeders/ChatsTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Chats;

class ChatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $chats = [
            [1, 2, 'Hi there! Have you checked the course offerings for the MS CS program?', '2023-01-10 08:30:00', false],
            [2, 1, 'Yes, I saw some interesting courses like Advanced Algorithms and Machine Learning.', '2023-01-10 08:35:00', false],
            [3, 1, 'Im planning to take a course on Cloud Computing. Any recommendations?', '2023-02-15 14:00:00', false],
            [1, 3, 'Certainly! Cloud Computing with AWS is a great choice. Its practical and in-demand.', '2023-02-15 14:05:00', true],
            [2, 3, 'I am excited about the Data Science track. What about you?', '2023-03-05 10:15:00', true],
            [3, 2, 'I am leaning towards Security and Privacy. Cybersecurity is a hot field.', '2023-03-05 10:20:00', false],
            [4, 1, 'Hey, there is a scholarship opportunity for MS CS students. Check your email!', '2023-03-20 09:45:00', true],
            [1, 4, 'Thanks for the heads-up! Ill apply right away.', '2023-03-20 10:00:00', false],
            [5, 3, 'Reminder: Group meeting for the Distributed Systems project tomorrow.', '2023-04-02 16:30:00', false],
            [3, 5, 'Got it. Ill be there!', '2023-04-02 16:45:00', true],
            [2, 4, 'Lets study for the Software Engineering exam together.', '2023-04-10 17:30:00', true],
            [4, 2, 'Sure, we can use the study room in the library.', '2023-04-10 17:45:00', true],
            [1, 5, 'I need help with my thesis on Artificial Intelligence. Any advice?', '2023-05-05 11:00:00', false],
            [5, 1, 'You should connect with Dr. Smith. Hes an expert in AI research.', '2023-05-05 11:15:00', false],
            [3, 4, 'Our presentation on Cloud Computing is scheduled for next week.', '2023-05-20 09:30:00', true],
            [4, 3, 'Lets meet at the lab tomorrow to practice.', '2023-05-20 10:00:00', true],
            [2, 5, 'Sending you the revised Software Architecture design document.', '2023-06-02 14:00:00', true],
            [5, 2, 'Received it. Ill review and provide feedback.', '2023-06-02 14:15:00', true],
            [1, 3, 'Discussing the MS CS graduation ceremony plans.', '2023-06-15 15:30:00', false],
            [3, 1, 'Lets make it memorable! How about a guest speaker from a tech giant?', '2023-06-15 16:00:00', false],
            [4, 1, 'Assignment submission deadline extended for the AI course.', '2023-09-05 14:30:00', true],
            [1, 4, 'Thats a relief! More time to fine-tune our models.', '2023-09-05 14:45:00', true],
            [2, 3, 'HackerRank coding challenge for the Data Structures course is tomorrow.', '2023-09-20 11:30:00', true],
            [3, 2, 'Ill brush up on my algorithms tonight.', '2023-09-20 12:00:00', true],
            [5, 4, 'Meeting to discuss our Capstone project proposals.', '2023-10-10 16:00:00', true],
            [4, 5, 'I have a few project ideas to pitch.', '2023-10-10 16:30:00', true],
            [1, 5, 'Finalizing the research paper for the AI conference submission.', '2023-10-25 09:45:00', true],
            [5, 1, 'Make sure to include the latest results and graphs.', '2023-10-25 10:00:00', true],
        ];

        foreach ($chats as $chat) {
            Chats::create([
                'SenderID'   => $chat[0],
                'ReceiverID' => $chat[1],
                'Message'    => $chat[2],
                'TimeStamp'  => $chat[3],
                'Viewed'     => $chat[4],
            ]);
        }
    }
}

