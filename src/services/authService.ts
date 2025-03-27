export async function login(username: string, password: string) {
    return { username, token: "fake-jwt-token" };
}

export function logout() {
    console.log("User logged out");
}
