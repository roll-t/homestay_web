export const ROUTES = {
    HOME: "/home",
    ABOUT: "/about",
    CONTACT: "/contact",
    PROFILE: "/auth/profile",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    DASHBOARD: "/dashboard",
    USERS: "/dashboard/users",
    USER_DETAIL: (id: string | number) => `/dashboard/users/${id}`,
    SETTINGS: "/dashboard/settings",
    NOT_FOUND: "/404",
};
