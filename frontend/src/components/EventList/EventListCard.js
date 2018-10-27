import React, { Component } from 'react';
//import { Header } from '../../components';
import { Link } from 'react-router-dom';
import {
    Card, CardContent,
    Typography, Grid, withStyles, CardMedia,
    CardActionArea, Button
} from '@material-ui/core';

const styles = {
    main_grid: {
        "margin-top": 20,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    }
}

class EventListCard extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography component="p">
                        well meaning and kindly.
                    <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActionArea>
                    <Button size="small"> Join </Button>
                </CardActionArea>
            </Card>
        )
    }

}

export default withStyles(styles)(EventListCard);



