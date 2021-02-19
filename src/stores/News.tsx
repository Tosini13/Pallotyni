import React from "react";
import moment from "moment";

import { action, observable } from "mobx";
import { TNews } from "../models/News";
import { DateFormat, Id } from "../models/Global";
import { mockNews } from "../mockData/News";

type TNewsProps = Omit<TNews, "date"> & {
  date?: string;
};

export class News {
  @observable
  id: Id;

  @observable
  title: string;

  @observable
  content: string;

  @observable
  date: string;

  constructor({ id, title, content, date }: TNewsProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.date = date ?? moment().format(DateFormat);
  }
}

type TCreateNewsProps = Omit<TNews, "date" | "id"> & {
  date?: string;
};

export class NewsStore {
  @observable
  private news: News[];

  @action
  getAllNews() {
    return this.news;
  }

  @action
  getNews(id: Id) {
    return this.news.find((news) => news.id === id);
  }

  @action
  createNews(newsData: TCreateNewsProps) {
    const newNews = new News({
      ...newsData,
      id: moment().format() + this.news.length,
    });
    this.news = [newNews, ...this.news];
  }

  @action
  deleteNews(id: Id) {
    this.news = this.news.filter((news) => news.id !== id);
  }

  constructor() {
    this.news = [...mockNews];
  }
}

export const newsStore = new NewsStore();
export const NewStoreContext = React.createContext(newsStore);
export const NewStoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <NewStoreContext.Provider value={newsStore}>
      {children}
    </NewStoreContext.Provider>
  );
};
