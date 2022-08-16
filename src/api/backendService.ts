import axios, { AxiosInstance } from "axios";

const url = process.env.REACT_APP_API_URL;

export interface Guest {
  ip: string;
  visitCount: number;
}

export interface GuestMember {
  id: number;
  visitorId: number;
  visitor: Guest;
  member: string;
  note: string;
}

export class BackendService {
  private readonly backendService: AxiosInstance;
  constructor() {
    this.backendService = axios.create({
      baseURL: url,
    });
  }

  async getGuests() {
    const { data } = await this.backendService.get("/guests");
    console.log("guests", data);
    return data;
  }

  async addGuest(guest: Partial<Guest>) {
    const { data } = await this.backendService.post("/guests", guest);

    console.log("saved guest", data);
    return data;
  }

  async addMembers(members: Partial<GuestMember>[]) {
    const { data } = await this.backendService.post("/guest-members", members);

    console.log("dt", data);
    return true;
  }
}
