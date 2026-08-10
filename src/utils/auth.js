export function generateMockToken(username, role) {

    const payload = {
        username,
        role,
        exp: Date.now() + 3600000
    };

    const token = btoa(JSON.stringify(payload));

    localStorage.setItem("token", token);

    return token;
}

export function decodeToken(token) {
    return JSON.parse(atob(token));
}