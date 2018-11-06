
import React, { Component } from 'react';

import { SubtopicPage } from '../../components';
import { fetchSubtopics } from '../../fetches';

class subtopicsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currSubtopics: [],
    }
  }

  componentDidMount() {
    fetchSubtopics().then(response => {
      const id = this.props.match.category;
      console.log(id);
     //  const filtered = response
     //    .filter(topic => topic.category === id);
    })
  }

  render() {
    return (
      <p>testing</p>
    )
  }
}

export default subtopicsWrapper;