var React = require('react');

var ValidateAddress = React.createClass({
    geocodeAddress: function(address) {
        this.geocoder.geocode({
            'address': address
        }, function handleResults(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                console.log("true");
                return;
            } else {
                console.log("false");
            }
        }.bind(this));
    },
    componentDidMount: function() {
        this.geocoder = new google.maps.Geocoder();
        this.geocodeAddress(this.props.address);
    },

    render: function() {
        return (
            <div></div>
        );
    }
});
propTypes : {
    address: React.PropTypes.string
}
module.exports = ValidateAddress;
