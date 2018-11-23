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
    state = {
        viewport: {
            width: 350,
            height: 300,
            latitude:  parseFloat(this.props.campusInfo.lat),
            longitude:  parseFloat(this.props.campusInfo.long),
            zoom: 13.5
        }
    };
    render() { 
        const latitude = parseFloat(this.props.campusInfo.lat);
        const longitude =  parseFloat(this.props.campusInfo.long);
        console.log(latitude, longitude)
        const { classes } = this.props;

        return (
            <ReactMapGL
                mapStyle={"mapbox://styles/mapbox/streets-v9"}
                //maybe this is a bad idea. i will remove it when everyone had here own key
                mapboxApiAccessToken={"pk.eyJ1Ijoicm9oYW4tc3dhYnkiLCJhIjoiY2pvbHphM3dxMGcwYjNxbzluNGthazM5YyJ9.3buTivFCvbOVrVMCKERy-g"}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}>
                <Marker
                    latitude={latitude}
                    longitude={longitude}
                    offsetLeft={-20}
                    offsetTop={-10} >
                    <LocationOnIcon className={classes.iconIm} />
                </Marker>
            </ReactMapGL>

        );
    }
}

export default withStyles(styles)(EventMap);