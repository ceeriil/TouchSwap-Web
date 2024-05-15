import { Header } from "@/components/Header";
import { HomeScreen } from "@/components/screens/Home";
import { socketInstance } from "@/services/socket";
import { useState, useEffect, SetStateAction } from "react";


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("http://localhost:3001/");

  useEffect(() => {
    if (socketInstance.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socketInstance.io.engine.transport.name);

      socketInstance.io.engine.on("upgrade", (transport: { name: SetStateAction<string>; }) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
    };
  }, []);


  return (
    <div className="h-full">
      <Header />
      <HomeScreen />
    </div>
  );
}
