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

class EventList extends Component {

    render() {
        const { listofevents } = this.props;
        console.log("Eventlist[0]", listofevents);

        const renderEventCardGrid = () => {

            const dates = listofevents.map((eventDates) =>
                <Grid className={classes.date_group} item sm >
                    <Typography variant="subheading">
                        {eventDates.date}
                    </Typography>
                    <Divider light />
                    {renderCardItems(eventDates.events)}
                </Grid>
            );
            return (dates);
        }

        const renderCardItems = (eventArray) => {

            const events = eventArray.map((event) =>
                <div className={classNames(classes.column, classes.helper)}>
                    <Grid className={classes.item_grid} item >
                        <EventListCard event={event} />
                    </Grid>
                </div>
            );

            return (events);

        }

        const { classes } = this.props;
        return (
            <div>
                <Grid className={classes.main_grid} container sm={12}>
                    <Grid item sm={2}>

                    </Grid>
                    <Grid item sm={6}>
                        {renderEventCardGrid()}
                    </Grid>
                    <Grid item justify="center" sm={3}>
                        <Typography align="center" variant="subheading">
                            Map?
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default withStyles(styles)(EventList);