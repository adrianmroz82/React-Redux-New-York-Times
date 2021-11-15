export interface IMultimedia {
  subtype: string;
  url: string;
  type: string;
}

export interface IHeadline {
  main: string;
}

export interface IArticle {
  section_name: string;
  byline: { original: string };
  lead_paragraph: string;
  pub_date: string;
  multimedia: IMultimedia[];
  web_url: string;
  abstract: string;
  headline: IHeadline;
  subtype: string;
}
