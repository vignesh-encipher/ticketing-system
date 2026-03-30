import UsersState from "@/state/users/model";
import { Button, Form, Modal, Select } from "antd";
import { connect } from "react-redux";
import { actions as usersActions } from "@/state/users";
import { actions as ticketsActions } from "@/state/tickets";
import { useEffect, useState } from "react";
import { getStorage } from "@/util/storage";
import { getResponsePopup } from "@/util/formatting";

interface ReassignProps {
  open: boolean;
  handleOk: (res?: any) => void;
  handleCancel: () => void;
  getUsersByDepartment: (departmentName: string, role?: string) => Promise<any>;
  reassignTicket: (payload: any) => Promise<any>;
  departmentsData: UsersState["getDepartments"]["data"];
  assigneeDetails: any;
  ticketId: string;
  reassignTicketLoading?: boolean;
}

const Reassign = ({
  open,
  handleOk,
  handleCancel,
  getUsersByDepartment,
  reassignTicket,
  departmentsData,
  assigneeDetails,
  ticketId,
  reassignTicketLoading,
}: ReassignProps) => {
  const [form] = Form.useForm();
  const [assignees, setAssignees] = useState<any[]>([]);

  const getAssignees = async (departmentName: string) => {
    const res = await getUsersByDepartment(departmentName, "");
    if (res?.status === "SUCCESS") {
      const assigneesList = res.response.map((item: any) => ({
        value: item.id,
        label: item.name + "/" + item.employeeId,
      }));
      setAssignees(assigneesList);
    } else {
      setAssignees([]);
    }
  };

  useEffect(() => {
    if (assigneeDetails?.department?.name) {
      getAssignees(assigneeDetails.department.name);
    }
  }, [assigneeDetails]);

  const onFinish = async (values: any) => {
    const currentUserId = getStorage("userId") || "69c62bbb45c503f96ab8ae2d";
    const payload = {
      ticketId: ticketId,
      assigneeId: values.assignee,
      reassignedBy: currentUserId,
    };

    const res = await reassignTicket(payload);
    if (res?.status === "SUCCESS") {
      getResponsePopup(res);
      handleOk(res);
      form.resetFields();
    } else {
      getResponsePopup(res);
    }
  };

  return (
    <Modal
      title="Reassign Ticket"
      open={open}
      onCancel={handleCancel}
      destroyOnHidden
      footer={false}
    >
      <div className="mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">Current Assignee : </p>
          <h1 className="text-md font-bold">{assigneeDetails?.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">Employee ID : </p>
          <h1 className="text-md font-bold">{assigneeDetails?.employeeId}</h1>
        </div>
      </div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="assignee"
          label="New Assignee"
          rules={[{ required: true, message: "Please select assignee" }]}
        >
          <Select
            options={assignees}
            placeholder="Select assignee"
            showSearch
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-[#1e2b6a]"
            loading={reassignTicketLoading}
          >
            Reassign
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const enhancer = connect(
  (state: { users: UsersState; tickets: any }) => ({
    departmentsData: state.users.getDepartments.data,
    reassignTicketLoading: state.tickets.reassignTicketLoading,
  }),
  {
    getUsersByDepartment: usersActions.getUsersByDepartment,
    reassignTicket: ticketsActions.reassignTicket,
  },
);

export default enhancer(Reassign);
