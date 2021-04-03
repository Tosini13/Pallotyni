import React from "react";
import { action, computed, makeObservable, observable } from "mobx";
import { isBefore, isSameMinute } from "date-fns";

import { createContext } from "react";
import { Day } from "../models/Global";
import { TService, TServiceCreate } from "../models/Service";
import { SERVICES_API_URL } from "../models/const";
import axios from "axios";

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

export class ServiceStore {
  services: Service[] = [];

  async fetch() {
    const data = await axios.get(SERVICES_API_URL);
    const services = data.data as TService[];
    if (services) {
      this.services = services.map((service) => new Service(service));
    } else {
      console.log("error!");
    }
  }

  async createService(service: TServiceCreate) {
    const data = await axios.post(SERVICES_API_URL, service);
    const serviceData = data.data as TService;
    if (serviceData) {
      this.services = [...this.services, new Service(serviceData)];
    } else {
      console.log("error!");
    }
  }

  async updateService(service: TService) {
    const data = await axios.put(`${SERVICES_API_URL}/${service.id}`, service);
    const serviceData = data.data as TService;
    if (serviceData) {
      this.services = this.services.map((s) =>
        s.id === service.id ? new Service(serviceData) : s
      );
    } else {
      console.log("error!");
    }
  }

  async removeService(service: TService) {
    const data = await axios.delete(`${SERVICES_API_URL}/${service.id}`);
    const serviceData = data.data as TService;
    if (serviceData) {
      this.services = this.services.filter((s) => s.id !== service.id);
    } else {
      console.log("error!");
    }
  }

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

  getServicesByDay(day: Day) {
    const selectedServices = this.services.filter((service) =>
      service.days?.includes(day)
    );
    return selectedServices.sort(this.sortByTime);
  }

  get getSingleService() {
    return this.services
      .filter((service) => service.date)
      .sort(this.sortByTime);
  }

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
    makeObservable(this, {
      services: observable,
      fetch: action,
      createService: action,
      updateService: action,
      removeService: action,
      sortByTime: action,
      getServicesByDay: action,
      getServicesByDate: action,
      getSingleService: computed,
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
