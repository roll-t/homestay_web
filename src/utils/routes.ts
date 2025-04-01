export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    PROFILE: "/auth/profile",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    DASHBOARD: "/dashboard",
    USERS: "/dashboard/users",
    SERVICE: "/dashboard/service",
    USER_DETAIL: (id: string | number) => `/dashboard/users/${id}`,
    SETTINGS: "/dashboard/settings",
    NOT_FOUND: "/404",
};
