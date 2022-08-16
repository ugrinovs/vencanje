import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class GeoLocationService {
  private readonly requestService: AxiosInstance;
  constructor(config?: AxiosRequestConfig) {
    this.requestService = axios.create(config);
  }

  async getIpAddress() {
    const { data } = await this.requestService.get<string>(
      "https://www.cloudflare.com/cdn-cgi/trace"
    );

    const ipAddress = data
      .split("\n")
      .find((geo) => geo.includes("ip")) as string;

    return ipAddress.split("=")[1];
  }
}
