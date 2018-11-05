import React, { Component } from 'react';
//import { Header } from '../../components';
import { Link,  BrowserRouter as Router} from 'react-router-dom';
import moment from 'moment';
import {
    Card, CardContent,
    Typography, Grid, withStyles, CardMedia,
    CardActionArea, Divider, Button
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import classNames from 'classnames';

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
        fontFamily: "Raleway",
        fontSize: "30px",
        fontWeight: "700",
    },
    pos: {
        marginBottom: 12,
    },
    icon: {
        fontSize: 28,
        //color: "rgb(48, 60, 125)",
        color: "#B22222",
        verticalAlign: "text-bottom",
    },
    coord: {
        fontFamily: "Raleway",
        fontSize: "16px",
        fontWeight: "700",
    },
    description: {
        fontFamily: "Raleway",
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
                            <Typography className={classNames(classes.pos, classes.coord)} color="textSecondary">
                                <TimerIcon className={classes.icon}/>
                                {moment(event.time).format("hh:mm a")}
                            </Typography>
                            <Divider />
                            <Typography className={classNames(classes.pos, classes.coord)} color="textSecondary">
                                <LocationOnIcon className={classes.icon}/>
                                {event.location? event.location:"add location"}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item sm={9}>
                        <CardContent>
                            <Typography className={classes.title} gutterBottom>
                                {event.name}
                            </Typography>
                            <Typography component="p" className={classes.description}>
                                {event.description}
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



