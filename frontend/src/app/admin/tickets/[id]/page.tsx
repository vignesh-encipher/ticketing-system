"use client";
import React, { useEffect, useState } from "react";
import { Tag, Avatar, Button, Input, Timeline, Space, Modal } from "antd";
// Note the '/ai' at the end of the import path
import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineUserAdd,
  AiOutlineSend,
  AiOutlineRetweet,
  AiOutlineAlignLeft,
  AiOutlineClose,
  AiOutlineEdit,
} from "react-icons/ai";
import DiscussionThread from "../components/discussionThread/page";
import TicketEditor from "@/components/textareaAttachment/page";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { connect } from "react-redux";
import TicketsState from "@/state/tickets/model";
import { actions as ticketsActions } from "@/state/tickets";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { formatFileSize, getResponsePopup } from "@/util/formatting";
import AttachmentModal from "../components/attachment/page";
import { getStorage } from "@/util/storage";
import Reassign from "../components/reassign/page";
import StatusChange from "../components/statusChange/page";

interface TicketsPageProps {
  getTicketById: (params: any) => Promise<any>;
  getTicketByIdData: any;
  getTicketByIdLoad?: boolean;
  updateTicket: (payload: any) => Promise<any>;
  getComments: (ticketId: string) => Promise<any>;
  addComment: (payload: any) => Promise<any>;
  getCommentsData: any;
  getCommentsLoad?: boolean;
  addCommentLoad?: boolean;
  getActivityLogs: (ticketId: string) => Promise<any>;
  getActivityLogsData: any;
  getActivityLogsLoad?: boolean;
  updateStatusPriority: (payload: any) => Promise<any>;
}

