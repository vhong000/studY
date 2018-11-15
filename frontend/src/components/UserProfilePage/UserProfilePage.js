import React, { Component } from 'react';
import { Typography, Grid, withStyles, Button } from '@material-ui/core';
import styles from './UserProfilePage.styles';

class UserProfilePage extends Component {
   
    render() {
        const { classes, user, school } = this.props;
        return (
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
        )
    }
}

export default withStyles(styles)(UserProfilePage);
