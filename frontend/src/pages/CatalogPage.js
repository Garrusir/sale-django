import React, {useEffect, useState} from 'react';
import SaleCard from '../components/SaleCard';
import {Container, Grid, TextField, Modal, Card, CardContent, CardHeader, CardMedia, CircularProgress} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import moment from "moment";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_SALES = gql`
query {
  sales {
    id
    title
    description
    image
    dateStart
    dateEnd
    priceOld
    priceNew
    store {
      name
    }
  }
}
`;

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
    modal: {
        width: '400px',
        top: `50%`,
        right: `50%`,
        transform: `translate(50%, -50%)`,
        position: 'absolute',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

export function CatalogPage() {
    const {data, loading} = useQuery(QUERY_SALES)
    const [sales, setSales] = useState([]);
    const [initialSales, setInitialSales] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [sortType, setSortType] = useState('default');
    const [modalContent, setModalContent] = useState(null);
    const classes = useStyles();

    useEffect( () => {
        if (!initialSales && data) {
            setSales(_sort('default', data.sales));
            setInitialSales(data.sales);
        }
    }, [initialSales, data])

    const sortHandler = (newSortType) => {
        if (newSortType === 'default') {
            setSortType(newSortType);
            setSales(_sort(newSortType, sales));
        }

        if (newSortType === 'price') {
            const newSort = sortType === 'price-up' ? 'price-down' : 'price-up';
            setSortType(newSort);
            setSales(_sort(newSort, sales));
        }

        if (newSortType === 'sale') {
            const newSort = sortType === 'sale-up' ? 'sale-down' : 'sale-up';
            setSortType(newSort);
            setSales(_sort(newSort, sales));
        }
    }

    const filterHandler = (e) => {
        const newValue = e.target.value.trim().toLowerCase();
        setSearchString(newValue);
        setSales(_sort(sortType, initialSales.filter(sale => sale.title.toLowerCase().includes(newValue))));
    }

    const _sort = (type, sortSales) => {
        if (type === 'default') {
            return sortSales.sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        }

        if (type === 'price-down' || type === 'price-up') {
            return sortSales.sort((a, b) => {
                if (type === 'price-up') {
                    if (Number(a.priceOld) < Number(b.priceOld)) return -1;
                    if (Number(a.priceOld) > Number(b.priceOld)) return 1;
                }
                else {
                    if (Number(a.priceOld) > Number(b.priceOld)) return -1;
                    if (Number(a.priceOld) < Number(b.priceOld)) return 1;
                }
                return 0;
            });
        }

        if (type === 'sale-down' || type === 'sale-up') {
            return sortSales.sort((a, b) => {
                if (type === 'sale-up') {
                    if (Number(a.priceNew) < Number(b.priceNew)) return -1;
                    if (Number(a.priceNew) > Number(b.priceNew)) return 1;
                }
                else {
                    if (Number(a.priceNew) > Number(b.priceNew)) return -1;
                    if (Number(a.priceNew) < Number(b.priceNew)) return 1;
                }
                return 0;
            });
        }
    }

    if (loading) return <div className={classes.spinnerWrap}>
        <CircularProgress className={classes.spinner} />
    </div>

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography variant="h6" color="inherit" noWrap className="toolbarTitle">
                            Скидки и акциии <span role="img" aria-label="Shopping Cart">🛒</span>
                        </Typography>
                        <TextField
                            id="search-field"
                            label="Поиск акций"
                            variant="outlined"
                            onChange={filterHandler}
                            value={searchString}
                            fullWidth/>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Typography variant="caption" color="inherit" noWrap>
                                       Сортировка:
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => sortHandler('default')}
                                        variant={sortType === 'default' ? 'contained' : 'outlined'}
                                        color="primary">
                                        По умолчанию
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => sortHandler('price')}
                                        variant={sortType === 'price-up' || sortType === 'price-down' ? 'contained' : 'outlined'}
                                        color="primary">
                                        По цене
                                        {sortType === 'price-up' && <ArrowUpwardIcon/>}
                                        {sortType === 'price-down' && <ArrowDownwardIcon />}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => sortHandler('sale')}
                                        variant={sortType === 'sale-up' || sortType === 'sale-down' ? 'contained' : 'outlined'}
                                        color="primary">
                                        По скидке
                                        {sortType === 'sale-up' && <ArrowUpwardIcon/>}
                                        {sortType === 'sale-down' && <ArrowDownwardIcon />}
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {
                            sales.map(item =>
                                (<Grid item key={item.id} xs={12} sm={6} md={4}>
                                    <SaleCard sale={item} onClick={() => setModalContent(item) }/>
                                </Grid>))
                        }
                    </Grid>
                </Container>
            </main>
            <Modal
                open={!!modalContent}
                onClose={() => setModalContent(null)}
                aria-labelledby="Подробнее о продукте"
                aria-describedby={modalContent?.title}
            >
                <Card className={classes.modal}>
                    <CardHeader
                        title={modalContent?.title}
                        subheader={modalContent?.description}
                    />
                    <CardMedia
                        className={classes.media}
                        image={modalContent?.image}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Действует с {moment(modalContent?.dateStart)?.format("MM-DD-YYYY")} по {moment(modalContent?.dateEnd)?.format("MM-DD-YYYY")}.
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Старая цена - {modalContent?.priceOld}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Новая цена - {modalContent?.priceNew}
                        </Typography>
                    </CardContent>
                </Card>
            </Modal>
        </React.Fragment>
    );
}
