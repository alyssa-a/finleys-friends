import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getDogs, getLocations } from "../common/api";
import DogCard from "./DogCard";

export default function DogsGrid({ dogIds }) {
    const currentUser = localStorage.getItem("currentUser");
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(currentUser)))
    const [dogs, setDogs] = useState();
    const [locations, setLocations] = useState();

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
        });
    }, [dogIds]);

    useEffect(() => {
        localStorage.setItem(currentUser, JSON.stringify(favorites));
    }, [currentUser, favorites]);

    useEffect(() => {
        if (dogs) {
            const zipcodes = dogs.map(dog => dog.zip_code);
            getLocations(zipcodes).then(locationData => {
                setLocations(locationData);
            });
        }
    }, [dogs]);

    if (!dogs) {
        return <p>Loading dogs...</p>
    }

    if ((dogs && dogs.length === 0)) {
        return <p>Sorry! No dogs found.</p>
    }

    if ((dogs && dogs.length > 0)) {
        return (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {dogs.map(dog => {
                    const inFavorites = favorites.includes(dog.id);
                    return <DogCard key={dog.id} dog={dog} isFavorite={inFavorites} updateFavorites={updateFavorites}/>
                })}
            </div>
        )
    }
}
DogsGrid.propTypes = {
    dogIds: PropTypes.array.isRequired,
}