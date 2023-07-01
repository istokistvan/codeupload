import {Route, Routes} from "react-router-dom";

import Code from "./components/Code.jsx";
import Register from "./components/Register.jsx";
import WonAlert from "./components/WonAlert.jsx";
import Guard from "./components/Guard.jsx";
import {useState} from "react";

function App() {

    const [openAlert, setOpenAlert] = useState(false)
    const [won, setWon] = useState('')

    return (
        <>
            <WonAlert
                open={openAlert}
                setOpen={setOpenAlert}
                won={won}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Code
                            openAlert={setOpenAlert}
                            setWon={setWon}
                        />
                    }
                />

                <Route
                    path="/register"
                    element={
                        <Guard>
                            <Register
                                openAlert={setOpenAlert}
                                setWon={setWon}
                            />
                        </Guard>
                    }
                />
            </Routes>
        </>
    )
}

export default App
