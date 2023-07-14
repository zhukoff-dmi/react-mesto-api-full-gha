import logo from '../images/Header-logo.svg';
import { useLocation, Link } from 'react-router-dom';

function Header(props) {

    const location = useLocation();

    return (
        <header className="header">
            <img src={logo} className="header__logo" alt="Логотип Mesto" />
            {location.pathname === '/' &&
                <div className="header__container">
                    <p className="header__email">{props.userEmail}</p>
                    <button className="header__logout" onClick={props.logout}>Выйти</button>
                </div>
            }

            {location.pathname === '/sign-up' &&
                <div className="header__container">
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </div>
            }

            {location.pathname === '/sign-in' &&
                <div className="header__container">
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </div>
            }
        </header>
    )
}

export default Header;