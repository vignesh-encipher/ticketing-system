"use client";

import { useEffect } from "react";
import { TableComponent } from "@/components/table";
import type { ColumnsType } from "antd/es/table";
import { Tag, Button, Space, message } from "antd";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { connect } from "react-redux";
import { actions as dashboardActions } from "@/state/card";
import { Users } from "@/models/admin/table";
import Card from "@/state/card/model";

interface AdminTablePage {
  getUsers: () => {};
  getUsersData: Users;
  getUsersDataLoad?: boolean;
}

const AdminTablePage = ({
  getUsers,
  getUsersData,
  getUsersDataLoad,
}: AdminTablePage) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
      } catch (err) {
      } finally {
      }
    };

    fetchData();
  }, []);

  // Define table columns
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 180,
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
      width: 150,
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      key: "company",
      width: 200,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      width: 120,
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      fixed: "right",
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<AiOutlineEye />}
            onClick={() => console.log("View", record)}
            size="small"
          >
            View
          </Button>
          <Button
            type="link"
            icon={<AiOutlineEdit />}
            onClick={() => console.log("Edit", record)}
            size="small"
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<AiOutlineDelete />}
            onClick={() => console.log("Delete", record)}
            size="small"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Admin Table Page</h1>
        <p className="">Manage and view all records in the system.</p>
      </div>

      <TableComponent
        columns={columns}
        dataSource={getUsersData}
        loading={getUsersDataLoad}
        tableProps={{
          scroll: { x: 1200 },
          size: "middle",
        }}
      />
    </div>
  );
};

const enhancer = connect(
  (state: { card: Card }) => ({
    getUsersData: state.card.getUsers.data,
    getUsersDataLoad: state.card.getUsersLoading,
  }),
  {
    getUsers: dashboardActions.getUsers,
  }
);

export default enhancer(AdminTablePage);
