import React, { useState } from "react"

//data visualization library
import DeckGL from 'deck.gl'
import { ScatterplotLayer } from 'deck.gl'

//wrapper for Mapbox maps
import { StaticMap } from "react-map-gl"

//config map
import { mapboxKey } from './config/api.js'
import { initialMap } from './config/api.js'

//config golemio
import { golemioKey } from './config/api.js'
import { locationQuery } from './config/api.js';

function App() {
    const [buses, setBuses] = useState([])
    const [line, setLine] = useState("")
    const [status, setStatus] = useState("Pick a line")
    const [popup, setPopup] = useState("")

    function getLocation() {
        fetch(locationQuery + line, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'x-access-token': golemioKey
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                const locationsData = responseData.features
                console.log(locationsData)
                setBuses(locationsData)
                if (locationsData.length < 1) {
                    setStatus("Buses found: 0 (Try 118 during day or 908 during night)")
                } else {
                    setStatus("Buses found: " + locationsData.length)
                }
            })
        //TODO errors
        //.catch(error);
    }

    function handleClick(e) {
        e.preventDefault()
        getLocation()
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    const busLocations = new ScatterplotLayer({
        id: 'buses',
        data: buses,
        filled: true,
        radiusMinPixels: 5,
        getPosition: bus => [bus.geometry.coordinates[0], bus.geometry.coordinates[1]],
        pickable: true,
        onHover: ({object, x, y}) => {
            if (object) {
                setPopup(object.properties.trip.gtfs.trip_headsign)
            } else {
                setPopup("")
            }
        },
    })

    return (
        <DeckGL initialViewState={initialMap} controller={true} layers={[busLocations]}>
            <StaticMap
                mapboxApiAccessToken={mapboxKey}/>
            <form onSubmit={handleSubmit}>
                <input type="text" value={line} onChange={e => setLine(e.target.value)}/>
                <button onClick={handleClick}>search</button>
                <p>{status}</p>
            </form>
            <button onClick={handleClick}>refresh</button>
            <h1>{popup}</h1>
        </DeckGL>
    );
}

export default App;
