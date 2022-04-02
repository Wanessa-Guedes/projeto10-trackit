import styled from "styled-components";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import AppContext from "../contexts/Context";

export default function Today(props) {

    const { avatar } = useContext(AppContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const arrayDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const [completHabits, setCompletHabits] = useState(false);
    const [habitsSelecionados, setHabitsSelecionados] = useState([]);
    const [habitCheck, setHabitCheck] = useState("#EBEBEB");

    const percentage = 66;

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            console.log(data);
            setTodayHabits(data);
        });
        promise.catch(err => console.log(err.response));
    }, []);


    function lisOfHabits(){
        return (
        todayHabits.map((todayHabit, item) =>
        <div key={item}>
            <p>{todayHabit.name}</p>
            <p>Sequência atual: {todayHabit.currentSequence} dias
                Seu recorde: {todayHabit.highestSequence} dias</p>
            <button onClick={() => habitComplet(todayHabit.name)}>Concluido</button>
        </div>)
        )
    }

function  habitComplet(name) {

        if (habitsSelecionados.includes(name)) {
            let newHabitsArray = habitsSelecionados.filter((item) => item !== name);
            setHabitsSelecionados([...newHabitsArray]);
        } else {
            setHabitsSelecionados([...habitsSelecionados, name]);
        }

        const selecionado = habitsSelecionados.some(habitSelecionado => habitSelecionado === name);

        if(!completHabits && !selecionado){
            setHabitCheck("#8FC549");
        } else {
            setHabitCheck("#EBEBEB");
        }

        setCompletHabits(!completHabits);

    }
    

    const listaHabitos = lisOfHabits();

    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <img src={avatar} alt="" />
            </Header>
            <Main>
                <div>{arrayDays[dayjs().day() - 1]}, {dayjs().date()}/{dayjs().month() + 1}</div>
                {
                    listaHabitos
                }
            </Main>
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
                        })} />;
                </Link>
                <StyledLink to="/history">Histórico</StyledLink>
            </Footer>
        </>
    )

}

// ERRO BACKGRPUND!!!
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