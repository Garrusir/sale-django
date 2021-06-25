import React, {useEffect, useState} from 'react';
import SaleCard from '../components/SaleCard';
import {Grid} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export function CatalogPage() {
    const [sales, setSales] = useState([]);
    const classes = useStyles();

    useEffect( () => {
        // const result = await fetch('api/sales');
        // const result = [{id: 1, title: 'Sale 1'}];
        fetch('api/sales/')
            .then((response) => {
                // console.log('result', response.json());
                if (response.status > 400) {
                    console.log('error', response);
                }
                return response.json();
            })
            .then(({sales}) => {
                console.log('data', sales);
                setSales(sales);
            })
    }, [])

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="inherit" noWrap className="toolbarTitle">
                    Скидки и акциии <span role="img" aria-label="Shopping Cart">🛒</span>
            </Typography>
            <Grid container spacing={3}>
                {
                    sales.map(item =>
                        (<Grid item xs={4}>
                            <SaleCard key={item.id} sale={item} />
                        </Grid>))
                }
            </Grid>
        </div>
    )
}
