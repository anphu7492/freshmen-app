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

var EventLocator = React.createClass({
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

  handleFormSubmit: function (submitEvent) {
    submitEvent.preventDefault();

    var address = this.searchInputElement.value;

    this.geocodeAddress(address);
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
  },

  setSearchInputElementReference: function (inputReference) {
    this.searchInputElement = inputReference;
  },

  setMapElementReference: function (mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      <div className="container">

        <div className="row">
          <div className="col-sm-12">

            <form className="form-inline" onSubmit={this.handleFormSubmit}>
              <div className="row">
                <div className="col-xs-8 col-sm-10">

                  <div className="form-group">
                    <label className="sr-only" htmlFor="address">Address</label>
                    <input type="text" className="form-control input-lg" id="address"
                    placeholder="Aalto university, 02150 Espoo, Finland" ref={this.setSearchInputElementReference} required size="55" />
                  </div>

                </div>
                <div className="col-xs-4 col-sm-2">

                  <button type="submit" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
                  </button>

                </div>
              </div>
            </form>

          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">

            {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> :
            <p className="bg-info">{this.state.foundAddress}</p>}

            <div className="map" ref={this.setMapElementReference}></div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = EventLocator;
