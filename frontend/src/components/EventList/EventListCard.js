import React, { Component } from 'react';
//import { Header } from '../../components';
import { Link } from 'react-router-dom';
import {
    Card, CardContent,
    Typography, Grid, withStyles, CardMedia,
    CardActionArea, Divider, Button
} from '@material-ui/core';

const styles = {
    main_grid: {
        "margin-top": 15,
    },
    card: {
        minWidth: 275,
        height: 185,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
    }
}

class EventListCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes, event, params } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        return (
            <Card className={classes.card}>
            <CardActionArea component={Link}
                to={`/${params.category}/${params.subtopic}/${event.id}`}>
                <Grid className={classes.main_grid} container sm={12}>
                    <Grid item sm={3}>
                        <CardContent>
                            <Typography className={classes.pos} color="textSecondary">
                                {event.time}
                            </Typography>
                            <Divider />
                            <Typography className={classes.pos} color="textSecondary">
                                {event.location}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item sm={9}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {event.title}
                            </Typography>
                            <Typography component="p">
                                {event.Description}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
                </CardActionArea>
            </Card>
        )
    }

}

export default withStyles(styles)(EventListCard);



