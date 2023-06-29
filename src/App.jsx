import {Route, Routes} from "react-router-dom";

import Code from "./components/Code.jsx";
import Register from "./components/Register.jsx";

function App() {

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Code/>
                }
            />

            <Route
                path="/register"
                element={
                    <Register/>
                }
            />
        </Routes>
    )
}

export default App
