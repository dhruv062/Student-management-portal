<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            // $table->id();
            $table->bigIncrements('ID');

            $table->string('FirstName', 50);
            $table->string('LastName', 50);
            $table->string('Email', 100)->unique();
            $table->string('Password', 255);
            $table->date('Dob');
            $table->string('Address', 255)->nullable();
            $table->string('PhoneNumber', 20)->nullable();
            $table->enum('Role', ['student', 'instructor', 'admin', 'pc', 'qao']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
