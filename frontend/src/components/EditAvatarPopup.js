import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup(props) {
    const inputRef = useRef('');

    useEffect(() => {
        inputRef.current.value = '';
    }, [props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar(inputRef.current.value);
      }  

      return (
        <PopupWithForm
                title='Обновить аватар'
                text='Создать'
                name='avatar'
                isOpen={props.isOpen}
                onClose={props.onClose}
                onSubmit={handleSubmit}>


                <input ref={inputRef} className="popup__input popup__input_avatar" name="link" type="url"
                    placeholder="Ссылка на аватар" required />
                <span className="avatar-error popup__input-error"></span>

            </PopupWithForm>
      )
}

export default EditAvatarPopup;