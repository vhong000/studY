import React, { Component } from 'react';
import { EventListCard } from '../../components';
import { EventForm } from '../../containers';
import classNames from 'classnames';
import styles from './EventList.styles';
import { Link } from 'react-router-dom';
import {
    Typography, Grid, withStyles,
    Divider, Toolbar, Button,
    Modal,
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';

class EventList extends Component {

    render() {
        const { classes, listofevents, createEventModal,
        handleClose, handleOpen } = this.props;
        console.log("Eventlist[0]", this.props);

        const styles = theme => ({
        })

        const renderEventCardGrid = () => {

            const dates = listofevents.map((eventDates) =>
                <Grid className={classes.date_group} item sm >
                    <Typography variant="subheading" className={classes.date}>
                        <DateRangeIcon className={classes.icon} />&ensp;
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
        const renderToolbar = () => {
            return (
                <div>
                <Toolbar variant="dense">
                    <Typography className={classes.grow} color="inherit">
                        Here you can either join or create a study group event
                    </Typography>
                    <Button className={classes.button} variant='raised'
                    onClick={() => handleOpen()} >Create event</Button>
                </Toolbar>
                <Modal open={createEventModal} onClose={() => handleClose()} >
                    <div className={classes.eventFormPaper}>
                        <EventForm 
                        subtopic={parseInt(this.props.params.subtopic)} 
                        handleClose={handleClose} />
                    </div>
                </Modal>
                </div>
            )
        }

        const renderPage = () => {
            return (
                <div>
                    
                    <Grid className={classes.main_grid} justify="center" container sm={16}>
                        {/* <Grid item sm={2}>
                    </Grid> */}
                        <Grid item sm={8}>
                            {renderEventCardGrid()}
                        </Grid>
                        {/* <Grid item justify="center" sm={3}>
                        <Typography align="center" variant="subheading">
                            Map?
                        </Typography>
                    </Grid> */}
                    </Grid>
                </div>
            )
        }

        return (
            <div>
                {renderToolbar()}
                <Divider />
                {listofevents.length ? renderPage() : <h4> There are no Topics for this event  </h4>}
            </div>
        )
    }

}

export default withStyles(styles)(EventList);