import { ErrorType } from "@schemas/entities/responseEntity";

export abstract class ErrorVS extends Error{
  abstract readonly status: number;
  readonly type: ErrorType;
  protected constructor(message: string, defaultType: ErrorType, customType?: ErrorType) {
    super(message);
    this.name = this.constructor.name;
    this.type = customType || defaultType
  }
}

export class ValidationError extends ErrorVS {
  readonly status = 400;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_VALIDATION', type)
  }
}

export class UnauthorizedError extends ErrorVS {
  readonly status = 403;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_UNAUTHORIZED', type);
  }
}

export class NotFoundError extends ErrorVS {
  readonly status = 404;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_NOT_FOUND', type)
  }
}

export class ConflictError extends ErrorVS {
  readonly status = 409;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_CONFLICT', type)
  }
}

export class InvalidCredentialsError extends ErrorVS {
  readonly status = 401;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_INVALID', type)
  }
}

export class ManyRequestsError extends ErrorVS {
  readonly status = 429;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_MANY_REQUESTS', type)
  }
}

export class ServerError extends ErrorVS {
  readonly status = 500;
  constructor(message: string, type?: ErrorType){
    super(message, 'VS_SERVER_ERROR', type)
  }
}

export default {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  InvalidCredentialsError,
  ManyRequestsError,
  ServerError
}