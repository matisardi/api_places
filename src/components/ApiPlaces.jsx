import { useEffect, useState } from "react";

export const ApiPlaces = () => {
    const [search, setSearch] = useState("");
    const [dataDetails, setDataDetails] = useState([]);
    const apiKey = process.env.REACT_APP_API_PLACES_KEY;

    useEffect(()=>{
        getPlaces();
    }, []);

    async function getPlaces() {
        setSearch("ciudades de san luis");
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
                {dataDetails.map((data, id) => (
                    <li key={id}>
                        <br />
                        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${data.result.photos[0].photo_reference}&key=${apiKey}`} alt={data.result.name}/>
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
