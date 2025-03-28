export const ROUTES = {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    DASHBOARD: "/dashboard",
    USERS: "/dashboard/users",
    USER_DETAIL: (id: string | number) => `/dashboard/users/${id}`,
    SETTINGS: "/dashboard/settings",
    LOGIN: "/login",
    REGISTER: "/register",
    NOT_FOUND: "/404",
};
