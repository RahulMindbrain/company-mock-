export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_ERROR: 500,
} as const;



export const ERROR_CODES = {
  // General
  INTERNAL_ERROR: "INTERNAL_ERROR",
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  VALIDATION_ERROR: "VALIDATION_ERROR",

  // Auth
  AUTH_FAILED: "AUTH_FAILED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  INVALID_TOKEN: "INVALID_TOKEN",

  // User
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  INVALID_USER_DATA: "INVALID_USER_DATA",

  // Country
  COUNTRY_NOT_FOUND: "COUNTRY_NOT_FOUND",
  COUNTRY_ALREADY_EXISTS: "COUNTRY_ALREADY_EXISTS",
  INVALID_COUNTRY_DATA: "INVALID_COUNTRY_DATA",

  // State
  STATE_NOT_FOUND: "STATE_NOT_FOUND",
  STATE_ALREADY_EXISTS: "STATE_ALREADY_EXISTS",
  INVALID_STATE_DATA: "INVALID_STATE_DATA",

  // City
  CITY_NOT_FOUND: "CITY_NOT_FOUND",
  CITY_ALREADY_EXISTS: "CITY_ALREADY_EXISTS",
  INVALID_CITY_DATA: "INVALID_CITY_DATA",

  //Company
  COMPANY_NOT_FOUND: "COMPANY_NOT_FOUND",
  COMPANY_ALREADY_EXISTS: "COMPANY_ALREADY_EXISTS",
  INVALID_COMPANY_DATA: "INVALID_COMPANY_DATA",

  //Plan
  PLAN_NOT_FOUND: "PLAN_NOT_FOUND",
  INVALID_PLAN_DATA: "INVALID_PLAN_DATA",
  PLAN_CREATE_FAILED: "PLAN_CREATE_FAILED",
  PLAN_UPDATE_FAILED: "PLAN_UPDATE_FAILED",
  PLAN_DELETE_FAILED: "PLAN_DELETE_FAILED",
  PLAN_ALREADY_EXISTS: "PLAN_ALREADY_EXISTS",
  
  //Admin
  ADMIN_NOT_FOUND: 'ADMIN_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  INVALID_ADMIN_ID: 'INVALID_ADMIN_ID',
  INVALID_PAYLOAD: 'INVALID_PAYLOAD',
  ADMINTYPE_INVALID: 'ADMINTYPE_INVALID',


  //Data
  DATA_INSUFFICIENT: 'DATA_INSUFFICIENT',

  //Password
  PASSWORD_REQUIRED: "PASSWORD_REQUIRED",
  PASSWORD_TOO_WEAK: "PASSWORD_TOO_WEAK",
  PASSWORD_MISMATCH: "PASSWORD_MISMATCH",
  PASSWORD_INCORRECT: "PASSWORD_INCORRECT",
  PASSWORD_SAME_AS_OLD: "PASSWORD_SAME_AS_OLD",
  PASSWORD_RESET_EXPIRED: "PASSWORD_RESET_EXPIRED",
  PASSWORD_RESET_INVALID: "PASSWORD_RESET_INVALID",

  //Category
  CATEGORY_NOT_FOUND: "CATEGORY_NOT_FOUND",
  CATEGORY_ALREADY_EXISTS: "CATEGORY_ALREADY_EXISTS",
  CATEGORY_VALIDATION_ERROR: "CATEGORY_VALIDATION_ERROR",
  CATEGORY_CREATION_FAILED: "CATEGORY_CREATION_FAILED",
  CATEGORY_UPDATE_FAILED: "CATEGORY_UPDATE_FAILED",
  CATEGORY_DELETE_FAILED: "CATEGORY_DELETE_FAILED",

  //Brand
  BRAND_NOT_FOUND: "BRAND_NOT_FOUND",
  BRAND_ALREADY_EXISTS: "BRAND_ALREADY_EXISTS",
  BRAND_CREATION_FAILED: "BRAND_CREATION_FAILED",
  BRAND_UPDATE_FAILED: "BRAND_UPDATE_FAILED",
  BRAND_DELETE_FAILED: "BRAND_DELETE_FAILED",

  // Product
  PRODUCT_NOT_FOUND: "PRODUCT_NOT_FOUND",
  PRODUCT_ALREADY_EXISTS: "PRODUCT_ALREADY_EXISTS",
  PRODUCT_CREATION_FAILED: "PRODUCT_CREATION_FAILED",
  PRODUCT_UPDATE_FAILED: "PRODUCT_UPDATE_FAILED",
  PRODUCT_DELETE_FAILED: "PRODUCT_DELETE_FAILED",
  PRODUCT_NAME_REQUIRED: "PRODUCT_NAME_REQUIRED",

} as const;



