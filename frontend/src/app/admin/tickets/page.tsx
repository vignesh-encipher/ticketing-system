"use client";

import React, { useState } from "react";
import Image from "next/image";
import TableComponent from "../../../components/table/TableComponent";
import Filters from "../../../components/filter";
import CreateTicketDrawer from "./components/createTicket/page";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineMore } from "react-icons/ai";
import { getPriority, getStatus } from "@/util/shared-functions";
import { useRouter } from "next/navigation";

// Mock data based on the provided image
const tickets = [
  {
    key: "1",
    id: "#TK-9021",
    title: "API Gateway Latency Spike",
    created: "Created 2h ago",
    sourceDept: "Medical Coders",
    targetDept: "IT",
    priority: "CRITICAL",
    status: "Open",
    assigneeName: "Julian Dash",
    assigneeAvatar: "https://i.pravatar.cc/150?u=julian",
  },
  {
    key: "2",
    id: "#TK-8842",
    title: "Campaign Asset Approval",
    created: "Created 5h ago",
    sourceDept: "Marketing",
    targetDept: "Design",
    priority: "MEDIUM",
    status: "In Progress",
    assigneeName: "Sara Chen",
    assigneeAvatar: "https://i.pravatar.cc/150?u=sara",
  },
  {
    key: "3",
    id: "#TK-8710",
    title: "Q4 Payroll Discrepancy",
    created: "Created 1d ago",
    sourceDept: "HR",
    targetDept: "IT",
    priority: "HIGH",
    status: "Resolved",
    assigneeName: "Marcus K.",
    assigneeAvatar: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    key: "4",
    id: "#TK-8655",
    title: "DB Schema Migration",
    created: "Created 2d ago",
    sourceDept: "Developers",
    targetDept: "IT",
    priority: "LOW",
    status: "Closed",
    assigneeName: "Tasha R.",
    assigneeAvatar: "https://i.pravatar.cc/150?u=tasha",
  },
  {
    key: "5",
    id: "#TK-8511",
    title: "New Hire Onboarding Pack",
    created: "Created 3d ago",
    sourceDept: "Design",
    targetDept: "HR",
    priority: "MEDIUM",
    status: "In Progress",
    assigneeName: "Elena Lopez",
    assigneeAvatar: "https://i.pravatar.cc/150?u=elena",
  },
];

const columns: ColumnsType<(typeof tickets)[0]> = [
  {
    title: "TICKET ID",
    dataIndex: "id",
    key: "id",
    width: 120,
    render: (text) => (
      <span className="text-[#143477] font-bold text-[13px]">{text}</span>
    ),
  },
  {
    title: "TITLE",
    key: "title",
    width: 200,
    render: (_, record) => (
      <div className="flex flex-col py-1">
        <span className="text-gray-900 font-extrabold text-[14px] whitespace-pre-line leading-tight">
          {record.title}
        </span>
        <span className="text-gray-500 text-[11px] font-semibold mt-1">
          {record.created}
        </span>
      </div>
    ),
  },
  {
    title: "SOURCE DEPT",
    dataIndex: "sourceDept",
    key: "sourceDept",
    width: 140,
    render: (text) => (
      <span className="text-gray-700 font-semibold text-[14px] whitespace-pre-line leading-tight">
        {text}
      </span>
    ),
  },
  {
    title: "TARGET DEPT",
    dataIndex: "targetDept",
    key: "targetDept",
    width: 140,
    render: (text) => (
      <span className="text-gray-700 font-semibold text-[14px]">{text}</span>
    ),
  },
  {
    title: "PRIORITY",
    dataIndex: "priority",
    key: "priority",
    width: 120,
    render: (text) => getPriority(text),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    width: 140,
    render: (text) => getStatus(text),
  },
  {
    title: "ASSIGNED TO",
    key: "assignedTo",
    width: 160,
    render: (_, record) => (
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={record.assigneeAvatar}
          alt={record.assigneeName}
          className="w-8 h-8 rounded-full object-cover shadow-sm bg-gray-100"
        />
        <span className="text-gray-800 font-semibold text-[13px] leading-tight whitespace-pre-line">
          {record.assigneeName}
        </span>
      </div>
    ),
  },
  {
    title: "",
    key: "actions",
    align: "right",
    width: 50,
    render: () => (
      <button className="text-gray-400 hover:text-[#143477] transition-colors p-1">
        <AiOutlineMore className="text-2xl" />
      </button>
    ),
  },
];

