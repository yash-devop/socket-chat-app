import { useMemo } from "react";
import { io } from "socket.io-client";
import Layout from "./layout";
import { Route, Routes } from "react-router-dom";
import RoomCredentials from "./pages/RoomCredentials";
import Room from "./pages/Room";
import { APIURL } from "./config/apiConfig";
export default function App() {
  const socket = useMemo(() => {
    return io(APIURL, {
      // withCredentials: true
    });
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<RoomCredentials socket={socket}/>} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </Layout>
  );
}
