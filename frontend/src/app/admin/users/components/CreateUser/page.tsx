"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  message,
  Upload,
} from "antd";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { actions as usersActions } from "@/state/users";
import UsersState from "@/state/users/model";
import { getResponsePopup } from "@/util/formatting";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<any>;
  createUser: (payload: any) => Promise<any>;
  departmentsData: any;
  createUserLoading: boolean | undefined;
}

const getBase64 = (img: any, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const CreateUser = ({
  isOpen,
  onClose,
  onSuccess,
  createUser,
  departmentsData,
  createUserLoading,
}: CreateUserProps) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  const onFinish = async (values: any) => {
    try {
      const payload = {
        name: values.fullName,
        email: values.email,
        employeeId: values.employeeId,
        roleType: values.roleType,
        department: values.department,
        profileImage: imageUrl || "",
      };

      const res = await createUser(payload);
      if (res?.status == "SUCCESS") {
        form.resetFields();
        setImageUrl(undefined);
        onClose();
        onSuccess();
      }
      getResponsePopup(res);
    } catch (err: any) {
      getResponsePopup(err);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setImageUrl(undefined);
    onClose();
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must smaller than 5MB!");
    }
    return isJpgOrPng && isLt5M;
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
    }
  };

  const deptList = departmentsData?.response?.departments || [];
  const deptOptions = deptList?.map((d: any) => ({
    value: d._id,
    label: d.name,
  }));

  return (
    <Drawer
      open={isOpen}
      onClose={handleClose}
      placement="right"
      width={520}
      closable={false}
      styles={{
        body: { padding: 0, display: "flex", flexDirection: "column" },
        mask: {
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="flex flex-col h-full w-full"
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
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-800 transition-colors p-1"
          >
            <AiOutlineClose className="text-xl stroke-[40px]" />
          </button>
        </div>

        {/* Form Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
          {/* Profile Picture */}
          <div className="flex items-center gap-6 mb-8 mt-2">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader overflow-hidden !rounded-[14px] !bg-[#eef3fd] !border-2 !border-dashed !border-[#b3cbf7] flex flex-col items-center justify-center cursor-pointer hover:!bg-[#e4ebfb] transition-colors relative"
              showUploadList={false}
              customRequest={({ onSuccess }: any) =>
                setTimeout(() => onSuccess("ok"), 0)
              }
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <div className="w-full h-full relative group rounded-[12px] overflow-hidden">
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiOutlineCamera className="text-white text-xl mb-1" />
                    <span className="text-white text-[9px] font-black uppercase tracking-wider">
                      Change
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-3">
                  <AiOutlineCamera className="text-[#a1bdf1] text-2xl mb-1" />
                  <span className="text-[#a1bdf1] text-[10px] font-black uppercase tracking-wider">
                    Upload
                  </span>
                </div>
              )}
            </Upload>
            <div className="flex flex-col">
              <span className="text-gray-900 font-bold text-[14px] mb-1">
                Profile Picture
              </span>
              <span className="text-gray-500 font-semibold text-[13px] mb-2 leading-tight">
                JPG, PNG up to 5MB.
              </span>
              {imageUrl ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageUrl(undefined);
                  }}
                  className="text-red-500 font-bold text-[13px] hover:text-red-700 hover:underline self-start transition-colors"
                >
                  Remove Image
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageUrl(undefined);
                  }}
                  className="text-[#0033a0] font-bold text-[13px] hover:underline self-start transition-colors"
                >
                  Use Default Avatar
                </button>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <Form.Item
                name="fullName"
                style={{ marginBottom: 0 }}
                rules={[{ required: true, message: "Please enter a name" }]}
              >
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
                <Form.Item
                  name="email"
                  style={{ marginBottom: 0 }}
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Valid email required",
                    },
                  ]}
                >
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
                <Form.Item
                  name="employeeId"
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true, message: "Identifier required" }]}
                >
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
                <Form.Item
                  name="department"
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Department"
                    options={deptOptions}
                    className="w-full [&_.ant-select-selector]:!bg-[#e8effc] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-[#0033a0] focus:[&_.ant-select-selector]:!border-[#0033a0] [&_.ant-select-selector]:!rounded-lg [&_.ant-select-selector]:!h-[46px] [&_.ant-select-selection-item]:leading-[44px] text-gray-800 text-[14px] font-bold shadow-none"
                    suffixIcon={
                      <IoChevronDownOutline className="text-gray-500 text-lg" />
                    }
                  />
                </Form.Item>
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 font-bold text-[11px] uppercase tracking-wider mb-2">
                  Role Type
                </label>
                <Form.Item
                  name="roleType"
                  style={{ marginBottom: 0 }}
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Role"
                    options={[
                      { value: "Member", label: "Member" },
                      { value: "Lead", label: "Lead" },
                      { value: "Admin", label: "Admin" },
                      { value: "Editor", label: "Editor" },
                    ]}
                    className="w-full [&_.ant-select-selector]:!bg-[#e8effc] [&_.ant-select-selector]:!border-transparent hover:[&_.ant-select-selector]:!border-[#0033a0] focus:[&_.ant-select-selector]:!border-[#0033a0] [&_.ant-select-selector]:!rounded-lg [&_.ant-select-selector]:!h-[46px] [&_.ant-select-selection-item]:leading-[44px] text-gray-800 text-[14px] font-bold shadow-none"
                    suffixIcon={
                      <IoChevronDownOutline className="text-gray-500 text-lg" />
                    }
                  />
                </Form.Item>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-[#f4f7fe] rounded-[14px] p-6 mt-1 border border-[#edf3fc]">
              <h3 className="text-[#111827] font-black text-[11px] uppercase tracking-widest mb-4">
                Initial Permissions
              </h3>
              <Form.Item
                name="permissions"
                style={{ marginBottom: 0 }}
                initialValue={["repository", "analytics"]}
              >
                <Checkbox.Group className="flex flex-col gap-3.5 w-full">
                  <Checkbox
                    value="repository"
                    className="text-[14px] font-semibold text-gray-800 m-0 w-full group"
                  >
                    <span className="group-hover:text-[#143477] transition-colors">
                      Access to Shared Repository
                    </span>
                  </Checkbox>
                  <Checkbox
                    value="analytics"
                    className="text-[14px] font-semibold text-gray-800 m-0 w-full group"
                  >
                    <span className="group-hover:text-[#143477] transition-colors">
                      View Department Analytics
                    </span>
                  </Checkbox>
                  <Checkbox
                    value="webhooks"
                    className="text-[14px] font-semibold text-gray-800 m-0 w-full group"
                  >
                    <span className="group-hover:text-[#143477] transition-colors">
                      Manage System Webhooks
                    </span>
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
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 font-bold text-[14px] px-4 py-5 hover:bg-gray-50 rounded-lg transition-colors border-none"
          >
            Discard
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={createUserLoading}
            className="bg-[#143477] hover:!bg-[#0f265e] border-none text-white py-5 px-7 rounded-[10px] font-bold shadow-md text-sm"
          >
            Save User
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

const enhancer = connect(
  (state: { users: UsersState }) => ({
    departmentsData: state.users.getDepartments.data,
    createUserLoading: state.users.createUserLoading,
  }),
  {
    createUser: usersActions.createUser,
  },
);

export default enhancer(CreateUser);
