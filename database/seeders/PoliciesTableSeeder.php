<?php

namespace Database\Seeders;

// database/seeders/PoliciesTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Policies;

class PoliciesTableSeeder extends Seeder
{
    public function run()
    {
        $policies = [
            ['Employee Code of Conduct', 13, 'Detailed description of the code of conduct for employees.', '2023-01-05 10:00:00'],
            ['Privacy Policy', 13, 'Description of the organization\'s privacy policy and practices.', '2023-02-10 14:30:00'],
            ['Data Security Policy', 15, 'Policy outlining data security measures and best practices.', '2023-02-25 11:15:00'],
        ];

        foreach ($policies as $policy) {
            Policies::create([
                'Title'       => $policy[0],
                'CreatedByID' => $policy[1],
                'Description' => $policy[2],
                'Timestamp'   => $policy[3],
            ]);
        }
    }
}
