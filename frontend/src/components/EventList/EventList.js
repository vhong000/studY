import React, { Component } from 'react';
import { EventListCard } from '../../components';
import classNames from 'classnames';
import styles from './EventList.styles';
import { Link } from 'react-router-dom';
import {

    Typography, Grid, withStyles, Divider, Toolbar,Button

} from '@material-ui/core';



class EventList extends Component {

    render() {
        const { listofevents } = this.props;
        console.log("Eventlist[0]", this.props);

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
                        <EventListCard event={event} params={this.props.params} />
                    </Grid>
                </div>
            );

            return (events);

        }

        const { classes } = this.props;
        return (
            <div>
                <Toolbar variant="dense">
                    <Typography className={classes.grow} color="inherit">
                        Here you can either join or create a study group event
                    </Typography>
                    <Button color="inherit">create event</Button>
                </Toolbar>
                <Divider />
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