export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    token: string,
}

export type RegisterUser = Omit<User, "token" | "id">

export type LogInUser = {
    email: string,
    password: string,
}

export type VerifyLogin = {
    id: number,
    token: string,
}

export type VerifyEmail = {
    id: number,
    email: string,
    password: string,
    token: string,
}