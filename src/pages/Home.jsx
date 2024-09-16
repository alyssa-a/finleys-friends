import { useState, useEffect } from "react";
import { searchDogs, getDogs } from "../common/api";
import DogCard from "../components/DogCard";
import { Pagination } from "@mui/material";

export default function Home() {
    const [searchResults, setSearchResults] = useState();
    const [dogs, setDogs] = useState();

    useEffect(() => {
        searchDogs().then(searchData => {
            setSearchResults(searchData);
            getDogs(searchData.resultIds).then(dogData => {
                setDogs(dogData)
            })
        })
    }, [])

    return (
        <div className="container my-8">
            <h2>Adoptable Dogs</h2>

            {(dogs && dogs.length > 0) &&
                <>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                        {dogs.map(dog => 
                            <DogCard key={dog.id} dog={dog}/>
                        )}
                    </div>
                    
                    <Pagination count={10} variant="outlined" />
                </>
            }
        </div>
    )
}