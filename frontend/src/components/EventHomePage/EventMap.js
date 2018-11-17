import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import LocationOnIcon from '@material-ui/icons/LocationOn';

export default class EventMap extends Component {
    state = {
        viewport: {
            width: 400,
            height: 400,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 15
        }
    };
    render() {
        return (
            <ReactMapGL
                mapStyle={"mapbox://styles/mapbox/streets-v9"}
                mapboxApiAccessToken={"pk.eyJ1Ijoicm9oYW4tc3dhYnkiLCJhIjoiY2pvbHphM3dxMGcwYjNxbzluNGthazM5YyJ9.3buTivFCvbOVrVMCKERy-g"}
                {...this.state.viewport}
                onViewportChange={(viewport) => this.setState({ viewport })}>
                <Marker latitude={37.7577} longitude={-122.4376} offsetLeft={-20} offsetTop={-10} >
                    <LocationOnIcon/>
                </Marker>
            </ReactMapGL>

        );
    }
}
