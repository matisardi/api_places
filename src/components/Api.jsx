import React, {useRef, useEffect, useState} from 'react'


const Content3 = () => {
    const ref = useRef(<div className='map'></div>);
    const [map, setMap] = useState([]);
    const [service, setService] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [resultDetails, setResultDetails] = useState([]);
    const requestDetails = useRef();

    useEffect(() => {
        setMap(new window.google.maps.Map(ref.current, {}));
        setService(new window.google.maps.places.PlacesService(map));
        const requestSearch = {
            query: 'ciudades en argentina'
        };

        service.textSearch(requestSearch, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                console.log(results);
                setResultSearch(results);
            }
        });
                
        resultSearch.map((item) => (
            requestDetails.current = {
                placeId: item.place_id,
                fields: ["name", "photos", "rating", "reviews", "url", "website"],
            }
        ));
        service.getDetails(requestDetails.current, (place, status) => {
            if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                place
            ) {
                console.log(place);
                setResultDetails(place);
            }
        });
    }, [ref, map, service]);

    return (
        <div>
            {
            <ul>
                {resultSearch.map((item, id) => (
                    <li key={id}>
                        <img src={item.photos[0].getUrl()} alt={item.name}/>
                        <h3>{item.name}</h3>
                        <p>{item.formatted_address}</p>
                        <a href={resultDetails.url}>Mapa</a>
                    </li>
                ))}
            </ul>
            }
        </div>
    )
}

export default Content3