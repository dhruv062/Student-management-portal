<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forum', function (Blueprint $table) {
            // $table->id();
            $table->bigIncrements('ID');

            $table->string('Title', 255);
            $table->text('Description')->nullable();
            $table->unsignedBigInteger('class_id');
            $table->dateTime('CreatedAt');
            $table->dateTime('LastUpdated');
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
        Schema::dropIfExists('forum');
    }
}
