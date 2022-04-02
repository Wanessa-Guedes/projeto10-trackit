import axios from "axios";
/*import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link, useNavigate } from "react-router-dom";
 */

export default function ListHabits(props) {


    return (
        <>
            {
                props.habitsAdd.map((habitAdd, item) =>
                    <div key={item}>
                        <p>{habitAdd.name}</p>
                        <button onClick={() => props.func(habitAdd.id)}>Delete</button>
                    </div>)
            }
        </>
    )
}