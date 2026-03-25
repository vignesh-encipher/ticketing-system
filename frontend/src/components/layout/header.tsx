"use client";

import { memo } from "react";
import { Layout, Button } from "antd";
import { AiOutlineUser, AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import { useTheme } from "./theme-provider";

const { Header: AntHeader } = Layout;

const Header = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AntHeader className="bg-gray-200 dark:bg-gray-800 px-6 flex items-center justify-end h-16 fixed top-0 right-0 left-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <Button
          type="text"
          icon={
            theme === "dark" ? (
              <AiOutlineSun className="text-xl text-gray-800 dark:text-gray-200" />
            ) : (
              <AiOutlineMoon className="text-xl text-gray-800 dark:text-gray-200" />
            )
          }
          onClick={toggleTheme}
          className="flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        />
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center transition-colors duration-300">
            <AiOutlineUser className="text-xl text-gray-600 dark:text-gray-300" />
          </div>
          <span className="text-gray-800 dark:text-gray-200 font-medium transition-colors duration-300">
            John Doe
          </span>
        </div>
      </div>
    </AntHeader>
  );
});

Header.displayName = "Header";

export default Header;

