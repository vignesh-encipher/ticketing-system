"use client";

import React, { useState, useMemo } from "react";
import {
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  message,
  Upload,
  ConfigProvider,
} from "antd";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { actions as usersActions } from "@/state/users";
import UsersState from "@/state/users/model";
import { getResponsePopup, getRoles } from "@/util/formatting";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<any>;
  createUser: (payload: any) => Promise<any>;
  departmentsData: any;
  createUserLoading: boolean | undefined;
}

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

  // Optimized Image Handling (URL instead of Base64 string)
  const handleChange = (info: any) => {
    if (info.file.originFileObj) {
      // Clean up old object URL to prevent memory leaks
      if (imageUrl) URL.revokeObjectURL(imageUrl);

      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url);
    }
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        name: values.fullName,
        email: values.email,
        employeeId: values.employeeId,
        roleType: values.roleType,
        department: values.department,
        profileImage: imageUrl || "", // Note: If your backend expects Base64, convert here ONLY on submit
      };

      const res = await createUser(payload);
      if (res?.status === "SUCCESS") {
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
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(undefined);
    onClose();
  };

  // Memoize department options to prevent recalculation on every keystroke
  const deptOptions = useMemo(() => {
    const list = departmentsData?.response?.departments || [];
    return list.map((d: any) => ({
      value: d.id,
      label: d.name,
    }));
  }, [departmentsData]);

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) message.error("You can only upload JPG/PNG file!");
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) message.error("Image must be smaller than 5MB!");
    return isJpgOrPng && isLt5M;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            controlHeight: 46,
            borderRadius: 8,
            colorBgContainer: "#e8effc",
            colorPrimaryHover: "#0033a0",
            colorBorder: "transparent",
          },
          Input: {
            controlHeight: 46,
            borderRadius: 8,
            colorBgContainer: "#e8effc",
            colorPrimaryHover: "#0033a0",
          },
        },
      }}
    >
      <Drawer
        open={isOpen}
        onClose={handleClose}
        placement="right"
        width={520}
        closable={false}
        styles={{
          body: { padding: 0, display: "flex", flexDirection: "column" },
          mask: { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // Removed blur for performance
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
              <AiOutlineClose className="text-xl" />
            </button>
          </div>

          {/* Form Body - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 pb-8 custom-scrollbar">
            {/* Profile Picture */}
            <div className="flex items-center gap-6 mb-8 mt-2">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader !rounded-[14px] !bg-[#eef3fd] !border-2 !border-dashed !border-[#b3cbf7] overflow-hidden"
                showUploadList={false}
                customRequest={({ onSuccess }: any) =>
                  setTimeout(() => onSuccess("ok"), 0)
                }
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <div className="w-full h-full relative group">
                    <img
                      src={imageUrl}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <AiOutlineCamera className="text-white text-xl mb-1" />
                      <span className="text-white text-[9px] font-black uppercase">
                        Change
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <AiOutlineCamera className="text-[#a1bdf1] text-2xl mb-1" />
                    <span className="text-[#a1bdf1] text-[10px] font-black uppercase">
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
                <button
                  type="button"
                  onClick={() => setImageUrl(undefined)}
                  className="text-[#0033a0] font-bold text-[13px] hover:underline self-start"
                >
                  {imageUrl ? "Remove Image" : "Use Default Avatar"}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <Form.Item
                label={
                  <span className="text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                    Full Name
                  </span>
                }
                name="fullName"
                rules={[{ required: true, message: "Please enter a name" }]}
              >
                <Input
                  placeholder="e.g. Julianne Moore"
                  className="font-semibold"
                />
              </Form.Item>

              {/* Email and ID Row */}
              <div className="flex gap-4">
                <Form.Item
                  className="flex-1"
                  label={
                    <span className="text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                      Work Email
                    </span>
                  }
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Valid email required",
                    },
                  ]}
                >
                  <Input
                    placeholder="j.moore@architect.com"
                    className="font-semibold"
                  />
                </Form.Item>
                <Form.Item
                  className="flex-1"
                  label={
                    <span className="text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                      Employee ID
                    </span>
                  }
                  name="employeeId"
                  rules={[{ required: true, message: "Identifier required" }]}
                >
                  <Input placeholder="EA-XXXXX" className="font-semibold" />
                </Form.Item>
              </div>

              {/* Dept and Role Row */}
              <div className="flex gap-4">
                <Form.Item
                  className="flex-1"
                  label={
                    <span className="text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                      Department
                    </span>
                  }
                  name="department"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Department"
                    options={deptOptions}
                    suffixIcon={
                      <IoChevronDownOutline className="text-gray-500" />
                    }
                  />
                </Form.Item>
                <Form.Item
                  className="flex-1"
                  label={
                    <span className="text-gray-500 font-bold text-[11px] uppercase tracking-wider">
                      Role Type
                    </span>
                  }
                  name="roleType"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select Role"
                    options={getRoles}
                    suffixIcon={
                      <IoChevronDownOutline className="text-gray-500" />
                    }
                  />
                </Form.Item>
              </div>

              {/* Permissions */}
              <div className="bg-[#f4f7fe] rounded-[14px] p-6 mt-1 border border-[#edf3fc]">
                <h3 className="text-[#111827] font-black text-[11px] uppercase tracking-widest mb-4">
                  Initial Permissions
                </h3>
                <Form.Item
                  name="permissions"
                  noStyle
                  initialValue={["repository", "analytics"]}
                >
                  <Checkbox.Group className="flex flex-col gap-3.5 w-full">
                    <Checkbox
                      value="repository"
                      className="text-[14px] font-semibold text-gray-800"
                    >
                      Access to Shared Repository
                    </Checkbox>
                    <Checkbox
                      value="analytics"
                      className="text-[14px] font-semibold text-gray-800"
                    >
                      View Department Analytics
                    </Checkbox>
                    <Checkbox
                      value="webhooks"
                      className="text-[14px] font-semibold text-gray-800"
                    >
                      Manage System Webhooks
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 flex justify-end items-center gap-4 bg-white mt-auto border-t border-gray-100 z-10 shadow-sm flex-shrink-0">
            <Button
              type="text"
              onClick={handleClose}
              className="text-gray-600 font-bold"
            >
              Discard
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createUserLoading}
              className="bg-[#143477] border-none text-white py-5 px-7 rounded-[10px] font-bold"
            >
              Save User
            </Button>
          </div>
        </Form>
      </Drawer>
    </ConfigProvider>
  );
};

// Use React.memo to prevent re-renders unless props change
const MemoizedCreateUser = React.memo(CreateUser);

const enhancer = connect(
  (state: { users: UsersState }) => ({
    departmentsData: state.users.getDepartments.data,
    createUserLoading: state.users.createUserLoading,
  }),
  {
    createUser: usersActions.createUser,
  },
);

export default enhancer(MemoizedCreateUser);
