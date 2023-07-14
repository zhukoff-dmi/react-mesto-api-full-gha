import React from 'react';

import errorImage from '../images/error-image.svg';
import successImage from '../images/success-image.svg';

const InfoTooltip = ({ isOpen, onClose, isSuccess }) => {

    const infoIcon = isSuccess ? successImage : errorImage;
    const iconName = isSuccess ? `Успех` : `Ошибка`;
    const infoText = isSuccess ? `Вы успешно зарегестрировались!` :
        `Что-то пошло не так! Попробуйте еще раз.`;

    return (
        <div className={`popup popup_info-tooltip ${isOpen ? `popup_opened` : ''}`}>
            <div className="popup__container">
                <button className="popup__close-button" type="button" onClick={onClose}></button>
                <img className="popup__tooltip-image" src={infoIcon} alt={iconName}></img>
                <p className="popup__tooltip-messege">{infoText}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;