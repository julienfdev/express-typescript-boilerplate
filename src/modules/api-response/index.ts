interface ApiResponse {
  response: string;
  data?: Record<string, any>;
  error?: Error;
}

export default (error: boolean, content: Record<string, any>): ApiResponse => {
  return error
    ? { response: "error", error: content as Error }
    : { response: "ok", data: content };
};
