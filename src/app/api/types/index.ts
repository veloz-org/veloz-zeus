// Server / API Types definition.

export enum RESPONSE_CODE {
  // Common Responses code
  INVALID_FIELDS,
  USER_NOT_FOUND,
  USER_ALREADY_EXIST,
  INVALID_EMAIL,
  INVALID_LOGIN_CREDENTIALS,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_ELIGIBLE,
  INVALID_PARAMS,
  METHOD_NOT_ALLOWED,
  ORDER_EXISTS,
  CHECKOUT_ERROR,
  ORDER_NOT_CREATED,
  SIGNUP_SUCCESSFULL,
  LOGIN_SUCCESSFULL,
  UNAUTHORIZED,
  FORBIDDEN,
  SUCCESS,
  INVALID_TOKEN,
  PLAN_NOT_FOUND,
  USER_ALREADY_SUBSCRIBED,
  ERROR,
  SUBSCRIPTION_NOT_FOUND,
  ACCOUNT_ALREADY_LINKED,
  EMAIL_FAILED_TO_SEND,
}
