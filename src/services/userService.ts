import type { IUser } from "@/types/models";
import type { ResponseWithData } from "@/types/responses";

const BASE = "/api/v1/users";

export const userService = {
  async getAll(): Promise<ResponseWithData<IUser[]>> {
    const response = await fetch(BASE);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseWithData<IUser[]>;
  },

  async getById(id: string): Promise<ResponseWithData<IUser>> {
    const response = await fetch(`${BASE}/${id}`);

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    return (await response.json()) as ResponseWithData<IUser>;
  },
};
