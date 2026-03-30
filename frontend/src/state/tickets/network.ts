import { requestPortal } from "@/util/network";

export async function getTickets(params?: any) {
  const { page = 1, limit = 10, search = "", sortByField = "", sortByType = "", department = "", status = "", priority = "" } = params || {};
  
  const options = {
    method: "GET",
  };

  const data = await requestPortal(
    `tickets?page=${page}&limit=${limit}&search=${search}&sortByField=${sortByField}&sortByType=${sortByType}&sourceDept=${department}&status=${status}&priority=${priority}`,
    options
  );

  return data;
}

export async function createTicket(payload: any) {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  const data = await requestPortal(`tickets`, options);
  return data;
}

export async function updateTicket(payload: any) {
  const { id, ...rest } = payload;
  const options = {
    method: "PUT",
    body: JSON.stringify(rest),
  };
  const data = await requestPortal(`tickets/${id}`, options);
  return data;
}

export async function deleteTicket(id: string) {
  const options = {
    method: "DELETE",
  };
  const data = await requestPortal(`tickets/${id}`, options);
  return data;
}

export async function getTicketById(id: string) {
  const options = {
    method: "GET",
  };
  const data = await requestPortal(`tickets/${id}`, options);
  return data;
}

export async function getComments(ticketId: string, params?: any) {
  const { page = 1, limit = 20 } = params || {};
  const options = {
    method: "GET",
  };
  const data = await requestPortal(`comments/${ticketId}?page=${page}&limit=${limit}`, options);
  return data;
}

export async function addComment(payload: any) {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  const data = await requestPortal(`comments`, options);
  return data;
}

export async function getActivityLogs(ticketId: string, params?: any) {
  const { page = 1, limit = 20 } = params || {};
  const options = {
    method: "GET",
  };
  const data = await requestPortal(`activity/${ticketId}?page=${page}&limit=${limit}`, options);
  return data;
}

export async function reassignTicket(payload: any) {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  const data = await requestPortal(`tickets/reassign`, options);
  return data;
}

export async function updateStatusPriority(payload: any) {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };
  const data = await requestPortal(`tickets/update-status-priority`, options);
  return data;
}