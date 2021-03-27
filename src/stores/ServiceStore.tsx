import React from "react";
import { action, observable } from "mobx";
import { format, isBefore, isSameMinute } from "date-fns";
import { add } from "date-fns/esm";

import { createContext } from "react";
import { DATE_FORMAT, DATE_TIME_FORMAT, Day } from "../models/Global";
import { FormatListNumberedTwoTone } from "@material-ui/icons";

type TService = {
  id: string;
  title: string;
  time: string;
  days?: Day[];
  date?: string;
  priest: string;
};

export class Service {
  // if date is undefined days are defined and otherwise
  @observable
  id: string;
  @observable
  title: string;
  @observable
  time: string;
  @observable
  days?: Day[];
  @observable
  date?: string;
  @observable
  priest: string;

  constructor({ id, title, time, days, date, priest }: TService) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.priest = priest;
    this.days = days;
    this.date = date;
  }
}

export type TServiceCreate = Omit<TService, "id">;

export class ServiceStore {
  @observable
  private services: Service[] = [];

  @action
  createService(service: TServiceCreate) {
    this.services = [
      new Service({
        ...service,
        id: format(new Date(), DATE_FORMAT) + this.services.length.toString(),
      }),
      ...this.services,
    ];
  }

  @action
  updateService(service: TService) {
    this.services = this.services.map((s) =>
      s.id === service.id ? service : s
    );
  }

  @action
  removeService(service: TService) {
    this.services = this.services.filter((s) => s.id !== service.id);
  }

  @action
  getServices() {
    return this.services;
  }

  sortByTime(serviceA: Service, serviceB: Service) {
    if (
      isBefore(
        new Date(serviceA.date + " " + serviceA.time),
        new Date(serviceB.date + " " + serviceB.time)
      )
    ) {
      return -1;
    } else if (
      isSameMinute(
        new Date(serviceA.date + " " + serviceA.time),
        new Date(serviceB.date + " " + serviceB.time)
      )
    ) {
      // TODO: sort by string
      if (serviceA.title > serviceB.title) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  @action
  getServicesByDay(day: Day) {
    const selectedServices = this.services.filter((service) =>
      service.days?.includes(day)
    );
    return selectedServices.sort(this.sortByTime);
  }

  @action
  getSingleService() {
    console.log(
      this.services.filter((service) => service.date).sort(this.sortByTime)
    );
    return this.services
      .filter((service) => service.date)
      .sort(this.sortByTime);
  }

  @action
  getServicesByDate({
    fromDate,
    toDate,
  }: {
    fromDate?: string;
    toDate: string;
  }) {
    return this.services; // TODO: filter with date-fns
  }

  constructor() {
    this.createService({
      days: [Day.tue, Day.sun],
      title: "for students",
      time: "20:00",
      priest: "ks. Marcin",
    });

    this.createService({
      days: [Day.mon, Day.tue, Day.thu, Day.fri],
      title: "for grandmas",
      time: "14:00",
      priest: "ks. Tadeusz",
    });

    this.createService({
      days: [Day.tue, Day.wed],
      title: "for married",
      time: "18:00",
      priest: "ks. Tadeusz",
    });

    this.createService({
      date: format(new Date(), DATE_FORMAT),
      title: "One service",
      time: "18:00",
      priest: "ks. Tadeusz",
    });

    this.createService({
      date: format(add(new Date(), { days: 2 }), DATE_FORMAT),
      title: "Another service",
      time: "13:00",
      priest: "ks. Tadek",
    });
  }
}

export const serviceStore = new ServiceStore();
export const ServiceStoreContext = createContext(serviceStore);
export const ServiceStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <ServiceStoreContext.Provider value={serviceStore}>
      {children}
    </ServiceStoreContext.Provider>
  );
};
