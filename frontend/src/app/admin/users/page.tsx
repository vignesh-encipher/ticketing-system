"use client";

import React, { useState } from "react";
import CreateUser from "./components/CreateUser/page";
import { TableComponent } from "../../../components/table";
import type { ColumnsType } from "../../../components/table";
import Filters, { FilterItemDef } from "../../../components/filter";
import {
  AiOutlineUpload,
  AiOutlineUserAdd,
  AiOutlineClear,
  AiOutlineTeam,
  AiOutlineMore,
} from "react-icons/ai";

// Mock data based on the provided image
const users = [
  {
    id: 1,
    name: "Elena Rodriguez",
    email: "elena.r@architect.com",
    employeeId: "EA-90210",
    department: "Design",
    role: "LEAD",
    status: "Active",
    createdDate: "Oct 12, 2023",
    avatarColor: "bg-blue-900",
    initials: "ER"
  },
  {
    id: 2,
    name: "Marcus Chen",
    email: "m.chen@architect.com",
    employeeId: "EA-88421",
    department: "Developers",
    role: "MEMBER",
    status: "Active",
    createdDate: "Jan 05, 2024",
    avatarColor: "bg-teal-700",
    initials: "MC"
  },
  {
    id: 3,
    name: "Jordan Davis",
    email: "j.davis@architect.com",
    employeeId: "EA-77123",
    department: "Medical Coders",
    role: "MEMBER",
    status: "Deactivated",
    createdDate: "Nov 20, 2023",
    avatarColor: "bg-red-200",
    textColor: "text-red-700",
    initials: "JD"
  },
  {
    id: 4,
    name: "Sarah Thompson",
    email: "s.thompson@architect.com",
    employeeId: "EA-11200",
    department: "HR",
    role: "LEAD",
    status: "Active",
    createdDate: "Mar 15, 2024",
    avatarColor: "bg-purple-800",
    initials: "ST"
  },
];

