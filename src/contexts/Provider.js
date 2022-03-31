// responsável por distribuir e lidar com esses dados
import {useState} from "react";
import AppContext from "./Context";

const AppProvider = ({ children }) => {

    const [avatar, setAvatar] = useState("");

    const setImgProfile = (avatar) => {
        setAvatar(avatar)
    }

    return (
        <AppContext.Provider value={{avatar, setImgProfile}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;