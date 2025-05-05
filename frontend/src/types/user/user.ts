export interface EditableUser {
    name?: string,
    email : string,
    phone : string,
    _id?: string;
    username? : string
    image:string

}

export interface UserState {
    name : string,
    email : string,
    phone : string,
    token? : string,
    image: string,
}

export interface EditUser {
    name : string,
    email : string,
    phone : string,
    _id:string,
    token? : string,
    image : string,
}