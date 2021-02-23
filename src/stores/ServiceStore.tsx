import React from "react";
import { action, observable } from "mobx";
import moment from "moment";
import { createContext } from "react";
import { Day } from "../models/Global";
import { FormatListNumberedTwoTone } from "@material-ui/icons";

type TService = {
  id: string;
  title: string;
  time: string;
  days?: Day[];
  date?: string;
  leader: string;
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
  leader: string;

  constructor({ id, title, time, days, date, leader }: TService) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.leader = leader;
    this.days = days;
    this.date = date;
  }
}

type TCreateService = TService & {
  repeat: boolean;
};

export class ServiceStore {
  @observable
  private services: Service[] = [];

  @action
  createService({ repeat, ...service }: TCreateService) {
    if (repeat && !service.days?.length) {
      console.log("wrong repeatance");
    }
    if (!repeat && moment(service.date).isValid()) {
      console.log("wrong date");
    }
    this.services = [new Service(service), ...this.services];
  }

  @action
  getServices() {
    return this.services;
  }

  sortByTime(serviceA: Service, serviceB: Service) {
    const getMomentDate = (time: string) => {
      const todayDate = moment().format("YYYY-MM-DD");
      return moment(todayDate + " " + time);
    };
    if (getMomentDate(serviceA.time).isBefore(getMomentDate(serviceB.time))) {
      return -1;
    } else if (
      getMomentDate(serviceA.time).isSame(getMomentDate(serviceB.time))
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

  constructor() {
    this.createService({
      id: this.services.length.toString(),
      repeat: true,
      days: [Day.tue, Day.sun],
      title: "for students",
      time: "20:00",
      leader: "ks. Marcin",
    });

    this.createService({
      id: this.services.length.toString(),
      repeat: true,
      days: [Day.mon, Day.tue, Day.thu, Day.fri],
      title: "for grandmas",
      time: "14:00",
      leader: "ks. Tadeusz",
    });

    this.createService({
      id: this.services.length.toString(),
      repeat: true,
      days: [Day.tue, Day.wed],
      title: "for married",
      time: "18:00",
      leader: "ks. Tadeusz",
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
