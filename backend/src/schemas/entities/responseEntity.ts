export interface SuccessResponse {
    message?: string;
    data?: object | object[];
    meta?: Meta;
}

export interface ErrorResponse {
    error: string;
    type: ErrorType;
    issues?: ErrorIssue[]
};

export interface ErrorIssue {
    field: string;
    message: string;
}

export type ErrorType =
    | 'VS_VALIDATION'
    | 'VS_UNAUTHORIZED'
    | 'VS_NOT_FOUND'
    | 'VS_CONFLICT'
    | 'VS_INVALID'
    | 'VS_MANY_REQUESTS'
    | 'VS_SERVER_ERROR'
    | 'VS_DB_UNAVAILABLE'
    | 'VS_AUTH_REQUIRED'
    | 'VS_AUTH_INVALID'
    | 'VS_AUTH_EXPIRED'
    | 'VS_AUTH_LIMITED_ACCESS'
    | 'VS_INVALID_FILE'
    | 'VS_CORS_BLOCK'
    | 'VS_CONFIRM_TOKEN_REQUIRED'
    | 'VS_UNPROCESSABLE_ENTITY';

export interface Meta {
    total?: number;
    page?: number;
    perPage?: number;
    skip?: number;
    take?: number;
    totalPages?: number;
    cached?: boolean;
    hasNextPage?: boolean;
}