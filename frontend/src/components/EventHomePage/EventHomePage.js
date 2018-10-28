import React, { Component } from 'react';
import { EventListCard } from '../../components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {

    Typography, Grid, withStyles, Divider, Toolbar

} from '@material-ui/core';

const styles = theme => ({
    main_grid: {
        "margin-top": 20,
    },
    item_grid: {
        "margin-top": 5,

    },

    date_group: {
        "top-padding": 30,
    },
    typo_margin: {
    },
    media: {
        height: 90,
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
});

class EventHomePage extends Component {

    render() {


        const { classes } = this.props;
        return (
            <div>
                <Grid className={classes.main_grid} container sm={12}>
                   main_grid
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(EventHomePage);