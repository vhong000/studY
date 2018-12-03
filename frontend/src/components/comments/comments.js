
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
import styles from './comments.styles';

const inputField = ({
  input, ...rest
}) => (
  <TextField
    {...input}
    {...rest}
    fullWidth
  />
)

const Comments = (props) => {
  const { 
    comments,
    classes,
    values,
    handleChange,
    isSubmitting,
		ownerId,
   } = props;
  return(
    <div>
     <Paper elevation={0} className={classes.background}>
      {!isEmpty(comments) ? (
        comments.map(comment => {
          return ( 
            <Paper id='comment_list' elevation={1} className={classes.comment}>
              <div id='comment'>
                <div className={classes.heading}>
                  { ownerId === comment.user.owner.id ? (
                    <Typography color='secondary' variant='subtitle'>
                      {comment.user.owner.first_name} {comment.user.owner.last_name}
                    </Typography>
                  ) : (
                    <Typography color='primary' variant='subtitle'>
                      {comment.user.owner.first_name} {comment.user.owner.last_name}
                    </Typography>
                  )}
                  <Typography color='textSecondary' variant='subtitle'>
                    {moment(comment.created_at).format("MM/DD/YYYY")}
                  </Typography>
                </div>
                <Divider />
                <Typography
                  variant='body'
                  className={classes.commentBody}
                  paragraph
                  >
                  {comment.message.split("\n").map((line) => {
                    return <p className={classes.commentParagraph}>{line}</p>;
                  })}
                </Typography>
              </div>
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
    }).then(() => {
      resetForm();
      document.getElementById('comment_field').value = '';
    }).catch((error) => {
      setErrors({ CommentForm: error.message });
      setSubmitting(false);
    });
  },
})(withStyles(styles)(Comments));

