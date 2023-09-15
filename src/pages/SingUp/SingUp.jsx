import "./styles.css"
import { useContext } from "react";
import { SingContext } from "../../context/SingContext";
import {
    TextField,
    Button,
    Typography,
} from "@mui/material";
import {
    Link,
    useNavigate
} from "react-router-dom";

function SingUp() {
    const {
        errorNameMessage, setErrorNameMessage,
        errorEmailMessage, setErrorEmailMessage,
        form, setForm,
        steps, setSteps
    } = useContext(SingContext);

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        if (!form.name) {
            return setErrorNameMessage(true);
        }

        if (!form.email) {
            return setErrorEmailMessage(true);
        }
        setSteps(1);
        navigate("/password");
    }

    function handleChange(event) {
        setForm((prevState) => {
            return ({ ...prevState, [event.target.name]: event.target.value })
        });
        setErrorEmailMessage(false);
        setErrorNameMessage(false);
    }

    return (
        <main className="register-name">
            <Typography
                variant="h2"
                className="register-name__title"
                sx={{
                    fontFamily: "Montserrat",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    lineHeight: "1.95rem",
                    mb: "2rem"
                }}
            >Adicione seus dados</Typography>

            <form className="register-name__form" onSubmit={handleSubmit} >
                <Typography
                    sx={{
                        fontFamily: "Nunito",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        lineHeight: "1.25rem",
                        mb: "0.38rem"
                    }}
                >Nome*
                </Typography>
                <TextField
                    id="input-name"
                    variant="outlined"
                    placeholder="Digite seu nome"
                    sx={{ mb: "1.25rem" }}
                    error={errorNameMessage && true}
                    helperText={errorNameMessage && "O campo de nome é obrigatório."}
                    name="name"
                    value={form.name}
                    InputProps={{
                        style: {
                            height: "2.75rem",
                            borderRadius: "0.5rem",
                            borderColor: "#D0D5DD",

                            fontFamily: "Inter",
                        }
                    }}
                    onChange={(event) => handleChange(event)}
                />

                <Typography
                    sx={{
                        fontFamily: "Nunito",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        lineHeight: "1.25rem",
                        mb: "0.38rem"
                    }}
                >E-mail*
                </Typography>
                <TextField
                    variant="outlined"
                    placeholder="Digite seu e-mail"
                    className="form__input-email"
                    sx={{ mb: "2.5rem" }}
                    InputProps={{
                        style: {
                            height: "2.75rem",
                            borderRadius: "0.5rem",
                            border: "1px solid #D0D5DD",
                            fontFamily: "Inter"
                        }
                    }}
                    error={errorEmailMessage && true}
                    helperText={errorEmailMessage && "O campo de email é obrigatório."}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => handleChange(event)}
                />

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "SCPink",
                        width: "10rem",
                        alignSelf: "center",
                        mb: "0.94rem",
                        borderRadius: "0.63rem",
                        '&:hover': {
                            backgroundColor: "SCPink"
                        }
                    }}
                    type="submit"
                >
                    Continuar
                </Button>
                <Typography
                    sx={{
                        fontFamily: "Nunito",
                        fontSize: "1.125rem",
                        fontWeight: "600",
                        textAlign: "center"
                    }}> Já possui uma conta? Faça seu <Link to="/" style={{
                        color: "#DA0175"
                    }} >
                        Login
                    </Link>
                </Typography>
            </form>
            <nav className="navigation-list" >
                <a
                    className={steps === 0 ? "selected" : null}
                ></a>

                <a
                    className={steps === 1 ? "selected" : null}
                    onClick={() => {
                        if (form.password && form.passwordConfirm) {
                            setSteps(1);
                            return navigate("/password");
                        }
                    }}
                ></a>

                <a
                    className={steps === 2 ? "selected" : null}
                ></a>

            </nav>
        </main>
    )
}

export default SingUp;