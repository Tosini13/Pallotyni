import React from "react";
import moment from "moment";

import { action, observable } from "mobx";
import { TNews, TNewsCreate } from "../models/News";
import { DATE_TIME_FORMAT, Id } from "../models/Global";
import { mockNews } from "../mockData/News";

type TNewsProps = Omit<TNews, "createdAt"> & {
  createdAt?: string;
};

export class News {
  @observable
  id: Id;

  @observable
  title: string;

  @observable
  content: string;

  @observable
  createdAt: string;

  constructor({ id, title, content, createdAt }: TNewsProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt ?? moment().format(DATE_TIME_FORMAT);
  }
}

export class NewsStore {
  @observable
  private news: News[];

  @action
  getAllNews() {
    return this.news;
  }

  @action
  getLatestNews() {
    return this.news.slice(0, 3);
  }

  @action
  getNews(id: Id) {
    return this.news.find((news) => news.id === id);
  }

  @action
  createNews(newsData: TNewsCreate) {
    const newNews = new News({
      ...newsData,
      id: moment().format() + this.news.length,
      createdAt: moment().format(DATE_TIME_FORMAT),
    });
    this.news = [newNews, ...this.news];
  }

  @action
  updateNews(newsData: TNews) {
    const news = new News({
      ...newsData,
      createdAt: moment().format(DATE_TIME_FORMAT),
    });
    this.news = this.news.map((n) => (n.id === news.id ? news : n));
  }

  @action
  deleteNews(news: News) {
    this.news = this.news.filter((n) => n.id !== news.id);
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
