import { QuestionID } from "./Question";

export type NewsID = string;

export type News = {
  id: NewsID;
  url: string;
  pubdate: number,
  author: string,
  title: string,
  description: string,
  site_name: string,
  image: string,
}

export type QueryNewsRequest = {
  questionID?: QuestionID,
  limit?: number,
  offset?: number,
}

export type QueryNewsResponse = {
  results: News[], // this may need to be decorated with other stats
  limit?: number,
  offset?: number,
}

export type SearchNewsRequest = {
  query: string,
  limit?: number,
  offset?: number,
}

export type SearchNewsResponse = {
  results: News[],
  limit?: number,
  offset?: number,
}

export type AddNewsRequest = {
  url: string;
}

export type LinkNewsRequest = {
  newsID: NewsID;
  questionID: QuestionID;
}

export interface NewsAPI {
  // POST:/news
  queryNews(report: AddNewsRequest): Promise<QueryNewsResponse>
  // POST:/news
  searchNews(report: AddNewsRequest): Promise<News[]>
  // POST:/news
  getNews(id: NewsID): Promise<News>
  // POST:/news
  postNews(report: AddNewsRequest): Promise<News>
  // DELETE:/report/{id}
  deleteNews(id: NewsID): Promise<boolean>
  // POST:/news/link/{}/{}
  linkNews(report: LinkNewsRequest): Promise<News>
}
