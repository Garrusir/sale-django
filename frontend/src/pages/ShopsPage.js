import React, {useEffect, useState} from 'react';
import {
    Container,
    CircularProgress
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_STORES = gql`
query {
  stores {
    id
    name
    description
    link
  }
}
`;

const columns = [
    { field: 'name', headerName: 'Название', width: 200 },
    { field: 'description', headerName: 'Описание', width: 350 },
    { field: 'link', headerName: 'Ссылка на сайт', width: 200 },
];

const useStyles = makeStyles((theme) => ({
    modal: {
        width: '400px',
        top: `50%`,
        right: `50%`,
        transform: `translate(50%, -50%)`,
        position: 'absolute',
    },
    root: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingBottom: theme.spacing(8),
    },
    spinnerWrap: {
        minHeight: '80vh',
        position: 'relative',
    },
    spinner: {
        top: `50%`,
        right: `50%`,
        transform: `translate(50%, -50%)`,
        position: 'absolute',
    },
}));

export function ShopsPage() {
    const {data, loading} = useQuery(QUERY_STORES)
    const [stores, setStores] = useState(null);
    const classes = useStyles();

    useEffect( () => {
        if (!stores && data) {
            setStores(data?.stores);
        }
    }, [stores, data])

    if (loading) return <div className={classes.spinnerWrap}>
        <CircularProgress className={classes.spinner} />
    </div>

    if (!stores) return null;

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography variant="h6" color="inherit" noWrap className="toolbarTitle">
                            Магазины <span role="img" aria-label="Shopping Cart">🛒</span>
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={stores} columns={columns} pageSize={5} />
                    </div>
                </Container>
            </main>
        </React.Fragment>
    );
}
