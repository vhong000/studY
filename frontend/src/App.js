import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Card, CardContent, Typography, 
	Grid, withStyles, CardMedia,
	CardActionArea, Button
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './App.css';

import { 
	math, science, history, art, literature, language, study_banner,
	study_banner1, study_banner2
} from './images'

const topics = [
	{ 
		name: "Math",
		image: math,
	},
	{ 
		name: "History",
		image: history,
	},
	{ 
		name: "Language",
		image: language,
	},
	{ 
		name: "Science",
		image: science,
	},
	{ 
		name: "Art",
		image: art,
	},
	{ 
		name: "Literature",
		image: literature,
	},
]

const styles = theme => ({
	main_grid: {
		"margin-top": 20,
	},
	card: {
	},
	banner_button: {
		position: 'absolute',
		width: '25%',
		top: '40%',
		left: '50%',
		backgroundColor: theme.palette.primary.dark,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
		transform: 'translate(-50%, 50%)',
		color: 'white'
	},
	media: {
		height: 200,
	},
	banner: {
		height: 500,
		width: '100%',
		"object-fit": 'cover'
	}
})

const banners = [ study_banner, study_banner1, study_banner2 ];
const Banner = autoPlay(SwipeableViews);

class App extends Component {
  render() {
		const { classes, theme } = this.props;
    return (
			<div className='App'>
				<div className='banner-container'>
					<Banner
					axis='x'
					autoplay interval={10000} >
						{banners.map((step, index) => (
							<div key={index}>
								<img className={classes.banner}
								src={step}
								alt='banner' />
							</div>
						))}
					</Banner>
					<Button 
						className={classes.banner_button}
						children="Sign Up"
						variant='text'
					/>
				</div>
				<Grid className={classes.main_grid} container justify='center' >
					<Grid 
						className={classes.topics_grid}
						container item
						xs='8'
						spacing='24'
					>
						{topics.map((topic) => {
							return (
								<Grid item xs='12' md='6' lg='4' >
									<Card className={classes.card}>
										<CardActionArea
											component={Link}
											to={"/" + topic.name.toLowerCase()}>
											<CardMedia 
												className={classes.media}
												image={topic.image} />
											<CardContent>
												<Typography variant="h6">
													{topic.name}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							)})
							}
					</Grid>
				</Grid>
			</div>
    );
  }
}

export default withStyles(styles)(App);
