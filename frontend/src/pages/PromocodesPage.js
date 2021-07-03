import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Modal, Card, CardContent, CircularProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { useQuery } from 'react-apollo';
import { gql } from 'apollo-boost';

const QUERY_PROMO = gql`
query {
  promoCode {
    id
    title
    description
    dateStart
    dateEnd
    code
    store {
      name
    }
  }
}
`;

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

export function PromoCodesPage() {
    const {data, loading} = useQuery(QUERY_PROMO)
    const [promoCodes, setPromoCodes] = useState([]);
    const [initialPromoCodes, setInitialPromoCodes] = useState(null);
    const [searchString, setSearchString] = useState('');
    const [sortType, setSortType] = useState('all');
    const [modalContent, setModalContent] = useState(null);
    const classes = useStyles();

    useEffect( () => {
        if (!initialPromoCodes && data) {
            setPromoCodes(_sort('all', data.promoCode));
            setInitialPromoCodes(data.promoCode);
        }
    }, [initialPromoCodes, data])

    const sortHandler = (newSortType) => {
        setSortType(newSortType);
        setPromoCodes(_sort(newSortType, initialPromoCodes));
    }

    const filterHandler = (e) => {
        const newValue = e.target.value.trim();
        setSearchString(newValue);
        setPromoCodes(_sort(sortType, initialPromoCodes.filter(sale => sale.title.includes(newValue))));
    }

    const _sort = (type, sortSales) => {
        if (type === 'all') {
            return sortSales.sort((a, b) => {
                if (a.title < b.title) return -1;
                if (a.title > b.title) return 1;
                return 0;
            });
        }

        if (type === 'active') {
            return sortSales.filter(sale => moment(sale.dateEnd).isAfter(moment()));
        }

        if (type === 'archive') {
            return sortSales.filter(sale => moment(sale.dateEnd).isBefore(moment()));
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
                            Промокоды <span role="img" aria-label="Shopping Cart">🛒</span>
                        </Typography>
                        <TextField
                            id="search-field"
                            label="Поиск промокодов"
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
                                        onClick={() => sortHandler('all')}
                                        variant={sortType === 'all' ? 'contained' : 'outlined'}
                                        color="primary">
                                        Все
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => sortHandler('active')}
                                        variant={sortType === 'active' ? 'contained' : 'outlined'}
                                        color="primary">
                                        Активные
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => sortHandler('archive')}
                                        variant={sortType === 'archive' ? 'contained' : 'outlined'}
                                        color="primary">
                                        Архив
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        <List aria-label="Промокоды">
                            {promoCodes && promoCodes.map(promo => (
                                <ListItem key={promo?.title} button onClick={() => setModalContent(promo)}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <LoyaltyIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={promo?.title}
                                        secondary={`С ${moment(promo?.dateStart).format('DD/MM')} по ${moment(promo?.dateEnd).format('DD/MM')}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
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
                    <CardContent>
                        <Typography variant="caption" color="inherit" noWrap>
                            Промокод: {modalContent?.code}
                        </Typography>
                    </CardContent>
                </Card>
            </Modal>
        </React.Fragment>
    );
}
