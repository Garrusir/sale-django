import React, {useContext} from 'react';
import {
    Container,
    Grid,
    Avatar
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import {AuthContext} from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    avatar: {
        width: '200px',
        height: '200px',
        fontSize: '40px'
    },
    info: {
        display: 'flex',
        flexFlow: 'column nowrap',
    }
}));

export function ProfilePage() {
    const classes = useStyles();
    const {user} = useContext(AuthContext);

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography variant="h6" color="inherit" noWrap className="toolbarTitle">
                            Профиль
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                   <Grid container spacing={4} justify="space-between">
                       <Avatar variant="rounded" className={classes.avatar} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                       <div className={classes.info}>
                           <Typography variant="h6" color="inherit" noWrap>
                               {user?.firstName} {user?.lastName}
                           </Typography>
                           <Typography variant="caption" color="inherit" noWrap>
                               Почта: {user?.email}
                           </Typography>
                       </div>
                   </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
