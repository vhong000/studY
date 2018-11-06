import React, {Component} from 'react';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import {
	Card, CardContent, 
	Typography, Grid, withStyles, CardMedia,
	CardActionArea,
} from '@material-ui/core';


const styles = {
	main_grid: {
		"margin-top": 20,
	},
	card: {
	},
	media: {
        height: 90
	}
}

class SubtopicPage extends Component {
    render() {
			const { classes, subtopics, category } = this.props;
        return (
          <Grid container justify='center' className={classes.main_grid} >
					<Grid 
						container item
						md='10'
						spacing='24'
					>
						{subtopics ? (subtopics.map((topic, i) => {
							return (
								<Grid item md='3' >
									<Card className={classes.card}>
										<CardActionArea
											component={Link}
											to={'/'} >
											<CardMedia 
												className={classes.media}
												image={topic.image} />
											<CardContent>
												<Typography align="center" variant="h6">
													{topic.name}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							)})
						) : ( <p>loading...</p> )}
					</Grid>
				</Grid>
        )
    }
   
}
    
export default withStyles(styles)(SubtopicPage);
