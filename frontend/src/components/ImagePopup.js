

function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${props.card.link ? "popup_opened" : ""}`}>
            <figure className="popup__image-container">
                <button className="popup__close-button popup__image-close-button" type="button" onClick={props.onClose}></button>
                <img className="popup__image-place" src={props.card.link} alt={props.card.name} />
                <figcaption className="popup__image-caption">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;