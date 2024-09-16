import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

export default function DogCard({ dog, city, state }) {
    const [favorite, setFavorite] = useState(false);

    const toggleFavorite = () => {
        setFavorite(!favorite);
    }

    return (
        <div className="border relative">
            <div className="w-full h-52 bg-slate-200">
                <img className="object-cover object-center w-full h-full" src={dog.img} alt={dog.name}/>
            </div>
            <div className="p-5">
                <h2 className="font-bold text-xl">{dog.name}</h2>
                <p>{dog.breed}</p>
                <p>{dog.age} {dog.age === 1 ? "year" : "years"} old</p>
                <p className="italic">{city}, {state}</p>
                <button className="absolute top-2 right-2 p-1 bg-white rounded-sm" onClick={toggleFavorite}>
                    <span className="sr-only">Add {dog.name} to favorites</span>
                    { favorite
                        ? <HeartIconSolid className="size-6 text-rose-600"/>
                        : <HeartIcon className="size-6"/>
                    }
                </button>
            </div>
        </div>
    );
}
DogCard.propTypes = {
    dog: PropTypes.object.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
}