
import React from 'react';
import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import {
  Paper, Typography, Divider, Grid, withStyles, Button,
} from '@material-ui/core';
import styles from './commentsList.styles';

const CommentsList = (props) => {
  const { comments, classes } = props;
  return(
    <div>
     <Paper elevation={0} className={classes.background}>
      {!isEmpty(comments) ? (
        comments.map(comment => {
          return ( 
            <Paper elevation={1} className={classes.comment}>
              <div className={classes.heading}>
                <Typography color='primary' variant='title'>
                  {comment.user.owner.first_name}
                </Typography>
                <Typography color='textSecondary' variant='subtitle'>
                  {moment(comment.created_at).format("MM/DD/YYYY")}
                </Typography>
              </div>
              <Divider />
              <Typography variant='body' className={classes.commentBody}>
                {comment.message}
              </Typography>
            </Paper>
          )
        })
      ) : ( 
        <Typography variant='title'>No comments</Typography>
      )}
     </Paper>
    </div>
  ) 
}

export default withStyles(styles)(CommentsList);
