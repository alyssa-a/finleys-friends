import { useState, useEffect } from "react";
import { searchDogs, getDogs, getBreeds, getLocations } from "../common/api";
import DogCard from "../components/DogCard";
import { FormControl, Select, InputLabel, MenuItem, Autocomplete, TextField } from "@mui/material";

export default function Home() {
    const [searchResults, setSearchResults] = useState();
    const [dogs, setDogs] = useState();
    const [locations, setLocations] = useState();
    const [sort, setSort] = useState("breed:asc");
    const [breeds, setBreeds] = useState();
    const [selectedBreeds, setSelectedBreeds] = useState();

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const handleBreedSelection = (e, value) => {
        setSelectedBreeds(value);
    }

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
                setDogs(dogData);
                
                const zipcodes = dogData.map(dog => dog.zip_code);
                getLocations(zipcodes).then(locationData => {
                    setLocations(locationData);
                })

            });

        });

        getBreeds().then(breedsData => {
            setBreeds(breedsData)
        });
    }, []);

    useEffect(() => {
        searchDogs(`sort=${sort}`).then(searchData => {
            setSearchResults(searchData);
            getDogs(searchData.resultIds).then(dogData => {
                setDogs(dogData)
            })
        });
    }, [sort]);

    useEffect(() => {
        searchDogs(`breeds=${selectedBreeds}`).then(searchData => {
            setSearchResults(searchData);
            getDogs(searchData.resultIds).then(dogData => {
                setDogs(dogData)
            })
        });
    }, [selectedBreeds]);

    console.log(locations);

    return (
        <div className="container my-8">
            <h2>Adoptable Dogs</h2>

            {(breeds && breeds.length > 0) &&
                <Autocomplete
                    multiple
                    limitTags={100}
                    id="multiple-limit-tags"
                    options={breeds}
                    getOptionLabel={(option) => option}
                    onChange={handleBreedSelection}
                    renderInput={(params) => (
                        <TextField {...params} label="Breed" placeholder="Breed" />
                    )}
                />
            }

            {(dogs && dogs.length > 0 && locations && locations.length > 0) &&
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
                        {dogs.map(dog => {
                            const location = locations.find(location => {
                                return location.zip_code === dog.zip_code;
                            });

                            return (
                                <DogCard key={dog.id} dog={dog} city={location.city} state={location.state}/>
                            );
                        }
                        )}
                    </div>
                    
                    {/* <button>Prev</button>
                    <button onClick={handleNextPage}>Next</button> */}
                </>
            }
        </div>
    )
}