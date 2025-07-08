import { Request as ExpressRequest, Response as ExpressResponse } from 'express';

declare global {
  namespace Express {
    interface Request extends ExpressRequest {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export interface TypedRequest<T = {}> extends ExpressRequest {
  params: T;
}

export interface TypedResponse<T = any> extends ExpressResponse {
  json: (body: T) => this;
}