export const ERROR_MESSAGES = {
  // General
  INTERNAL_ERROR: "An unexpected error occurred.",
  BAD_REQUEST: "Invalid request data.",
  UNAUTHORIZED: "Authentication is required.",
  FORBIDDEN: "You do not have permission.",
  NOT_FOUND: "The requested resource was not found.",
  CONFLICT: "Resource already exists.",
  VALIDATION_ERROR: "One or more fields are invalid.",

  // Auth
  AUTH_FAILED: "Invalid login credentials.",
  TOKEN_EXPIRED: "Token expired. Please login again.",
  INVALID_TOKEN: "Provided token is invalid.",

  // User
  USER_NOT_FOUND: "User not found.",
  USER_ALREADY_EXISTS: "User already exists.",
  INVALID_USER_DATA: "Invalid user data.",

  // Country
  COUNTRY_NOT_FOUND: "Country not found.",
  COUNTRY_ALREADY_EXISTS: "Country already exists.",
  INVALID_COUNTRY_DATA: "Invalid country data.",

  // State
  STATE_NOT_FOUND: "State not found.",
  STATE_ALREADY_EXISTS: "State already exists.",
  INVALID_STATE_DATA: "Invalid state data.",

  // City
  CITY_NOT_FOUND: "City not found.",
  CITY_ALREADY_EXISTS: "City already exists.",
  INVALID_CITY_DATA: "Invalid city data.",

  //Company
  COMPANY_NOT_FOUND: "Company not found.",
  COMPANY_ALREADY_EXISTS: "Company already exists.",
  INVALID_COMPANY_DATA: "Invalid company data or Incomplete data.",
  COMPANY_MAIL_EXIST: "Email already exists",

  //Plans
  PLAN_NOT_FOUND: "The requested plan was not found.",
  INVALID_PLAN_DATA: "The provided plan data is invalid.",
  PLAN_CREATE_FAILED: "Failed to create the plan.",
  PLAN_UPDATE_FAILED: "Failed to update the plan.",
  PLAN_DELETE_FAILED: "Failed to delete the plan.",
  PLAN_ALREADY_EXISTS: "A plan with the same name already exists.",

  //Admin
  ADMIN_NOT_FOUND: 'The admin you are trying to access does not exist.',
  EMAIL_ALREADY_EXISTS: 'An admin with this email already exists.',
  INVALID_ADMIN_ID: 'The provided admin ID is invalid.',
  INVALID_PAYLOAD: 'The data provided is incomplete or invalid.',
  ADMINTYPE_INVALID: 'The provided admin type is not valid.',

  //Data
  DATA_INSUFFICIENT: 'Required fields are missing or incomplete.',

  //Password
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_TOO_WEAK:
    "Password must include uppercase, lowercase, number, and special character.",
  PASSWORD_MISMATCH: "Passwords do not match.",
  PASSWORD_INCORRECT: "The current password you entered is incorrect.",
  PASSWORD_SAME_AS_OLD: "The new password cannot be the same as the old password.",
  PASSWORD_RESET_EXPIRED: "This password reset link has expired.",
  PASSWORD_RESET_INVALID: "Invalid or malformed password reset token.",

  //Category
  CATEGORY_NOT_FOUND: "The specified category was not found.",
  CATEGORY_ALREADY_EXISTS: "A category with this name already exists.",
  CATEGORY_VALIDATION_ERROR: "Category validation failed. Please check the input data.",
  CATEGORY_CREATION_FAILED: "Failed to create category due to a server error.",
  CATEGORY_UPDATE_FAILED: "Failed to update category due to a server error.",
  CATEGORY_DELETE_FAILED: "Failed to delete category due to a server error.",

 
  //Brand
  BRAND_NOT_FOUND: "Brand not found.",
  BRAND_ALREADY_EXISTS: "Brand already exists.",
  BRAND_CREATION_FAILED: "Failed to create brand.",
  BRAND_UPDATE_FAILED: "Failed to update brand.",
  BRAND_DELETE_FAILED: "Failed to delete brand.",

  //Product

  PRODUCT_NOT_FOUND: "Product not found.",
  PRODUCT_ALREADY_EXISTS: "Product already exists.",
  PRODUCT_CREATION_FAILED: "Failed to create product.",
  PRODUCT_UPDATE_FAILED: "Failed to update product.",
  PRODUCT_DELETE_FAILED: "Failed to delete product.",
  PRODUCT_NAME_REQUIRED: "Product name is required",


} as const;

