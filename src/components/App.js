import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

function App() {

    const [token, setToken] = useState(null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage salvarToken={(token) => setToken(token)}/>} />
                <Route path="/sign-in" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;