import { useMemo } from "react";
import { io } from "socket.io-client";
import Layout from "./layout";
import { Route, Routes } from "react-router-dom";
import RoomCredentials from "./pages/RoomCredentials";
export default function App() {
  const socket = useMemo(() => {
    return io("http://localhost:8000/", {
      // withCredentials: true
    });
  }, []);
  return (
    <Layout>
      <Routes>
        <Route  path="/" element={<RoomCredentials />} />
      </Routes>
    </Layout>
  );
}
