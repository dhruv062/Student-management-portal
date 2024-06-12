// UnviewedMessagesContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useSocket } from "./SocketContext";
import { toast } from "react-toastify";
const UnviewedMessagesContext = createContext();

export function UnviewedMessagesProvider({ children }) {
  const [unviewedMessages, setUnviewedMessages] = useState([]);
  const socket = useSocket();
  const handlesocketUnviewedMessages = () => {
    unviewedMessagesCount();
  };

  useEffect(() => {
    if (socket) {
      console.log("mounting message received", socket);
      socket.on("chat message", handlesocketUnviewedMessages);
      return () => {
        console.log("unmounting message received");
        socket.off("chat message", handlesocketUnviewedMessages);
      };
    }
  }, [socket]);

  useEffect(() => {
    unviewedMessagesCount();
  }, []);
  function unviewedMessagesCount() {
    axiosInstance
      .post("/api/chats/get_unviewed_messages ")
      .then((response) => {
        // console.log(response.data)
        setUnviewedMessages(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }
  const updateUnviewedMessages = () => {
    unviewedMessagesCount();
  };

  return (
    <UnviewedMessagesContext.Provider
      value={{ unviewedMessages, updateUnviewedMessages }}
    >
      {children}
    </UnviewedMessagesContext.Provider>
  );
}

export function useUnviewedMessages() {
  return useContext(UnviewedMessagesContext);
}
