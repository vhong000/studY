import React, { Component } from 'react';
//import {StaticGoogleMap} from 'react-google-static-map';
import Calendar from 'react-calendar';
import { EventListCard } from '../../components';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {

    Typography, Grid, withStyles, Paper, Divider, Toolbar,
    Button, Card, CardContent

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
    title: {
        "margin-bottom": 15

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
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    map: {
        width: '1000px',
        height: '1000px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    card: {
        minWidth: 75,
        height: 185,
    },

    grid: {
        margin: theme.spacing.unit,
    }
});

class EventHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            Joined: false,
            notInterested:false,
        }

    }

    handleChange(event) {
        //handle
        alert("you are interedted")
        console.log(event)
    }

    render() {
        const { classes, event } = this.props;
        console.log(this.state.date);
        const bull = <span className={classes.bullet}>•</span>;
        //const icon_marker = <span className={}></span>
        return (
            <div>
                <Grid className={classes.main_grid} container sm={12} spacing={16}>
                    <Grid className={classes.main_grid} container sm={12}>
                        <Grid container sm={2}>
                            <Grid item sm={12}>
                                Left grid
                            </Grid>
                        </Grid>
                        <Grid container sm={7}>
                            <Grid item sm={12}>
                                <h1>Title</h1>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography className={classes.pos} color="textSecondary">
                                    {bull} Organizer: B.O.B
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {bull} Study Group
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {bull} Campus: City College
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid justify="center" container sm={3}>
                            <Grid item justify="center" sm={12}>
                                <Typography className={classes.pos} color="textSecondary">
                                    Interest in this topic?
                                </Typography>
                                <Divider/>
                                <Button >Join</Button>
                                <Button>not interested</Button>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Grid>
                    <Grid className={classes.main_grid} container row sm={12}>
                        <Grid container sm={2}>
                        </Grid>
                        <Grid container spacing={16} sm={7}>
                            <Grid item sm={12}>
                                <Typography variant="body2">
                                    Settled opinion how enjoyed greater joy
                                    adapted too shy. Now properly surprise
                                    expenses interest nor replying she she.
                                    Bore tall nay many many time yet less.
                                    Doubtful for answered one fat indulged margaret sir shutters together. Ladies so in wholly around
                                    whence in at. Warmth he up giving oppose if. Impossible is dissimilar entreaties oh on terminated.
                                    Earnest studied article country ten respect showing had. But required offering him elegance son improved informed.
                                    Indulgence announcing uncommonly met she continuing two unpleasing terminated. Now busy say down the shed eyes roof paid her. Of shameless collected suspicion existence in. Share walls stuff think but the arise guest. Course suffer to do he sussex it window advice. Yet matter enable misery end extent common men should. Her indulgence but assistance favourable cultivated everything collecting.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container sm={3}>
                            <Grid item sm={12}>
                                <Calendar value={this.state.date} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(EventHomePage);


// <StaticGoogleMap size="100x100">
// <Marker.Group label="T" color="brown">
//     <Marker location="40.737102,-73.990318" />
//     <Marker location="40.749825,-73.987963" />
// </Marker.Group>
// </StaticGoogleMap>



// <Typography variant="p">
//                                 5303699921
//                                 3696888242
//                                 8617240250
//                                 1310793693
//                                 7373723011
//                                 5650814354
//                                 7332535524
//                                 3218853703
//                                 3816925957
//                                 6902188533
//                                 Was certainty remaining engrossed
//                                 applauded sir how discovery.
//                                 Settled opinion how enjoyed greater joy
//                                 adapted too shy. Now properly surprise
//                                 expenses interest nor replying she she.
//                                 Bore tall nay many many time yet less.
//                                 Doubtful for answered one fat indulged margaret sir shutters together. Ladies so in wholly around
//                                 whence in at. Warmth he up giving oppose if. Impossible is dissimilar entreaties oh on terminated.
//                                 Earnest studied article country ten respect showing had. But required offering him elegance son improved informed.
//                                 Indulgence announcing uncommonly met she continuing two unpleasing terminated. Now busy say down the shed eyes roof paid her. Of shameless collected suspicion existence in. Share walls stuff think but the arise guest. Course suffer to do he sussex it window advice. Yet matter enable misery end extent common men should. Her indulgence but assistance favourable cultivated everything collecting.
//                                 </Typography>