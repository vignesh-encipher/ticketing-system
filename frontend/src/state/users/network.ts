import { requestPortal } from "@/util/network";

interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  sortByField?: string;
  sortByType?: 'asc' | 'desc';
}

export async function getUsers(params?: GetUsersParams) {
  const { page = 0, limit = 10, search = "", sortByField = "", sortByType = "" } = params || {};
  const options = {
    method: "GET",
  };

  const data = await requestPortal(
    `api/users?page=${page}&limit=${limit}&search=${search}&sortByField=${sortByField}&sortByType=${sortByType}`,
    options
  );

  return data;
}
