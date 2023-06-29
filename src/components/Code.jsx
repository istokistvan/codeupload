import {useCallback, useState} from "react";

import datesBetween from "dates-between";
import {Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

import {useUploadMutation} from "../redux/api/rest.js";
import {registration} from "../redux/slices/entrySlice.js";

const styles = {
    form: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        minWidth: '75vw',
        minHeight: '50vh',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',

        padding: '2rem',
    },

    dateBox: {
        width: '75%',
        display: 'flex',
        gap: '1rem',
    }
}


export default function Code() {

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [day, setDay] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')

    const [upload] = useUploadMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formatText = (text) => {
        return text.trim().toLowerCase()
    }

    const formatDate = (date) => {
        return date.toString().padStart(2, '0')
    }

    const handleEmailChange = useCallback((e) => {
        const res = formatText(e.target.value)
        setEmail(res)
    }, [email])

    const handleCodeChange = useCallback((e) => {
        const res = formatText(e.target.value)
        setCode(res)
    }, [code])

    const handleDayChange = useCallback((e) => {
        setDay(e.target.value)
    }, [day])

    const handleHourChange = useCallback((e) => {
        setHour(e.target.value)
    }, [hour])

    const handleMinuteChange = useCallback((e) => {
        setMinute(e.target.value)
    }, [minute])

    const calculateDates = () => {
        let res = []

        const current = `2023.${new Date().getMonth() + 1}.${new Date().getDate()}`
        const endDate = new Date(current) < new Date('2023.08.31') ? new Date(current) : new Date('2023.08.31')

        for (const date of datesBetween(new Date('2023.06.01'), endDate)) {
            res = [
                ...res,
                {
                    value: `${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`,
                    label: `${date.toLocaleString('default', {month: 'long'})} ${date.getDate()}.`
                }
            ]
        }

        return (res)
    }

    const renderDateSelect = useCallback(() => {
        const dates = calculateDates()

        if (dates) {
            return (
                <TextField
                    select
                    label='Nap'
                    name='day'
                    variant='standard'
                    required

                    value={day || dates[dates.length - 1].value}
                    onChange={handleDayChange}

                    sx={{flexGrow: 2}}
                >
                    {
                        dates.map((date) => {
                            return (
                                <MenuItem
                                    key={date.value}
                                    value={date.value}
                                >
                                    {date.label}
                                </MenuItem>
                            )
                        })
                    }
                </TextField>
            )
        }
    }, [day])

    const handleSubmit = useCallback((event) => {
        event.preventDefault()

        const resDate = {
            day: formatDate(day),
            hour: formatDate(hour),
            minute: formatDate(minute)
        }

        if (code.length === 8) {
            upload({
                email: email,
                code: code,
                purchase_time: `2023-${resDate.day} ${resDate.hour}:${resDate.minute}`

            })
                .unwrap()
                .then((res) => {
                    const data = {
                        success: res.data.success,
                        won: res.data.won
                    }
                    console.log(data.won)

                })
                .catch((err) => {
                    console.log(err)
                    if (err.data.errors.length === 1 && err.data.errors[0].code === 'email:not_found') {
                        dispatch(registration({
                            email: email,
                            code: code,
                            purchase_time: `2023-${resDate.day} ${resDate.hour}:${resDate.minute}`
                        }))
                        navigate('/register')
                    }
                })
        } else {
            console.log('Invalid code')
        }
    }, [email, code, day, hour, minute, dispatch])


    return (
        <Paper
            component='form'
            elevation={4}

            sx={styles.form}

            onSubmit={handleSubmit}
        >
            <Typography
                variant='h2'
            >
                Kódfeltöltés
            </Typography>

            <TextField
                type='email'
                label='Email cím'
                name='email'
                variant='standard'
                required

                sx={{width: '75%'}}

                value={email || ''}
                onChange={handleEmailChange}
            />

            <TextField
                type='text'
                label='Kód'
                name='code'
                variant='standard'
                required

                sx={{width: '75%'}}

                value={code || ''}
                onChange={handleCodeChange}
            />

            <Box
                sx={styles.dateBox}
            >

                {renderDateSelect()}

                <TextField
                    select
                    label='Óra'
                    name='hour'
                    variant='standard'
                    required

                    value={hour}
                    onChange={handleHourChange}

                    sx={{flexGrow: 1}}
                >
                    {
                        [...Array(24).keys()].map((element) => {
                            return (
                                <MenuItem
                                    key={element}
                                    value={element}
                                >
                                    {element.toString().padStart(2, '0')}
                                </MenuItem>
                            )
                        })
                    }
                </TextField>

                <TextField
                    select
                    label='Perc'
                    name='minute'
                    variant='standard'
                    required

                    value={minute}
                    onChange={handleMinuteChange}

                    sx={{flexGrow: 1}}
                >
                    {
                        [...Array(60).keys()].map((element) => {
                            return (
                                <MenuItem
                                    key={element}
                                    value={element}
                                >
                                    {element.toString().padStart(2, '0')}
                                </MenuItem>
                            )
                        })
                    }
                </TextField>
            </Box>

            <Button
                variant='contained'
                color='success'
                type='submit'
            >
                Kódfeltöltés
            </Button>
        </Paper>
    )
}