export type registrationType = {
  Email: string;
  BoxUniqueCode: string;
};

export type loginType = {
  Email: string;
  Password: string;
};

export type decodedUserType = {
  email: string;
  userId: string;
  exp: number;
  iat: number;
  nbf: number;
};
