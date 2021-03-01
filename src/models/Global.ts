export type Id = string;

export const DATE_TIME_FORMAT = "YYYY/MM/DD HH:mm";
export const DATE_FORMAT = "YYYY/MM/DD";

export enum RoutingPath {
  home = "/",
  stellaMaris = "/stella-maris",
  service = "/service",
  gallery = "/gallery",
  news = "/news",
}

export enum Day {
  mon = "MONDAY",
  tue = "TUESDAY",
  wed = "WEDNESDAY",
  thu = "THURSDAY",
  fri = "FRIDAY",
  sat = "SATURDAY",
  sun = "SUNDAY",
}

export type Repeatability = {
  days: Day;
  everyday: boolean;
};
