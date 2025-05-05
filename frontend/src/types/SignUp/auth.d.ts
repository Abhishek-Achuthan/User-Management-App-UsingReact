
export interface  RegisterFormData  {
    username: string;
    email: string;
    phone: string;
    password: string;
    image?:File | null;
}


export interface LoginFormData {
    email: string;
    password: string;
}



