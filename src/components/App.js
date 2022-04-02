import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AppProvider from "../contexts/Provider";

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import Habits from "./Habits";
import Today from "./Today";
import History from "./History";

function App() {

    const [token, setToken] = useState(null);

    return (
        <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage salvarToken={(token) => setToken(token)}/>} />
                <Route path="/sign-in" element={<SignUpPage />} />
                <Route path="/habits" element={<Habits token={token}/>} />
                <Route path="/today" element={<Today token={token}/>} />  
                <Route path="/history" element={<History/>} />
            </Routes>
        </BrowserRouter>
        </AppProvider>
    );
}

export default App;