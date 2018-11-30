import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardContent,
  Typography, Grid, withStyles, CardMedia,
  CardActionArea,
} from '@material-ui/core';
import propTypes from 'prop-types';

const styles = {
  main_grid: {
    'margin-top': 20,
  },
  media: {
    height: 200,
  },
};

const SubtopicPage = (props) => {
  const { classes, subtopics, category } = props;
  return (
    <div>
      <Typography variant="display1" align="center">
        {category}
      </Typography>
      <Grid container justify="center" className={classes.main_grid}>
        <Grid
          container
          item
          xs="8"
          spacing="24"
        >
          {subtopics ? (subtopics.map((topic, i) => (
            <Grid item xs="12" md="6" lg="4">
              <Card id="card" className={classes.card}>
                <CardActionArea
                  component={Link}
                  to={`/category/${category}/${topic.id}`}>
                  <CardMedia
                    className={classes.media}
                    image={topic.image}
                  />
                  <CardContent>
                    <Typography id="name" align="center" variant="h6">
                      {topic.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
          ) : (<p>loading...</p>)}
        </Grid>
      </Grid>
    </div>
  );
};

SubtopicPage.propTypes = {
  classes: propTypes.object.isRequired,
  subtopics: propTypes.array,
  category: propTypes.number.isRequired,
};

SubtopicPage.defaultProps = {
  subtopics: [],
};

export default withStyles(styles)(SubtopicPage);
