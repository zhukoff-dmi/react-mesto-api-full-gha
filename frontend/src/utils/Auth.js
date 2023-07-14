export const BASE_URL = "https://auth.nomoreparties.co";

const getJson = (res) => {
    if (res.ok) {
        return res.json();
    } 
    return Promise.reject(`Ошибка ${res.status}`);
}

export const signIn = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => getJson(res))
        .then((data) => {
            if (data.token) {
                return data;
            } else {
                return;
            }
        })
}

export const signUp = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'email': email, 'password': password })
    })
        .then(res => getJson(res))
}

export const getMyEmail = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
        .then(res => getJson(res))
}
