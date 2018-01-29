export class User {
    constructor(
    public name: string,
    public email: string,
    public password: string,
    public surname?: string,
    public _id?: string,
    public role: string = 'USER_ROLE',
    public image?: string,
    public google_signed?: boolean
    ) {}
}
