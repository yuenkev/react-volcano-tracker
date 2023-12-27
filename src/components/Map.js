import { useState} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationMarker from './LocationMarker'
import LocationInfoBox from './LocationInfoBox'

const Map = ({ eventData, center, zoom }) => {
    const [locationInfo, setLocationInfo] = useState(null)

    // Array of markers for volcano's, loop through the eventData and filter catergories ID == 12 (which is volcanoes)
    const markers = eventData.map((ev, index) => {
        if(ev.categories[0].id === 12) {
            return <LocationMarker 
                key={index}
                lat ={ev.geometries[0].coordinates[1]}
                lng ={ev.geometries[0].coordinates[0]}
                onClick={() => setLocationInfo({ id: ev.id, title: ev.title,link: ev.link})}
                />
        }
        return null
    })


  return (
    <div className="map">
        <GoogleMapReact
            bootstrapURLKeys={{ key:'AIzaSyBzYpqh6Xj2QJUOnY5QZYgEQQkyrLFp_Lg' }}
                 defaultCenter = { center }
                 defaultZoom = { zoom }
        >
            {markers}
        </GoogleMapReact>
        {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
  )
}

Map.defaultProps = {
    center: {
        lat: 35.68087875743821, 
        lng: 139.76889760571126
    },
    zoom: 6
}

export default Map