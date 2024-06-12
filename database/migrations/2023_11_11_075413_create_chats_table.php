<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id('ChatID');
            $table->unsignedBigInteger('SenderID');
            $table->unsignedBigInteger('ReceiverID');
            $table->text('Message');
            $table->timestamp('TimeStamp');
            $table->boolean('Viewed')->default(false);
            $table->timestamps();

            // Foreign key relationships
            $table->foreign('SenderID')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('ReceiverID')
                ->references('id')
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
        Schema::dropIfExists('chats');
    }
}
