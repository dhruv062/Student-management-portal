<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatsController extends Controller
{
    public function getChatsByID(Request $request)
    {
        // Retrieve user input (e.g., sender ID and receiver ID)
        $senderID = $request->input('id');
        $receiverID = $request->input('receiver_id');

        // Query the database to retrieve messages between the specified sender and receiver
        $messages = DB::table('chats')
            ->where(function ($query) use ($senderID, $receiverID) {
                $query->where('SenderID', $senderID)
                      ->where('ReceiverID', $receiverID);
            })
            ->orWhere(function ($query) use ($senderID, $receiverID) {
                $query->where('SenderID', $receiverID)
                      ->where('ReceiverID', $senderID);
            })
            ->get();

        return response()->json($messages);
    }

    public function getLastUnviewedMessages(Request $request)
    {
        // Retrieve user input (e.g., receiver ID)
        $receiverID = $request->input('id');

        // Query the database to retrieve the last unviewed message from each sender for the receiver
        $messages = DB::table('chats as c1')
            ->select('c1.*', 'u.FirstName as SenderFirstName', 'u.LastName as SenderLastName')
            ->join('users as u', 'c1.SenderID', '=', 'u.ID')
            ->where('c1.Viewed', false)
            ->whereIn(DB::raw('(c1.TimeStamp, c1.SenderID)'), function ($query) use ($receiverID) {
                $query->select(DB::raw('MAX(c2.TimeStamp) as maxTimeStamp, c2.SenderID'))
                    ->from('chats as c2')
                    ->where(function ($query) use ($receiverID) {
                        $query->whereRaw('(c2.SenderID = c1.SenderID AND c2.ReceiverID = ?)', [$receiverID])
                            ->orWhereRaw('(c2.SenderID = ? AND c2.ReceiverID = c1.SenderID)', [$receiverID]);
                    })
                    ->groupBy('c2.SenderID');
            })
            ->orderByDesc('c1.TimeStamp')
            ->get();

        return response()->json($messages);
    }






    public function markMessagesAsViewed(Request $request)
    {
        // Retrieve user input (e.g., sender ID and receiver ID)
        $receiverID = $request->input('id'); // User for whom you want to mark messages as viewed
        $senderID = $request->input('sender_id'); // Sender of the messages

        // Update the database to mark received messages from the sender as viewed
        $result = DB::table('chats')
            ->where('ReceiverID', $receiverID)
            ->where('SenderID', $senderID)
            ->update(['Viewed' => true]);

        if ($result) {
            // Received messages marked as viewed successfully
            return response()->json(["message" => "Received messages marked as viewed"]);
        } else {
            // Failed to mark received messages as viewed
            return response()->json(["error" => "Failed to mark received messages as viewed"], 500);
        }
    }

    public function sendChatMessage(Request $request)
    {
        // Retrieve user input for sending a chat message
        $senderID = $request->input('id');
        $receiverID = $request->input('receiver_id');
        $message = $request->input('message');

        // Insert the chat message into the CHATS table
        $result = DB::table('chats')->insert([
            'SenderID' => $senderID,
            'ReceiverID' => $receiverID,
            'Message' => $message,
            'TimeStamp' => now(),
        ]);

        if ($result) {
            // Return a success message
            return response()->json(["message" => "Chat message sent successfully"]);
        } else {
            // Failed to insert chat message
            return response()->json(["error" => "Failed to send chat message"], 500);
        }
    }
}
