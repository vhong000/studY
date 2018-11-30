
import React from 'react';
import {
  Button, withStyles, Typography,
  Modal,
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import propTypes from 'prop-types';
import { Register } from '../../containers';

import {
  studyBanner, studyBanner1,
  studyBanner2,
} from '../../images';

const images = [studyBanner, studyBanner1, studyBanner2];

const styles = theme => ({
  banner_button: {
    position: 'absolute',
    width: '25%',
    top: '40%',
    left: '50%',
    backgroundColor: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: 'white',
    },
    transform: 'translate(-50%, 50%)',
    color: 'white',
  },
  banner_text: {
    position: 'absolute',
    width: 'auto',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, 50%)',
    color: theme.palette.primary.dark,
  },
  banner: {
    height: 500,
    width: '100%',
    'object-fit': 'cover',
  },
  registerPaper: {
    position: 'absolute',
    left: '50%',
    width: '700px',
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    transform: 'translate(-50%, 40%)',
  },
});

const Wrapped = autoPlay(SwipeableViews);

const Banner = (props) => {
  const {
    classes,
    registerOpen,
    user,
    handleModalClose,
    handleModalOpen,
  } = props;
  return (
    <div>
      <Wrapped
        autoPlay
        interval={10000}
      >
        {images.map((step, index) => (
          <div key={index}>
            <img
              className={classes.banner}
              src={step}
              alt="banner"
            />
          </div>
        ))}
      </Wrapped>
      <Typography
        className={classes.banner_text}
        variant="h3"
        noWrap
      >
        What do you StudY?
      </Typography>
      {user ? (null) : (
        <Button
          onClick={handleModalOpen}
          className={classes.banner_button}
          children="Sign Up"
          variant="text"
          size="large"
        />
      )}
      <Modal open={registerOpen} onClose={() => handleModalClose()}>
        <div className={classes.registerPaper}>
          <Register handleModalClose={handleModalClose} />
        </div>
      </Modal>
    </div>
  );
};

Banner.propTypes = {
  registerOpen: propTypes.bool,
  classes: propTypes.object.isRequired,
  user: propTypes.object.isRequired,
  handleModalClose: propTypes.func.isRequired,
  handleModalOpen: propTypes.func.isRequired,
};

Banner.defaultProps = {
  registerOpen: false,
};

export default withStyles(styles)(Banner);
