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
