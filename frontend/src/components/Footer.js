import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Инженерный проект
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                   Кошкин Павел 181-321
                </Typography>
            </footer>
        </React.Fragment>
    );
}
