<?php

namespace Database\Seeders;

// database/seeders/PermissionsSeeder.php

use Illuminate\Database\Seeder;
use App\Models\Permissions;

class PermissionsTableSeeder extends Seeder
{
    public function run()
    {
        Permissions::create([
            'name' => '--',
        ]);
    }
}
