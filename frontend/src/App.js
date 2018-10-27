import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Card, CardContent, Typography, 
	Grid, withStyles, CardMedia,
	CardActionArea,
} from '@material-ui/core';
import './App.css';

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

const styles = {
	main_grid: {
		"margin-top": 20,
	},
	card: {
	},
	media: {
		height: 200,
	}
}

class App extends Component {
  render() {
		const { classes } = this.props;
    return (
			<div className='App'>

				<Grid className={classes.main_grid} container justify='center' >
					<Grid 
						className={classes.topics_grid}
						container item
						xs='6'
						spacing='24'
					>
						{topics.map((topic) => {
							return (
								<Grid item xs='6' >
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
