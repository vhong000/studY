import React, { Component } from 'react';
import { Form, Field, withFormik } from 'formik';
import {
  TextField, Button, Grid,
  withStyles, Typography, Divider, Select, MenuItem,
  InputLabel, FormControl, OutlinedInput
} from '@material-ui/core';
import { updateUser } from '../../fetches';
import styles from './EditFormPage.styles';

const inputField = ({
  input, ...rest
}) => (
  <TextField
    {...input}
    {...rest}
    fullWidth
  />
);

export const EditFormPage = props => {
  const { classes, handleChange, values, isSubmitting } = props;

  return (
    <Form name='editForm' className={classes.main_form}
      id="main_form">
      <div style={{ height: '30px' }}></div>
      <Divider />
      <Grid container justify='flex-start' >
        <Grid container direction='column' xs='12' spacing='8' >
          <Grid container item direction='row' spacing='8' style={{ marginTop: "20px" }}>
            <Grid item xs='6'>
            <Field
                name='firstName'
                label='First'
                id='first_name'
                type='text'
                variant='outlined'
                component={inputField}
                className={classes.textField}
                onBlur={handleChange}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='lastName'
                id='last_name'
                label='Last'
                type='text'
                variant='outlined'
                component={inputField}
                className={classes.textField}
                onBlur={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container item direction='row' spacing='8' >
            <Grid item xs='6'>
              <Field
                name='email'
                id='email'
                label='E-mail'
                type='email'
                variant='outlined'
                component={inputField}
                className={classes.textField}
                onBlur={handleChange}
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='password'
                id='password'
                label='Password'
                type='password'
                variant='outlined'
                component={inputField}
                className={classes.textField}
                onBlur={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container item direction='row' spacing='8' style={{ marginBottom: "20px" }}>
            <Grid item xs='8'>
              <Field
                name='school'
                id='school'
                label='School'
                type='text'
                variant='outlined'
                component={inputField}
                className={classes.textField}
                onBlur={handleChange}
              />
            </Grid>
            <Grid item xs='4'>
              <Field
                name='major'
                id='major'
                label='Major'
                type='text'
                variant='outlined'
                component={inputField}
                className={classes.textField}
                onBlur={handleChange}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
            <Button style={{ margin: "10px auto", width: "40%" }}
              type='submit'
              variant="contained"
              children='Update'
              color='primary'
              id='update_button'
            />
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues: (props) => ({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    school: '',
    major: '',
  }),
  handleSubmit: (user, { props }) => {
    const finalForm = {
      school: user.school ? user.school : undefined,
      major: user.major ? user.major : undefined,
      owner: {
          first_name: user.first_name ? user.first_name : undefined,
          last_name: user.last_name ? user.last_name : undefined,
          email: user.email ? user.email : undefined
      }
    }

    updateUser(finalForm, props.token).then(() => {
      props.onClose();
    })
  }
})(withStyles(styles)(EditFormPage));