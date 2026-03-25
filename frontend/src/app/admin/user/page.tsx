"use client";

import React, { useEffect, useState } from "react";
import { TableComponent } from "@/components/table";
import type { ColumnsType } from "antd/es/table";
import { Tag, Button, Space, message, Modal, Form, Input, Select, DatePicker } from "antd";
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import { connect } from "react-redux";
import { actions as dashboardActions } from "@/state/card";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateOfBirth?: string;
}

interface AdminUserPageProps {
  getUsers: () => Promise<any>;
  createUser: (payload: any) => Promise<any>;
  updateUser: (payload: any) => Promise<any>;
  deleteUser: (id: string) => Promise<any>;
  getUsersData: User[];
  getUsersDataLoad?: boolean;
}

const AdminUserPage = ({
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsersData,
  getUsersDataLoad,
}: AdminUserPageProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  
  // Protect route
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const loadData = async () => {
    try {
      await getUsers();
    } catch (err) {
      message.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phoneNumber: record.phoneNumber,
      role: record.role,
      dateOfBirth: record.dateOfBirth ? dayjs(record.dateOfBirth) : null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      onOk: async () => {
        try {
          await deleteUser(id);
          message.success("User deleted successfully");
          loadData();
        } catch (err) {
          message.error("Failed to delete user");
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = { ...values };
      
      if (values.password && values.password !== values.confirmPassword) {
        message.error("Passwords do not match!");
        return;
      }

      if (editingUser) {
        await updateUser({ id: editingUser._id, data: payload });
        message.success("User updated successfully");
      } else {
        await createUser(payload);
        message.success("User created successfully");
      }

      setIsModalOpen(false);
      form.resetFields();
      setEditingUser(null);
      loadData();
    } catch (err) {
      console.log(err);
      message.error("Operation failed. Please check form inputs.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
    setEditingUser(null);
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={text === "Admin" ? "red" : text === "Manager" ? "blue" : "green"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<AiOutlineEdit />} onClick={() => handleEdit(record)} size="small">
            Edit
          </Button>
          <Button type="link" danger icon={<AiOutlineDelete />} onClick={() => handleDelete(record._id)} size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-500">Manage, create, and delete users across the application.</p>
        </div>
        <Button 
          type="primary" 
          icon={<AiOutlinePlus />} 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add User
        </Button>
      </div>

      <TableComponent
        columns={columns}
        dataSource={Array.isArray(getUsersData) ? getUsersData : []}
        loading={getUsersDataLoad}
        tableProps={{
          scroll: { x: 800 },
          size: "middle",
        }}
      />

      <Modal
        title={editingUser ? "Edit User" : "Create User"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={closeModal}
        okText={editingUser ? "Update" : "Create"}
        okButtonProps={{ className: "bg-blue-600" }}
        destroyOnClose
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please input a valid email!" }]}>
            <Input placeholder="example@email.com" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: "Please input phone number!" }]}>
            <Input placeholder="+1234567890" />
          </Form.Item>
          <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true, message: "Please select Date of Birth!" }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select a role!" }]}>
            <Select placeholder="Select a role">
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Developer">Developer</Select.Option>
            </Select>
          </Form.Item>
          {!editingUser && (
            <>
              <Form.Item name="password" label="Password" rules={[{ required: true, min: 6, message: "Password must be at least 6 characters!" }]}>
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item name="confirmPassword" label="Confirm Password" rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords do not match!"));
                    },
                  })
                ]}>
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

const enhancer = connect(
  (state: any) => ({
    getUsersData: state.card?.getUsers?.data || [],
    getUsersDataLoad: state.card?.getUsersLoading || false,
  }),
  {
    getUsers: dashboardActions.getUsers,
    createUser: dashboardActions.createUser,
    updateUser: dashboardActions.updateUser,
    deleteUser: dashboardActions.deleteUser,
  }
);

export default enhancer(AdminUserPage);
