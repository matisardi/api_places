import { useEffect, useState } from "react";

export const ApiPlaces = () => {
    const [search, setSearch] = useState("ciudades de argentina");
    const [dataDetails, setDataDetails] = useState([]);
    const apiKey = process.env.REACT_APP_API_PLACES_KEY;

    useEffect(()=>{
        getPlaces();
    }, [search]);

    async function getPlaces() {
        setSearch("lugares de brasil");
        const responsePlaces = await fetch(`https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${apiKey}`);
        const dataPlaces = await responsePlaces.json();
        console.log(dataPlaces.results);

        setDataDetails(await Promise.all(dataPlaces.results.map(async (resultDetails) => {
            const responseDetails = await fetch(`https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/details/json?placeid=${resultDetails.place_id}&key=${apiKey}`);
            return await responseDetails.json();
        })));
        console.log(dataDetails);
    }

    return (
        <div>
            {
            <ul>
                {dataDetails.map((data) => (
                    <li key={data.result.place_id} className="w-50">
                        <br />
                        <div id={`carousel${data.result.place_id}`} className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.result.photos[0].photo_reference}&key=${apiKey}`} className="d-block w-100" alt={data.result.name}/>
                                </div>
                                {data.result.photos.slice(1).map((photo) => (
                                    <div className="carousel-item">
                                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${apiKey}`} className="d-block w-100" alt={data.result.name}/>
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${data.result.place_id}`} data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                {/* <span className="visually-hidden">Previous</span> */}
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#carousel${data.result.place_id}`} data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                {/* <span className="visually-hidden">Next</span> */}
                            </button>
                        </div>
                        <h3>{data.result.name}</h3>
                        <p>{data.result.formatted_address}</p>
                        <a href={data.result.website}>Website</a><br />
                        <a href={data.result.url}>Mapa</a><br /><br />
                    </li>
                ))}
            </ul>
            }
        </div>
    )
};
