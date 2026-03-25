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

const { TextArea } = Input;
const { Dragger } = Upload;

interface CreateTicketFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTicketForm: React.FC<CreateTicketFormProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState<{
    htmlContent: string;
    attachments: File[];
  }>({
    htmlContent: "",
    attachments: [],
  });

  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Form Values:", values);
    // Simulate API call
    setTimeout(() => {
      message.success("Ticket submitted successfully");
      setLoading(false);
    }, 1500);
  };

  return (
    <Drawer
      title="Create New Ticket"
      placement="right"
      width={"80%"}
      onClose={onClose}
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
            name="department"
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
            >
              <Select.Option value="marketing">Marketing</Select.Option>
              <Select.Option value="engineering">Engineering</Select.Option>
              <Select.Option value="hr">HR</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label={
              <span className="font-bold text-xs uppercase tracking-wider text-slate-600">
                Priority Level
              </span>
            }
          >
            <Select className="h-12 w-full" size="large">
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Urgent">Urgent</Select.Option>
            </Select>
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
        >
          <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 ring-blue-100 ring-offset-0 transition-all">
            {/* Toolbar */}
            <div className="flex gap-4 p-3 bg-blue-50/50 border-b border-slate-200 text-slate-500">
              <BoldOutlined className="cursor-pointer hover:text-blue-600" />
              <ItalicOutlined className="cursor-pointer hover:text-blue-600" />
              <UnorderedListOutlined className="cursor-pointer hover:text-blue-600" />
              <LinkOutlined className="cursor-pointer hover:text-blue-600" />
            </div>
            <TextArea
              rows={6}
              variant="filled"
              className="p-4 bg-white"
              placeholder="Provide detailed context, requirements, and desired outcomes..."
            />
          </div>
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
          getValueFromEvent={e => e && e.fileList}
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


        <TicketEditor 
          onChange={(html) => setTicketData(prev => ({ ...prev, htmlContent: html }))}
          onFilesChange={(files) => setTicketData(prev => ({ ...prev, attachments: files }))}
        />

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
            className="bg-[#143477] cursor-pointer text-white hover:bg-[#0f265e] transition-colors py-2.5 px-6 rounded-[10px] flex items-center gap-2 font-bold shadow-md text-sm"
          >
            <SendOutlined />
            Submit Ticket
          </button>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateTicketForm;
