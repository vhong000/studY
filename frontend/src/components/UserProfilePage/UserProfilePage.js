import React, { Component } from 'react';
import { Typography, Grid, withStyles, Button, Modal } from '@material-ui/core';
import EditFormPage from '../EditFormPage/EditFormPage';
import EditForm from '../../containers/EditForm/EditForm';
import icon from '../../images/icon.jpg';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import propTypes from 'prop-types';
import styles from './UserProfilePage.styles';

export class UserProfilePage extends Component {

  render() {
    const { classes, renderEdit, user, school, eventsJoined, eventsOrg, handleOpen, handleClose, editModalOpened } = this.props;
    const token = localStorage.getItem('token');
    console.log("User Profile", this.props)
    return (
      <>
        <div style={{ height: '160px', backgroundColor: 'rgb(148, 160, 231)' }}>
          <Grid container>
            <img alt="icon" id="icon" src={icon} className={classes.icon} />
            <Grid container direction="column" className={classes.header_grid}>
              <Grid item>
                <Typography variant="subtitle1" gutterBottom className={classes.header_typography}>
                  <PersonOutlineIcon id="person-icon" className={classes.iconUi} />
                  &ensp;
                  {user ? `${user.owner.first_name} ${user.owner.last_name}` : null}
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle1" gutterBottom className={classes.header_typography}>
                  <AlternateEmailIcon id="email-icon" className={classes.iconUi} />
                  &ensp;
                  {user ? `${user.owner.email}` : null}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>

        <Grid container justify="center" className={classes.main_grid}>
          <Grid item xs={9}>
            <h2 className={classes.h2}>Contact Information:</h2>
            <Typography variant="subtitle1" gutterBottom style={{ marginBottom: '40px' }}>
              <span>Email:</span>
              {' '}
              {user ? `${user.owner.email}`: null}
            </Typography>
            <h2 className={classes.h2}>General Information:</h2>
            <Typography variant="subtitle1" gutterBottom className={classes.typography}>
              <span>First Name:</span>
              {' '}
              {user ? `${user.owner.first_name}`: null}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.typography}>
              <span>Last Name:</span>
              {' '}
              {user ? `${user.owner.last_name}`: null}
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={classes.typography}>
              <span>School:</span>
              {' '}
              {user ? `${school.name}`: null}
            </Typography>
            <Typography variant="subtitle1" gutterBottom style={{ marginBottom: '40px' }}>
              <span>Major:</span>
              {' '}
              {user ? `${user.major}`: null}
            </Typography>
            <h2 className={classes.h2}>Additional information:</h2>
            <Typography variant="subtitle1" gutterBottom className={classes.typography}>
              <span>Events Organized:</span>
            </Typography>
            <ul className={classes.list}>
              {eventsOrg && eventsOrg.length > 0 ? (eventsOrg.map(event =>
                <li key={event.id}>{event.name}</li>
              )) : <p>You didn't create any events</p>}
            </ul>
            <Typography variant="subtitle1" gutterBottom className={classes.typography}>
              <span>Events Joined:</span>
            </Typography>
            <ul className={classes.list} style={{ marginBottom: "20px" }}>
              {eventsJoined && eventsJoined.length > 0 ? (eventsJoined.map(event =>
                <li key={event.id}>{event.name}</li>
              )) : <p>You didn't join any events</p>}
            </ul>
          </Grid>

          <Grid item >
            {renderEdit ?
              <Button id='edit-button'
                onClick={() => handleOpen()}>
                Edit
            </Button> : false}
          </Grid>
        </Grid>
        <Modal open={editModalOpened} onClose={() => handleClose()} >
          <div className={classes.editForm}>
            <EditFormPage user={user} token={token} onClose={handleClose} />
            {/* <EditForm user = {user} schools={schools}/> */}
          </div>
        </Modal>
      </>
    )
  }
}

UserProfilePage.propTypes = {
  classes: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  school: propTypes.array.isRequired,
};

export default withStyles(styles)(UserProfilePage);
