import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function Guard(props) {
    const navigate = useNavigate()

    const userData = useSelector(state => state.entry)

    useEffect(() => {

        if (userData.email && userData.code && userData.purchase_time) {
            navigate('/register')
        } else {
            navigate('/')
        }
    }, [navigate])

    return props.children
}