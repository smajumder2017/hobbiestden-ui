export interface ICreateBlog {
  title: string;
  subTitle: string;
  tags: string[];
  coverImageUrl: string;
  tempCoverImage: string;
  sections: IBlogSections[];
}

export interface IBlogSections {
  header: string | null;
  subSections: {
    [key: string]: IContent;
  };
}

export interface IContent {
  contentType: "none" | "text" | "image" | "video";
  contentValue: string;
  contentMeta: IContentMeta;
}

export interface IContentMeta {
  backgroundColor: string | null;
  borderColor: string | null;
  imageHeight: string | null;
  imageWidth: string | null;
  mainTainAspectRatio?: boolean;
}

