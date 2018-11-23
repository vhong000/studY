import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { withStyles }  from '@material-ui/core';
const styles = theme => ({
    iconIm: {
        fontSize: 38,
        color: "#B22222",
        verticalAlign: "text-bottom",
    }
});
 class EventMap extends Component {
    latitude = parseFloat(this.props.campusInfo.lat);
    longitude = parseFloat(this.props.campusInfo.long);
    state = {
        viewport: {
            width: 350,
            height: 300,
            latitude: this.latitude,
            longitude: this.longitude,
            zoom: 13.5
        }
    };
    render() { 
        console.log(this.latitude, this.longitude)
        const { classes } = this.props;

        return (
            <ReactMapGL
                mapStyle={"mapbox://styles/mapbox/streets-v9"}
                mapboxApiAccessToken={"pk.eyJ1Ijoicm9oYW4tc3dhYnkiLCJhIjoiY2pvbHphM3dxMGcwYjNxbzluNGthazM5YyJ9.3buTivFCvbOVrVMCKERy-g"}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}>
                <Marker
                    latitude={this.latitude}
                    longitude={this.longitude}
                    offsetLeft={-20}
                    offsetTop={-10} >
                    <LocationOnIcon className={classes.iconIm} />
                </Marker>
            </ReactMapGL>

        );
    }
}

export default withStyles(styles)(EventMap);