export class LoginUser {
    username: string;
    password: string;
    fullname: string;
    role: string;
    isAuthenticated?: boolean;
    isImpersonated: boolean;
    hasFullControl: boolean;
    isAdmin: boolean;
    agentId: number;
}

