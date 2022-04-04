// responsável por distribuir e lidar com esses dados
import {useState} from "react";
import AppContext from "./Context";

const AppProvider = ({ children }) => {

    const [avatar, setAvatar] = useState("");
    const [status, setStatus] = useState(0);

    const setImgProfile = (avatar) => {
        setAvatar(avatar)
    }

    const setStatusFooter = (status) => {
        setStatus(status)
    }

    return (
        <AppContext.Provider value={{avatar, setImgProfile, status, setStatusFooter}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;