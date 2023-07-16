class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    //отчет сервера
    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _request(url, options) {
        return fetch(`${this._baseUrl}${url}`, options).then(this._getJson)
    }

    //карточка приходит с сервера
    getCards() {
        return  this._request('/cards', {
            method: "GET",
            headers: this._headers,
        })
    }

    //получене данных пользователя
    getUserInfo() {
        return this._request('/users/me', {
            headers: this._headers,
        })
    }

    //добавление новой карточки на сервер
    addNewCard(dataCard) {
        return this._request('/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: dataCard.name,
                link: dataCard.link
            })
        })
    }

    //Обновление данных пользователя
    updateUserData(dataProfile) {
        return this._request('/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: dataProfile.name,
                about: dataProfile.about
            }),
        })
    }

    //обновление аватара
    updateImageAvatar(avatarLink) {
        return this._request('/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink,
            }),
        })
    }

    //удаление карточки
    deleteCard(id) {
        return this._request(`/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    //ставим лафк
    putLike(id) {
        return this._request(`/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
    }

    //убираем лайк
    deleteLike(id) {
        return this._request(`/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }

    changeLikeCardStatus(id, isLiked) {
        if(isLiked){
            return this.putLike(id)
        } else {
            return this.deleteLike(id)
        }
    }
}

const api = new Api({
    baseUrl: 'https://api.zhukoffdmi.student.nomoredomains.work',
    headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

export default api;