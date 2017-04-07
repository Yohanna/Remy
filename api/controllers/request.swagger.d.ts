import { Request } from "express";

/**
 * Swagger adds 'swagger' object to the Express object at run time. This causes type
 * errors as TypeScript can detect this object at run time. This interface makes TypeScript
 * ignore the swagger object.
 */
interface ISwaggerRequest extends Request {
  readonly swagger: any
}
