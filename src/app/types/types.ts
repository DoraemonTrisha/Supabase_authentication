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

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
