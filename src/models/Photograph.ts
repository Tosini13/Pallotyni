import { Id } from "./Global";

export type TPhotograph = {
  id: Id;
  createdAt: string;
  path: string;
  description: string;
};

export type TCreatePhotograph = Omit<TPhotograph, "id">;
