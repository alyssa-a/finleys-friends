import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { getDogs } from "../common/api";
import DogCard from "./DogCard";

export default function DogsGrid({ dogIds }) {
    const [dogs, setDogs] = useState();

    useEffect(() => {
        getDogs(dogIds).then(dogsData => {
            setDogs(dogsData);
        });
    }, [dogIds]);

    if (!dogs) {
        return <p>Loading dogs...</p>
    }

    if ((dogs && dogs.length === 0)) {
        return <p>Sorry! No dogs found.</p>
    }

    if ((dogs && dogs.length > 0)) {
        return (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                {dogs.map(dog => (
                    <DogCard key={dog.id} dog={dog} />
                ))}
            </div>
        )
    }
}
DogsGrid.propTypes = {
    dogIds: PropTypes.array.isRequired,
}