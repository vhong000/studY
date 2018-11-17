import React, { Component } from 'react';
import { Typography, Grid, withStyles, Button } from '@material-ui/core';
import styles from './UserProfilePage.styles';
import icon from '../../images/icon.jpg';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

class UserProfilePage extends Component {
   
    render() {
        const { classes, user, school } = this.props;
        return (
            <>
            <div style={{height: "160px", backgroundColor: "rgb(148, 160, 231)"}}>
            {/* <Grid container justify="center"> */}

                <Grid container direction="column" className={classes.header_grid}>
                    <Grid item> 
                        <Typography variant="subtitle1" gutterBottom className={classes.header_typography}>
                            <PersonOutlineIcon className={classes.iconUi}/>&ensp;
                            {`${user.owner.first_name} ${user.owner.last_name}`}
                    </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="subtitle1" gutterBottom className={classes.header_typography}>
                            <AlternateEmailIcon className={classes.iconUi}/>&ensp;
                            {`${user.owner.email}`}
                    </Typography>
                    </Grid>
                </Grid>
            {/* </Grid> */}
            </div>
            <img alt="icon" src={icon} className={classes.icon}/> 
            <Grid container spacing={24} className={classes.main_grid}>
                <Grid item xs={10}>
                    <Typography variant="subtitle1" gutterBottom>
                        Name:
                        {`${user.owner.first_name} ${user.owner.last_name}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Email: {`${user.owner.email}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        School: {`${school.name}`}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Major: {`${user.major}`}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button>Edit</Button>
                </Grid>
            </Grid>
            </>
        )
    }
}

export default withStyles(styles)(UserProfilePage);
