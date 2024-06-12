<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            // $table->id();
            $table->bigIncrements('Id');


            $table->string('Number', 255);
            $table->string('Name', 255);
            $table->text('Description')->nullable();
            $table->text('CourseObjectives')->nullable();
            $table->text('CourseContent')->nullable();
            $table->text('AdditionalInformation')->nullable();
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
        Schema::dropIfExists('courses');
    }
}
