import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: {
        title: "Event",
        name: "ASSIST",
        position: { lat:  47.667138, lng: 26.274390 },
      },
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    this.setState({
      marker: {
        title: "Event",
        name: "ASSIST",
        position: { lat: lat, lng: lng },
      },
    });
   this.props.onClickCoord(this.state.marker);
  }
  render() {
    const mapStyles = {
      width: "50vw",
      height: "50vh",
    };
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: 47.667138, lng: 26.274390 }}
        onClick={this.onClick}
      >
        <Marker position={this.state.marker.position} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
