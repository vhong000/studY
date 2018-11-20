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
                    <Grid container> 
                        <img alt="icon" src={icon} className={classes.icon}/> 
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
                    </Grid> 
                </div> 
                
                <Grid container justify="center" className={classes.main_grid}>
                    <Grid item xs={9}>
                        <h2 className={classes.h2}>Contact Information:</h2>
                        <Typography variant="subtitle1" gutterBottom style={{marginBottom:"40px"}}>
                            <span>Email:</span> {`${user.owner.email}`}
                        </Typography>
                        <h2 className={classes.h2}>General Information:</h2>
                        <Typography variant="subtitle1" gutterBottom className={classes.typography}>
                            <span>First Name:</span> {`${user.owner.first_name}`}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom className={classes.typography}>
                            <span>Last Name:</span> {`${user.owner.last_name}`}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom className={classes.typography}>
                            <span>School:</span> {`${school.name}`}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom style={{marginBottom:"40px"}}>
                            <span>Major:</span> {`${user.major}`}
                        </Typography>
                        <h2 className={classes.h2}>Additional information:</h2>
                        <Typography variant="subtitle1" gutterBottom>
                            {/* Events Joined: */}
                        </Typography>
                    </Grid>
                
                    <Grid item >
                        <Button>Edit</Button>
                    </Grid>
                </Grid>  
            </>
        )
    }
}

export default withStyles(styles)(UserProfilePage);
