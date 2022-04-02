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
    const [habitsAdd, setHabitsAdd] = useState(null);
    const [habitLoad, setHabitLoad] = useState(false);

    const percentage = 66;

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
                //console.log(data);
            })
            promise.catch(err => console.log(err.response));
        }


    }

    function addHabit() {
        setShowAddHabit(!showAddHabit);
    }

    function listHabit() {
        setHabitsList(true)
    }

    function checkID(id) {
        if (arrayWeekday.includes(id)) {
            let newArray = arrayWeekday.filter((item) => item !== id);
            setArrayWeekday([...newArray]);
        } else {
            setArrayWeekday([...arrayWeekday, id]);
        }
    }

    function deleteHabit(id) {

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
                <button onClick={() => addHabit()}>+</button>
                {
                    showAddHabit && (
                        <div>
                            <Input type="text" placeholder="Nome do Hábito" value={habit}
                                onChange={(e) => setHabit(e.target.value)} />
                            <div>{weekdays.map((weekday, index) => <div key={index} onClick={() => checkID(weekday.id)}  >{weekday.name[0].toUpperCase()}</div>)}</div>
                            <p onClick={() => addHabit()}>Cancelar</p>
                            <p onClick={() => {
                                criarHabito()
                                listHabit()
                            }}>Salvar</p>
                        </div>
                    )
                }
                {
                    (habitsAdd === null && habitLoad === false) ? (
                        <p> Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    ) : (habitsAdd !== null && habitLoad === false) ? (
                        <ListHabits habitsAdd={habitsAdd} func={deleteHabit}/>
                    ) : (<p>Carregando hábitos...</p>)
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
                        })} />;
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

