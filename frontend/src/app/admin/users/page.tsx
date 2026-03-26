"use client";

import React, { useState, useEffect } from "react";
import CreateUser from "./components/CreateUser/page";
import { TableComponent } from "../../../components/table";
import type { ColumnsType } from "../../../components/table";
import Filters, { FilterItemDef } from "../../../components/filter";
import {
  AiOutlineUpload,
  AiOutlineUserAdd,
  AiOutlineTeam,
  AiOutlineMore,
} from "react-icons/ai";
import { getStatus } from "@/util/shared-functions";
import { connect } from "react-redux";
import { actions as usersActions } from "@/state/users";
import UsersState from "@/state/users/model";
import { Switch } from "antd";
import { getResponsePopup } from "@/util/formatting";

const filterItems: FilterItemDef[] = [
  {
    type: "select",
    name: "department",
    title: "DEPT",
    options: [
      { value: "All Departments", label: "All Departments" },
      { value: "Design", label: "Design" },
      { value: "Developers", label: "Developers" },
      { value: "Medical Coders", label: "Medical Coders" },
      { value: "HR", label: "HR" },
    ],
    active: true,
  },
  {
    type: "select",
    name: "role",
    title: "ROLE",
    options: [
      { value: "All Roles", label: "All Roles" },
      { value: "Lead", label: "Lead" },
      { value: "Member", label: "Member" },
    ],
    active: true,
  },
  {
    type: "select",
    name: "status",
    title: "STATUS",
    options: [
      { value: "Any Status", label: "Any Status" },
      { value: "Active", label: "Active" },
      { value: "Deactivated", label: "Deactivated" },
    ],
    active: true,
  },
];

interface UsersPageProps {
  getUsers: (params: any) => Promise<any>;
  getUsersData: any;
  getUsersDataLoad?: boolean;
  getDepartments: () => Promise<any>;
  updateStatusUser: (params: any) => Promise<any>;
}

