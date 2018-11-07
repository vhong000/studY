
import React from 'react';
import { Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, Button, Grid,
  Select, MenuItem, FormControl,
  InputLabel, withStyles, Typography,
  Paper, OutlinedInput
} from '@material-ui/core';
// import Select from 'react-select';
import propTypes from 'prop-types'
import { createEvent } from '../../fetches';
import moment from 'moment';

const styles = theme => ({
  main_form: { textAlign: 'center' }
}) 

const inputField = ({
	input, children, id, 
	label, type, variant,
	placeholder, onChange,
  required, helperText, margin,
  defaultValue, multiline, rows
}) => (
	<TextField
		id={id} label={label} type={type}
		variant={variant} {...input}
		placeholder={placeholder} helperText={helperText}
		children={children} required={required}
    fullWidth onChange={onChange}
    margin={margin} defaultValue={defaultValue}
    multiline={multiline} rows={rows}
	/>
)

const selectField = ({
	input, children, id, margin,
	label, variant, onChange, values
}) => (
<FormControl fullWidth margin={margin}>
	<InputLabel required variant={variant} >{label}</InputLabel>
	<Select 
	children={children}
  id={id}
	{...input}
	input={<OutlinedInput 
		value={values.event_location}
		onChange={onChange('event_location')}
		margin='dense' />}
	/>
</FormControl>
)

const temporalInputField = ({
  input, children, id, label,
  type, onChange
}) => (
  <FormControl
    fullWidth
    margin='normal'
  >
    <TextField
      {...input}
      InputLabelProps={{ shrink: true}}
      variant='outlined'
      margin='dense'
      onChange={onChange}
      id={id}
      children={children}
      type={type}
      label={label}
    />
  </FormControl>
)

export const EventForm = props => {
  const { handleChange, handleSubmit, classes, values, schools } = props;
  return ( 
    <form onSubmit={handleSubmit}
      className={classes.main_form}
      id='main_form' >
      <Typography 
        variant='display1'
        children="Create An Event"
      />
      <Grid container justify='center' >
        <Grid container item xs='6' direction='column' >
          <Grid item>
            <Field 
              name='eventName'
              label='Event Name'
              id='event_name' 
              variant='outlined'
              type='text'
              margin='dense'
              required
              onChange={handleChange}
              component={inputField}
              />
          </Grid>

          <Grid container item spacing='8'>
            <Grid item xs='8'>
              <Field
                name='eventLocation' 
                values={values}
                type='text'
                variant='outlined'
                margin='dense'
                component={selectField}
                required
                label='School'
                onChange={handleChange}
                id='event_location' >
                  {schools.map((school) => (
                    <MenuItem value={school.id}>{school.name}</MenuItem>
                  ))}
              </Field>
            </Grid>

            <Grid item xs='4'>
              <Field
                name='eventLimit'
                component={inputField}
                variant='outlined'
                margin='dense'
                label='Limit'
                onChange={handleChange}
                id='event_limit'
                type='number' 
              />
            </Grid>
          </Grid>

          <Grid container item spacing='8'>
            <Grid item xs='6' >
              <Field
                name='eventDate'
                component={temporalInputField}
                label='Date'
                onChange={handleChange}
                id='event_date'
                type="date"
              />
            </Grid>
            <Grid item xs='6'>
              <Field
                name='eventTime'
                component={temporalInputField}
                label='Time'
                onChange={handleChange}
                id='event_time'
                type="time"
              />
            </Grid>
          </Grid>

        <Grid item >
          <Field
            name='eventDescription'
            component={inputField}
            multiline
            variant='outlined'
            rows="4"
            onChange={handleChange}
            label="Event Description"
            id='event_description' />
          </Grid>

          <Grid item >
          <FormControl fullWidth margin='normal'>
            <Button
              type='submit'
              children='Create Event'
              color='primary'
              id='submit_button'
            />
          </FormControl>
          </Grid>   
        </Grid>
      </Grid>
    </form>
  )
}

export default withFormik({
	mapPropsToValues: () => ({
		event_name: '',
    event_location: '',
    event_limit: '',
		event_date: '',
		event_time: '',
		event_description: '',
	}),
	validationSchema: Yup.object().shape({
		event_name: Yup.string().required(),
    event_location: Yup.string().required(),
    event_limit: Yup.number(),
		event_date: Yup.string().required(),
		event_time: Yup.string().required(),
		event_description: Yup.string().required(),
	}),
	handleSubmit: (applicant, { props, setErrors, setSubmitting }) => {
    let parsedTime = `${applicant.event_date} ${applicant.event_time}`;
    const finalForm = {
      time: parsedTime,
      name: applicant.event_name,
      description: applicant.event_description,
      campus: applicant.event_location,
      topic: props.subtopic,

    }
    console.log('time', finalForm);
    // createEvent(user)
	}
})(withStyles(styles)(EventForm))