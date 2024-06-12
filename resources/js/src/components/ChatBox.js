import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../axiosConfig";
import { useUnviewedMessages } from "../contexts/UnviewedMessagesContext";
import { useSocket } from "../contexts/SocketContext";

export default function ChatBox() {
  console.log("ChatBox");

  const [active, setActive] = useState("");
  const [contacts, setContacts] = useState([]);
  const { unviewedMessages } = useUnviewedMessages();

  const [error, setError] = useState("");
  const socket = useSocket();

  useEffect(() => {
    axiosInstance
      .get("/api/users/get_all_users ")
      .then((response) => {
        // console.log(response.data);
        setContacts(response.data);
      })
      .catch((error) => {
        setError("Some Error occured");
      });
  }, []);

  return (
    <section className="h-[calc(100vh-115px)]">
      {active === "" ? (
        <div className="w-full   md:w-96" id="contacts">
          <ul className=" divide-y divide-gray-200 dark:divide-gray-700">
            <li>
              <h1> Messages</h1>
            </li>
            {contacts.map(
              (contact) =>
                contact.user_id != localStorage.getItem("id") && (
                  <ContactTile
                    onclick={() => {
                      setActive(contact);
                    }}
                    name={contact.FirstName + " " + contact.LastName}
                    message={unviewedMessages.some((message) => {
                      return message.SenderID === contact.user_id;
                    })}
                  />
                )
            )}
          </ul>
        </div>
      ) : (
        <MessageBox
          onclick={() => {
            setActive("");
          }}
          contact={active}
        />
      )}
    </section>
  );
}

function ContactTile({ onclick, name, message }) {
  return (
    <li onClick={onclick} className="pb-3 py-3 cursor-pointer sm:py-4 sm:pb-4">
      <div className="flex items-center space-x-4">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {name[0]}
          </span>
        </div>

        <div className="flex-1 flex justify-between min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {name}
          </p>
          {message && (
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-primary bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
              1
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function MessageBox({ onclick, contact }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { unviewedMessages, updateUnviewedMessages } = useUnviewedMessages();
  const socket = useSocket();
  const messagesContainerRef = useRef(null);
  const [typing, setTyping] = useState(false);

  console.log(unviewedMessages);

  useEffect(() => {
    const onChatMessage = (data) => {
      console.log("chat message");
      console.log(data);
      console.log(contact.user_id);
      if (
        data?.message &&
        parseInt(contact.user_id) === parseInt(data?.senderId)
      ) {
        setMessages((prev) => [
          ...prev,
          {
            Message: data.message,
            SenderID: data.senderId,
            receiver_id: localStorage.getItem("id"),
          },
        ]);
        axiosInstance
          .post("/api/chats/mark_as_viewed ", {
            sender_id: contact.user_id,
          })
          .then((response) => {
            console.log(response);
            // updateUnviewedMessages();
          })
          .catch((error) => {
            // console.log(error);
          });
      }
    };

    socket.on("chat message", onChatMessage);
    return () => {
      updateUnviewedMessages();
      socket.off("chat message", onChatMessage);
    };
  }, []);

  useEffect(() => {
    if (hasUnviewedMessages(unviewedMessages, contact.user_id)) {
      axiosInstance
        .post("/api/chats/mark_as_viewed ", {
          sender_id: contact.user_id,
        })
        .then((response) => {
          // console.log(response);
          updateUnviewedMessages();
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }, [contact.user_id, unviewedMessages, updateUnviewedMessages]);
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  function hasUnviewedMessages(messages, user_id) {
    return messages.some(
      (message) => message.SenderID === user_id && message.Viewed === 0
    );
  }
  function handleSend(e) {
    e.preventDefault();
    setLoading(true);
    if (message === "") {
      alert("Please enter a message");
      return;
    }
    axiosInstance
      .post("/api/chats/send_message ", {
        receiver_id: contact.user_id,
        message: message,
      })
      .then((response) => {
        // console.log(response.data);
        setMessage("");
        socket.emit("chat message", {
          receiverUserId: contact.user_id,
          message: message,
        });
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    axiosInstance
      .post("/api/chats/get_all_chats_by_id ", {
        receiver_id: contact.user_id,
      })
      .then((response) => {
        console.log(response.data);
        setMessages(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [loading]);

  return (
    <React.Fragment>
      <div className="h-full flex flex-col">
        <MessageBoxTitle
          onclick={onclick}
          name={contact.FirstName + " " + contact.LastName}
          role={contact.Role}
          image={contact.FirstName[0] + contact.LastName[0]}
        />
        <div
          id="messages"
          className=" flex-col grow space-y-4 p-3 overflow-y-auto  "
          ref={messagesContainerRef}
        >
          {messages.map((message) =>
            message.SenderID != contact.user_id ? (
              <ReceiverMessage message={message.Message} />
            ) : (
              <Sendermessage
                message={message.Message}
                image={contact.FirstName[0] + contact.LastName[0]}
              />
            )
          )}
          {typing && <ReceiverMessage message="Typing..." />}
        </div>

        <SenderInput props={{ setMessage, message, handleSend, contact }} />
      </div>
    </React.Fragment>
  );
}

function MessageBoxTitle({ onclick, name, image, role }) {
  return (
    <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <button onClick={onclick}>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
            />
          </svg>
        </button>
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="20" height="20">
              <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
            </svg>
          </span>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {image}
            </span>
          </div>
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">{name}</span>
          </div>
          <span className="text-lg text-gray-600">{role}</span>
        </div>
      </div>
    </div>
  );
}

function Sendermessage({ message, image }) {
  return (
    <div className="chat-message">
      <div className="flex  items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
              {message}
            </span>
          </div>
        </div>
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {image}
          </span>
        </div>
      </div>
    </div>
  );
}

function ReceiverMessage({ image, message }) {
  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-primary text-white ">
              {message}
            </span>
          </div>
        </div>
        {/* <div className="relative items-center order-2 justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {image}
          </span>
        </div> */}
      </div>
    </div>
  );
}

function SenderInput({ props }) {
  const { setMessage, message, handleSend, contact } = props;

  const socket = useSocket();

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <form onSubmit={handleSend}>
        <div className="relative flex">
          <input
            type="text"
            placeholder="Write your message!"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
            className="flex-1 block focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0  sm:flex">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-primary focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