const columns: ColumnsType<typeof users[0]> = [
  {
    title: "USER PROFILE",
    key: "profile",
    render: (_, record) => (
      <div className="flex items-center gap-4 py-1">
        <div className={`w-[42px] h-[42px] rounded-md flex items-center justify-center font-bold text-white text-sm shadow-sm ${record.avatarColor} ${record.textColor || ''}`}>
          {record.initials}
        </div>
        <div className="flex flex-col">
          <span className="text-gray-900 font-bold text-sm tracking-tight">{record.name}</span>
          <span className="text-gray-500 text-xs font-semibold">{record.email}</span>
        </div>
      </div>
    )
  },
  {
    title: "EMPLOYEE ID",
    dataIndex: "employeeId",
    key: "employeeId",
    render: (text) => <span className="text-sm font-bold text-gray-700">{text}</span>
  },
  {
    title: "DEPARTMENT",
    dataIndex: "department",
    key: "department",
    render: (text) => <span className="text-sm font-bold text-gray-800 whitespace-pre-line leading-tight block">{text}</span>
  },
  {
    title: "ROLE",
    dataIndex: "role",
    key: "role",
    render: (text) => (
      <span className="bg-[#ebf0fc] text-[#0033a0] text-[10px] font-black tracking-wider px-3 py-1.5 rounded-full uppercase">
        {text}
      </span>
    )
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${text === 'Active' ? 'bg-[#00a89d]' : 'bg-gray-400'}`}></span>
        <span className={`text-[13px] font-bold ${text === 'Active' ? 'text-[#00a89d]' : 'text-gray-500'}`}>
          {text}
        </span>
      </div>
    )
  },
  {
    title: "CREATED DATE",
    dataIndex: "createdDate",
    key: "createdDate",
    render: (text) => <span className="text-sm font-bold text-gray-700 whitespace-pre-line text-[13px] leading-tight block">{text}</span>
  },
  {
    title: "ACTIONS",
    key: "actions",
    align: "center",
    width: 100,
    render: () => (
      <button className="text-gray-400 hover:text-gray-600 transition-colors">
        <AiOutlineMore className="text-2xl" />
      </button>
    )
  }
];

const filterItems: FilterItemDef[] = [
  {
    type: "select",
    name: "department",
    title: "DEPT",
    options: [{ value: "All Departments", label: "All Departments" }, { value: "Design", label: "Design" }, { value: "Developers", label: "Developers" }, { value: "Medical Coders", label: "Medical Coders" }, { value: "HR", label: "HR" }],
    active: true,
  },
  {
    type: "select",
    name: "role",
    title: "ROLE",
    options: [{ value: "All Roles", label: "All Roles" }, { value: "Lead", label: "Lead" }, { value: "Member", label: "Member" }],
    active: true,
  },
  {
    type: "select",
    name: "status",
    title: "STATUS",
    options: [{ value: "Any Status", label: "Any Status" }, { value: "Active", label: "Active" }, { value: "Deactivated", label: "Deactivated" }],
    active: true,
  }
];

const UsersPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  return (
    <div className=" h-full flex flex-col pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10 pt-4">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">
            User Management
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed font-medium">
            Orchestrate your organization&apos;s talent ecosystem with precision. Manage
            permissions, monitor activity, and configure departmental access.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#ebf0fc] text-[#0033a0] hover:bg-[#d8e2fa] transition-colors py-2.5 px-5 rounded-[10px] flex items-center gap-2 font-bold shadow-sm text-sm border border-[#d8e2fa]">
            <AiOutlineUpload className="text-lg" />
            Import Users
          </button>
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="bg-[#143477] text-white hover:bg-[#0f265e] transition-colors py-2.5 px-6 rounded-[10px] flex items-center gap-2 font-bold shadow-md text-sm"
          >
            <AiOutlineUserAdd className="text-lg" />
            Create User
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex gap-6 mb-8">
        {/* Reusable Filters Card */}
        <Filters 
          FilterItems={filterItems} 
          selectedOption={selectedFilters} 
          setSelectedOption={setSelectedFilters}
          onReset={() => setSelectedFilters({})}
        />

        {/* Total Users Summary Card */}
        <div className="w-[310px] bg-[#89eed4] rounded-[16px] p-6 shadow-sm border border-[#7ce0c8] relative overflow-hidden flex flex-col justify-center flex-shrink-0">
          <div className="relative z-10">
            <h3 className="text-[#006056] font-extrabold tracking-widest text-[12px] mb-0.5 opacity-90">TOTAL USERS</h3>
            <div className="text-[#006056] font-black text-4xl">1,284</div>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-[#54d4b3]/60 rounded-full flex items-center justify-center shadow-inner">
            <AiOutlineTeam className="text-[#006056] text-3xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Datatable Section */}
      <div className="flex-1 border-transparent overflow-hidden custom-users-table">
        <TableComponent 
          columns={columns}
          dataSource={users}
          rowKey="id"
          tableProps={{
            pagination: { 
              total: 1284,
              showTotal: (total: number, range: [number, number]) => (
                <span className="text-gray-500 text-[11px] uppercase tracking-widest font-extrabold flex items-center">
                  Showing&nbsp;<strong className="text-gray-900 font-black">{range[0]}-{range[1]}</strong>&nbsp;of&nbsp;<strong className="text-gray-900 font-black">1,284</strong>&nbsp;users
                </span>
              )
            },
            className: "[&_.ant-table-thead>tr>th]:bg-[#f9fafb] [&_.ant-table-thead>tr>th]:text-gray-500 [&_.ant-table-thead>tr>th]:font-extrabold [&_.ant-table-thead>tr>th]:text-[11px] [&_.ant-table-thead>tr>th]:uppercase [&_.ant-table-thead>tr>th]:tracking-widest [&_.ant-table-thead>tr>th]:py-5 [&_.ant-table-thead>tr>th]:px-6 [&_.ant-table-tbody>tr>td]:py-4 [&_.ant-table-tbody>tr>td]:px-6 [&_.ant-table-tbody>tr>td]:border-b [&_.ant-table-tbody>tr>td]:border-gray-50 hover:[&_.ant-table-tbody>tr>td]:bg-gray-50/50"
          }}
        />
      </div>

      {/* Render Drawer */}
      <CreateUser isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default UsersPage;