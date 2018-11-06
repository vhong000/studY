
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, withStyles, Typography,
  Modal, } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Register } from '../../containers';

import { study_banner, study_banner1,
study_banner2 } from '../../images';

const images = [ study_banner, study_banner1, study_banner2]

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
		"object-fit": 'cover'
	},
	registerPaper: {
		position: 'absolute',
		left: '50%',
		width: '700px',
		height: '60%',
		backgroundColor: theme.palette.background.paper,
		transform: 'translate(-50%, 40%)',
	}
})

const Wrapped = autoPlay(SwipeableViews);

const Banner = (props) => (
<div>
  <Wrapped 
  autoPlay interval={10000} >
    {images.map((step, index) => (
      <div key={index}>
        <img className={props.classes.banner}
        src={step}
        alt='banner' />
      </div>
    ))}
  </Wrapped>
  <Typography
   className={props.classes.banner_text}
   variant='h3'
   noWrap>
    What do you StudY?
  </Typography>
  {props.user ? ( null ) : (
    <Button 
/*       component={Link}
      to='/register' */
      onClick={props.handleModalOpen}
      className={props.classes.banner_button}
      children="Sign Up"
      variant='text'
      size='large'
    />
  )}
  <Modal open={props.registerOpen} onClose={() => props.handleModalClose()}>
    <div className={props.classes.registerPaper}>
      <Register handleModalClose={props.handleModalClose} />
    </div>
  </Modal>
</div>
)

export default withStyles(styles)(Banner);