import React, { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Context {
  socket: Socket | null;
}
const SocketContext = React.createContext({} as Context);

export function useSocket() {
  return useContext(SocketContext);
}

interface Props {
  id: string;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ id, children }) => {
  const [socket, setSocket] = useState<null | Socket>(null);

  //@ts-ignore
  useEffect(() => {
    const new_socket = io("https://stodbackend.app:4000", { query: { id } });
    setSocket(new_socket);
    return () => new_socket.close();
  }, [id]);

  const value: Context = {
    socket,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
