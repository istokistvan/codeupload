import {Box, Button, MenuItem, Paper, TextField, Typography} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import datesBetween from "dates-between";
import {useUploadMutation} from "../redux/api/rest.js";

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

    const handleChange = useCallback((event) => {
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value)
                break
            case 'code':
                setCode(event.target.value)
                break
            case 'day':
                setDay(event.target.value)
                break
            case 'hour':
                setHour(event.target.value)
                break
            case 'minute':
                setMinute(event.target.value)
                break
        }
    }, [email, code, day, hour, minute])

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
                    onChange={handleChange}

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

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault()
        console.log(`2023-${day} ${hour}:${minute}`)

        upload({
            email: email,
            code: code,
            purchase_time: `2023-${day} ${hour}:${minute}`
        })
            .unwrap()
            .then((res) => {
                const data = {
                    success: res.success,
                    won: res.won
                }
            })
            .catch((err) => {
                console.log(err.data.errors)
            })
    }, [email, code, day, hour, minute])

    useEffect(() => {
        console.log(day)
    }, [day])

    return (
        <Paper
            component='form'
            elevation={4}

            sx={styles.form}

            onSubmit={handleSubmit}
        >
            <Typography
                variant="h2"
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
                onChange={handleChange}
            />

            <TextField
                type='text'
                label='Kód'
                name='code'
                variant='standard'
                required

                sx={{width: '75%'}}

                value={code || ''}
                onChange={handleChange}
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
                    onChange={handleChange}

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
                    onChange={handleChange}

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