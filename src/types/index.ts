// Client Types Definition

export type ResponseData = {
  errorStatus: boolean;
  message: string;
  code: string;
  statusCode: number;
  data?: any;
  error?: {
    message: string;
    error: any;
  };
};

export type UserInfo = {
  username: string;
  email: string;
  avatar: string;
  id: string;
  role: string;
};
