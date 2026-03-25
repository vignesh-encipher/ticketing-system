import { Users } from "@/models/admin/table";

export default class Card {
  getUsers: { data: Users; error: string | null; loading: boolean }
  getUsersLoading: boolean | undefined;

  constructor(
    getUsers: {
      data: [
        {
          id: 0;
          name: "";
          username: "";
          email: "";
          address: {
            street: "";
            suite: "";
            city: "";
            zipcode: "";
            geo: {
              lat: "";
              lng: "";
            };
          };
          phone: "";
          website: "";
          company: {
            name: "";
            catchPhrase: "";
            bs: "";
          };
        }
      ];
      error: "";
      loading: false;
    },
    getUsersLoading: false
  ) {
    this.getUsers = getUsers;
    this.getUsersLoading = getUsersLoading
  }
}
