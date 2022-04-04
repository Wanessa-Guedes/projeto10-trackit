import axios from "axios";
import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";


import AppContext from "../contexts/Context";
import 'react-circular-progressbar/dist/styles.css';
import Input from "./Input";
import ListHabits from "./ListHabits";


export default function History(props){

    const { avatar } = useContext(AppContext);
    const [habitsHistory, setHabitsHistory] = useState(null);
    const percentage = 66;

    useEffect(() => {
        loadHistHabit();
    }, [props.token]);

    function loadHistHabit() {

        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setHabitsHistory(data)
        });
        promise.catch(err => alert('Erro ao carregar os hábitos'));
    }

console.log(habitsHistory)
    function historyHabits() {

        return (
            <>
                {
                    (habitsHistory === null) ? (
                        <p> Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                    ) : (habitsHistory !== null) ? (
                        
                            habitsHistory.map((habitHistory, item) =>
                                <div key={item}>
                                    <p>{habitHistory.day}</p>
                                    {
                                    habitHistory.habits.map((habit, item) =>
                                        <p key={item}>{habit.name}</p>
                                    )
                                    }
                                </div>)
                        
                    ) : (<p>Carregando histórico de hábitos...</p>)
                }
            </>
        )
    }

    const habitsStrucutureHistory = historyHabits();

    return(
        <>
        <Header>
                <h1>TrackIt</h1>
                <img src={avatar} alt="" />
            </Header>

        <h1>Histórico</h1>
        {
            <Main>
                {habitsStrucutureHistory}
            </Main>
        }

<Footer>
                <StyledLink to="/habits">Hábitos</StyledLink>
                <Link to="/today">
                    <CircularProgressbar value={percentage} text="Hoje" background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            textSize: '17.976px',
                            pathColor: "#fff",
                            trailColor: "transparent",
                            pathTransitionDuration: 0.5,
                        })} />
                </Link>
                <StyledLink to="/history">Histórico</StyledLink>
            </Footer>
        </>
    )
}


const Main = styled.div`
background-color: grey;
overflow-y: scroll;
`;

const Header = styled.div`
min-height: 70px;
width: 100%;
display: flex;
justify-content: space-around;
align-items: center;
background: #126BA5;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);


img {
    border-radius: 98.5px;
    width: 51px;
    height: 51px;
}

h1 {
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 38.982px;
    line-height: 49px;
    color: #FFFFFF
}
`;

const Footer = styled.div`
    min-height: 70px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;

    a {
        width: 91px
    }
`;

const StyledLink = styled(Link)`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
text-align: center;
text-decoration-line: none;
color: #52B6FF;
`;

