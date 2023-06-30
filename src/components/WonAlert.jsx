import {useCallback} from "react";
import {Alert, Snackbar} from "@mui/material";

export default function WonAlert(props) {

    const handleClose = useCallback((event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        props.setOpen(false)
    }, [props.open])

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={props.open}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={props.won ? 'success' : 'error'}
                sx={{width: '100%'}}
            >
                {props.won ? 'Gratulálunk, nyertél!' : 'Sajnos nem nyertél!'}
            </Alert>
        </Snackbar>
    )
}