import React, { Component } from 'react';


export default class FormError extends Component {


    render() {
        const { formErrors } = this.props;
        return (
            <div className='formError'>
                {Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                        )
                    } else {
                        return '';
                    }
                })}
            </div>
        )
    }


}