"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import TableComponent from "../../../components/table/TableComponent";
import Filters from "../../../components/filter";
import CreateTicketDrawer from "./components/createTicket/page";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineMore } from "react-icons/ai";
import { getPriority, getStatus } from "@/util/shared-functions";
import { useRouter } from "next/navigation";
import { getTickets } from "@/state/tickets/actions";
import { exactData, getPriorities } from "@/util/formatting";
import { connect } from "react-redux";
import TicketsState from "@/state/tickets/model";
import { actions as ticketsActions } from "@/state/tickets";
import { actions as usersActions } from "@/state/users";
import UsersState from "@/state/users/model";

// Filter configuration matching backend
const filterItem = [
  {
    type: "select" as const,
    name: "department",
    placeholder: "Select Department",
    title: "DEPARTMENT",
    options: [],
    active: true,
  },
  {
    type: "select" as const,
    name: "status",
    title: "STATUS",
    placeholder: "Select Status",
    options: [
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
    placeholder: "Select Priority",
    options: [
      ...getPriorities,
    ],
    active: true,
  },
];

interface TicketsPageProps {
  getTickets: (params: any) => Promise<any>;
  getTicketsData: any;
  getTicketsDataLoad?: boolean;
  getDepartments: (params: any) => Promise<any>;
  departmentsData: any;
}

const TicketsPage = ({
  getTickets,
  getTicketsData,
  getTicketsDataLoad,
  getDepartments,
  departmentsData,
}: TicketsPageProps) => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterItems, setFilterItems] = useState(filterItem);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [tableParams, setTableParams] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  // Handle table pagination manually
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const columns: ColumnsType<any> = [
    {
      title: "TICKET ID",
      dataIndex: "ticketId",
      key: "ticketId",
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
            Created {exactData(record.createdAt)}
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
          {text || "-"}
        </span>
      ),
    },
    {
      title: "TARGET DEPT",
      dataIndex: "targetDept",
      key: "targetDept",
      width: 140,
      render: (text) => (
        <span className="text-gray-700 font-semibold text-[14px]">
          {text || "-"}
        </span>
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
      key: "assignee",
      width: 160,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.assignee?.profileImage ? (
            <img
              src={record.assignee.profileImage}
              alt={record.assignee?.name || "Assignee"}
              className="w-8 h-8 rounded-full object-cover shadow-sm bg-gray-100"
            />
          ) : (
            <div className="w-8 h-8 rounded-full shadow-sm bg-gray-100 flex items-center justify-center font-bold text-gray-400">
              {record.assignee?.name ? record.assignee.name.charAt(0) : "?"}
            </div>
          )}
          <span className="text-gray-800 font-semibold text-[13px] leading-tight whitespace-pre-line">
            {record.assignee?.name || "Unassigned"}
          </span>
        </div>
      ),
    },
    {
      title: "Created By",
      key: "createdBy",
      width: 160,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {record.createdBy?.profileImage ? (
            <img
              src={record.createdBy.profileImage}
              alt={record.createdBy?.name || "Assignee"}
              className="w-8 h-8 rounded-full object-cover shadow-sm bg-gray-100"
            />
          ) : (
            <div className="w-8 h-8 rounded-full shadow-sm bg-gray-100 flex items-center justify-center font-bold text-gray-400">
              {record.createdBy?.name ? record.createdBy.name.charAt(0) : "?"}
            </div>
          )}
          <span className="text-gray-800 font-semibold text-[13px] leading-tight whitespace-pre-line">
            {record.createdBy?.name || "--"}
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
        <button
          className="text-gray-400 hover:text-[#143477] transition-colors p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineMore className="text-2xl" />
        </button>
      ),
    },
  ];

  const getTicketsListApi = async () => {
    try {
      const res = await getTickets({ ...tableParams, ...selectedFilters });
      return res;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getDepartments({});
  }, []);

  useEffect(() => {
    getTicketsListApi();
  }, [tableParams, selectedFilters]);

  useEffect(() => {
    if (departmentsData?.status == "SUCCESS") {
      const deptOptions = departmentsData?.response?.departments?.map(
        (d: any) => ({
          value: d.name,
          label: d.name,
        }),
      );
      const data = filterItems.map((item: any) => {
        if (item.name === "department") {
          return {
            ...item,
            options: [
              ...deptOptions,
            ],
          };
        }
        return item;
      });
      setFilterItems(data);
    }
  }, [departmentsData]);

  const totalCount = getTicketsData?.total;
  const criticalCount = getTicketsData?.tickets?.filter(
    (ticket: any) => ticket.priority === "Critical",
  ).length;
  const ticketsList = getTicketsData?.response?.tickets;

  return (
    <div className="h-full flex flex-col pb-12 pt-6">
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
          {/* <div className="bg-[#f8f9fa] rounded-[16px] py-4 px-6 min-w-[140px] flex flex-col items-center justify-center">
            <span className="text-gray-500 font-extrabold text-[10px] tracking-widest uppercase mb-1">
              TOTAL ACTIVE
            </span>
            <span className="text-[#143477] text-3xl font-black">{totalCount}</span>
          </div>
          <div className="bg-[#f8f9fa] rounded-[16px] py-4 px-6 min-w-[140px] flex flex-col items-center justify-center">
            <span className="text-gray-500 font-extrabold text-[10px] tracking-widest uppercase mb-1">
              CRITICAL
            </span>
            <span className="text-red-600 text-3xl font-black">{criticalCount}</span>
          </div> */}
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-8 flex">
        <Filters
          FilterItems={filterItems}
          selectedOption={selectedFilters}
          setSelectedOption={setSelectedFilters}
        />
      </div>

      {/* Datatable Section */}
      <div className="flex-1 border-transparent overflow-hidden custom-users-table">
        <TableComponent
          columns={columns}
          dataSource={ticketsList}
          rowKey="id"
          loading={getTicketsDataLoad}
          onRowClick={(record) => {
            console.log("Row clicked:", record);
            router.push(`/admin/tickets/details/${record.id}`);
          }}
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
                  <strong className="text-gray-900 font-black">{total}</strong>
                  &nbsp;tickets
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
        getTicketsListApi={getTicketsListApi}
      />
    </div>
  );
};

const enhancer = connect(
  (state: { tickets: TicketsState; users: UsersState }) => ({
    getTicketsData: state.tickets.getTickets.data,
    getTicketsDataLoad: state.tickets.getTicketsLoading,
    departmentsData: state.users.getDepartments.data,
  }),
  {
    getTickets: ticketsActions.getTickets,
    getDepartments: usersActions.getDepartments,
  },
);

export default enhancer(TicketsPage);
