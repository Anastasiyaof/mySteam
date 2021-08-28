export interface User {
    [key:string]: any,
    email: string,
    password?: string,
    returnSecureToken?: boolean,
    username?: string,
    id: string,
    age?: string,
    games?: number[],
    friends?: number[],
    invites?: number[]
}

export interface FbAuthResponse {
    idToken: string,
    expiresIn: string
}