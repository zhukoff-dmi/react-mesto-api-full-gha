import { useState } from "react";

function LoginForm({ title, buttonText, children, auth }) {

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    function hanfleChange(e) {
        const input = e.target;
        setForm({
            ...form,
            [input.name]: input.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        auth(form.email, form.password);
    }

    return (
        <section className="auth">
            <h1 className="auth__title">{title}</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={hanfleChange}></input>
                <input className="auth__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={hanfleChange}></input>
                <button className="auth__btn-submit" type="submit" >{buttonText}</button>
            </form>
            {children}
        </section>
    )
}

export default LoginForm;