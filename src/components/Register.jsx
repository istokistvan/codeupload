import {useCallback, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {Button, Checkbox, FormControlLabel, Paper, TextField, Typography} from "@mui/material";

import {useRegisterMutation, useUploadMutation} from "../redux/api/rest.js";
import {reset} from "../redux/slices/entrySlice.js";


const styles = {
    form: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        minWidth: '50vw',
        minHeight: '35vh',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',

        padding: '2rem',
    }
}

export default function Register(props) {

    const [name, setName] = useState('')
    const [rules, setRules] = useState(false)

    const [register] = useRegisterMutation()
    const [upload] = useUploadMutation()

    const userData = useSelector(state => state.entry)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNameChange = useCallback((e) => {
        setName(e.target.value)
    }, [name])

    const handleRulesChange = useCallback((e) => {
        setRules(e.target.checked)
    }, [name])

    const formatText = (text) => {
        return text.trim()
    }

    const handleSubmit = useCallback((event) => {
        event.preventDefault()

        const resName = formatText(name)

        if (rules && resName.length >= 2) {
            register({email: userData.email, name: resName})
                .unwrap()
                .then((res) => {
                    return upload({...userData})
                        .unwrap()
                })
                .then((res) => {
                    const data = {
                        success: res.data.success,
                        won: res.data.won
                    }
                    props.openAlert(true)
                    props.setWon(data.won)
                    dispatch(reset())
                    navigate('/')
                })
                .catch((err) => console.log(err))
        }
    }, [name, rules])

    return (
        <Paper
            component='form'
            elevation={4}

            sx={styles.form}

            onSubmit={handleSubmit}
        >
            <Typography variant='h2'>
                Regisztráció
            </Typography>

            <TextField
                variant='standard'
                type='email'
                name='email'
                disabled
                value={userData.email}
            />

            <TextField
                variant='standard'
                type='text'
                name='name'
                label='Név'
                required

                value={name || ''}
                onChange={handleNameChange}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name='rules'
                        required
                        checked={rules}
                        onChange={handleRulesChange}
                    />
                }
                label='Elolvastam és elfogadom a játékszabályzatot.'/>

            <Button
                type='submit'
                variant='contained'
                color='success'
            >
                Regisztrálok
            </Button>
        </Paper>
    )
}