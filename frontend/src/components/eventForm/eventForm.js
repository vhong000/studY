import React from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, Button, Grid,
  Select, MenuItem, FormControl,
  InputLabel, withStyles, Typography,
  Paper, OutlinedInput, Divider
} from '@material-ui/core';
// import Select from 'react-select';
import propTypes from 'prop-types'
import { createEvent } from '../../fetches';
import moment from 'moment';
import styles from './eventForm.styles';
import icon from '../../images/icon.png'


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
  const { handleChange, classes, values,
    schools, isSubmitting, touched, errors, user } = props;
  return ( 
    <Form name='createEventForm'
      className={classes.main_form}
      id='main_form' >
        <Grid container direction='row'   style={{height: "60px"}} >
          <Grid item xs='1' style={{marginTop: "12px"}}>
            <img alt="icon" src={icon} className={classes.icon}/> 
          </Grid>
          <Grid item xs='1' style={{marginTop: "15px"}}>
            <Typography style={{fontFamily: "Raleway", fontWeight: '600'}}
              variant='display1'>studY</Typography>
          </Grid>
          <Grid item xs='6'></Grid>
          <Grid item xs='4' style={{paddingRight: "20px"}}> 
            <FormControl fullWidth margin='normal'>
              <Button
                type='submit'
                variant="contained"
                children='Save Event'
                disabled={isSubmitting}
                color='primary'
                id='submit_button'
              />
            </FormControl>
          </Grid>   
        </Grid>

        <Divider />

        <div style={{backgroundColor: "rgb(245, 247, 249)", paddingBottom: "20px"}}>
          <Typography variant="subtitle1" gutterBottom className={classes.text}>
              {`${user.owner.first_name}`}, tell us more about your event!
          </Typography>
          
          <Grid container justify='center' >
            <Grid container item xs='6' direction='column' justify='center' >
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
                  helperText={touched.event_name && errors.event_name}
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
            </Grid>
          </Grid>
        </div> 
    </Form>
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
    let Time = `${applicant.event_date} ${applicant.event_time}`;
    const parsedTime = moment(Time).toISOString();
    
    const finalForm = {
      time: parsedTime,
      name: applicant.event_name,
      description: applicant.event_description,
      campus: applicant.event_location,
      topic: props.subtopic,
      capacity: applicant.event_limit
    }
    console.log('time', finalForm);
    createEvent(finalForm, props.token).then(() => {
      props.handleClose();
    }).catch(error => {
      setErrors({ createEventForm: error.message })
      setSubmitting(false);
    });
	}
})(withStyles(styles)(EventForm))