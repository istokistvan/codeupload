import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Guard(props) {
    const navigate = useNavigate()

    const userData = localStorage.getItem('user')

    useEffect(() => {

        if (userData) {
            navigate('/register')
        } else {
            navigate('/')
        }
    }, [navigate])

    return props.children
}