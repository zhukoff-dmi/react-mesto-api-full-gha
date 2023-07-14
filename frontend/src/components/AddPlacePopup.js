import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onAddCard, isOpen, onClose }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleLink(e) {
        setLink(e.target.value);
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({ name, link })
    }

    return (
        <PopupWithForm
            title='Новое место'
            text='Создать'
            name='add-card'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input onChange={handleName} value={name || ''} className="popup__input popup__input_type_title" name="name" type="text"
                placeholder="Название" minLength="2" maxLength="30" required />
            <span className="title-error popup__input-error"></span>

            <input onChange={handleLink} value={link || ''} className="popup__input popup__input_type_link" name="link" type="url"
                placeholder="Ссылка на картинку" required />
            <span className="link-error popup__input-error"></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;