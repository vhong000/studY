
import React from 'react';
import moment from 'moment';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import {
  Paper, Typography, Divider, TextField, 
  withStyles, Button,
} from '@material-ui/core';

import { postComment } from '../../fetches';
import CommentForm from '../commentForm/commentForm';
import styles from './commentsList.styles';

const inputField = ({
  input, ...rest
}) => (
  <TextField
    {...input}
    {...rest}
    fullWidth
  />
)

const CommentsList = (props) => {
  const { 
    comments,
    classes,
    values,
    handleChange,
    isSubmitting,
    handlePostedComment
   } = props;
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
        <Form
          name="commentForm"
          id="main_form"
        >
          <Field
            name="commentField"
            values={values}
            component={inputField}
            multiline
            rows={3}
            margin="dense"
            variant='outlined'
            label="Post a comment"
            onBlur={handleChange}
            id="comment_field"
            type="text"
          />
          <Button
            type="submit"
            id="submit_button"
            children="Post Comment"
            disabled={isSubmitting}
          />
        </Form>
{/*         <CommentForm 
        handlePostedComment={handlePostedComment}
        token={props.token}
        eventId={props.eventId} /> */}
     </Paper>
    </div>
  ) 
}

export default withFormik({
  mapPropsToValues: () => ({
    comment_field: '',
  }),
  validationSchema: Yup.object().shape({
    comment_field: Yup.string().required(),
  }),
  handleSubmit: (comment, { props, setErrors, setSubmitting, resetForm }) => {
    const finalForm = {
      message: comment.comment_field,
      event: props.eventId
    };
    postComment(finalForm, props.token).then(() => {
      props.handlePostedComment();
    }).then(() => { resetForm(); }).catch((error) => {
      setErrors({ CommentForm: error.message });
      setSubmitting(false);
    });
  },
})(withStyles(styles)(CommentsList));

// export default withStyles(styles)(CommentsList);
