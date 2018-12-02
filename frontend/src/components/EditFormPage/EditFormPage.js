import React, { Component } from 'react';
import { Form, Field, withFormik } from 'formik';
import { 
    TextField, Button, Grid,
    withStyles, Typography, Divider, Select, MenuItem,
    InputLabel, FormControl, OutlinedInput
  } from '@material-ui/core';
import styles from './EditFormPage.styles';

// const selectField = ({
// 	input, children, id,
// 	label, variant, onChange, values
// }) => (
// <FormControl fullWidth >
// 	<InputLabel required variant={variant} >{label}</InputLabel>
// 	<Select 
// 	children={children}
// 	id={id}
// 	{...input}
// 	input={<OutlinedInput 
// 		value={values.school}
// 		onChange={onChange('school')}
// 		margin='dense' />}
// 	/>
// </FormControl>
// )

export class EditFormPage extends Component {
   
    render() {
        const { classes, user, school } = this.props;
        console.log(user);
        console.log(school);
        return (
            <Form name='editForm' className={classes.main_form} 
				id="main_form">
                <div style={{height: '30px'}}></div>
                <Divider />
                <Grid container justify='flex-start' >
                    <Grid container direction='column' xs='12' spacing='8' >
                        <Grid container item direction='row' spacing='8' style={{marginTop:"20px"}}>
                            <Grid item xs='6'>
                                <TextField 
                                    name='firstName'
                                    label='First'
                                    id='first_name'
                                    type='text'
                                    variant='outlined'
                                    className={classes.textField}
                                    //value={`${user.owner.first_name}}
                                    //required
                                    //onChange={handleChange}
                                    //component={inputField}
                                />
                            </Grid>
                            <Grid item xs='6'>
                                <TextField 
                                    name='lastName' 
                                    id='last_name' 
                                    label='Last' 
                                    type='text'
                                    variant='outlined' 
                                    className={classes.textField}
                                    //required
                                    //onChange={handleChange}
                                    //component={inputField} 
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row' spacing='8' >
                            <Grid item xs='6'>
                                    <TextField 
                                        name='email' 
                                        id='email'
                                        label='E-mail'
                                        type='email'
                                        variant='outlined'
                                        className={classes.textField}
                                        //required
                                        //onChange={handleChange}
                                        //helperText={touched.email && errors.email && <p>{errors.email}</p>}
                                        //component={inputField} 
                                    />
                            </Grid>
                            <Grid item xs='6'>
                                    <TextField 
                                        name='password' 
                                        id='password'
                                        label='Password'
                                        type='password'
                                        variant='outlined'
                                        className={classes.textField}
                                        //required
                                        //onChange={handleChange}
                                        //component={inputField} 
                                    />
                            </Grid>
                        </Grid>
                        
                        <Grid container item direction='row' spacing='8' style={{marginBottom:"20px"}}>
                            <Grid item xs='8'>
                                <TextField 
                                    name='school' 
                                    id='school'
                                    label='School' 
                                    type='text'
                                    variant='outlined'
                                    className={classes.textField}
                                    //required
                                    //values={values}
                                    //onChange={handleChange}
                                    // component={selectField}>
                                    //     {schools.map((school) => (
                                    //     <MenuItem value={school.id}>{school.name}</MenuItem>
                                    //     ))}
                                    //     </TextField>
                                   
                                />
                            </Grid>
                            <Grid item xs='4'>
                                    <TextField 
                                        name='major' 
                                        id='major'
                                        label='Major' 
                                        type='text'
                                        variant='outlined'
                                        className={classes.textField}
                                        //required
                                        //onChange = {handleChange}
                                        //component={inputField} 
                                    />
                            </Grid>
                        </Grid>
                        <Grid item>
                        <Divider />
                            <Button style={{margin: "10px auto", width: "40%"}}
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
}

export default withStyles(styles)(EditFormPage);