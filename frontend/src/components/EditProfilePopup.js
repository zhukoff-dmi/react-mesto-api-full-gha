import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name ?? '');
        setJob(currentUser.about ?? '');
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: job,
        });
    }

    function handleNmaeChange(e) {
        setName(e.target.value);
    }

    function handleJobChange(e) {
        setJob(e.target.value);
    }

    return (
        <PopupWithForm
            title='Редактировать профиль'
            text='Сохранить'
            name='edit-profile'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input value={name || ''} onChange={handleNmaeChange} className="popup__input popup__input_type_name" name="name" type="text"
                placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="username-error popup__input-error"></span>

            <input value={job || ''} onChange={handleJobChange} className="popup__input popup__input_type_job" name="about" type="text"
                placeholder="О себе" minLength="2" maxLength="200" required />
            <span className="job-error popup__input-error"></span>

        </PopupWithForm>)
}

export default EditProfilePopup;