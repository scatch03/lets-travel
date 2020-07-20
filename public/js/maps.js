let platform = new H.service.Platform({
  'apikey': 'lDpg4ztqsdZcSCymRiWlT99-e6aDsMztPrEzKI_wtAc'
});

function onSuccess(result) {
  console.log(result)
    let geo = (result.response.view[0].result[0].location || result.response.view[0].result[0].place.locations[0]).displayPosition;

    // Obtain the default map types from the platform object:
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 15,
          center: { lat: geo.latitude, lng: geo.longitude }
        });
    let ui = H.ui.UI.createDefault(map, defaultLayers);

    // Create marker
    let marker = new H.map.Marker({ lat: geo.latitude, lng: geo.longitude });
    map.addObject(marker);
};


function landmarkGeocode() {
  var geocoder = platform.getGeocodingService(),
    landmarkGeocodingParameters = {
      searchtext: document.querySelector('.sight-title').textContent,
      jsonattributes : 1
    };

  geocoder.search(
    landmarkGeocodingParameters,
    onSuccess,
    (err) => console.log(err)
  );
}

landmarkGeocode();
