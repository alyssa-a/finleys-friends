import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';

export default function DogCard({ dog, isFavorite, updateFavorites, location }) {
    const [favorite, setFavorite] = useState(isFavorite);

    const toggleFavorite = () => {
        setFavorite(!favorite);
        updateFavorites(dog.id);
    }

    return (
        <div className="border border-slate-300 relative">
            <div className="w-full h-52 bg-slate-200">
                <img className="object-cover object-center w-full h-full" src={dog.img} alt={dog.name}/>
            </div>
            <div className="p-5">
                <h2 className="font-bold text-xl">{dog.name}</h2>

                <p>{dog.breed}</p>

                { dog.age === 0 ? 
                    ( <p>Less than 1 year old</p> ) :
                    ( <p>{dog.age} {dog.age === 1 ? "year" : "years"} old</p> )
                }

                <p>{location}</p>

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
    isFavorite: PropTypes.bool.isRequired,
    updateFavorites: PropTypes.func.isRequired,
    location: PropTypes.string.isRequired
}