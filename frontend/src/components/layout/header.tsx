"use client";

import { memo } from "react";
import { Layout } from "antd";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";

const { Header: AntHeader } = Layout;

const Header = memo(() => {
  return (
    <AntHeader className="bg-[#f8f9fa] flex items-center justify-between h-[80px] border-b border-gray-200 fixed top-0 right-0 z-40 px-8 transition-colors duration-300" style={{ left: 260, paddingInline: 32, backgroundColor: "#f8f9fa" }}>
      {/* Left side: Search bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center w-full h-10 rounded-md bg-[#f0f2f5] overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-400">
            <AiOutlineSearch className="text-lg" />
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 bg-transparent pr-2"
            type="text"
            id="search"
            placeholder="Search by Name, Email, or ID..."
          />
        </div>
      </div>

      {/* Right side: Nav and Profile */}
      <div className="flex items-center text-sm font-semibold text-gray-600 h-full">
       

        <div className="flex items-center gap-3 pl-6 border-l border-gray-200 h-10">
          <div className="flex flex-col items-end justify-center">
            <span className="text-gray-900 font-bold text-sm leading-tight">Alex Sterling</span>
            <span className="text-[10px] text-gray-500 font-bold tracking-wide">SUPER ADMIN</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-200 flex-shrink-0">
            {/* Avatar Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-sm">
              AS
            </div>
          </div>
        </div>
      </div>
    </AntHeader>
  );
});

Header.displayName = "Header";

export default Header;


