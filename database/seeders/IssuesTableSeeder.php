<?php

namespace Database\Seeders;

// database/seeders/IssuesTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Issues;

class IssuesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $issues = [
            ['2023-01-10 08:30:00', 'Technical Issue', 'Cannot access course materials.', 'closed', '11', '2023-01-10 08:45:00', 'We are investigating the issue.', '1', 'pc'],
            ['2023-02-05 14:15:00', 'Account Problem', 'Cannot log in to the system.', 'closed', '3', '2023-02-05 14:30:00', 'Please check your credentials.', '2', 'admin'],
            ['2023-03-20 10:45:00', 'Assignment Query', 'Need clarification on assignment instructions.', 'closed', '12', '2023-03-20 11:00:00', 'We will provide clarification soon.', '1', 'pc'],
            ['2023-01-30 11:30:00', 'Grading Issue', 'Grade discrepancy in Assignment 1.', 'closed', '3', '2023-01-30 11:45:00', 'We are reviewing your grades.', '2', 'admin'],
            ['2023-02-28 09:00:00', 'Enrollment Request', 'Requesting access to course XYZ.', 'closed', '11', '2023-02-28 09:15:00', 'Your request is being processed.', '6', 'pc'],
            ['2023-03-10 16:30:00', 'Technical Issue', 'Unable to submit quiz answers.', 'closed', '3', '2023-03-10 16:45:00', 'We are working on a solution.', '1', 'admin'],
            ['2023-01-15 12:00:00', 'Access Problem', 'Cannot view module content.', 'closed', '12', '2023-01-15 12:15:00', 'Checking the access issue.', '6', 'pc'],
            ['2023-02-18 15:20:00', 'Account Inquiry', 'Reset password request.', 'closed', '3', '2023-02-18 15:35:00', 'Resetting your password.', '4', 'admin'],
            ['2023-03-05 14:45:00', 'Assignment Query', 'Clarification needed for Assignment 2.', 'closed', '11', '2023-03-05 15:00:00', 'Clarification is being provided.', '1', 'pc'],
            ['2023-01-25 13:10:00', 'Technical Issue', 'Video lectures not loading.', 'closed', '3', '2023-01-25 13:25:00', 'Investigating video loading issue.', '1', 'admin'],
        ];

        foreach ($issues as $issue) {
            Issues::create([
                'Time_Stamp'           => $issue[0],
                'subject'              => $issue[1],
                'Description'          => $issue[2],
                'Status'               => $issue[3],
                'Cleared_by_user_id'   => $issue[4],
                'Cleared_by_Time_Stamp'=> $issue[5],
                'Reply_Message'        => $issue[6],
                'Added_by'             => $issue[7],
                'Assigned_for'         => $issue[8],
            ]);
        }
    }
}
