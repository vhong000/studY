import React, { Component } from 'react';
import { EventListCard } from '../../components';
import { Link } from 'react-router-dom';
import {
    Card, CardContent,
    Typography, Grid, withStyles, CardMedia,
    CardActionArea,
} from '@material-ui/core';

const styles = {
    main_grid: {
        "margin-top": 20,
    },
    card: {

    },
    media: {
        height: 90,
        //width: 200,
    }
}

class EventList extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Grid className={classes.main_grid} container justify='center'>
                    <Grid
                        container
                        xs='5'
                        spacing='30'
                    >
                        <EventListCard />
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(EventList);



