var React = require('react');

var INITIAL_LOCATION = {
  address: 'Aalto university, 02150 Espoo, Finland',
  position: {
    latitude: 60.184649,
    longitude: 24.827937
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 14;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

var Locator = React.createClass({
  getInitialState: function () {
    return {
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address
    };
  },

  geocodeAddress: function (address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    }.bind(this));
  },

  componentDidMount: function () {
    var mapElement = this.mapElement;
    this.map = new google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.geocoder = new google.maps.Geocoder();
    this.geocodeAddress(this.props.address);
  },
  setMapElementReference: function (mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    console.log(this.props.address);
    return (
      <div className="locator" ref={this.setMapElementReference}></div>
    );
  }
});
propTypes: {
  address:React.PropTypes.string
}
module.exports = Locator;
