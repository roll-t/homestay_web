export const ROUTES = {
    HOME: "/home",
    ABOUT: "/about",
    CONTACT: "/contact",
    PROFILE: "/profile",
    DASHBOARD: "/dashboard",
    USERS: "/dashboard/users",
    USER_DETAIL: (id: string | number) => `/dashboard/users/${id}`,
    SETTINGS: "/dashboard/settings",
    LOGIN: "/login",
    REGISTER: "/register",
    NOT_FOUND: "/404",
};
