import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const coreRequestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return request;
};

export const errorHandler = (error: AxiosError): Promise<never> => {
  return Promise.reject({
    message: error,
  });
};

const requestHandler = axios.create();

requestHandler.interceptors.request.use(
  (request: InternalAxiosRequestConfig) => {
    return coreRequestHandler(request);
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestHandler.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => errorHandler(error)
);

export default requestHandler;
