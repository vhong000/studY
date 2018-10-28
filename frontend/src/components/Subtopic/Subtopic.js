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

class Subtopic extends Component {
    render() {
			const { classes, subtopic, category } = this.props;
			console.log(" Subtopic ",this.props);
        return (
            <div>
				<p></p>
                <Grid container justify='center' >
					<Grid 
						container
						md='10'
						spacing='24'
					>
						{subtopic.titles.map((topic, i) => {
							return (
								<Grid item md='3' >
									<Card className={classes.card}>
										<CardActionArea
											component={Link}
											to={`/${category}/${topic.replace(/\s+/g, '')}`}>
											<CardMedia 
												className={classes.media}
												image={subtopic.image} />
											<CardContent>
												<Typography align="center" variant="h6">
													{topic}
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
        )
    }
   
}
    
export default withStyles(styles)(Subtopic);