const UsersPage = ({ getUsers, getUsersData, getUsersDataLoad, getDepartments, updateStatusUser }: UsersPageProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [tableParams, setTableParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortByField: "",
    sortByType: "",
  });

  const columns: ColumnsType<any> = [
  {
    title: "USER PROFILE",
    key: "profile",
    render: (_, record) => {
      // Create initials from name dynamically
      const initials = record.name ? record.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
      const avatarColor = "bg-blue-900"; // fallback color
      return (
        <div className="flex items-center gap-4 py-1">
          {record.profileImage ? 
            <img src={record.profileImage} alt="avatar" className="w-[42px] h-[42px] rounded-md" />
           : (
            <div
              className={`w-[42px] h-[42px] rounded-md flex items-center justify-center font-bold text-white text-sm shadow-sm ${avatarColor}`}
            >
              {initials}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-gray-900 font-bold text-sm tracking-tight truncate max-w-[150px]">
              {record.name}
            </span>
            <span className="text-gray-500 text-xs font-semibold truncate max-w-[150px]">
              {record.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    title: "EMPLOYEE ID",
    dataIndex: "employeeId",
    key: "employeeId",
    render: (text: string) => (
      <span className="text-sm font-bold text-gray-700">{text}</span>
    ),
  },
  {
    title: "DEPARTMENT",
    dataIndex: ["department", "name"],
    key: "department",
    render: (text: string) => (
      <span className="text-sm font-bold text-gray-800 whitespace-pre-line leading-tight block">
        {text || "N/A"}
      </span>
    ),
  },
  {
    title: "ROLE",
    dataIndex: "roleType",
    key: "roleType",
    render: (text: string) => (
      <span className="bg-[#ebf0fc] text-[#0033a0] text-[10px] font-black tracking-wider px-3 py-1.5 rounded-full uppercase">
        {text || "MEMBER"}
      </span>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text: string, record: any) => {
      return <Switch
        checked={text?.toLowerCase() === "active"}
        onChange={(checked) => {
          handleUpdateStatusUser({ id: record._id, status: checked ? "Active" : "Inactive" });
        }}
      />
    }
  },
  {
    title: "CREATED DATE",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => {
      const date = new Date(text || Date.now());
      return (
        <span className="text-sm font-bold text-gray-700 whitespace-pre-line text-[13px] leading-tight block">
          {date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      );
    },
  },
];



  const getUsersListApi = async () => {
    try {
      const res = await getUsers({ ...tableParams });
      return res;
    } catch (error) {
      return error;
    }
  } 
   const handleUpdateStatusUser = async ({id, status}: {id: string, status: string}) => {
    try {
      const res = await updateStatusUser({ id, status });
      if (res.status == "SUCCESS") {
        getResponsePopup(res);
        getUsersListApi();
      }
      getResponsePopup(res);
    } catch (error) {
      getResponsePopup(error);
    }
  }

  useEffect(() => {
    getDepartments()
  }, [])


  useEffect(() => {
    getUsersListApi();
  }, [tableParams, getUsers]);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      ...tableParams,
      page: pagination.current,
      limit: pagination.pageSize,
      sortByField: sorter.field || "createdAt",
      sortByType: sorter.order === "ascend" ? "asc" : "desc",
    });
  };

  const usersList = getUsersData?.response?.users || [];
  const totalCount = getUsersData?.response?.totalCount || 0;
  return (
    <div className=" h-full flex flex-col pb-12">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10 pt-4">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">
            User Management
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed font-medium">
            Orchestrate your organization&apos;s talent ecosystem with
            precision. Manage permissions, monitor activity, and configure
            departmental access.
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
            <h3 className="text-[#006056] font-extrabold tracking-widest text-[12px] mb-0.5 opacity-90">
              TOTAL USERS
            </h3>
            <div className="text-[#006056] font-black text-4xl">{totalCount.toLocaleString()}</div>
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
          dataSource={usersList}
          rowKey="_id"
          loading={getUsersDataLoad}
          tableProps={{
            onChange: handleTableChange,
            pagination: {
              current: tableParams.page,
              pageSize: tableParams.limit,
              total: totalCount,
              showTotal: (total: number, range: [number, number]) => (
                <span className="text-gray-500 text-[11px] uppercase tracking-widest font-extrabold flex items-center">
                  Showing&nbsp;
                  <strong className="text-gray-900 font-black">
                    {range[0]}-{range[1]}
                  </strong>
                  &nbsp;of&nbsp;
                  <strong className="text-gray-900 font-black">{total.toLocaleString()}</strong>
                  &nbsp;users
                </span>
              ),
            },
            className:
              "[&_.ant-table-thead>tr>th]:bg-[#f9fafb] [&_.ant-table-thead>tr>th]:text-gray-500 [&_.ant-table-thead>tr>th]:font-extrabold [&_.ant-table-thead>tr>th]:text-[11px] [&_.ant-table-thead>tr>th]:uppercase [&_.ant-table-thead>tr>th]:tracking-widest [&_.ant-table-thead>tr>th]:py-5 [&_.ant-table-thead>tr>th]:px-6 [&_.ant-table-tbody>tr>td]:py-4 [&_.ant-table-tbody>tr>td]:px-6 [&_.ant-table-tbody>tr>td]:border-b [&_.ant-table-tbody>tr>td]:border-gray-50 hover:[&_.ant-table-tbody>tr>td]:bg-gray-50/50",
          }}
        />
      </div>

      {/* Render Drawer */}
      <CreateUser
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={() => getUsersListApi()}
      />
    </div>
  );
};

const enhancer = connect(
  (state: { users: UsersState }) => ({
    getUsersData: state.users.getUsers.data,
    getUsersDataLoad: state.users.getUsersLoading,
  }),
  {
    getUsers: usersActions.getUsers,
    updateStatusUser: usersActions.updateStatusUser,
    getDepartments: usersActions.getDepartments,
  }
);

export default enhancer(UsersPage);
