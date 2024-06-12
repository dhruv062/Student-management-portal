<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            // $table->id();
            $table->bigIncrements('Id');

            $table->unsignedBigInteger('class_id');
            $table->string('Name', 255);
            $table->date('date_added');
            $table->date('date_published')->nullable();
            $table->text('Attachments')->nullable();
            $table->text('content');
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
        Schema::dropIfExists('modules');
    }
}
