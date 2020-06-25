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
  contentType: "none" | "text" | "image" | "video" | "code";
  contentValue: string;
  contentMeta: IContentMeta;
}

export interface IContentMeta {
  backgroundColor: string | null;
  borderColor: string | null;
  imageHeight: string | null;
  imageWidth: string | null;
  mainTainAspectRatio?: boolean;
  codeLanguage?: string;
  codeTheme?: string;
}

interface IContentResponse extends ICreateBlog {
  tempCoverImage: never;
}

export interface ICreateBlogRequest {title: string, category: string, thumbnailImage: string};

export interface IBlogResponse {
  status: "CREATED" | "SUBMITTED" | "APPROVED" | "NOT APPROVED";
  approver: string | null;
  _id: string;
  creator: string;
  blogId: string;
  category: string;
  thumbnailImage: string | null;
  createdAt: string;
  updatedAt: string;
  content: IContentResponse;
}
