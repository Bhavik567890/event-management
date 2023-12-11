import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { sidebarItems } from "../../utils/side-bar-item";
import * as LucideIcons from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="bg-gray-800 text-white h-full w-1/5 ">
      <div className="p-4 font-bold">Sidebar</div>
      <div className="p-4">
        <ul>
          {sidebarItems.map((item, index) => (
            <li key={index} className="py-4">
              <NavLink
                to={item?.url}
                className={`flex items-center px-4 py-2 rounded-md ${
                  location.pathname === item.url ? "bg-blue-500" : ""
                }`}
              >
                {item.label === "Events" && (
                  <LucideIcons.Calendar className="w-6 h-6 mr-2" />
                )}
                {item.label === "Users" && (
                  <LucideIcons.User className="w-6 h-6 mr-2" />
                )}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
