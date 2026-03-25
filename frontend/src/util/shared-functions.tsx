import React from "react";

/**
 * Returns the UI for a priority pill based on the priority value.
 */
export const getPriority = (priority: string) => {
  let styles = "";
  
  switch (priority?.toUpperCase()) {
    case "CRITICAL":
      styles = "bg-[#fee2e2] text-[#dc2626]";
      break;
    case "HIGH":
      styles = "bg-[#e0e7ff] text-[#1d4ed8]";
      break;
    case "MEDIUM":
      styles = "bg-[#e0e7ff] text-[#4f46e5]";
      break;
    case "LOW":
      styles = "bg-[#f1f5f9] text-[#64748b]";
      break;
    default:
      styles = "bg-gray-100 text-gray-500";
      break;
  }

  return (
    <span
      className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-widest ${styles}`}
    >
      {priority}
    </span>
  );
};

/**
 * Returns the UI for a status indicator (dot + text) based on the status value.
 */
export const getStatus = (status: string) => {
  let dotColor = "";
  
  switch (status) {
    case "Open":
      dotColor = "bg-red-600";
      break;
    case "In Progress":
      dotColor = "bg-amber-400";
      break;
    case "Resolved":
      dotColor = "bg-teal-600";
      break;
    case "Closed":
      dotColor = "bg-gray-400";
      break;
    case "Active": // From Users page
      dotColor = "bg-[#00a89d]";
      break;
    case "Deactivated": // From Users page
      dotColor = "bg-gray-400";
      break;
    default:
      dotColor = "bg-gray-400";
      break;
  }

  return (
    <div className="flex items-center gap-2.5">
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      <span className="text-gray-800 font-semibold text-[13px]">{status}</span>
    </div>
  );
};
