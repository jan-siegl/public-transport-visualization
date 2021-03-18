//Mapbox api
export const mapboxKey = process.env.REACT_APP_MAP_API_KEY

//initial map location and zoom, set to Prague center
export const initialMap = {
    longitude: 14.4633,
    latitude: 50.07827,
    zoom: 11,
    pitch: 0,
    bearing: 0
};


//golemio opendata api
export const golemioKey = process.env.REACT_APP_GOLEMIO_API_KEY

//specific line location query
export const locationQuery = "https://api.golemio.cz/v2/vehiclepositions?includeNotTracking=false&routeShortName="
