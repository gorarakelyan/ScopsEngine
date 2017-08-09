  
  function initMap( elemId , myLatlng , noDrag ) {
    
    if( typeof( myLatlng ) == 'string' ) myLatlng = JSON.parse( myLatlng );
    
    var setMarker;
    
    var map = new google.maps.Map( document.getElementById( elemId ), {
      center: myLatlng,
      zoom: 12,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false
    });
  
    setMarker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable: noDrag ? false : true,
      animation: google.maps.Animation.DROP,
    });
    
    return setMarker;
    
  }
  