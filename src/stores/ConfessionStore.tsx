import React, { createContext } from "react";
import { action, observable } from "mobx";
import moment from "moment";
import { DATE_FORMAT, Day } from "../models/Global";

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

type TCreateConfession = Omit<TConfession, "id">;

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
        id: moment().format() + this.confessions.length,
      }),
    ];
  }

  sortByTime(confessionA: Confession, confessionB: Confession) {
    const getMomentDate = (time: string) => {
      const todayDate = moment().format("YYYY-MM-DD");
      return moment(todayDate + " " + time);
    };
    if (
      getMomentDate(confessionA.fromTime).isBefore(
        getMomentDate(confessionB.fromTime)
      )
    ) {
      return -1;
    } else if (
      getMomentDate(confessionA.fromTime).isSame(
        getMomentDate(confessionB.fromTime)
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
        moment(confession.date).isSameOrAfter(moment().add(7, "days"))
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
        moment(confession.date).isSameOrAfter(moment(toDate)) &&
        moment(confession.date).isSameOrBefore(
          fromDate ? moment(fromDate) : moment()
        )
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
      date: moment().add(10, "days").format(),
      fromTime: "6:00",
      toTime: "23:00",
      priest: "ks. Robak",
    });
    this.addConfession({
      title: "Next Solo Confession",
      date: moment().add(3, "days").format(),
      fromTime: "6:00",
      toTime: "23:00",
      priest: "ks. Robak",
    });
    this.addConfession({
      title: "Today Solo Confession",
      date: moment().format(),
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
