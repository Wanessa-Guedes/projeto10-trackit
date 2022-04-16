import axios from "axios";
import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";


import AppContext from "../contexts/Context";
import 'react-circular-progressbar/dist/styles.css';
import Input from "./Input";
import ListHabits from "./ListHabits";

export default function Habits(props) {

    const { avatar } = useContext(AppContext);
    const { status } = useContext(AppContext);

    const [habit, setHabit] = useState("");
    const [weekdays, setWeekdays] = useState([
        { id: 0, name: "domingo" },
        { id: 1, name: "segunda" },
        { id: 2, name: "terça" },
        { id: 3, name: "quarta" },
        { id: 4, name: "quinta" },
        { id: 5, name: "sexta" },
        { id: 6, name: "sabado" }
    ]);
    const [arrayWeekday, setArrayWeekday] = useState([]);
    const [showAddHabit, setShowAddHabit] = useState(false);
    const [habitsList, setHabitsList] = useState(false);
    const [habitsAdd, setHabitsAdd] = useState([]);
    const [habitLoad, setHabitLoad] = useState(false);
    const [registerHabits, setRegisterHabits] = useState([]);


    const percentage = status;
    let token = props.token;

    //const navigate = useNavigate();


    useEffect(() => {
        loadHabit();
    }, [props.token]);

    function loadHabit() {

        setHabitLoad(true);

        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.get(URL, config);
        promise.then(response => {
            const { data } = response;
            setHabitsAdd(data);
            setRegisterHabits(data.map((habit) => habit.days))
        });
        promise.catch(err => alert('Erro ao carregar os hábitos'));
        promise.finally(() => setHabitLoad(false));
    }
    // Pegar axios
    function criarHabito() {
        const config = {
            headers: {
                Authorization: `Bearer ${props.token}`
            }
        }
        if (habit.length > 0) {
            const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
            const promise = axios.post(URL, {
                name: habit,
                days: arrayWeekday
            }, config);
            promise.then(response => {
                const { data } = response;
                loadHabit();
                setHabit("");
                addHabit();
            })
            promise.catch(err => alert('Erro: Verifique os dados inseridos!'));
        }
    }

    function addHabit() {
        setShowAddHabit(!showAddHabit);
    }

    function listHabit() {
        setHabitsList(true);
        setHabitsAdd([]);
    }

    function checkID(id) {
        if (arrayWeekday.includes(id)) {
            let newArray = arrayWeekday.filter((item) => item !== id);
            setArrayWeekday(newArray);
        } else {
            setArrayWeekday([...arrayWeekday, id]);
        }
    }

    function deleteHabit(id) {

        setHabitsAdd([]);

        if (window.confirm('Deseja realmente excluir esse hábito?')) {

            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;

            const config = {
                headers: {
                    Authorization: `Bearer ${props.token}`
                }
            }
            const promise = axios.delete(URL, config);
            promise.then(loadHabit);
            promise.catch(err => alert('Erro ao deletar o hábito'));
        }
    }

    function structureHabits() {

        return (
            <>
                <MainHeader>
                    <h1> Meus hábitos </h1>
                    <button onClick={() => addHabit()}>+</button>
                </MainHeader>
                {
                    showAddHabit && (
                        <AddHabit>
                            <Input type="text" placeholder="Nome do Hábito" value={habit}
                                onChange={(e) => setHabit(e.target.value)} />
                            <div>{weekdays.map((weekday, index) => (<Day key={index}   onClick={() => checkID(weekday.id)} style={ (arrayWeekday.includes(weekday.id))
                                                ? {
                                                    color: "#FFFFFF",
                                                    background: "#CFCFCF",
                                                    border: "#CFCFCF",
                                                }
                                                : {
                                                    color: "#DBDBDB",
                                                    background: "#FFFFFF",
                                                    border: "#D4D4D4",
                                                }
                                            }>{weekday.name[0].toUpperCase()}</Day>))}</div>
                            <HabitOptions>
                                <p onClick={() => addHabit()}>Cancelar</p>
                                <h3 onClick={() => {
                                    criarHabito()
                                    listHabit()
                                    setArrayWeekday([])
                                }}>Salvar</h3>
                            </HabitOptions>
                        </AddHabit>
                    )
                }
                {
                    (habitsAdd.length === 0 && habitLoad === false) ? (
                        <NoHabittsYeat> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabittsYeat>
                    ) : (habitsAdd.length > 0 && habitLoad === false) ? (
                        <ListHabits habitsAdd={habitsAdd} func={deleteHabit} arrayWeekday={arrayWeekday} registerHabits={registerHabits}/>
                    ) : (<NoHabittsYeat>Carregando hábitos...</NoHabittsYeat>)
                }
            </>
        )
    }



    const habitsStrucuture = structureHabits();

    return (
        <>
            <Header>
                <h1>TrackIt</h1>
                <img src={avatar} alt="" />
            </Header>

            {
                <Main>
                    {habitsStrucuture}
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


const MainHeader = styled.div`
display: flex;
width: 90%;
justify-content: space-around;

h1 {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126BA5;
}

button {
    background: #52B6FF;
    border-radius: 4.63636px;
    width: 40px;
    height: 35px;
    ont-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 26.976px;
    line-height: 34px;
    text-align: center;
    color: #FFFFFF;
    border: none;
}

`;

const AddHabit = styled.div`
background: #FFFFFF;
border-radius: 5px;
width: 90%;


div {
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;

    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #DBDBDB;
    display: flex;
}
`
    ;

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

const HabitOptions = styled.div `
h3 {
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    width: 84px;
    height: 35px;
}


p {
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #52B6FF;
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

const NoHabittsYeat = styled.div`
font-family: 'Lexend Deca';
font-style: normal;
font-weight: 400;
font-size: 17.976px;
line-height: 22px;
color: #666666;
`
;

const Day = styled.div`
height: 30px;
width: 30px;
${(props) => "color: " + props.style.color};
font-style: normal;
font-weight: 400;
font-size: 20px;
${(props) => "background-color: "+props.style.background};
${(props) => "border: 1px solid "+props.style.border};
border-radius: 5px;
display: flex;
justify-content: center;
align-items: center;
`;