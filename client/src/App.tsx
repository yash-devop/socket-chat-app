import { useMemo } from "react";
import { io } from "socket.io-client";
import Layout from "./layout";
import { Route, Routes } from "react-router-dom";
import RoomCredentials from "./pages/RoomCredentials";
import Room from "./pages/Room";
export default function App() {
  const socket = useMemo(() => {
    return io("http://localhost:8000/", {
      // withCredentials: true
    });
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RoomCredentials socket={socket}/>} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </Layout>
  );
}
