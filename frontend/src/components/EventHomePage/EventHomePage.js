import React, { Component } from 'react';
//import {StaticGoogleMap} from 'react-google-static-map';
import Calendar from 'react-calendar';
import styles from './EventHomePage.styles';
import { EventListCard } from '../../components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { studyIcon, CCNY } from '../../images';
import EventMap from './EventMap';
import {

    Typography, Grid, withStyles, Paper, Divider, Toolbar,
    Button, Card, CardContent, CardMedia, CardActionArea

} from '@material-ui/core';
import moment from 'moment'
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleIcon from '@material-ui/icons/People';
import LocationONIcon from '@material-ui/icons/LocationOn';
import TimerIcon from '@material-ui/icons/Timer';
import facebookIcon from '../../images/facebook-icon.png';
import twitterIcon from '../../images/twitter-icon.png';
import linkedInIcon from '../../images/linkedIn-icon.png';

const dummylocation = {
    latitude: 40.8194,
    longitude: -73.95
}

class EventHomePage extends Component {
    render() {
        const { classes, event, eventAttendees, campusInfo } = this.props;
        console.log("This.Props[0]", campusInfo);

        const bull = <span className={classes.bullet}>•</span>;

        const renderProfileCards = () => {
            let profileCard;
            if (eventAttendees.length > 0) {
                console.log("Event Attendees", eventAttendees)
                profileCard = eventAttendees.map((student, index) =>
                    <Grid key={index} item sm={3} spacing={16} >
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia className={classes.media} image={studyIcon} />
                                <CardContent>
                                    <Typography align="center" variant="bus">
                                        {student.owner.first_name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            } else {
                profileCard = <Typography variant="subtitle1" color="textSecondary"> No one has Joined </Typography>
            }
            return (profileCard);

        }

        const renderButton = () => {
            const { user, Joined, isOrganizer, handleDeleteEvent, handleJoinEvent, handleLeaveEvent } = this.props;

            if (Joined) {
                return (
                    <Button onClick={handleLeaveEvent}>Leave Event</Button>
                )
            }
            else if (isOrganizer) {
                return (
                    <Button onClick={handleDeleteEvent}>Delete Event</Button>
                )
            }
            else {
                return (
                    <Button disabled={!user} onClick={handleJoinEvent}>Join Event</Button>
                )
            }
        }
        return (
            <div>
                <Grid className={classes.main_grid} container sm={12} spacing={16}>
                    <Grid container sm={6} style={{ margin: "30px 40px 60px 130px" }}>

                        <Grid item sm={12} className={classes.white}>
                            <h1 style={{ fontSize: "30px" }}>{event.title}</h1>
                            <Typography color="textSecondary">
                                <PersonOutlineIcon className={classes.iconIm} />
                                {`Organizer: ${event.owner}`}
                            </Typography>
                            <Typography color="textSecondary">
                                <LocationONIcon className={classes.iconIm} />
                                {`Campus: ${campusInfo.name}`}
                            </Typography>
                            <Typography color="textSecondary">
                                <TimerIcon className={classes.iconIm} />
                                {`time: ${moment(event.time).format("hh:mm a")}`}
                            </Typography>
                        </Grid>

                        <Grid item sm={12} style={{ paddingTop: "50px" }}>
                            <Typography>
                                <span style={{ verticalAlign: "super", fontFamily: "Raleway" }}>Share:</span> &ensp;
                                <a href="https://www.facebook.com/"><img alt="icon" src={facebookIcon} className={classes.share} /></a>
                                <a href="https://twitter.com/"><img alt="icon" src={twitterIcon} className={classes.share} /></a>
                                <a href="https://www.linkedin.com/"><img alt="icon" src={linkedInIcon} className={classes.share} /></a>
                            </Typography>
                        </Grid>

                        <Grid item sm={12} style={{ margin: "50px 0 50px 0" }}>
                            <h2 style={{ margin: "0" }}>What we're about</h2>
                            <Divider className={classes.divider} />
                            <Typography variant="body2" style={{ marginTop: "20px" }}>
                                {event.details}
                            </Typography>
                        </Grid>

                        <Grid item sm={12}>
                            <h3 style={{ margin: "0", fontSize: "18px", fontWeight: "bold" }}>
                                <span><PeopleIcon className={classes.iconIm} /></span>
                                Attending</h3>
                            <Divider className={classes.divider} />
                        </Grid>
                        {renderProfileCards()}
                    </Grid>

                    <Grid justify="center" container sm={4}>

                        <Grid item justify="center" sm={12} style={{ marginTop: "30px" }}>
                            <Typography className={classes.pos} >
                                <span className={classes.interest}>Interested?</span>&ensp;&ensp;
                                <span className={classes.going}>{bull} {`${eventAttendees.length} going`}</span>
                            </Typography>
                            <Divider className={classes.divider} />
                            {renderButton()}
                        </Grid>

                        <Grid item sm={12} style={{ marginTop: "1px" }}>
                            {campusInfo ? <EventMap location={dummylocation} campusInfo={campusInfo} /> : null}
                        </Grid>
                        <Grid item sm={12} style={{ marginTop: "15px" }}>
                            <Calendar value={event.date} />
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventHomePage);
