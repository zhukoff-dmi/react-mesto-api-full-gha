import '../pages/index.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import EditProfilePopup from './EditProfilePopup';
import api from '../utils/Api';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Registration from './Registration';
import Authorization from './Authorization';
import * as Auth from '../utils/Auth';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [userEmail, setUserEmail] = useState("");

    const [isSuccess, setSuccess] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const navigate = useNavigate();

    function handleSignUp(email, password) {
        Auth.signUp(email, password)
            .then((res) => {
                if (res.data.email) {
                    setSuccess(true);
                    navigate('?sign-in', { replace: true })
                    setIsInfoTooltipOpen(true);
                }
            })
            .catch((error) => {
                console.error(error)
                setSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

    function handleSignIn(email, password) {
        Auth.signIn(email, password)
            .then((data) => {
                console.log(data)
                console.log(data.token);
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setLoggedIn(true);
                    setUserEmail(email);
                    navigate('/', { replace: true })
                }
            })
            .catch((error) => {
                console.error(error)
                setSuccess(false);
                setIsInfoTooltipOpen(true);
            })
    }

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            Auth.getMyEmail(jwt)
                .then((res) => {
                    setUserEmail(res.data.email);
                    setLoggedIn(true);
                    navigate('/', { replace: true });
                })
                .catch(error => console.error(error))
        }
    }, [navigate])

    useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        api.getCards().then((data) => {
            setCards(data);
        }).catch(error => console.error(error));
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(error => console.error(error))
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((prevState) => prevState.filter((el) => el._id !== card._id))
        }).catch(error => console.error(error))
    }

    function handleUpdateUser(inputData) {
        api.updateUserData(inputData).then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        }).catch(error => console.error(error))
    }

    function hadleUpdateAvatar(avatarLink) {
        api.updateImageAvatar(avatarLink).then((updated) => {
            setCurrentUser(updated);
            closeAllPopups();
        }).catch(error => console.error(error))
    }

    function handleAddNewCard(cardData) {
        api.addNewCard(cardData).then((updated) => {
            setCards([updated, ...cards]);
            closeAllPopups();
        }).catch(error => console.error(error))
    }

    function handleLogout() {
        localStorage.removeItem('jwt')
        setLoggedIn(false);
    }

    function openEditAvatarPopup() {
        setIsEditAvatarPopupOpen(true);
    }

    function openEditProfilePopup() {
        setIsEditProfilePopupOpen(true);
    }

    function openEditPlacePopup() {
        setIsAddPlacePopupOpen(true);
    }

    function openImagePopup(card) {
        setSelectedCard(card);
    }

    const closeAllPopups = function () {
        setIsInfoTooltipOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});

    }

    return (
        <div className='page'>
            <CurrentUserContext.Provider value={currentUser} >
                <Header
                    logout={handleLogout}
                    navigate={navigate}
                    userEmail={userEmail}
                />
                <Routes>
                    <Route
                        path="/sign-up"
                        element={
                            <Registration
                                auth={handleSignUp}
                                isLoggedIn={isLoggedIn}
                            />}
                    ></Route>
                    <Route
                        path="/sign-in"
                        element={
                            <Authorization
                                auth={handleSignIn}
                                isLoggedIn={isLoggedIn}
                            />}
                    ></Route>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                isLoggedIn={isLoggedIn}
                                element={Main}
                                cards={cards}
                                onEditProfile={openEditProfilePopup}
                                onEditAvatar={openEditAvatarPopup}
                                onAddPlace={openEditPlacePopup}
                                onCardClick={openImagePopup}
                                onCardLike={handleCardLike}
                                onDeleteClick={handleCardDelete}
                            />}
                    ></Route>
                </Routes>
                <Footer />

                <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddNewCard} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={hadleUpdateAvatar} />

                <PopupWithForm
                    title='Вы уверены?'
                    text='Да'
                    name='delete-card'
                    onClose={closeAllPopups}>
                </PopupWithForm>

                <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
