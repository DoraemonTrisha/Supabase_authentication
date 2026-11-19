// export type FormData = {
//     id:number;
//     firstName:string;
//     lastName:string;
//     email: string;
//     password:string;
//     confirmPassword:string;
//     //profilePic?: FileList;
// }
// export interface FormData {
//   email: string;
//   password: string;
// }
// src/types/types.ts

// Type for the Login Form (email and password only)
export type LoginFormData = {
  email: string;
  password: string;
};

// Type for the Registration Form (with additional fields)
export type RegisterFormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
