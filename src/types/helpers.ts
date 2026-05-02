export interface Session {
  sub: string;
  email: string;
}

export interface ExceptionInfo {
  status: number;
  code: string;
  message: string;
}
