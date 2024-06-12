import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "./UserContext";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { user } = useUser();
  const userRole = user?.role;
  const userId = user?.id;

  // Maintain a single socket instance by using useState
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userRole && userId && !socket) {
      // const newSocket = io("http://localhost:3001", {
      const newSocket = io("http://localhost:3001", {
          withCredentials: true,
          extraHeaders: {
              "my-custom-header": "abcd",
          },
      });

      newSocket.on("connect", () => {
        console.log("Connected to the WebSocket server");

        newSocket.on("chat message", (message) => {
          console.log(message);
        });

        newSocket.emit("userConnected", { userId });
      });

      // Set the socket instance in the state
      setSocket(newSocket);
    }

    // Cleanup function
    return () => {
      if (socket) {
        console.log("Component is unmounted");
        socket.off("connect");
        socket.disconnect();
      }
    };
  }, [userRole, userId, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
