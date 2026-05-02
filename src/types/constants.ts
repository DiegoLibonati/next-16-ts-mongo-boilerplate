export interface CodesSuccess {
  getAllUsers: "SUCCESS_GET_ALL_USERS";
  getUser: "SUCCESS_GET_USER";
  getAllProducts: "SUCCESS_GET_ALL_PRODUCTS";
  getProduct: "SUCCESS_GET_PRODUCT";
  login: "SUCCESS_LOGIN";
  logout: "SUCCESS_LOGOUT";
}

export interface CodesNot {
  foundRoute: "NOT_FOUND_ROUTE";
  foundUser: "NOT_FOUND_USER";
  foundProduct: "NOT_FOUND_PRODUCT";
  validId: "NOT_VALID_ID";
}

export interface CodesError {
  generic: "ERROR_GENERIC";
  unauthorized: "ERROR_UNAUTHORIZED";
  invalidCredentials: "ERROR_INVALID_CREDENTIALS";
}

export interface MessagesSuccess {
  getAllUsers: string;
  getUser: string;
  getAllProducts: string;
  getProduct: string;
  login: string;
  logout: string;
}

export interface MessagesNot {
  foundRoute: string;
  foundUser: string;
  foundProduct: string;
  validId: string;
}

export interface MessagesError {
  generic: string;
  unauthorized: string;
  invalidCredentials: string;
}
