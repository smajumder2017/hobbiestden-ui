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

export interface ICreateBlogRequest {title: string, category?: string, thumbnailImage: string, content: ICreateBlog | null};

export interface IBlogResponse {
  title: string;
  status: "CREATED" | "SUBMITTED" | "APPROVED" | "NOT APPROVED" | "PUBLISHED";
  starts: number;
  likes: number;
  approver: string | null;
  user: {
    firstName: string;
    lastName: string;
    image?: string;
  };
  blogId: string;
  category: string;
  thumbnailImage: string | null;
  createdAt: string;
  updatedAt: string;
  publishDate: string | null;
  content: IContentResponse;
}
