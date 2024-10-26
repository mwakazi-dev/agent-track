export enum InputType {
  TEXT = "text",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  TEL = "tel",
  URL = "url",
  DATE = "date",
  DATETIME_LOCAL = "datetime-local",
}

export enum Roles {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export enum Endpoints {
  SIGN_IN_WITH_PASSWORD = "signInWithPassword",
  LOOKUP = "lookup",
}

export enum StatusCodes {
  Ok = 200,
  BadRequest = 400,
  InternalServerError = 500,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}

export enum AuthErrors {
  TOO_MANY_ATTEMPTS_TRY_LATER = "TOO_MANY_ATTEMPTS_TRY_LATER",
  INVALID_LOGIN_CREDENTIALS = "INVALID_LOGIN_CREDENTIALS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  INVALID_ID_TOKEN = "INVALID_ID_TOKEN",
  WEAK_PASSWORD = "WEAK_PASSWORD",
  EXPIRED_TOKEN = "EXPIRED_TOKEN",
  USER_DISABLED = "USER_DISABLED",
}

export enum ErrorMessages {
  TOO_MANY_ATTEMPTS_TRY_LATER = "Access to this account has been temporarily disabled due to many failed login attempts.",
  INVALID_LOGIN_CREDENTIALS = "Invalid email or password.",
  INVALID_PASSWORD = "Invalid password.",
  EMAIL_NOT_FOUND = "Email address not found.",
  INTERNAL_SERVER_ERROR = "Something went wrong. Our team is working on fixing it.",
  UNAUTHORIZED = "You are not authenticated. Please sign in to continue.",
  FORBIDDEN = "You are not authorized to access this resource.",
  USER_NOT_FOUND = "User not found. The user may have been deleted.",
  INVALID_ID_TOKEN = "The user's credential is no longer valid. The user must sign in again.",
  WEAK_PASSWORD = "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  EXPIRED_TOKEN = "Token has expired. Please sign in again.",
}
