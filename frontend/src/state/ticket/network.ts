import { requestPortal } from "@/util/network";
import { Ticket } from "@/models/ticket";

export async function getTickets(): Promise<Ticket[]> {
  return await requestPortal("/api/tickets", { method: "GET" });
}

export async function getTicketDetails(id: string): Promise<Ticket> {
  return await requestPortal(`/api/tickets/${id}`, { method: "GET" });
}

export async function createTicket(payload: Partial<Ticket>): Promise<Ticket> {
  return await requestPortal("/api/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTicketStatus(id: string, status: string): Promise<Ticket> {
  return await requestPortal(`/api/tickets/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}
