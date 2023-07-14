import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

function Registration(props) {
    return (
        <LoginForm
            title="Регистрация"
            buttonText="Зарегистрироваться"
            auth={props.auth}
        >
            <p className="auth__subtitle">Уже зарегистрированы?&nbsp;
                <Link className="auth__link" to="/sign-in">
                    Войти
                </Link>
            </p>
        </LoginForm>
    )
}

export default Registration;