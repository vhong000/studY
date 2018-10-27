
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { 
  TextField, Button, Grid,
  Select, MenuItem, FormControl,
  InputLabel, withStyles
} from '@material-ui/core';

const styles = theme => ({
  main_form: { textAlign: 'center' }
}) 

const eventNameField = ({
  input, label, children, id,
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField 
      id={id}
      label={label}
      fullWidth
      type='text'
      children={children}
      {...input}
      />
  </FormControl>
)

const eventLocationField = ({
  input, children, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <InputLabel>{label}</InputLabel>
    <Select
      fullWidth
      {...input}
      children={children} />
  </FormControl>
)

const eventLimitField = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField 
      {...input}
      fullWidth
      id={id}
      label={label}
      children={children}
      type='number'
      />
  </FormControl>
)

const eventDescriptionField = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField 
      {...input}
      id={id}
      label={label}
      multiline
      rows='4'
      children={children}
      type='number'
      />
  </FormControl>
)

const eventDate = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField
      {...input}
      InputLabelProps={{ shrink: true}}
      id={id}
      children={children}
      type='date'
      label={label}
    />
  </FormControl>
)

const eventTime = ({
  input, children, id, label
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField
      {...input}
      InputLabelProps={{ shrink: true}}
      id={id}
      children={children}
      type='time'
      label={label}
    />
  </FormControl>
)

const EventForm = props => {
  const { classes } = props;
  return ( 
    <form
      className={classes.main_form}>
      <Grid container justify='center' >
        <Grid container item xs='6' direction='column' >
          <Grid item>
            <Field 
              name='eventName'
              component={eventNameField}
              label='Event Name' />
          </Grid>

          <Grid container item spacing='16'>
            <Grid item xs='6'>
              <Field
                name='eventLocation' 
                component={eventLocationField}
                label='School' >
                <MenuItem value='1'> 1 </MenuItem>
                <MenuItem value='2'> 2 </MenuItem>
                <MenuItem value='3'> 3 </MenuItem>
              </Field>
            </Grid>

            <Grid item xs='6'>
              <Field
                name='eventLimit'
                component={eventLimitField}
                label='Limit' />
            </Grid>
          </Grid>

          <Grid container item spacing='16'>
            <Grid item xs='6' >
              <Field
                name='eventDate'
                component={eventDate}
                label='Date'
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='eventTime'
                component={eventTime}
                label='Time'
              />
            </Grid>
          </Grid>

          <Grid item>
            <Field
              name='eventDescription'
              component={eventDescriptionField}
              label="Event Description" />
          </Grid>

          <Grid>
            <Button
              type='submit'
              fullWidth
              children='Create Event'
              color='primary'
            />
          </Grid>   
        </Grid>
      </Grid>
    </form>
  )
}

export default reduxForm({
  form: 'eventForm',
})(withStyles(styles)(EventForm))