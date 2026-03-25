"use client";
import React from "react";
import { Tag, Avatar, Button, Input, Timeline, Space } from "antd";
// Note the '/ai' at the end of the import path
import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineUserAdd,
  AiOutlineSend,
  AiOutlineRetweet,
  AiOutlineAlignLeft,
  AiOutlineClose,
} from "react-icons/ai";
import DiscussionThread from "../components/discussionThread/page";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface TicketProps {
  id: string;
  title: string;
  status: string;
  priority: string;
  raisedBy: { name: string; timestamp: string };
  description: string;
  attachments: Array<{ name: string; size: string; type: "pdf" | "image" }>;
  properties: {
    assignee: { name: string; initials: string };
    department: string;
    target: string;
    lastUpdated: string;
  };
  comments: Array<{
    id: string;
    senderId: string;
    senderName: string;
    role: string;
    text: string;
    time: string;
  }>;
  activities: Array<{
    user: string;
    action: string;
    time: string;
    status: string;
  }>;
}

const data: TicketProps = {
  id: "TK-88241",
  title: "Network Latency Issues in Region West-4",
  status: "IN PROGRESS",
  priority: "HIGH PRIORITY",
  raisedBy: {
    name: "Marcus Sterling",
    timestamp: "Oct 24, 2023 • 14:20 PM",
  },
  description:
    "We are observing intermittent packet loss and significant latency spikes affecting the CRM application for users routed through the West-4 gateway.",
  attachments: [
    { name: "latency_report_v1.pdf", size: "1.2 MB", type: "pdf" },
    { name: "error_log_screenshot.png", size: "450 KB", type: "image" },
  ],
  properties: {
    assignee: { name: "Alex Rivera", initials: "AR" },
    department: "IT Infrastructure",
    target: "Network Ops",
    lastUpdated: "Oct 24, 2023 • 16:45 PM",
  },
  activities: [
    {
      user: "Sarah Chen",
      action: "Comment added",
      time: "45 mins ago",
      status: "success",
    },
    {
      user: "Alex Rivera",
      action: "Assigned",
      time: "2 hours ago",
      status: "processing",
    },
    {
      user: "Sarah Chen",
      action: "Comment added",
      time: "45 mins ago",
      status: "success",
    },
    {
      user: "Alex Rivera",
      action: "Assigned",
      time: "2 hours ago",
      status: "processing",
    },
    {
      user: "Sarah Chen",
      action: "Comment added",
      time: "45 mins ago",
      status: "success",
    },
    {
      user: "Alex Rivera",
      action: "Assigned",
      time: "2 hours ago",
      status: "processing",
    },
    {
      user: "Sarah Chen",
      action: "Comment added",
      time: "45 mins ago",
      status: "success",
    },
    {
      user: "Alex Rivera",
      action: "Assigned",
      time: "2 hours ago",
      status: "processing",
    },
  ],
  comments: [
    {
      id: "c1",
      senderId: "user_123",
      senderName: "Marcus Sterling",
      role: "Creator",
      text: "Any updates on the BGP rollback?",
      time: "10 mins ago",
    },
    {
      id: "c2",
      senderId: "admin_456",
      senderName: "Alex Rivera",
      role: "Network Lead",
      text: "Config is being pushed now. Should see results in 5 mins.",
      time: "2 mins ago",
    },
    {
      id: "c1",
      senderId: "user_123",
      senderName: "Marcus Sterling",
      role: "Creator",
      text: "Any updates on the BGP rollback?",
      time: "10 mins ago",
    },
    {
      id: "c2",
      senderId: "admin_456",
      senderName: "Alex Rivera",
      role: "Network Lead",
      text: "Config is being pushed now. Should see results in 5 mins.",
      time: "2 mins ago",
    },
    {
      id: "c1",
      senderId: "user_123",
      senderName: "Marcus Sterling",
      role: "Creator",
      text: "Any updates on the BGP rollback?",
      time: "10 mins ago",
    },
    {
      id: "c2",
      senderId: "admin_456",
      senderName: "Alex Rivera",
      role: "Network Lead",
      text: "Config is being pushed now. Should see results in 5 mins.",
      time: "2 mins ago",
    },
  ],
};

const DynamicTicketView: React.FC<TicketProps> = () => {
  const router = useRouter();
  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-[80vh] bg-white font-sans text-slate-900">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex gap-2 mb-4">
            <Tag className="bg-indigo-50 text-indigo-700 border-none font-bold px-3 py-1">
              #{data.id}
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
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Raised By
          </p>
          <p className="font-bold text-slate-800 text-lg leading-none">
            {data.raisedBy.name}
          </p>
          <p className="text-slate-400 text-sm mt-1">
            {data.raisedBy.timestamp}
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* --- LEFT COLUMN --- */}
        <div
          className="flex-1 space-y-10"
          style={{ height: "70vh", overflowY: "auto" }}
        >
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6 text-slate-500 font-bold text-xs uppercase tracking-widest">
              <AiOutlineAlignLeft className="text-lg" /> Description
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {data.description}
            </p>

            {/* Dynamic Attachments */}
            {data.attachments.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Attachments ({data.attachments.length})
                </p>
                <div className="flex flex-wrap gap-4">
                  {data.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 w-72 hover:shadow-md transition-shadow cursor-pointer"
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
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-400 m-0">
                          {file.size}
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
            comments={data.comments}
            currentUserId="admin_456"
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
                    {data.properties.assignee.initials}
                  </Avatar>
                  <span className="font-bold text-slate-800">
                    {data.properties.assignee.name}
                  </span>
                </div>
                <Button
                  type="link"
                  icon={<AiOutlineUserAdd />}
                  className="p-0 h-auto text-xs font-bold mt-2 text-indigo-600 uppercase"
                >
                  Reassign
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-blue-100 pt-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Dept
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {data.properties.department}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                    Target
                  </p>
                  <p className="font-bold text-slate-800 text-sm">
                    {data.properties.target}
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
                items={data.activities.map((act) => ({
                  color: act.status === "success" ? "green" : "blue",
                  children: (
                    <div className="pb-4">
                      <p className="text-xs font-bold text-slate-800 m-0">
                        {act.action}
                      </p>
                      <p className="text-[10px] text-slate-400 m-0">
                        {act.user} • {act.time}
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
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t gap-3 border-slate-100 p-4 px-8 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
        style={{ marginLeft: "260px" }}
      >
        <Input
          placeholder="Add a comment... (use @ to mention)"
          className="h-11 bg-slate-50 border-none rounded-lg"
        />
        <div className="flex items-center gap-4">
          <Button
            type="primary"
            size="large"
            className="bg-[#1e2b6a] h-11 px-6 font-bold flex items-center gap-2"
          >
            Send <AiOutlineSend />
          </Button>
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <Button
            icon={<AiOutlineRetweet />}
            type="text"
            className="font-bold text-slate-600"
          >
            Reassign
          </Button>
          <Button type="text" className="font-bold text-slate-600">
            Change Status
          </Button>
          <Button className="bg-emerald-100 text-emerald-700 border-none h-11 px-6 font-bold hover:bg-emerald-200">
            Resolve Ticket
          </Button>
          <Button icon={<AiOutlineClose />} type="text" />
        </div>
      </div>
    </div>
  );
};

export default DynamicTicketView;
