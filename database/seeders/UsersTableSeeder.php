<?php

namespace Database\Seeders;

// database/seeders/UsersTableSeeder.php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['John', 'Doe', 'john.doe@example.com', 'password1', '1990-05-15', '123 Main St', '123-456-7890', 'student'],
            ['Jane', 'Smith', 'jane.smith@example.com', 'password2', '1985-08-21', '456 Elm St', '987-654-3210', 'instructor'],
            ['Admin', 'Adminson', 'admin@example.com', 'adminpassword', '1980-01-10', '789 Oak St', '555-555-5555', 'admin'],
            ['Alice', 'Johnson', 'alice.j@example.com', 'alicepassword', '1995-04-18', '345 Maple Ln', '111-222-3333', 'student'],
            ['Bob', 'Williams', 'bob.w@example.com', 'bobpassword', '1992-12-03', '789 Oak Dr', '444-555-6666', 'instructor'],
            ['Eva', 'Brown', 'eva.b@example.com', 'evapassword', '1988-07-25', '567 Pine Ave', '777-888-9999', 'student'],
            ['Chris', 'Anderson', 'chris.a@example.com', 'chrispassword', '1993-09-12', '890 Cedar Rd', '222-333-4444', 'instructor'],
            ['Grace', 'Lee', 'grace.l@example.com', 'gracepassword', '1991-03-08', '456 Birch Ave', '666-777-8888', 'student'],
            ['Daniel', 'Garcia', 'daniel.g@example.com', 'danielpassword', '1987-11-20', '123 Oak Dr', '333-444-5555', 'instructor'],
            ['Sarah', 'Wilson', 'sarah.w@example.com', 'sarahpassword', '1989-06-14', '678 Walnut St', '999-888-7777', 'student'],
            ['Pat', 'Smith', 'pat.smith@example.com', 'patpassword', '1994-02-17', '789 Pine St', '777-888-9999', 'pc'],
            ['Megan', 'Brown', 'megan.b@example.com', 'meganpassword', '1997-10-05', '456 Oak Ln', '111-222-3333', 'pc'],
            ['Tom', 'Johnson', 'tom.j@example.com', 'tompassword', '1996-03-21', '123 Elm Dr', '555-555-5555', 'qao'],
            ['Linda', 'Davis', 'linda.d@example.com', 'lindapassword', '1998-07-28', '345 Cedar St', '987-654-3210', 'pc'],
            ['Mike', 'Wilson', 'mike.w@example.com', 'mikepassword', '1999-04-15', '567 Maple Rd', '123-456-7890', 'qao'],
        ];

        foreach ($users as $user) {
            User::create([
                'FirstName'    => $user[0],
                'LastName'     => $user[1],
                'Email'        => $user[2],
                'Password'     => $user[3],
                'Dob'          => $user[4],
                'Address'      => $user[5],
                'PhoneNumber'  => $user[6],
                'Role'         => $user[7],
            ]);
        }
    }
}
