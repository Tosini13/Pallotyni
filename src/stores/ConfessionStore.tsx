import React, { createContext } from "react";
import { action, observable } from "mobx";
import { DATE_FORMAT, Day } from "../models/Global";
import { format } from "date-fns";
const add = require("date-fns/add");
const isAfter = require("date-fns/isAfter");
const isBefore = require("date-fns/isBefore");
const isSameMinute = require("date-fns/isSameMinute");

type TConfession = {
  id: string;
  title: string;
  date?: string;
  days?: Day[];
  fromTime: string;
  toTime: string;
  priest: string;
};

export class Confession {
  // if date is undefined days are defined and otherwise
  @observable
  id: string;
  @observable
  title: string;
  @observable
  date?: string;
  @observable
  days?: Day[];
  @observable
  fromTime: string;
  @observable
  toTime: string;
  @observable
  priest: string;

  constructor({
    id,
    title,
    date,
    days,
    fromTime,
    toTime,
    priest,
  }: TConfession) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.priest = priest;
    this.days = days;
    this.fromTime = fromTime;
    this.toTime = toTime;
  }
}

export type TCreateConfession = Omit<TConfession, "id">;

export class ConfessionStore {
  @observable
  private confessions: Confession[] = [];

  @action
  getConfessions() {
    return this.confessions;
  }

  @action
  addConfession(confession: TCreateConfession) {
    this.confessions = [
      ...this.confessions,
      new Confession({
        ...confession,
        id: format(new Date(), DATE_FORMAT) + this.confessions.length,
      }),
    ];
  }

  @action
  updateService(service: TConfession) {
    this.confessions = this.confessions.map((s) =>
      s.id === service.id ? service : s
    );
  }

  @action
  removeConfession(confession: Confession) {
    this.confessions = this.confessions.filter((c) => c.id !== confession.id);
  }

  sortByTime(confessionA: Confession, confessionB: Confession) {
    if (
      isBefore(
        new Date(confessionA.date + " " + confessionA.fromTime),
        new Date(confessionB.date + " " + confessionB.fromTime)
      )
    ) {
      return -1;
    } else if (
      isSameMinute(
        new Date(confessionA.date + " " + confessionA.fromTime),
        new Date(confessionB.date + " " + confessionB.fromTime)
      )
    ) {
      // TODO: sort by string
      if (confessionA.title > confessionB.title) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  }

  @action
  getConfessionsByDay(day: Day) {
    const selectedConfession = this.confessions.filter((confession) =>
      confession.days?.includes(day)
    );
    return selectedConfession.sort(this.sortByTime);
  }

  @action
  getConfessionsNextWeek() {
    const selectedConfession = this.confessions.filter(
      (confession) =>
        confession.date &&
        isAfter(new Date(confession.date), add(new Date(), { days: 7 }))
    );
    return selectedConfession.sort(this.sortByTime);
  }
  @action
  getConfessionsByDate({
    fromDate,
    toDate,
  }: {
    fromDate?: string;
    toDate: string;
  }) {
    const selectedConfession = this.confessions.filter(
      (confession) =>
        confession.date &&
        isAfter(new Date(confession.date), new Date(toDate)) &&
        isBefore(new Date(confession.date), new Date(fromDate ?? ""))
    );
    return selectedConfession.sort(this.sortByTime);
  }

  constructor() {
    this.addConfession({
      title: "Late Confession",
      fromTime: "15:00",
      toTime: "17:00",
      priest: "ks. Marcin",
      days: [Day.mon, Day.wed, Day.fri],
    });
    this.addConfession({
      title: "Normal Confession",
      fromTime: "13:00",
      toTime: "15:00",
      priest: "ks. Marcin",
      days: [Day.mon, Day.wed, Day.fri, Day.sat],
    });
    this.addConfession({
      title: "Lent Confession",
      date: format(add(new Date(), { days: 10 }), DATE_FORMAT),
      fromTime: "6:00",
      toTime: "23:00",
      priest: "ks. Robak",
    });
    this.addConfession({
      title: "Next Solo Confession",
      date: format(add(new Date(), { days: 3 }), DATE_FORMAT),
      fromTime: "6:00",
      toTime: "23:00",
      priest: "ks. Robak",
    });
    this.addConfession({
      title: "Today Solo Confession",
      date: format(new Date(), DATE_FORMAT),
      fromTime: "6:00",
      toTime: "23:00",
      priest: "ks. Robak",
    });
  }
}

const confessionStore = new ConfessionStore();
export const ConfessionStoreContext = createContext(confessionStore);
export const ConfessionStoreProvider: React.FC<{}> = ({ children }) => (
  <ConfessionStoreContext.Provider value={confessionStore}>
    {children}
  </ConfessionStoreContext.Provider>
);
