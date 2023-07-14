import LoginForm from "./LoginForm";

function Authorization(props) {
    return (
        <LoginForm
            title="Вход"
            buttonText="Войти"
            auth={props.auth}
        />
    )
}

export default Authorization;