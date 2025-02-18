import Header from "./Header";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="h-dvh">
      <Header />

      <div className="h-[90%] px-6 xl:px-0 space-y-6 overflow-y-auto pb-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
