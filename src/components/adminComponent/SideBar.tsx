import { Box, ClipboardList, ListFilter, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../store/authStore";

const SideBar = () => {
  const { clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
  };

  return (
    <aside className="w-12 min-h-screen flex flex-col gap-4 pt-6 px-2 bg-zinc-100 fixed">
      <ul className="w-full h-full flex flex-col gap-4">
        <li>
          <NavLink
            to="orders"
            className="tooltip tooltip-right"
            data-tip="Orders"
          >
            <ClipboardList />
          </NavLink>
        </li>
        <li>
        <NavLink
            to="products"
            className="tooltip tooltip-right"
            data-tip="Product"
          >
            <Box />
          </NavLink>
        </li>
        <li>
        <NavLink
            to="category"
            className="tooltip tooltip-right"
            data-tip="Category"
          >
            <ListFilter />
          </NavLink>
        </li>
        <li>
        <NavLink
            to="login"
            className="tooltip tooltip-right"
            data-tip="Logout"
            onClick={handleLogout}
          >
            <LogOut />
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
