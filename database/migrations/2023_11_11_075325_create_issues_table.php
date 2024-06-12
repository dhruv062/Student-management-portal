<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues', function (Blueprint $table) {
            $table->bigIncrements('Id');

            $table->timestamp('Time_Stamp');
            $table->string('subject', 255);
            $table->text('Description');
            $table->string('Status', 255);
            $table->unsignedBigInteger('Cleared_by_user_id')->nullable();
            $table->timestamp('Cleared_by_Time_Stamp')->default(null)->nullable();
            $table->text('Reply_Message')->nullable();
            $table->unsignedBigInteger('Added_by');
            $table->enum('Assigned_for', ['pc', 'admin']);
            $table->timestamps();

            // Foreign key relationships
            $table->foreign('Cleared_by_user_id')
                ->references('ID')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('Added_by')
                ->references('ID')
                ->on('users')
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
        Schema::dropIfExists('issues');
    }
}
