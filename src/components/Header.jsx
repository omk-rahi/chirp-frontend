import { Plus, UserRoundPen, LogOut, Users } from "lucide-react";
import Button from "./Button";
import { Link } from "react-router";
import { useState } from "react";
import { useLogout, useUser } from "../features/auth/hooks/useAuth";
import { useGetFriendRequest } from "../features/friends/pages/useFriends";

import { getProfileImage } from "../utils/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { logout } = useLogout();

  const { requests, isLoading: isRequestLoading } = useGetFriendRequest();

  const { user } = useUser();

  return (
    <header className="bg-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-6 lg:px-0">
        <div>
          <Link to="/">
            <img
              src="images/logo.svg"
              alt="Brand Logo"
              className="w-12 h-12 pb-2"
            />
          </Link>
        </div>
        <div className="flex gap-6 items-center">
          <div className="hidden sm:block">
            <Link to="/friends">
              <Button>
                <Plus size={20} />
                &nbsp;New Chat
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div
              className="w-12 h-12 border border-gray-300 rounded-full cursor-pointer relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-full h-full overflow-hidden rounded-full">
                <img src={getProfileImage(user)} alt="User profile image" />
              </div>

              {!isRequestLoading && requests.length > 0 && (
                <span className="text-xs text-white font-bold flex justify-center items-center absolute top-[-6px] right-[-6px] h-5 w-5 rounded-full ring-2 ring-white bg-rose-400">
                  {requests.length}
                </span>
              )}
            </div>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                ></div>
                <ul
                  className="z-10 absolute bg-white py-4 w-42 shadow-md top-12 border border-gray-100 left-0 -translate-x-[70%]"
                  onMouseLeave={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <li className=" hover:bg-gray-50 relative">
                    <Link
                      to="/requests"
                      className="flex gap-2 text-gray-500 py-3 px-6"
                    >
                      <Users />
                      Requests
                      {!isRequestLoading && requests.length > 0 && (
                        <span className="text-xs text-white font-bold flex justify-center items-center absolute right-3 mt-0.5 h-5 w-5 rounded-full ring-2 ring-white bg-rose-400">
                          {requests.length}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className=" hover:bg-gray-50">
                    <Link
                      to="/profile"
                      className="flex gap-2 text-gray-500 py-3 px-6"
                    >
                      <UserRoundPen />
                      Profile
                    </Link>
                  </li>
                  <li className="hover:bg-gray-50">
                    <button
                      type="submit"
                      className="flex gap-2 text-gray-500 py-3 px-6 cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut />
                      Logout
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
