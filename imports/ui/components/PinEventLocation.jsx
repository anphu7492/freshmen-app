import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class PinEventLocation extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
      console.log(this.props.longitude)
      console.log(this.props.latitude)
      this.map = new google.maps.Map(this.refs.map, {
      center: new google.maps.LatLng(this.props.longitude,this.props.latitude),
      zoom: 17
    });
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };

    return (
      <div>
        <div ref="map" style={mapStyle}>Aalto University</div>
      </div>
    );
  }
}
propTypes: {
  longitude: React.PropTypes.string
  latitude: React.PropTypes.string
}
module.exports = PinEventLocation;
