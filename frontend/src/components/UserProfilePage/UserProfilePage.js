//component = stateless (for rendering elements)
import React, { Component } from 'react';
import {

    Typography, Grid, withStyles, Paper, Divider, Toolbar,
    Button, Card, CardContent, CardMedia, CardActionArea

} from '@material-ui/core';

import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
  },
};



class UserProfilePage extends Component {

    
    
    render() {
        const { classes, user, school } = this.props;
        return (
            <div className={classes.root}>
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
            </div>
        )
    }
}

UserProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(UserProfilePage);
