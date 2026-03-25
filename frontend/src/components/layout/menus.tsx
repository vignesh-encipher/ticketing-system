import {
  AiOutlineAppstore,
  AiOutlineTeam,
  AiOutlineFolder,
} from "react-icons/ai";

export const menuItems = [
  {
    key: "dashboard",
    icon: AiOutlineAppstore,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    key: "tickets",
    icon: AiOutlineFolder,
    label: "Tickets",
    href: "/admin/tickets",
  },
  {
    key: "users",
    icon: AiOutlineTeam,
    label: "Users Management",
    href: "/admin/users",
  },
  {
    key: "department",
    icon: AiOutlineFolder,
    label: "Department",
    href: "/admin/department",
  },
];
