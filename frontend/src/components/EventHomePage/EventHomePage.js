import React, { Component } from 'react';
//import {StaticGoogleMap} from 'react-google-static-map';
import Calendar from 'react-calendar';
import styles from './EventHomePage.styles';
import { EventListCard } from '../../components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { studyIcon, CCNY } from '../../images';
import {

    Typography, Grid, withStyles, Paper, Divider, Toolbar,
    Button, Card, CardContent, CardMedia, CardActionArea

} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PeopleIcon from '@material-ui/icons/People';
import LocationONIcon from '@material-ui/icons/LocationOn';
import TimerIcon from '@material-ui/icons/Timer';
import facebookIcon from '../../images/facebook-icon.png';
import twitterIcon from '../../images/twitter-icon.png';
import linkedInIcon from '../../images/linkedIn-icon.png';

class EventHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            Joined: false,
            notInterested: false,
        }

    }

    componentDidMount() {
        document.body.style.background = 'rgb(245, 247, 249)';
    }

    componentWillUnmount() {
        document.body.style.background = 'white';
    }

    handleChange(event) {
        //handle
        alert("Add to event")
        console.log(event)
    }

    render() {
        const { classes, event, eventAttendees,campusInfo } = this.props;
        console.log(campusInfo);

        
        const bull = <span className={classes.bullet}>•</span>;
        
        const renderProfileCards = () => {
            let profileCard;
            if (eventAttendees.length > 0) {
                profileCard = eventAttendees.map((student, index) =>
                    <Grid key={index} item sm={3} spacing={16} >
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia className={classes.media} image={studyIcon} />
                                <CardContent>
                                    <Typography align="center" variant="bus">
                                        {student.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            } else {
                profileCard = <Typography variant="subtitle1" color="textSecondary"> No one is attend this event yet </Typography>
            }
            return (profileCard);

        }
        return (
            <div>
                <Grid className={classes.main_grid} container sm={12} spacing={16}>
                    <Grid container sm={6} style={{margin: "30px 40px 60px 130px"}}>

                        <Grid item sm={12} className={classes.white}>
                            <h1 style={{fontSize: "30px"}}>{event.title}</h1>
                            <Typography className={classes.pos} color="textSecondary">
                            <PersonOutlineIcon className={classes.iconIm}/>
                                {`Organizer: ${event.owner}`}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <LocationONIcon className={classes.iconIm}/>
                                {`Campus: ${campusInfo.name}`}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                <TimerIcon className={classes.iconIm}/>
                                Time: 
                            </Typography>
                        </Grid>
                      
                        <Grid item sm={12} style={{paddingTop: "50px"}}>
                            <Typography>
                                <span style={{verticalAlign: "super", fontFamily: "Raleway"}}>Share:</span> &ensp;
                                <a href="https://www.facebook.com/"><img alt="icon" src={facebookIcon} className={classes.share}/></a>
                                <a href="https://twitter.com/"><img alt="icon" src={twitterIcon} className={classes.share}/></a>
                                <a href="https://www.linkedin.com/"><img alt="icon" src={linkedInIcon} className={classes.share}/></a>
                            </Typography>
                        </Grid>
                           
                        <Grid item sm={12} style={{margin: "50px 0 20px 0"}}>
                            <h2  style={{margin: "0"}}>What we're about</h2>
                            <Divider className={classes.divider}/>
                            <Typography variant="body2">
                                {event.details}
                            </Typography> 
                        </Grid>

                        <Grid item sm={12}>
                            <Typography variant="subtitle1">
                                <PeopleIcon className={classes.iconIm}/>&ensp;
                                Attending
                            </Typography>
                            <Divider className={classes.divider}/>
                        </Grid>
                            {renderProfileCards()}
                    </Grid> 

                    <Grid justify="center" container sm={4}>

                        <Grid item justify="center" sm={12}>
                            <Typography className={classes.pos} >
                                <span className={classes.interest}>Interested?</span>&ensp;&ensp;
                                <span className={classes.going}>{bull} {`${eventAttendees.length} going`}</span> 
                            </Typography>
                            <Divider className={classes.divider}/>
                            <Button className={classes.button}><DoneIcon className={classes.icon}/></Button>
                            <Button className={classes.button}><CloseIcon className={classes.icon}/></Button>
                        </Grid>

                        <Grid item sm={12} style={{marginTop: "0px"}}>
                            <Calendar value={event.date} />
                        </Grid>
                    </Grid>
                
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventHomePage);
