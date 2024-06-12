<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForumCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('forum_comments', function (Blueprint $table) {
            $table->id('comment_id');
            $table->unsignedBigInteger('forumid');
            $table->text('comment');
            $table->unsignedBigInteger('userid');
            $table->timestamp('dateposted')->default(now());
            $table->timestamps();

            // Foreign key relationships
            $table->foreign('forumid')
                ->references('id')
                ->on('forum')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('userid')
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
        Schema::dropIfExists('forum_comments');
    }
}
