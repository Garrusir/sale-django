import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    title: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
});

export default function MediaCard({sale}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={sale.image}
                    title={sale.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title} alt={sale.title}>
                        {sale.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>{sale.price_new}</b>
                        <strike>{sale.price_old}</strike>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    );
}
