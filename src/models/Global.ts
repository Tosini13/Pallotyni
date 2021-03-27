export type Id = string;

export const DATE_TIME_FORMAT = "yyyy/MMM/DD HH:mm";
export const DATE_FORMAT = "yyyy/MMM/DD";
export const TIME_FORMAT = "HH:mm";

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
