import React, {useContext, useState} from 'react';
import { useHistory } from "react-router-dom";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(1),
    },
}));

export const RegistrationPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const {register} = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleRegistration = () => {
        if (!email || !name || !surname || !password ) {
            setError('Все поля обязательны к заполению');
            setOpen(true);
            return;
        }

        if (password !== passwordRepeat ) {
            setError('Пароли не совпадают');
            setOpen(true);
            return;
        }

        register({email, password, firstName: name, lastName: surname}).then((result) => {
            console.log('success');
            if (!result?.errors) history.push("/");
            else {
                setError(result?.errors);
                setOpen(true);
            }
        }).catch(e => {
            console.log(e);
            if (e.code === 'auth/weak-password') {
                setError('Пароль должен быть не менее 6 символов');
            }
            if (e.code === 'auth/invalid-email') {
                setError('Неверный формат email');
            }
            if (e.code === 'auth/email-already-in-use') {
                setError('Указанный email уже занят');
            }
            setError(e.message);
            setOpen(true);
        });
    }

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h4" align="center">
                    Создание учетной записи
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            value={name}
                            onChange={e =>setName(e.target.value)}
                            id="name"
                            name="name"
                            label="Имя"
                            fullWidth
                            autoComplete="profile name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            value={surname}
                            onChange={e =>setSurname(e.target.value)}
                            id="surname"
                            name="surname"
                            label="Фамилия"
                            fullWidth
                            autoComplete="profile name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            value={email}
                            onChange={e =>setEmail(e.target.value)}
                            id="username"
                            type="email"
                            name="username"
                            label="Email"
                            fullWidth
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="password"
                            value={password}
                            onChange={e =>setPassword(e.target.value)}
                            id="password"
                            name="password"
                            label="Пароль"
                            fullWidth
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            type="password"
                            value={passwordRepeat}
                            onChange={e =>setPasswordRepeat(e.target.value)}
                            id="password-repeat"
                            name="password-repeat"
                            label="Повторите пароль"
                            fullWidth
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>

                <div className={classes.buttons}>
                    <Button onClick={() => history.goBack()} className={classes.button}>
                        Назад
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRegistration}
                        className={classes.button}
                    >
                        Зарегистрироваться
                    </Button>
                </div>
            </Paper>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={error}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </main>
    )
}
