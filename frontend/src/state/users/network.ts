import { requestPortal } from "@/util/network";

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortByField?: string;
  sortByType?: 'asc' | 'desc';
  department?: string;
  roleType?: string;
  status?: string;
}

export async function getUsers(params?: any) {
  const { page = 0, limit = 10, search = "", sortByField = "", sortByType = "", department = "", roleType = "", status = "", role = "" } = params || {};
  console.log(params);
  const options = {
    method: "GET",
  };

  const actualRoleType = role || roleType;

  const data = await requestPortal(
    `users?page=${page}&limit=${limit}&search=${search}&sortByField=${sortByField}&sortByType=${sortByType}&department=${department}&roleType=${actualRoleType}&status=${status}`,
    options
  );

  return data;
}

export async function createUser(payload: any) {
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
  };

  const data = await requestPortal(`users`, options);
  return data;
}
export async function updateStatusUser(payload: any) {
  const { id, status } = payload;
  const options = {
    method: "PUT",
    body: JSON.stringify({ status }),
  };

  const data = await requestPortal(`users/${id}`, options);
  return data;
}

export async function getDepartments() {
  const options = {
    method: "GET",
  };

  const data = await requestPortal(`departments`, options);
  return data;
}
