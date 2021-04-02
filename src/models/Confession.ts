import { Day } from "./Global";

export type TConfession = {
  id: string;
  title: string;
  date?: string;
  days?: Day[];
  fromTime: string;
  toTime: string;
  priest: string;
};

export type TCreateConfession = Omit<TConfession, "id">;

export type TConfessionMongo = Omit<TConfession, "id" | "days"> & {
  _id: string;
  days: Day[];
};
