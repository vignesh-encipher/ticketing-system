"use client";

import React from "react";
import { Drawer, Form, Input, Select, Checkbox, Button } from "antd";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUser({ isOpen, onClose }: CreateUserProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Submitted user data:", values);
    // Optionally close and reset
    // onClose();
    // form.resetFields();
  };

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement="right"
      width={520}
      closable={false}
      styles={{
        body: { padding: 0, display: "flex", flexDirection: "column" },
        mask: { backdropFilter: "blur(2px)", backgroundColor: "rgba(0, 0, 0, 0.2)" }
      }}
    >
      <Form 
        form={form} 
        onFinish={onFinish} 
        layout="vertical" 
        className="flex flex-col h-full w-full"
        initialValues={{
          fullName: "",
          email: "",
          employeeId: "",
          department: "Design",
          roleType: "Member",
          permissions: ["repository", "analytics"]
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 pt-10 pb-6 flex-shrink-0">
          <div>
            <h2 className="text-[22px] font-black text-[#111827] tracking-tight mb-1">
              Create New User
            </h2>
            <p className="text-gray-500 font-medium text-[15px]">
              Onboard a new member to the organization.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 transition-colors p-1"
          >
            <AiOutlineClose className="text-xl stroke-[40px]" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {/* Profile Picture */}
          <div className="flex items-center gap-6 mb-8 mt-2">
            <div className="w-[88px] h-[88px] rounded-[14px] bg-[#eef3fd] border-2 border-dashed border-[#b3cbf7] flex flex-col items-center justify-center cursor-pointer hover:bg-[#e4ebfb] transition-colors relative">
              <AiOutlineCamera className="text-[#a1bdf1] text-2xl mb-1" />
              <span className="text-[#a1bdf1] text-[10px] font-black uppercase tracking-wider">
                Upload
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-[14px] mb-1">
                Profile Picture
              </span>
              <span className="text-gray-500 font-semibold text-[13px] mb-2 leading-tight">
                JPG, PNG up to 5MB.
              </span>
              <button type="button" className="text-[#0033a0] font-bold text-[13px] hover:underline self-start">
                Use Default Avatar
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <Form.Item name="fullName" style={{ marginBottom: 0 }} rules={[{ required: true, message: 'Please enter a name' }]}>
                <Input
                  placeholder="e.g. Julianne Moore"
                  className="w-full bg-[#e8effc] hover:bg-[#e8effc] focus:bg-[#e8effc] border border-transparent hover:border-[#0033a0] focus:border-[#0033a0] outline-none rounded-lg px-4 py-3 text-gray-800 text-[14px] font-semibold placeholder:text-gray-400 transition-colors shadow-none"
                />
              </Form.Item>
            </div>

            {/* Email and ID Row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                  Work Email
                </label>
                <Form.Item name="email" style={{ marginBottom: 0 }} rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                  <Input
                    type="email"
                    placeholder="j.moore@architect.com"
                    className="w-full bg-[#e8effc] hover:bg-[#e8effc] focus:bg-[#e8effc] border border-transparent hover:border-[#0033a0] focus:border-[#0033a0] outline-none rounded-lg px-4 py-3 text-gray-800 text-[14px] font-semibold placeholder:text-gray-400 transition-colors shadow-none"
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                  Employee ID
                </label>
                <Form.Item name="employeeId" style={{ marginBottom: 0 }}>
                  <Input
                    placeholder="EA-XXXXX"
                    className="w-full bg-[#e8effc] hover:bg-[#e8effc] focus:bg-[#e8effc] border border-transparent hover:border-[#0033a0] focus:border-[#0033a0] outline-none rounded-lg px-4 py-3 text-gray-800 text-[14px] font-semibold placeholder:text-gray-400 transition-colors shadow-none"
                  />
                </Form.Item>
              </div>
            </div>

            {/* Dept and Role Row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                  Department
                </label>
                <Form.Item name="department" style={{ marginBottom: 0 }}>
                  <Select
                    className="w-full [&_.ant-select-selector]:!bg-[#e8effc] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-[#0033a0] focus:[&_.ant-select-selector]:!border-[#0033a0] [&_.ant-select-selector]:!rounded-lg [&_.ant-select-selector]:!h-[46px] [&_.ant-select-selection-item]:leading-[44px] text-gray-800 text-[14px] font-bold shadow-none"
                    options={[
                      { value: 'Design', label: 'Design' },
                      { value: 'Development', label: 'Development' },
                      { value: 'HR', label: 'HR' }
                    ]}
                    suffixIcon={<IoChevronDownOutline className="text-gray-500 text-lg" />}
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                  Role Type
                </label>
                <Form.Item name="roleType" style={{ marginBottom: 0 }}>
                  <Select
                    className="w-full [&_.ant-select-selector]:!bg-[#e8effc] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-[#0033a0] focus:[&_.ant-select-selector]:!border-[#0033a0] [&_.ant-select-selector]:!rounded-lg [&_.ant-select-selector]:!h-[46px] [&_.ant-select-selection-item]:leading-[44px] text-gray-800 text-[14px] font-bold shadow-none"
                    options={[
                      { value: 'Member', label: 'Member' },
                      { value: 'Lead', label: 'Lead' },
                      { value: 'Admin', label: 'Admin' }
                    ]}
                    suffixIcon={<IoChevronDownOutline className="text-gray-500 text-lg" />}
                  />
                </Form.Item>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-[#f4f7fe] rounded-[14px] p-6 mt-1 border border-[#edf3fc]">
              <h3 className="text-[#111827] font-black text-[11px] uppercase tracking-widest mb-4">
                Initial Permissions
              </h3>
              <Form.Item name="permissions" style={{ marginBottom: 0 }}>
                <Checkbox.Group className="flex flex-col gap-3.5 w-full">
                  <Checkbox value="repository" className="text-[14px] font-semibold text-gray-800 m-0 w-full group">
                    <span className="group-hover:text-[#143477] transition-colors">Access to Shared Repository</span>
                  </Checkbox>
                  <Checkbox value="analytics" className="text-[14px] font-semibold text-gray-800 m-0 w-full group">
                    <span className="group-hover:text-[#143477] transition-colors">View Department Analytics</span>
                  </Checkbox>
                  <Checkbox value="webhooks" className="text-[14px] font-semibold text-gray-800 m-0 w-full group">
                    <span className="group-hover:text-[#143477] transition-colors">Manage System Webhooks</span>
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 flex justify-end items-center gap-4 bg-white mt-auto border-t border-gray-100 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.02)] flex-shrink-0">
          <Button
            type="text"
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-bold text-[14px] px-4 py-5 hover:bg-gray-50 rounded-lg transition-colors border-none"
          >
            Discard
          </Button>
          <Button 
            type="primary"
            htmlType="submit"
            className="bg-[#143477] hover:!bg-[#0f265e] border-none text-white py-5 px-7 rounded-[10px] font-bold shadow-md text-sm"
          >
            Save User
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}