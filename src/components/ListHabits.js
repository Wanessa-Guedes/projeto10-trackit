import axios from "axios";
import styled from "styled-components";
import { useEffect, useContext, useState } from "react";
/*import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";
 */

export default function ListHabits(props) {

    const [weekdays, setWeekdays] = useState([
        { id: 0, name: "domingo" },
        { id: 1, name: "segunda" },
        { id: 2, name: "terça" },
        { id: 3, name: "quarta" },
        { id: 4, name: "quinta" },
        { id: 5, name: "sexta" },
        { id: 6, name: "sabado" }
    ]);

    return (
        <>
            <ContainerHabits>
                {
                    props.habitsAdd.map((habitAdd, item) =>
                        <div key={item}>
                            <HabitsStyle>
                                <HabitsInfos>
                                <p>{habitAdd.name}</p>
                                <div>{weekdays.map((weekday, index) => <div key={index}>{weekday.name[0].toUpperCase()}</div>)}</div>
                                </HabitsInfos>
                                <ConcludeStyle><button onClick={() => props.func(habitAdd.id)}><ion-icon name="trash-outline"></ion-icon></button></ConcludeStyle>
                            </HabitsStyle>
                        </div>)

                }
            </ContainerHabits>
        </>
    )
}

const ContainerHabits = styled.div`
display: flex;
flex-direction: column;
width: 90%;
`

const ConcludeStyle = styled.div`
button {
    width: 13px;
    height: 15px;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    border: none;
}

ion-icon {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    color: #666666;
}
`

const HabitsStyle = styled.div`
display: flex;
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
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
}

div {
    display: flex;
    justify-content: space-between;
    width: 90%;
}
`;

const HabitsInfos = styled.div `
display: flex;
flex-direction: column;

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
}
`;