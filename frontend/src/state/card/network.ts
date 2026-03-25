import { requestPortal } from "@/util/network";

export async function getUsers() {
  const options = {
    method: "GET",
  };

  const data = await requestPortal(
    `/api/users`,
    options
  );

  return data;
}

export async function createUser(payload: any) {
  return await requestPortal(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function updateUser(payload: { id: string, data: any }) {
  return await requestPortal(`/api/users/${payload.id}`, {
    method: "PUT",
    body: JSON.stringify(payload.data)
  });
}

export async function deleteUser(id: string) {
  return await requestPortal(`/api/users/${id}`, {
    method: "DELETE"
  });
}
