import { Id } from "./Global";

export type TPhotograph = {
  id: Id;
  createdAt: string;
  path: string;
  description: string;
};

export type TCreatePhotographAndImage = Omit<
  TPhotograph,
  "id" | "path" | "createdAt"
> & {
  imageFile: any;
};

export type TUpdatePhotographAndImage = Omit<TPhotograph, "createdAt"> & {
  imageFile: any;
};

export type TCreatePhotograph = Omit<TPhotograph, "id" | "createdAt">;
