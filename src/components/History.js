import axios from "axios";
import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";


import AppContext from "../contexts/Context";
import 'react-circular-progressbar/dist/styles.css';
import Input from "./Input";
import ListHabits from "./ListHabits";


export default function History(props) {

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
                        <HabitsTextSoon>
                            <p> Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                        </HabitsTextSoon>
                    ) : (habitsHistory !== null) ? (
                        <HabitsHistoryStyle>
                            {
                                habitsHistory.map((habitHistory, item) =>
                                    <div key={item}>
                                        <p>{habitHistory.day}</p>
                                        {
                                            habitHistory.habits.map((habit, item) =>
                                                <p key={item}>{habit.name}</p>
                                            )
                                        }
                                    </div>)
                            }
                        </HabitsHistoryStyle>
                    ) : (<p>Carregando histórico de hábitos...</p>)
                }
            </>
        )
    }

    const habitsStrucutureHistory = historyHabits();

    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <img src={avatar} alt="" />
            </Header>

            <MainHeader>Histórico</MainHeader>
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
background-color: #E5E5E5;
overflow-y: scroll;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
min-height: 527px;
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

const MainHeader = styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;

`;

const HabitsTextSoon = styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #666666;
`;

const HabitsHistoryStyle = styled.div `
display: flex;
flex-direction: column;
background: #FFFFFF;
border-radius: 5px;
width: 90%;

h1 {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
}

p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666;
}

div {
    display: flex;
    flex-direction: column;
}
`;

