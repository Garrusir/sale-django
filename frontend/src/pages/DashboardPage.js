import React, {useEffect, useState} from 'react';
import {Container, Grid, Card, CardContent, CardHeader, CircularProgress} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { DataGrid } from '@material-ui/data-grid';
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';
import moment from "moment";

import {SimpleLineChart} from "../components/SimpleChart";

const QUERY_SALES = gql`
query {
  sales {
    id
    store {
      name
    }
  }
   promoCode {
    id
    store {
      name
    }
  }
  commentSale {
    id
    message
    sale {
      title
    }
    date
  }
  commentPromoCode {
    id
    message
    code {
      title
    }
    date
  }
   commentSpecialOffer {
    id
    message
    date
  }
}
`;

const columnsSale = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'message', headerName: 'Комментарий', width: 350 },
    { field: 'sale', headerName: 'Скидка', width: 250, valueGetter: (item) => item?.row?.sale?.title || '' },
    { field: 'date', headerName: 'Дата', width: 120, valueGetter: (item) => moment(item?.row?.date).format('YYYY/MM/DD') },
];

const columnsPromoCodes = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'message', headerName: 'Комментарий', width: 200 },
    { field: 'code', headerName: 'Промокод', width: 200, valueGetter: (item) => item?.row?.code?.title || '' },
    { field: 'date', headerName: 'Дата', width: 120, valueGetter: (item) => moment(item?.row?.date).format('YYYY/MM/DD') },
];

const columnsSpecialOffers = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'message', headerName: 'Комментарий', width: 200 },
    { field: 'date', headerName: 'Дата', width: 120, valueGetter: (item) => moment(item?.row?.date).format('YYYY/MM/DD') },
];

const useStyles = makeStyles((theme) => ({
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
        paddingTop: theme.spacing(),
        paddingBottom: theme.spacing(8),
    },
}));

export function DashboardPage() {
    const {data, loading} = useQuery(QUERY_SALES)
    const [chart, setChart] = useState(null);
    const [commentSale, setCommentSale] = useState(null);
    const [commentPromoCode, setCommentPromoCode] = useState(null);
    const [commentSpecialOffer, setCommentSpecialOffer] = useState(null);
    const classes = useStyles();

    useEffect( () => {
        if (!chart && data) {
            const res = [];
            data.sales.forEach(sale => {
                const store = res.findIndex(r => r.name === sale?.store?.name);

                if (store !== -1) res[store] = {
                    ...res[store],
                    sales: res[store]?.sales + 1
                };

                else res.push({
                    name: sale?.store?.name,
                    sales: 1,
                    promoCodes: 0,
                })
            })
            data.promoCode.forEach(sale => {
                const store = res.findIndex(r => r.name === sale?.store?.name);

                if (store !== -1) res[store] = {
                    ...res[store],
                    promoCodes: res[store]?.promoCodes + 1
                };

                else res.push({
                    name: sale?.store?.name,
                    sales: 0,
                    promoCodes: 1,
                })
            })
            setChart(res);
            setCommentSale(data.commentSale);
            setCommentPromoCode(data.commentPromoCode);
            setCommentSpecialOffer(data.commentSpecialOffer);
        }
    }, [chart, data, commentSale]);

    if (loading) return <div className={classes.spinnerWrap}>
        <CircularProgress className={classes.spinner} />
    </div>

    if (!commentSale) return null;

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography variant="h6" color="inherit" noWrap className="toolbarTitle">
                            Дашборд <span role="img" aria-label="Shopping Cart">🎉</span>
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title="Показатели активности магазинов"
                            />
                            <CardContent>
                                <SimpleLineChart data={chart} />
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={6}>
                        <Card>
                            <CardHeader
                                title="Комментарии по промокодам"
                            />
                            <CardContent>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={commentPromoCode} columns={columnsPromoCodes} pageSize={5} />
                                </div>
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={6}>
                        <Card>
                            <CardHeader
                                title="Комментарии по спец.предложениям"
                            />
                            <CardContent>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid rows={commentSpecialOffer} columns={columnsSpecialOffers} pageSize={5} />
                                </div>
                            </CardContent>
                        </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader
                                    title="Комментарии по скидкам"
                                />
                                <CardContent>
                                    <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid rows={commentSale} columns={columnsSale} pageSize={5} />
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}