const DynamicTicketView = ({
  getTicketById,
  getTicketByIdData,
  getTicketByIdLoad,
  updateTicket,
  getComments,
  addComment,
  getCommentsData,
  getCommentsLoad,
  addCommentLoad,
  getActivityLogs,
  getActivityLogsData,
  getActivityLogsLoad,
  updateStatusPriority,
}: TicketsPageProps) => {
  const router = useRouter();
  const { id } = useParams();

  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [isStatusChangeModalOpen, setIsStatusChangeModalOpen] = useState(false);
  const [editingDescription, setEditingDescription] = useState("");
  const [commentText, setCommentText] = useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleAttachmentClick = (file: any) => {
    setSelectedAttachment(file);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAttachment(null);
  };

  useEffect(() => {
    if (id) {
      getTicketById(id);
      getComments(id as string);
      getActivityLogs(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (getCommentsData) {
      // Small timeout to ensure DOM has updated
      setTimeout(scrollToBottom, 100);
    }
  }, [getCommentsData]);

  useEffect(() => {
    if (getTicketByIdData?.response?.description) {
      setEditingDescription(getTicketByIdData.response.description);
    }
  }, [getTicketByIdData]);

  const handleEditDescription = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveDescription = async () => {
    await updateTicket({ id, description: editingDescription });
    setIsEditModalOpen(false);
    getTicketById(id); // Refresh data
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) return;

    const sessionUserId = getStorage("userId");
    const userId = sessionUserId || "69c62bbb45c503f96ab8ae2d";

    const payload = {
      ticketId: id,
      message: commentText,
      userId: userId,
    };

    const result = await addComment(payload);
    if (result?.status === "SUCCESS") {
      getResponsePopup(result);
      setCommentText("");
      getComments(id as string); // Refresh comments
      getActivityLogs(id as string); // Refresh activity logs
    }
  };

  const handleReopenTicket = async () => {
     const userId = getStorage("userId") || "69c62bbb45c503f96ab8ae2d";
     const res = await updateStatusPriority({
        ticketId: id,
        status: "Reopened",
        userId: userId,
     });
     if(res?.status === "SUCCESS"){
        getResponsePopup(res);
        getTicketById(id);
     }
  }

  const data = getTicketByIdData?.response;
  const activityLogs = getActivityLogsData?.response?.logs || [];

  const currentUserId = getStorage("userId") || "69c62bbb45c503f96ab8ae2d";

  if (!data) return <div>Loading...</div>;
  return (
    <div className="h-[80vh] bg-white font-sans text-slate-900">
      {/* ... existing code ... */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex gap-2 mb-4">
            <Tag className="bg-indigo-50 text-indigo-700 border-none font-bold px-3 py-1">
              #{data.ticketId}
            </Tag>
            <Tag color="processing" className="font-bold px-3 py-1 uppercase">
              {data.status}
            </Tag>
            <Tag color="error" className="font-bold px-3 py-1 uppercase">
              {data.priority}
            </Tag>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 flex gap-3 tracking-tight">
            <div
              className="flex items-center text-lg py-1 gap-2 cursor-pointer text-indigo-600 transition-colors border border-indigo-600 rounded-lg px-2"
              onClick={() => router.back()}
            >
              <FaArrowLeft />
              Back
            </div>
            {data.title}
          </h1>
        </div>
        <div className="flex gap-4 items-center">
          {data?.status == "Resolved" ||
            (data?.status == "Closed" && (
              <div>
                <Button
                  type="primary"
                  onClick={handleReopenTicket}
                  className="bg-[#1e2b6a]"
                >
                  Reopen Ticket
                </Button>
              </div>
            ))}
          <div className="text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
              Raised By
            </p>
            <p className="font-bold text-slate-800 text-lg leading-none">
              {data.createdBy.name}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {data.createdAt
                ? dayjs(data.createdAt).format("DD-MM-YYYY hh:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* --- LEFT COLUMN --- */}
        <div
          ref={scrollRef}
          className="flex-1 space-y-10"
          style={{ height: "75vh", overflowY: "auto" }}
        >
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                <AiOutlineAlignLeft className="text-lg" /> Description
              </div>
              <Button
                type="text"
                icon={<AiOutlineEdit />}
                onClick={handleEditDescription}
                className="text-indigo-600 font-bold flex items-center gap-1"
              >
                Edit
              </Button>
            </div>
            <div
              className="text-slate-600 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            {/* Dynamic Attachments */}
            {data.attachments && data.attachments.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Attachments ({data.attachments.length})
                </p>
                <div className="flex flex-wrap gap-4">
                  {data.attachments.map((file: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 w-72 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleAttachmentClick(file)}
                    >
                      <div className="text-indigo-600 text-2xl">
                        {file.type === "pdf" ? (
                          <AiOutlineFilePdf />
                        ) : (
                          <AiOutlineFileImage />
                        )}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-800 truncate m-0">
                          {file.fileName}
                        </p>
                        <p className="text-xs text-slate-400 m-0">
                          {formatFileSize(file.fileSize)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Discussion Thread */}
          <DiscussionThread
            comments={getCommentsData?.response?.comments || []}
            currentUserId={currentUserId}
          />
        </div>

        {/* --- RIGHT SIDEBAR --- */}
        <div className="w-full lg:w-80 space-y-3">
          <div className="bg-blue-50/30 border border-blue-50 p-6 rounded-2xl">
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">
              Properties
            </h3>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">
                  Assignee
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="bg-[#1e2b6a] font-bold">
                    {data.assignee.profileImage
                      ? ""
                      : data.assignee.name?.charAt(0)}
                    {data.assignee.profileImage}
                  </Avatar>
                  <span className="font-bold text-slate-800">
                    {data.assignee.name}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-blue-100 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Dept
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {data.createdBy.department?.name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Target
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {data.assignee.department?.name || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/30 border border-blue-50 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-6 text-slate-500 font-bold text-xs uppercase tracking-widest ">
              Activity Log
            </div>
            <div className="h-[40vh] overflow-y-scroll pt-1">
              <Timeline
                items={activityLogs.map((act: any) => ({
                  color: act.status === "success" ? "green" : "blue",
                  children: (
                    <div className="pb-4">
                      <p className="text-xs font-bold text-slate-800 m-0">
                        {act.action}
                      </p>
                      <p className="text-[10px] text-slate-400 m-0">
                        {act.userDetails?.name || "System"} •{" "}
                        {dayjs(act.createdAt).fromNow()}
                      </p>
                    </div>
                  ),
                }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- STICKY FOOTER ACTION BAR --- */}
      {data?.status !== "Resolved" && data?.status !== "Closed" && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-t gap-3 border-slate-100 p-4 px-8 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
          style={{ marginLeft: "260px" }}
        >
          <Input
            placeholder="Add a comment... (use @ to mention)"
            className="h-11 bg-slate-50 border-none rounded-lg"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onPressEnter={handleSendComment}
            disabled={addCommentLoad}
          />
          <div className="flex items-center gap-4">
            <Button
              type="primary"
              size="large"
              className="bg-[#1e2b6a] h-11 px-6 font-bold flex items-center gap-2"
              onClick={handleSendComment}
              loading={addCommentLoad}
            >
              Send <AiOutlineSend />
            </Button>
            <div className="h-6 w-[1px] bg-slate-200 mx-2" />
            <Button
              icon={<AiOutlineRetweet />}
              type="text"
              className="font-bold text-slate-600"
              onClick={() => setIsReassignModalOpen(true)}
            >
              Reassign
            </Button>
            <Button
              type="text"
              className="font-bold text-slate-600"
              onClick={() => setIsStatusChangeModalOpen(true)}
            >
              Change Status
            </Button>
          </div>
        </div>
      )}

      {/* --- ATTACHMENT MODAL --- */}
      <AttachmentModal
        selectedAttachment={selectedAttachment}
        isModalOpen={isModalOpen}
        handleModalClose={handleModalClose}
      />
      {/* Reassign Modal */}
      <Reassign
        open={isReassignModalOpen}
        handleOk={() => {
          setIsReassignModalOpen(false);
          getTicketById(id);
          getActivityLogs(id as string);
        }}
        handleCancel={() => setIsReassignModalOpen(false)}
        assigneeDetails={data?.assignee || {}}
        ticketId={data?.id}
      />

      {/* Status Change Modal */}
      <StatusChange
        open={isStatusChangeModalOpen}
        handleOk={() => {
          setIsStatusChangeModalOpen(false);
          getTicketById(id);
          getActivityLogs(id as string);
        }}
        handleCancel={() => setIsStatusChangeModalOpen(false)}
        statusDetails={data?.status}
        priorityDetails={data?.priority}
        ticketId={data?.id}
      />

      {/* --- EDIT DESCRIPTION MODAL --- */}
      <Modal
        title={
          <div className="flex items-center gap-2 border-b pb-3">
            <AiOutlineEdit className="text-indigo-600 text-xl" />
            <span className="text-lg font-bold text-slate-800">
              Edit Description
            </span>
          </div>
        }
        open={isEditModalOpen}
        onOk={handleSaveDescription}
        onCancel={() => setIsEditModalOpen(false)}
        okText="Save Changes"
        cancelText="Discard"
        okButtonProps={{
          className: "bg-[#1e2b6a] font-bold h-10 px-6",
        }}
        cancelButtonProps={{
          className: "font-bold h-10 px-6",
        }}
        width={700}
        centered
      >
        <div className="py-2">
          <TicketEditor
            initialContent={editingDescription}
            onChange={(html) => setEditingDescription(html)}
            onFilesChange={(files) => console.log(files)}
          />
        </div>
      </Modal>
    </div>
  );
};

const enhancer = connect(
  (state: { tickets: any }) => ({
    getTicketByIdData: state.tickets.getTicketById.data,
    getTicketByIdLoad: state.tickets.getTicketByIdLoading,
    getCommentsData: state.tickets.getComments.data,
    getCommentsLoad: state.tickets.getCommentsLoading,
    addCommentLoad: state.tickets.addCommentLoading,
    getActivityLogsData: state.tickets.getActivityLogs.data,
    getActivityLogsLoad: state.tickets.getActivityLogsLoading,
  }),
  {
    getTicketById: ticketsActions.getTicketById,
    updateTicket: ticketsActions.updateTicket,
    getComments: ticketsActions.getComments,
    addComment: ticketsActions.addComment,
    getActivityLogs: ticketsActions.getActivityLogs,
     updateStatusPriority: ticketsActions.updateStatusPriority,
  },
);

export default enhancer(DynamicTicketView);
