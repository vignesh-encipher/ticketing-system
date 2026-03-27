"use client";
import React, { useState } from "react";
import { Form, Input, Select, Button, Upload, message, Drawer } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
  LinkOutlined,
  InboxOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { AiOutlineClose } from "react-icons/ai";
import TicketEditor from "@/components/textareaAttachment/page";
import { connect } from "react-redux";
import TicketsState from "@/state/tickets/model";
import { actions as ticketsActions } from "@/state/tickets";
import { actions as usersActions } from "@/state/users";
import { getPriorities, getResponsePopup } from "@/util/formatting";
import UsersState from "@/state/users/model";

const { TextArea } = Input;
const { Dragger } = Upload;

interface CreateTicketFormProps {
  isOpen: boolean;
  onClose: () => void;
  createTicket: (payload: any) => Promise<any>;
  createTicketLoading: boolean | undefined;
  getUsersByDepartment: (departmentName: string, role: string) => Promise<any>;
  departmentsData: UsersState["getDepartments"]["data"];
  getTicketsListApi: () => Promise<any>;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({
  isOpen,
  onClose,
  createTicket,
  createTicketLoading,
  getUsersByDepartment,
  departmentsData,
  getTicketsListApi,
}) => {
  const [form] = Form.useForm();
  const [assignees, setAssignees] = useState<any[]>([]);
  const [ticketData, setTicketData] = useState<{
    htmlContent: string;
    attachments: File[];
  }>({
    htmlContent: "",
    attachments: [],
  });

  const onFinish = async (values: any) => {
    // Helper to convert RcFile to base64
    const getBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const attachments = await Promise.all(
        (values.attachments || []).map(async (file: any) => ({
          fileName: file.name,
          fileType: file.type,
          fileUrl: await getBase64(file.originFileObj),
          fileSize: file.size,
        })),
      );

      const payload = {
        title: values.title,
        description: ticketData.htmlContent,
        sourceDept: values.sourceDept,
        targetDept: values.targetDept,
        priority: values.priority,
        status: "Open",
        assigneeId: values.assigneeId,
        createdById: "69c4e0367be280666dd26855",
        attachments,
      };

      const res = await createTicket(payload);
      if (res?.status === "SUCCESS") {
        getResponsePopup(res);
        handleClose();
        getTicketsListApi();
      } else {
        getResponsePopup(res);
      }
    } catch (error) {
      getResponsePopup(error);
    }
  };

  const getAssignees = async (e: any) => {
    const res = await getUsersByDepartment(e, "Lead");
    if (res?.status === "SUCCESS") {
      console.log(res, "data");
      const assignees = res.response.map((item: any) => ({
        value: item.id,
        label: item.name + "/" + item.employeeId,
      }));
      setAssignees(assignees);
    } else {
      setAssignees([]);
    }
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
    setAssignees([]);
    setTicketData({
      htmlContent: "",
      attachments: [],
    });
  };

  return (
    <Drawer
      title="Create New Ticket"
      placement="right"
      width={"80%"}
      onClose={handleClose}
      open={isOpen}
      closeIcon={<AiOutlineClose />}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={{ priority: "Low" }}
      >
        {/* Ticket Title */}
        <Form.Item
          name="title"
          label={
            <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Ticket Title
            </span>
          }
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input
            placeholder="e.g. Q4 Marketing Asset Review"
            className="h-12 bg-slate-50 border-slate-200 rounded-lg hover:border-blue-400 focus:border-blue-500"
          />
        </Form.Item>

        {/* Department & Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            name="targetDept"
            label={
              <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Target Department
              </span>
            }
            rules={[{ required: true, message: "Please select a department" }]}
          >
            <Select
              placeholder="Select Destination"
              className="h-12 w-full"
              size="large"
              onChange={getAssignees}
              options={departmentsData?.response?.departments?.map(
                (item: any) => ({
                  value: item.name,
                  label: item.name,
                }),
              )}
              showSearch
              allowClear
            />
          </Form.Item>

          <Form.Item
            name="assigneeId"
            label={
              <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Assignee
              </span>
            }
            rules={[{ required: true, message: "Please select an assignee" }]}
          >
            <Select
              placeholder="Select Assignee"
              className="h-12 w-full"
              size="large"
              options={assignees}
              showSearch
              allowClear
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            name="priority"
            label={
              <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Priority Level
              </span>
            }
            rules={[{ required: true, message: "Please select a priority" }]}
          >
            <Select
              className="h-12 w-full"
              size="large"
              showSearch
              options={getPriorities}
            />
          </Form.Item>
        </div>

        {/* Description with "Rich Text" Mock Toolbar */}
        <Form.Item
          name="description"
          label={
            <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Description
            </span>
          }
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TicketEditor
            onChange={(html) =>
              setTicketData((prev) => ({ ...prev, htmlContent: html }))
            }
            onFilesChange={(files) =>
              setTicketData((prev) => ({ ...prev, attachments: files }))
            }
          />
        </Form.Item>

        {/* Attachments Section */}
        <Form.Item
          name="attachments"
          label={
            <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
              Attachments
            </span>
          }
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
        >
          <Dragger
            multiple
            className="bg-white border-2 border-dashed border-slate-200 rounded-xl hover:border-blue-400 transition-colors"
            beforeUpload={() => false} // Prevent auto-upload for demo
          >
            <div className="ant-upload-drag-icon">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <InboxOutlined className="text-blue-600 text-xl color-[#143477] cursor-pointer" />
              </div>
            </div>
            <p className="text-slate-800 font-semibold mb-1">
              Drop files here or click to upload
            </p>
            <p className="text-slate-400 text-xs uppercase">
              PDF, PNG, JPG, or XLSX (Max 25MB)
            </p>
          </Dragger>
        </Form.Item>

        {/* Actions */}
        <div className="flex justify-end items-center gap-6 mt-12">
          <button
            type="button"
            className="text-slate-600 cursor-pointer font-semibold hover:text-slate-800 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createTicketLoading}
            className={`cursor-pointer text-white transition-colors py-2.5 px-6 rounded-[10px] flex items-center gap-2 font-bold shadow-md text-sm ${
              createTicketLoading
                ? "bg-slate-400"
                : "bg-[#143477] hover:bg-[#0f265e]"
            }`}
          >
            <SendOutlined />
            {createTicketLoading ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </Form>
    </Drawer>
  );
};

const enhancer = connect(
  (state: { tickets: TicketsState; users: UsersState }) => ({
    createTicketLoading: state.tickets.createTicketLoading,
    departmentsData: state.users.getDepartments.data,
  }),
  {
    createTicket: ticketsActions.createTicket,
    getUsersByDepartment: usersActions.getUsersByDepartment,
  },
);

export default enhancer(CreateTicketForm);