const filterItems = [
  {
    type: "select" as const,
    name: "department",
    title: "DEPARTMENT",
    options: [
      { value: "All Departments", label: "All Departments" },
      { value: "Medical Coders", label: "Medical Coders" },
      { value: "Marketing", label: "Marketing" },
      { value: "HR", label: "HR" },
      { value: "Developers", label: "Developers" },
    ],
    active: true,
  },
  {
    type: "select" as const,
    name: "status",
    title: "STATUS",
    options: [
      { value: "All Statuses", label: "All Statuses" },
      { value: "Open", label: "Open" },
      { value: "In Progress", label: "In Progress" },
      { value: "Resolved", label: "Resolved" },
      { value: "Closed", label: "Closed" },
    ],
    active: true,
  },
  {
    type: "select" as const,
    name: "priority",
    title: "PRIORITY",
    options: [
      { value: "All Priorities", label: "All Priorities" },
      { value: "Critical", label: "Critical" },
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
    active: true,
  },
];

const TicketsPage = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  return (
    <div className="h-full flex flex-col pb-12 pt-6">
        {/* Create Ticket Button */}
       
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-[#006056] font-extrabold tracking-widest text-[11px] mb-1.5 uppercase">
            OPERATIONAL OVERVIEW
          </h2>
          <h1 className="text-4xl font-extrabold text-[#111827] tracking-tight">
            Ticket Repository
          </h1>
        </div>

        {/* Metric Cards */}
        <div className="flex gap-4">
           <div className="flex justify-end">
          <button
            className="bg-[#143477] cursor-pointer text-white hover:bg-[#0f265e] transition-colors py-2.5 px-6 rounded-[10px] flex items-center gap-2 font-bold shadow-md text-sm"
            onClick={() => setIsDrawerOpen(true)}
          >
            Create Ticket
          </button>
        </div>
          <div className="bg-[#f8f9fa] rounded-[16px] py-4 px-6 min-w-[140px] flex flex-col items-center justify-center">
            <span className="text-gray-500 font-extrabold text-[10px] tracking-widest uppercase mb-1">
              TOTAL ACTIVE
            </span>
            <span className="text-[#143477] text-3xl font-black">1,284</span>
          </div>
          <div className="bg-[#f8f9fa] rounded-[16px] py-4 px-6 min-w-[140px] flex flex-col items-center justify-center">
            <span className="text-gray-500 font-extrabold text-[10px] tracking-widest uppercase mb-1">
              CRITICAL
            </span>
            <span className="text-red-600 text-3xl font-black">12</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8 flex">
        <Filters
          FilterItems={filterItems}
          selectedOption={selectedFilters}
          setSelectedOption={setSelectedFilters}
          onApply={() => console.log("Filters Applied:", selectedFilters)}
        />
      </div>

      {/* Datatable Section */}
      <div className="flex-1">
        <TableComponent
          columns={columns}
          dataSource={tickets}
          rowKey="id"
          onRowClick={(record) => {
            console.log("Row clicked:", record);
            router.push(`/admin/tickets/details/${record.id}`);
          }}  
          tableProps={{
            pagination: {
              total: 1284,
              showTotal: (total: number, range: [number, number]) => (
                <span className="text-gray-500 text-[11px] uppercase tracking-widest font-extrabold flex items-center">
                  Showing&nbsp;
                  <strong className="text-gray-900 font-black">
                    {range[0]}-{range[1]}
                  </strong>
                  &nbsp;of&nbsp;
                  <strong className="text-gray-900 font-black">1,284</strong>
                  &nbsp;users
                </span>
              ),
            },
            className:
              "[&_.ant-table-thead>tr>th]:bg-[#f9fafb] [&_.ant-table-thead>tr>th]:text-gray-500 [&_.ant-table-thead>tr>th]:font-extrabold [&_.ant-table-thead>tr>th]:text-[11px] [&_.ant-table-thead>tr>th]:uppercase [&_.ant-table-thead>tr>th]:tracking-widest [&_.ant-table-thead>tr>th]:py-5 [&_.ant-table-thead>tr>th]:px-6 [&_.ant-table-tbody>tr>td]:py-4 [&_.ant-table-tbody>tr>td]:px-6 [&_.ant-table-tbody>tr>td]:border-b [&_.ant-table-tbody>tr>td]:border-gray-50 hover:[&_.ant-table-tbody>tr>td]:bg-gray-50/50",
          }}
        />
      </div>
       <CreateTicketDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default TicketsPage;
