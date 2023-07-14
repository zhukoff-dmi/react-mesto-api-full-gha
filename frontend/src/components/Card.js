import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like_active'}`
    );;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onDeleteClick(props.card);
    }

    return (
        <article className="card">
            <img className="card__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="card__signature">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="card__like-number">{props.card.likes.length}</p>
                </div>
            </div>
            { isOwn && <button className="card__delete-button" type="button" onClick={handleDeleteClick} />}
        </article>

    )
}

export default Card;