import { QuestionID } from "./Question";
export declare type NewsID = string;
export declare type News = {
    id: NewsID;
    url: string;
    pubdate: number;
    author: string;
    title: string;
    description: string;
    site_name: string;
    image: string;
};
export declare type QueryNewsRequest = {
    questionID?: QuestionID;
    limit?: number;
    offset?: number;
};
export declare type QueryNewsResponse = {
    results: News[];
    limit?: number;
    offset?: number;
};
export declare type SearchNewsRequest = {
    query: string;
    limit?: number;
    offset?: number;
};
export declare type SearchNewsResponse = {
    results: News[];
    limit?: number;
    offset?: number;
};
export declare type AddNewsRequest = {
    url: string;
};
export declare type LinkNewsRequest = {
    newsID: NewsID;
    questionID: QuestionID;
};
export interface NewsAPI {
    queryNews(report: AddNewsRequest): Promise<QueryNewsResponse>;
    searchNews(report: AddNewsRequest): Promise<News[]>;
    getNews(id: NewsID): Promise<News>;
    postNews(report: AddNewsRequest): Promise<News>;
    deleteNews(id: NewsID): Promise<boolean>;
    linkNews(report: LinkNewsRequest): Promise<News>;
}
