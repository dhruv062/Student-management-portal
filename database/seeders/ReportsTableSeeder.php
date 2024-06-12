<?php

namespace Database\Seeders;

// database/seeders/ReportsTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Reports;

class ReportsTableSeeder extends Seeder
{
    public function run()
    {
        $reports = [
            ['User_ID' => 13, 'Title' => 'Report 1', 'ReportData' => '{"metrics": ["attendance", "grades", "participation"]}', 'GenerationDate' => '2023-03-10 09:30:00'],
            ['User_ID' => 15, 'Title' => 'Report 2', 'ReportData' => '{"revenue": 250000, "expenses": 150000, "profit": 100000}', 'GenerationDate' => '2023-03-11 15:45:00'],
            ['User_ID' => 15, 'Title' => 'Report 3', 'ReportData' => '{"feedback": ["excellent", "good", "needs improvement"]}', 'GenerationDate' => '2023-03-12 11:20:00'],
        ];

        foreach ($reports as $report) {
            Reports::create($report);
        }
    }
}
