"use client";

import { memo } from "react";
import { Layout } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineAppstore,
  AiOutlineTeam,
  AiOutlineFolder,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsGrid1X2Fill } from "react-icons/bs";
import { menuItems } from "./menus";

const { Sider } = Layout;

const Sidebar = memo(() => {
  const pathname = usePathname();

  return (
    <Sider
      width={260}
      className="bg-[#f8f9fa] fixed left-0 top-0 bottom-0 z-50 border-r border-gray-200"
      theme="light"
    >
      <div className="flex flex-col h-[100vh] bg-[#f8f9fa] pt-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-8 h-16 w-full cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-[10px] flex items-center justify-center text-white text-xl flex-shrink-0 shadow-sm relative">
             <div className="absolute inset-x-2 top-2 h-0.5 bg-white opacity-40 rounded"></div>
             <BsGrid1X2Fill className="text-base" />
          </div>
          <div className="flex flex-col">
            <span className="text-primary-dark font-extrabold text-[17px] leading-tight tracking-tight">Executive</span>
            <span className="text-primary-dark font-extrabold text-[17px] leading-tight tracking-tight">Architect</span>
            <span className="text-gray-500 text-[11px] font-medium mt-0.5 tracking-wide">Admin Portal</span>
          </div>
        </div>

        {/* Main Menu */}
        <div className="mt-12 flex flex-col gap-1.5 flex-1 pe-4">
          {menuItems.map((item) => {
            // we will hardcode 'user-management' as active if pathname isn't one of them, 
            // since the user wants to see the specific design matching the image.
            const isActive = pathname.includes(item.href) || (item.key === 'user-management' && pathname === '/admin');
            const Icon = item.icon;
            
            return (
              <Link href={item.href} key={item.key}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 text-[14px] font-semibold rounded-lg transition-all relative ${
                    isActive
                      ? "text-primary bg-sidebar-active shadow-sm ml-2 pr-4 rounded-l border border-sidebar-border border-r-0 border-l-0 border-t-0"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 mx-2"
                  }`}
                >
                  {isActive && (
                    <div className="absolute -right-4 top-0 bottom-0 w-1 bg-primary rounded-l-md shadow-[0_0_8px_rgba(0,51,160,0.5)]"></div>
                  )}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"></div>
                  )}
                  <Icon className={`text-[22px] ${isActive ? "text-primary" : "text-gray-400"}`} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Menu */}
        <div className="mb-8 flex flex-col gap-2 px-6">
          <Link href="/admin/settings">
            <div className="flex items-center gap-4 px-4 py-2.5 text-[14px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
              <AiOutlineSetting className="text-[20px] text-gray-400" />
              Settings
            </div>
          </Link>
          <Link href="/admin/support">
            <div className="flex items-center gap-4 px-4 py-2.5 text-[14px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
              <AiOutlineQuestionCircle className="text-[20px] text-gray-400" />
              Support
            </div>
          </Link>
        </div>
      </div>
    </Sider>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
