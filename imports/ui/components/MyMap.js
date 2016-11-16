import React from 'react';
import GoogleMap from '../components/GoogleMap.js';

function handleMapOptions() {
  return {
    center: new google.maps.LatLng(60.1845061,24.8290702),
    zoom: 17,
  };
}

function handleOnReady(name) {
  GoogleMaps.ready(name, map => {
    const marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance,
    });
  });
}

function MyMap() {
  return (
    <GoogleMap onReady={handleOnReady} mapOptions={handleMapOptions}>
      Loading Map ...
    </GoogleMap>
  );
}

export default MyMap;
