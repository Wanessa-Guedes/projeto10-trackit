
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";


import Input from "./Input";
import Button from "./Button";
import LogoOne from "./LogoOne";
import AppContext from "../contexts/Context";
import Logo from "../assets/img/logo.png";

export default function LoginPage(props) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const {setImgProfile} = useContext(AppContext);

    const navigate = useNavigate();
    // Pegar axios
    function login(){
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
        const promise = axios.post(URL, {
                email,
                password: senha
        });
        promise.then(response =>{
            const {data} = response;
            setImgProfile(data.image);
            props.salvarToken(data.token);
            navigate("/today")
        })
        promise.catch(err => alert("Usuário ou senha inválidos!"))
    }

    return (
        <Container>
            <img src={Logo} alt="" />
            <LogoOne/>
            <Input type="text" placeholder="E-mail" value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="Senha"  value={senha} 
            onChange={(e) => setSenha(e.target.value)}/>
            <Button onClick={login}>Entrar</Button>
            <StyledLink to="/sign-in">Não tem uma conta? Cadastre-se!</StyledLink>
        </Container>
    )
}

const Container = styled.div `
min-height: 100vh;
width: 100%;
padding: 31px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
background-color: #FFFFFF;
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
`;
