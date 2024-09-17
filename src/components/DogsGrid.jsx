import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getDogs, getLocations } from "../common/api";
import DogCard from "./DogCard";

export default function DogsGrid({ dogIds }) {
    const currentUser = localStorage.getItem("currentUser");
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(currentUser)))
    const [dogs, setDogs] = useState();
    const [locations, setLocations] = useState();
    const [error, setError] = useState(false);

    const updateFavorites = (dogId) => {
        const inFavorites = favorites.includes(dogId);

        let updatedFavorites = [];
        if (inFavorites) {
            updatedFavorites = favorites.filter(fav => {
                if (fav === dogId) {
                    return false
                }
                return true;
            })
        } else {
            updatedFavorites = [...favorites, dogId];
        }

        setFavorites(updatedFavorites);
    }

    // useEffect(() => {
    //     if (dogs) {
    //         const zipcodes = dogs.map(dog => dog.zip_code);
    //         getLocations(zipcodes).then(locationData => {
    //             console.log("locationData", locationData);
                
    //             const locationsMap = locationData.reduce((map, location) => {
    //                 map[location.zip_code] = location;
    //                 return map;
    //             }, {});

    //             console.log("locationsMap", locationsMap);

    //             setLocations(locationsMap); 
    //         });
    //     }
    // }, [dogs]);

    useEffect(() => {
        getDogs(dogIds).then(dogsData => {
            setDogs(dogsData);

            const zipcodes = dogsData.map(dog => dog.zip_code);
            getLocations(zipcodes).then(locationData => {
                console.log("locationData", locationData);

                let locationsMap = new Map();

                locationData.forEach(location => {
                    locationsMap.set(location.zip_code, location);
                })
                
                console.log("locationsMap", locationsMap);

                setLocations(locationsMap); 
            });

        }).catch(error => {
            console.error(error);
            setError(true);
        })
    }, [dogIds]);

    // useEffect(() => {
    //     if (dogs) {
    //         const zipcodes = dogs.map(dog => dog.zip_code);
    //         getLocations(zipcodes).then(locationData => {
    //             console.log("locationData", locationData);
                
    //             const locationsMap = locationData.reduce((map, location) => {
    //                 map[location.zip_code] = location;
    //                 return map;
    //             }, {});

    //             console.log("locationsMap", locationsMap);

    //             setLocations(locationsMap); 
    //         });
    //     }
    // }, [dogs]);

    useEffect(() => {
        localStorage.setItem(currentUser, JSON.stringify(favorites));
    }, [currentUser, favorites]);

    if (error) {
        return <p>Error! Sorry, failed to fetch dogs.</p>
    }

    if (!dogs) {
        return <p>Loading dogs...</p>
    }

    if ((dogs && dogs.length === 0)) {
        return <p>Sorry! No dogs found.</p>
    }

    // const map = new Map();
    // console.log("map", map);

    if ((dogs && dogs.length > 0) && locations) {
        return (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {dogs.map(dog => {
                    const inFavorites = favorites.includes(dog.id);

                    console.log("locations", locations);
                    console.log("locations size", locations.size);

                    const zipExists = locations.has(dog.zip_code);
                    let location = dog.zip_code;
                    if (zipExists) {
                        const locationObj = locations.get(dog.zip_code);
                        location = `${locationObj.city}, ${locationObj.state}`;
                    }

                    return (
                        <DogCard 
                            key={dog.id}
                            dog={dog}
                            isFavorite={inFavorites}
                            updateFavorites={updateFavorites}
                            location={location}
                        />
                    )
                })}
            </div>
        )
    }
}
DogsGrid.propTypes = {
    dogIds: PropTypes.array.isRequired,
}