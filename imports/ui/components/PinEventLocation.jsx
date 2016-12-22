import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

class PinEventLocation extends React.Component {
  constructor() {
    super();
    this.state = { lng: 60.1867, lat:24.8277 };
  }
  componentDidMount() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': this.props.address }, function handleResults(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          this.setState({ lng : results[0].geometry.location.lng() });
          this.setState({ lat : results[0].geometry.location.lat() });
          console.log(this.state.lat)
         }
        }.bind(this));
      console.log(this.state.lat)
      this.map = new google.maps.Map(this.refs.map, {
      center: new google.maps.LatLng(this.state.lng,this.state.lat),
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
  address:React.PropTypes.string
}
module.exports = PinEventLocation;
