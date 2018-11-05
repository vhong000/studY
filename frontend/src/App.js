import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Card, CardContent, Typography, 
	Grid, withStyles, CardMedia,
	CardActionArea,
} from '@material-ui/core';
import './App.css';
import Banner from './components/banner/banner'

import { 
	math, science, history, art, literature, language,
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
	media: {
		height: 200,
	},
})

export class App extends Component {

  render() {
		const { classes, user, registerOpen,
			handleModalClose, handleModalOpen } = this.props;
    return (
			<div className='App'>
				<div className='banner-container'>
					<Banner 
					registerOpen={registerOpen}
					user={user}
					handleModalClose={() => handleModalClose()}
					handleModalOpen={() => handleModalOpen()} />
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
