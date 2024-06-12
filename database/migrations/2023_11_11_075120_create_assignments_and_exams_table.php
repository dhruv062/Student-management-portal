<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentsAndExamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments_and_exams', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('class_id');
            $table->string('Title', 255);
            $table->timestamp('DueDate');
            $table->timestamp('AvailableDate');
            $table->boolean('Published');
            $table->text('Content');
            $table->text('Attachments')->nullable();
            $table->integer('TotalMarks')->nullable();
            $table->enum('Type', ['exam', 'assignment']);
            $table->timestamps();

            // Foreign key relationship
            $table->foreign('class_id')
                ->references('id')
                ->on('classes')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('assignments_and_exams');
    }
}
