export interface CurrentUser {
    email: string;
    firstname: string;
    id: number;
    lastname: string;
}

export interface User extends CurrentUser {
    companyId: number;
}
