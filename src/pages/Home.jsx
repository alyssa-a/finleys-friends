import { useState, useEffect } from "react";
import { searchDogs, getDogs } from "../common/api";
import DogCard from "../components/DogCard";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function Home() {
    const [searchResults, setSearchResults] = useState();
    const [dogs, setDogs] = useState();
    const [sort, setSort] = useState("breed:asc");

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    // const handleNextPage = () => {
    //     searchDogs(searchResults.next).then(searchData => {
    //         setSearchResults(searchData);
    //         getDogs(searchData.resultIds).then(dogData => {
    //             setDogs(dogData)
    //         })
    //     })
    // }

    useEffect(() => {
        searchDogs("sort=breed:asc").then(searchData => {
            setSearchResults(searchData);
            getDogs(searchData.resultIds).then(dogData => {
                setDogs(dogData)
            })
        })
    }, []);

    useEffect(() => {
        searchDogs(`sort=${sort}`).then(searchData => {
            setSearchResults(searchData);
            getDogs(searchData.resultIds).then(dogData => {
                setDogs(dogData)
            })
        })
    }, [sort]);

    console.log(searchResults);

    return (
        <div className="container my-8">
            <h2>Adoptable Dogs</h2>

            

            {(dogs && dogs.length > 0) &&
                <>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="Sort By:"
                            onChange={handleSortChange}
                        >
                            <MenuItem value={"breed:asc"}>Breed (A-Z)</MenuItem>
                            <MenuItem value={"breed:desc"}>Breed (Z-A)</MenuItem>
                            <MenuItem value={"age:asc"}>Youngest</MenuItem>
                            <MenuItem value={"age:desc"}>Oldest</MenuItem>
                            <MenuItem value={"name:asc"}>Name (A-Z)</MenuItem>
                            <MenuItem value={"name:desc"}>Name (Z-A)</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
                        {dogs.map(dog => 
                            <DogCard key={dog.id} dog={dog}/>
                        )}
                    </div>
                    
                    {/* <button>Prev</button>
                    <button onClick={handleNextPage}>Next</button> */}
                </>
            }
        </div>
    )
}