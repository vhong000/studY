
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { EventForm } from '../components';

function mapStateToProps(state) {
  const selector = formValueSelector('eventForm');
  const { 
    eventName, eventDate, 
    eventTime, eventLocation,
    eventLimit, eventDescription,
    } = selector(
      state, 'eventName', 'eventDate',
      'eventTime', 'eventLocation',
      'eventLimit', 'eventDescription'
    );
  // const eventOrganizer = (
  //   state.Authenticate.user ? (
  //     state.Authenticate.user.user_profile.first_name
  //   ) : (
  //     'default'
  //  ))

  
  // const eventCategory = 'math';
  const eventTopic = 'calc';

  return {
    newEvent: { 
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      limit: eventLimit,
      description: eventDescription,
      // organizer: eventOrganizer,
      // category: eventCategory,
      topic: eventTopic,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmit(newEvent) { console.log(newEvent); }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
  )(reduxForm({
  form: 'eventForm',
})(EventForm))