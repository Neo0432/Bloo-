import { Response, json, NextFunction } from "express";

interface ResponseFormat<T> {
  status: number;
  message: string;
  data: T;
}

export const responseFormat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originSend = res.send;

  // res.send = function (body: any) {
  //   const status = res.statusCode;
  //   const message = res.statusMessage || "Success";
  //   const formattedResponse: ResponseFormat<any> = {
  //     status,
  //     message,
  //     data: body,
  //   };
  //   return originSend.call(this, formattedResponse);
  // };
  next();
};
