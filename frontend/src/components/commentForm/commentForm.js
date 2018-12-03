
import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField, Button,
} from '@material-ui/core';
import { postComment } from '../../fetches';

const inputField = ({
  input, ...rest
}) => (
  <TextField
    {...input}
    {...rest}
    fullWidth
  />
)

export const CommentForm = (props) => {
  const {
    handleChange, classes, values,
    user, eventId, isSubmitting, dirty
  } = props;
  return (
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
        disabled={isSubmitting || !dirty}
      />
    </Form>
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
    }).then(() => { console.log('reseting'); resetForm({}); }).catch((error) => {
      setErrors({ CommentForm: error.message });
      setSubmitting(false);
    });
  }
})(CommentForm);