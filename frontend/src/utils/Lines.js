
import React, { Component } from 'react';
export const Alert = {
    Success: function Success({ outerClassName, label, children }) {
      return (
        <div className={outerClassName}>
          <div className="study-success">
            <span className="glyphicon glyphicon-ok" /><span>{label}</span>
            {children}
          </div>
        </div>
      )
    },
    Warning: function Warning({ outerClassName, label, children }) {
      return (
        <div className={outerClassName}>
          <div className="study-warning">
            <span className="glyphicon glyphicon-warning-sign" /><span>{label}</span>
            {children}
          </div>
        </div>
      )
    },
    Danger: function Danger({outerClassName, label, children}) {
      return(
        <div className={outerClassName}>
          <div className="study-danger">
            <span className="glyphicon glyphicon-remove" /><span>{label}</span>
            {children}
          </div>
        </div>
      )
    },
    Muted: function Muted({outerClassName, label, children}) {
      return(
        <div className={outerClassName}>
          <div className="study-muted">
            <span>{label}</span>
            {children}
          </div>
        </div>
      )
    },
    Primary: function Primary({outerClassName, label, children}) {
      return(
        <div className={outerClassName}>
          <div className="study-primary">
            <span>{label}</span>
            {children}
          </div>
        </div>
      )
    },
}