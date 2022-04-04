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
    const [statusCheckFooter, setstatusCheckFooter] = useState(0);

    return (
        <AppProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage salvarToken={(token) => setToken(token)}/>} />
                <Route path="/sign-in" element={<SignUpPage />} />
                <Route path="/habits" element={<Habits token={token} statusFooter={statusCheckFooter}/>} />
                <Route path="/today" element={<Today token={token} salvarStatusFooter={(statusCheckFooter) => setstatusCheckFooter(statusCheckFooter)}/>} />  
                <Route path="/history" element={<History token={token} statusFooter={statusCheckFooter}/>} />
            </Routes>
        </BrowserRouter>
        </AppProvider>
    );
}

export default App;