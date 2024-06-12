<?php

namespace Database\Seeders;

// database/seeders/ThemeSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Themes;

class ThemesTableSeeder extends Seeder
{
    public function run()
    {
        Themes::create([
            'name' => 'forest',
        ]);
    }
}
