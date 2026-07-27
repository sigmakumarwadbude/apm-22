export interface User {
    id: number;
    username: string;
    admin: boolean;
}

export interface UserCredentials {
    username: string;
    password: string;
}