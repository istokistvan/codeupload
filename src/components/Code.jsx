import {useCallback, useState} from "react";

import datesBetween from "dates-between";
import {useDispatch} from "react-redux";

import {Box, Button, InputAdornment, MenuItem, Paper, TextField, Typography} from "@mui/material";

import {useUploadMutation} from "../redux/api/rest.js";
import {registration} from "../redux/slices/entrySlice.js";

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
    },

    dateBox: {
        width: '75%',
        display: 'flex',
        gap: '1rem',
    }
}

const formatText = (text) => {
    return text.trim().toLowerCase()
}

const formatDate = (date) => {
    return date.toString().padStart(2, '0')
}


export default function Code(props) {

    const current = `${formatDate(new Date().getMonth() + 1)}-${formatDate(new Date().getDate())}`

    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [codeLength, setCodeLength] = useState(0)
    const [day, setDay] = useState(current)
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [error, setError] = useState('')

    const [upload] = useUploadMutation()

    const dispatch = useDispatch()

    const handleEmailChange = useCallback((e) => {
        const res = formatText(e.target.value)
        setEmail(res)
    }, [email])

    const handleCodeChange = useCallback((e) => {
        const res = formatText(e.target.value)
        setCode(res)
        setError('')
        setCodeLength(codeLength => e.target.value.length)
    }, [code, error])

    const handleDayChange = useCallback((e) => {
        setHour('')
        setMinute('')
        setDay(e.target.value)
    }, [day, hour, minute])

    const handleHourChange = useCallback((e) => {
        setHour(e.target.value)
    }, [hour])

    const handleMinuteChange = useCallback((e) => {
        setMinute(e.target.value)
    }, [minute])

    const calculateDates = () => {
        let res = []

        const endDate = new Date(`2023-${current}`) < new Date('2023-08-31') ? new Date(`2023-${current}`) : new Date('2023-08-31')

        for (const date of datesBetween(new Date('2023-06-01'), endDate)) {
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

    const renderMinuteSelect = useCallback(() => {

        const maxMinutes = current === day && hour === new Date().getHours() ? new Date().getMinutes() + 1 : 60

        return (
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
                    [...Array(maxMinutes).keys()].map((element) => {
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
        )
    }, [day, hour, minute])

    const renderHourSelect = useCallback(() => {

        const maxHours = current === day ? new Date().getHours() + 1 : 24

        return (
            <>
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
                        [...Array(maxHours).keys()].map((element) => {
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
                {renderMinuteSelect()}
            </>
        )
    }, [day, hour, minute])

    const renderDateSelect = useCallback(() => {
        const dates = calculateDates()

        if (dates) {
            return (
                <>
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

                    {renderHourSelect()}
                </>
            )
        }
    }, [day, hour, minute])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        const resDate = {
            day: formatDate(day),
            hour: formatDate(hour),
            minute: formatDate(minute)
        }

        if (code.match('[A-Za-z0-9]{8}')) {
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
                    props.openAlert(true)
                    props.setWon(data.won)
                })
                .catch((err) => {
                    if (err.data.errors.length === 1 && err.data.errors[0].code === 'email:not_found') {
                        dispatch(registration({
                            email: email,
                            code: code,
                            purchase_time: `2023-${resDate.day} ${resDate.hour}:${resDate.minute}`
                        }))
                        window.open(`${window.location.href}#/register`)
                    }
                })
        } else {
            setError('A kód nem megfelelő!')
        }
    }, [email, code, day, hour, minute, dispatch, error])


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

                error={!!error}
                helperText={error}

                InputProps={{
                    endAdornment: <InputAdornment position='end'>{codeLength}</InputAdornment>,
                }}

                inputProps={{maxLength: 8}}

                sx={{width: '75%'}}

                value={code || ''}
                onChange={handleCodeChange}
            />

            <Box
                sx={styles.dateBox}
            >
                {renderDateSelect()}
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