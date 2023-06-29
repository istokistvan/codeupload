import {Route, Routes} from "react-router-dom";

import Code from "./components/Code.jsx";
import Register from "./components/Register.jsx";
import Guard from "./components/Guard.jsx";

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
                    <Guard>
                        <Register/>
                    </Guard>
                }
            />
        </Routes>
    )
}

export default App