export const SUCCESS_CODES = {
  //General
  SUCCESS: "SUCCESS",
  CREATED: "CREATED",
  UPDATED: "UPDATED",
  DELETED: "DELETED",

  // Company
  COMPANY_CREATED: "COMPANY_CREATED",
  COMPANY_FETCHED: "COMPANY_FETCHED",
  COMPANY_UPDATED: "COMPANY_UPDATED",
  COMPANY_DELETED: "COMPANY_DELETED",

  // User, Country, State, City 
  USER_CREATED: "USER_CREATED",
  COUNTRY_CREATED: "COUNTRY_CREATED",
  STATE_CREATED: "STATE_CREATED",
  CITY_CREATED: "CITY_CREATED",

  //Plan
  PLAN_CREATED: "PLAN_CREATED",
  PLAN_UPDATED: "PLAN_UPDATED",
  PLAN_DELETED: "PLAN_DELETED",
  PLAN_FETCHED: "PLAN_FETCHED",
  PLANS_FETCHED: "PLANS_FETCHED",

  //Admin
  ADMIN_CREATED: 'ADMIN_CREATED',
  ADMIN_FETCHED: 'ADMIN_FETCHED',
  ADMINS_FETCHED: 'ADMINS_FETCHED',
  ADMIN_UPDATED: 'ADMIN_UPDATED',
  ADMIN_DELETED: 'ADMIN_DELETED',
  ADMIN_STATUS_UPDATED: 'ADMIN_STATUS_UPDATED',

  //Password
  PASSWORD_UPDATED: "PASSWORD_UPDATED",
  PASSWORD_RESET_SENT: "PASSWORD_RESET_SENT",
  PASSWORD_RESET_SUCCESS: "PASSWORD_RESET_SUCCESS",

  //Category
  CATEGORY_CREATED: "CATEGORY_CREATED",
  CATEGORY_FETCHED: "CATEGORY_FETCHED",
  CATEGORY_UPDATED: "CATEGORY_UPDATED",
  CATEGORY_DELETED: "CATEGORY_DELETED",
  CATEGORY_LIST_FETCHED: "CATEGORY_LIST_FETCHED",

  //Brand
  BRAND_CREATED: "BRAND_CREATED",
  BRAND_FETCHED: "BRAND_FETCHED",
  BRAND_UPDATED: "BRAND_UPDATED",
  BRAND_DELETED: "BRAND_DELETED",

  // Product
  PRODUCT_CREATED: "PRODUCT_CREATED",
  PRODUCT_FETCHED: "PRODUCT_FETCHED",
  PRODUCT_UPDATED: "PRODUCT_UPDATED",
  PRODUCT_DELETED: "PRODUCT_DELETED",

} as const;


export const SUCCESS_MESSAGES = {
  //General
  SUCCESS: "Operation successful.",
  CREATED: "Resource created successfully.",
  UPDATED: "Resource updated successfully.",
  DELETED: "Resource deleted successfully.",

  // Company
  COMPANY_CREATED: "Company created successfully.",
  COMPANY_FETCHED: "Company fetched successfully.",
  COMPANY_UPDATED: "Company updated successfully.",
  COMPANY_DELETED: "Company deleted successfully.",

  //Plan
  PLAN_CREATED: "Plan created successfully.",
  PLAN_UPDATED: "Plan updated successfully.",
  PLAN_DELETED: "Plan deleted successfully.",
  PLAN_FETCHED: "Plan retrieved successfully.",
  PLANS_FETCHED: "Plans retrieved successfully.",

  //Admin
  ADMIN_CREATED: 'Admin has been successfully created.',
  ADMIN_FETCHED: 'Admin details retrieved successfully.',
  ADMINS_FETCHED: 'Admin list retrieved successfully.',
  ADMIN_UPDATED: 'Admin details updated successfully.',
  ADMIN_DELETED: 'Admin has been deleted successfully.',
  ADMIN_STATUS_UPDATED: 'Admin status updated successfully.',

  //Password
  PASSWORD_UPDATED: "Password updated successfully.",
  PASSWORD_RESET_SENT: "Password reset link sent to your email.",
  PASSWORD_RESET_SUCCESS: "Your password has been reset successfully.",

  //Category
  CATEGORY_CREATED: "Category created successfully.",
  CATEGORY_FETCHED: "Category retrieved successfully.",
  CATEGORY_UPDATED: "Category updated successfully.",
  CATEGORY_DELETED: "Category deleted successfully.",
  CATEGORY_LIST_FETCHED: "Categories retrieved successfully.",

  //Brand
  BRAND_CREATED: "Brand created successfully.",
  BRAND_FETCHED: "Brand fetched successfully.",
  BRAND_UPDATED: "Brand updated successfully.",
  BRAND_DELETED: "Brand deleted successfully.",

  // Product
  PRODUCT_CREATED: "Product created successfully.",
  PRODUCT_FETCHED: "Product fetched successfully.",
  PRODUCT_UPDATED: "Product updated successfully.",
  PRODUCT_DELETED: "Product deleted successfully.",

} as const;
