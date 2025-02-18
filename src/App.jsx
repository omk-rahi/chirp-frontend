import { lazy, Suspense } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router";
import AuthLayout from "./components/AuthLayout";

import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";

const Login = lazy(import("./features/auth/pages/Login"));
const Register = lazy(import("./features/auth/pages/Register"));
const OTPVerify = lazy(import("./features/auth/pages/OTPVerify"));

const ChatDashBoard = lazy(import("./features/chat/pages/ChatDashBoard"));
const Profile = lazy(import("./features/user/pages/Profile"));
const FriendsOverview = lazy(
  import("./features/friends/pages/FriendsOverview")
);
const Requests = lazy(import("./features/friends/pages/Requests"));

import { SocketProvider } from "./socket/SocketContext";
import Loader from "./components/Loader";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
