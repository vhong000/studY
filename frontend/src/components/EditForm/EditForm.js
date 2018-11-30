import React, { Component } from 'react';
import { Form, Field, withFormik } from 'formik';
import { 
    TextField, Button, Grid,
    withStyles, Typography, Divider
  } from '@material-ui/core';
import styles from './EditForm.styles';

export class EditForm extends Component {
   
    render() {
        const { classes } = this.props;
        return (
            <Form name="editForm"
                className={classes.main_form}
                id='main_form' >
                <div style={{height: '30px'}}></div>
                <Divider />
                    <Grid container spacing={24} style={{marginTop:"20px"}}>
                        <Grid item xs style={{padding: 0}}>
                            <Typography variant="subtitle1" gutterBottom style={{fontSize: "18px"}}>
                                Old Password:
                            </Typography>
                        </Grid>
                        <Grid item xs style={{padding: 0}}>
                            <Typography variant="subtitle1" gutterBottom style={{fontSize: "18px"}}>
                                New Password:
                            </Typography>
                        </Grid>   
                    </Grid>
                    <Grid container spacing={24} style={{marginBottom:"25px"}}>
                        <Grid item xs style={{padding: 0}}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs style={{padding: 0}}>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Button style={{margin: "10px auto", width: "40%"}}
                        type='submit'
                        variant="contained"
                        children='Update'
                        color='primary'
                        id='update_button'
                    />   
            </Form>
        )
    }
}

export default withStyles(styles)(EditForm);