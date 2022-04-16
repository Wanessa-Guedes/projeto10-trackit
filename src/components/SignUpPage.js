
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Input from "./Input";
import Button from "./Button";
import LogoOne from "./LogoOne";
import Logo from "../assets/img/logo.png";

export default function SignUpPage() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [user, setUser] = useState("");
    const [avatar, setAvatar] = useState("");
    

    const navigate = useNavigate();

    // Pegar axios
    function cadastrar() {
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const promise = axios.post(URL, {
            email,
            name: user,
            image: avatar,
            password: senha
        });
        promise.then(response => {
            const { data } = response;
            console.log(data);
            navigate("/");
        })
        promise.catch(err => console.log(err.response))
    }

    return (
        <Container>
            <img src={Logo} alt="" />
            <LogoOne />
            <Input type="text" placeholder="E-mail" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Senha" value={senha}
                onChange={(e) => setSenha(e.target.value)} />
            <Input type="text" placeholder="Nome" value={user}
                onChange={(e) => setUser(e.target.value)} />
            <Input type="text" placeholder="Foto (URL)" value={avatar}
                onChange={(e) => setAvatar(e.target.value)} />
            <Button onClick={cadastrar}>Cadastrar</Button>
            <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
        </Container>
    )
}

const Container = styled.div`
min-height: 100vh;
width: 100%;
padding: 31px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #FFFFFF;

img{
    width: 50%;
}
`;

const StyledLink = styled(Link)`
display: flex;
justify-content: center;
align-items: center;
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 13.976px;
line-height: 17px;
text-align: center;
text-decoration-line: underline;
color: #52B6FF;
margin-top: 25px;
`;