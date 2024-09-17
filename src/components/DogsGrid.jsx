import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useLocation, Link } from "react-router-dom";
import { getDogs, getLocations } from "../common/api";
import DogCard from "./DogCard";

export default function DogsGrid({ dogIds }) {
    const currentUser = localStorage.getItem("currentUser");
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(currentUser)))
    const [dogs, setDogs] = useState();
    const [locations, setLocations] = useState();
    const [error, setError] = useState(false);
    let page = useLocation();

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

    useEffect(() => {
        getDogs(dogIds).then(dogsData => {
            setDogs(dogsData);
            
            const zipcodes = dogsData.map(dog => dog.zip_code);

            getLocations(zipcodes).then(locationData => {
                let locationsMap = new Map();

                locationData.forEach(location => {
                    if (location !== null) {
                        locationsMap.set(location.zip_code, location);
                    }
                })
                
                setLocations(locationsMap); 
            });

        }).catch(error => {
            console.error(error);
            setError(true);
        })
    }, [dogIds]);

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
        if (page.pathname === "/favorites") {
            return <p>No favorited dogs. <Link className="underline" to="/">Search for dogs!</Link></p>
        }

        return <p>Sorry! No dogs found.</p>
    }

    if ((dogs && dogs.length > 0) && (locations && locations.size > 0)) {
        return (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {dogs.map(dog => {
                    const inFavorites = favorites.includes(dog.id);

                    const zipExists = locations.has(dog.zip_code);
                    let cityState = "";
                    if (zipExists) {
                        const locationObj = locations.get(dog.zip_code);
                        cityState = `${locationObj.city}, ${locationObj.state}`;
                    }
                    
                    const location = zipExists ? cityState : dog.zip_code;

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