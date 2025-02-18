import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./components/AuthLayout";

import AppLayout from "./components/AppLayout";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import ChatDashBoard from "./features/chat/pages/ChatDashBoard";
import Profile from "./features/user/pages/Profile";
import FriendsOverview from "./features/friends/pages/FriendsOverview";
import ProtectedRoutes from "./components/ProtectedRoutes";
import OTPVerify from "./features/auth/pages/OTPVerify";
import Requests from "./features/friends/pages/Requests";

import { SocketProvider } from "./socket/SocketContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify" element={<OTPVerify />} />
            </Route>

            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="/" element={<ChatDashBoard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<FriendsOverview />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SocketProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
