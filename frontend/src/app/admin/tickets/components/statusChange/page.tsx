import {
  getPriorities,
  getResponsePopup,
  getStatuses,
} from "@/util/formatting";
import { Button, Form, Modal, Select } from "antd";
import { connect } from "react-redux";
import { actions as ticketsActions } from "@/state/tickets";
import TicketsState from "@/state/tickets/model";
import { getStorage } from "@/util/storage";
import { useEffect } from "react";

interface StatusChangeProps {
  open: boolean;
  handleCancel: () => void;
  handleOk: () => void;
  statusDetails: any;
  priorityDetails: any;
  updateStatusPriority: (payload: any) => Promise<any>;
  ticketId: string;
  updateStatusPriorityLoading?: boolean;
}

const StatusChange = ({
  open,
  handleCancel,
  handleOk,
  statusDetails,
  priorityDetails,
  updateStatusPriority,
  ticketId,
  updateStatusPriorityLoading,
}: StatusChangeProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        status: statusDetails,
        priority: priorityDetails,
      });
    }
  }, [open, statusDetails, priorityDetails, form]);

  const onFinish = async (values: any) => {
    const userId = getStorage("userId") || "69c62bbb45c503f96ab8ae2d";
    const res = await updateStatusPriority({
      ticketId: ticketId,
      status: values.status,
      priority: values.priority,
      userId: userId,
    });
    if (res?.status === "SUCCESS") {
      getResponsePopup(res);
      handleOk();
      form.resetFields();
    } else {
      getResponsePopup(res);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      title="Status Change"
      destroyOnHidden
      footer={false}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="status"
          label="New Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select
            options={getStatuses}
            placeholder="Select status"
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="priority"
          label="New Priority"
          rules={[{ required: true, message: "Please select priority" }]}
        >
          <Select
            options={getPriorities}
            placeholder="Select priority"
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#1e2b6a]"
            loading={updateStatusPriorityLoading}
          >
            Update Status
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const enhancer = connect(
  (state: { tickets: TicketsState }) => ({
    updateStatusPriorityLoading: state.tickets.updateStatusPriorityLoading,
  }),
  {
    updateStatusPriority: ticketsActions.updateStatusPriority,
  },
);

export default enhancer(StatusChange);
