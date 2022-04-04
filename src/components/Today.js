import styled from "styled-components";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import AppContext from "../contexts/Context";

export default function Today(props) {

    const { avatar } = useContext(AppContext);
    const {setStatusFooter} = useContext(AppContext);

    const [todayHabits, setTodayHabits] = useState([]);
    const arrayDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
    const [completHabits, setCompletHabits] = useState(false);
    const [habitsSelecionados, setHabitsSelecionados] = useState([]);
    const [habitStatus, setHabitStatus] = useState(0);
    const [selected, setSelected] = useState("");
    const [weekdays, setWeekdays] = useState([
        { id: 0, name: "domingo" },
        { id: 1, name: "segunda" },
        { id: 2, name: "terça" },
        { id: 3, name: "quarta" },
        { id: 4, name: "quinta" },
        { id: 5, name: "sexta" },
        { id: 6, name: "sabado" }
    ]);

    useEffect(() => { loadTodayHabits()},[props.token]);

    function loadTodayHabits(){
        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setTodayHabits(data);
            setHabitStatus(
                (response.data.filter((habit) => habit.done).length /
                    response.data.length) *
                    100
            );
            setStatusFooter((response.data.filter((habit) => habit.done).length /
                                                response.data.length) *
                                                100);
        });
        promise.catch(err => console.log(err.response));
    };


    function lisOfHabits() {

        return (
            todayHabits.map((todayHabit, item) => 
                <ContainerHabits>
                    <HabitsStyle key={item}>
                        <h1>{todayHabit.name}</h1>
                        <div>
                            <p> Sequência atual: {todayHabit.currentSequence} dias </p>
                            <p> Seu recorde: {todayHabit.highestSequence} dias</p>
                        </div>
                    </HabitsStyle>
                    {
                        todayHabit.done ? (
                            <ConcludeStyle style={{color:"#8FC549"}}><button onClick={() => {habitComplet(todayHabit.name)
                                                                                                toggle(todayHabit.id)}}>
                                <ion-icon name="checkbox"></ion-icon>
                            </button>
                            </ConcludeStyle> ) : (<ConcludeStyle style={{color:"#696969"}}><button onClick={() => {habitComplet(todayHabit.name)
                                                                                                toggle(todayHabit.id)}}>
                                <ion-icon name="checkbox"></ion-icon>
                            </button>
                            </ConcludeStyle> )
                    }
                </ContainerHabits>) 
        )
    }

    function habitComplet(name) {

        if (habitsSelecionados.includes(name)) {
            let newHabitsArray = habitsSelecionados.filter((item) => item !== name);
            setHabitsSelecionados([...newHabitsArray]);
        } else {
            setHabitsSelecionados([...habitsSelecionados, name]);
        }

        setCompletHabits(!completHabits);
    }

    const toggle = (id) => {
        todayHabits.find((todayHabit) => todayHabit.id === id).done
            ? uncheckHabitt(id)
            : checkHabitt(id);
    };

    function checkHabitt(id){

        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        const promise = axios.post(URL, null, config);
        promise.then(response =>{
            const {data} = response;
            loadTodayHabits();
        })
        promise.catch(err => console.log(err.response.statusText))
    
}

function uncheckHabitt(id){

    const config = {
        headers: {
            Authorization: `Bearer ${props.token}`
        }
    }

    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
        const promise = axios.post(URL, null, config);
        promise.then(response =>{
            const {data} = response;
            loadTodayHabits();
        })
        promise.catch(err => console.log(err.response.statusText))
}

    const listaHabitos = lisOfHabits();

    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <img src={avatar} alt="" />
            </Header>
            <Main>
                <DayStyle>{arrayDays[dayjs().day() - 1]}, {dayjs().date()}/{dayjs().month() + 1}</DayStyle>
                <>
                {(todayHabits.length > 0 && habitStatus > 0) ? (
                    <p className="textConclude">
                            {habitStatus.toFixed()}% dos hábitos concluídos
                        </p>
                    ) : ( todayHabits.length > 0 && habitStatus  === 0) ? (
                        <p className="textNotConclude">
                            Nenhum hábito concluído ainda
                        </p>
                    ) : (<></>)}
                </>
                {
                    listaHabitos
                }
            </Main>
            <Footer>
                <StyledLink to="/habits">Hábitos</StyledLink>
                <Link to="/today">
                    <CircularProgressbar value={habitStatus} text="Hoje" background
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

const ContainerHabits = styled.div`
display: flex;
width: 90%;
`

const ConcludeStyle = styled.div`

button {
    width: 69px;
    height: 69px;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    border: none;
}

ion-icon {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    ${(props) => "color: "+props.style.color};
}

.done {

}
`

const Main = styled.div`
background-color: #E5E5E5;
overflow-y: scroll;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
min-height: 527px;

.textNotConclude {
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #BABABA;}

.textConclude{
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #8FC549;
}
`;

const HabitsStyle = styled.div`
display: flex;
flex-direction: column;
background: #FFFFFF;
border-radius: 5px;
height: 94px;
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

.classSelected {
    color: #8FC549;
}
`;

const DayStyle = styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 22.976px;
line-height: 29px;
color: #126BA5;

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
    max-height: 70px;
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