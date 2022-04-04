
import styled from "styled-components";


export default function ListHabits(props) {

    const weekdays = [
        { id: 0, name: "domingo" },
        { id: 1, name: "segunda" },
        { id: 2, name: "terça" },
        { id: 3, name: "quarta" },
        { id: 4, name: "quinta" },
        { id: 5, name: "sexta" },
        { id: 6, name: "sabado" }
    ];

    return (
        <>
            <ContainerHabits>
                {
                    props.habitsAdd.map((habitAdd, item) =>
                        <div key={item}>
                            <HabitsStyle>
                                <HabitsInfos>
                                <p>{habitAdd.name}</p>
                                {
                                <div>{weekdays.map((weekday, index) => (
                                            <Day key={index} style={ (props.arrayWeekday.includes(weekday.id))
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
                                }
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
justify-content: end;

button {
    width: 20%;
    height: 20%;
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
    width: 90%;
}
`;

const HabitsInfos = styled.div `
display: flex;
flex-direction: column;
justify-content: space-around;
margin-left: 10px;

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