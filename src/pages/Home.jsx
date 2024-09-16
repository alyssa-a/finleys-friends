import { useEffect, useState } from "react";
import { searchDogs, getPage, getBreeds } from "../common/api";
import DogsGrid from "../components/DogsGrid";
import DogsPagination from "../components/DogsPagination";
import DogsSort from "../components/DogsSort";
import BreedsFilter from "../components/BreedsFilter";
import { Stack } from "@mui/material";

export default function Home() {
    const [breeds, setBreeds] = useState();
    const [searchResults, setSearchResults] = useState();
    const [sort, setSort] = useState("breed:asc");
    const [selectedBreeds, setSelectedBreeds] = useState();

    const handlePrevPage = () => {
        getPage(searchResults.prev).then(pageData => {
            setSearchResults(pageData)
        });
    }

    const handleNextPage = () => {
        getPage(searchResults.next).then(pageData => {
            setSearchResults(pageData)
        });
    }

    const handleSort = (e) => {
        setSort(e.target.value);
    }

    const handleBreedSelection = (e, value) => {
        setSelectedBreeds(value);
    }

    useEffect(() => {
        getBreeds().then(breedsData => {
            setBreeds(breedsData);
        })
    }, [])

    useEffect(() => {
        const sortParam = `sort=${sort}`;

        searchDogs(sortParam).then(searchData => {
            setSearchResults(searchData)
        });
    }, [sort]);

    return (
        <>
        <h2 className="font-bold text-3xl">Find your paw-fect match!</h2>

        <div className="flex gap-x-8 mt-8">
            <div className="w-1/3">
                <h3 className="font-bold text-xl mb-6">Sort & Filter</h3>

                <Stack spacing={3}>
                    <DogsSort sort={sort} onSortChange={handleSort}/>

                    {(breeds && breeds.length > 0) &&
                        <BreedsFilter breeds={breeds} onBreedsChange={handleBreedSelection} />
                    }
                </Stack>
            </div>

            <div className="w-full">
                {(searchResults && searchResults.resultIds) && 
                    <>
                        <DogsGrid dogIds={searchResults.resultIds}/>
                        <DogsPagination 
                            prevPage={searchResults.prev ? true : false} 
                            nextPage={searchResults.next ? true : false}
                            onClickPrev={handlePrevPage}
                            onClickNext={handleNextPage}
                        />
                    </>
                }
            </div>
        </div>
        </>
    )
}



// export default function Home() {
//     const [searchResults, setSearchResults] = useState();
//     const [breeds, setBreeds] = useState([]);
//     const [dogs, setDogs] = useState([]);
//     const [locations, setLocations] = useState([]);
//     const [sort, setSort] = useState("breed:asc");
//     const [selectedBreeds, setSelectedBreeds] = useState([]);

//     const handleSortChange = (e) => {
//         setSort(e.target.value);
//     };

//     const handleBreedSelection = (e, value) => {
//         setSelectedBreeds(value);
//     }

//     const makeBreedsQueryParams = useCallback(() => {
//         let params = "breeds=";
//         if (selectedBreeds.length > 0) {
//             params += selectedBreeds.join("&breeds=");
//             return params;
//         } else {
//             return;
//         }
//     }, [selectedBreeds]);

//     const getAllDogData = useCallback(() => {
//         const breedFilter = makeBreedsQueryParams();
//         const queryParams = `${breedFilter}&sort=breed:asc`;
//         searchDogs(queryParams).then(searchData => {
//             // save current page of search results
//             setSearchResults(searchData);

//             // pass results to dogs endpoint
//             getDogs(searchData.resultIds).then(dogData => {
//                 // save current page of dogs data
//                 setDogs(dogData);
                
//                 // pass zipcodes from dog data to locations endpoint
//                 const zipcodes = dogData.map(dog => dog.zip_code);
//                 getLocations(zipcodes).then(locationData => {
//                     // save locations for current page of dogs data
//                     setLocations(locationData);
//                 })

//             });

//         });
//     }, [makeBreedsQueryParams]);

//     // // const handleNextPage = () => {
//     // //     searchDogs(searchResults.next).then(searchData => {
//     // //         setSearchResults(searchData);
//     // //         getDogs(searchData.resultIds).then(dogData => {
//     // //             setDogs(dogData)
//     // //         })
//     // //     })
//     // // }

//     useEffect(() => {
//         getBreeds().then(breedsData => {
//             setBreeds(breedsData)
//         });
//     }, []);

//     useEffect(() => {
//         getAllDogData();
//     }, [getAllDogData, selectedBreeds]);

//     // useEffect(() => {
//     //     searchDogs(`sort=${sort}`).then(searchData => {
//     //         setSearchResults(searchData);
//     //         getDogs(searchData.resultIds).then(dogData => {
//     //             setDogs(dogData)
//     //         })
//     //     });
//     // }, [sort]);

//     useEffect(() => {
//         searchDogs().then(searchData => {
//             setSearchResults(searchData);
//         });
//     }, []);

//     return (
//         <div className="container my-8">
//             <h2>Adoptable Dogs</h2>

//             {(breeds.length > 0) &&
//                 <Autocomplete
//                     multiple
//                     limitTags={100}
//                     id="multiple-limit-tags"
//                     options={breeds}
//                     getOptionLabel={(option) => option}
//                     onChange={handleBreedSelection}
//                     renderInput={(params) => (
//                         <TextField {...params} label="Breed" placeholder="Breed" />
//                     )}
//                 />
//             }

//             {(dogs && dogs.length > 0) &&
//                 <>
//                     {/* <FormControl fullWidth>
//                         <InputLabel id="demo-simple-select-label">Sort By:</InputLabel>
//                         <Select
//                             labelId="demo-simple-select-label"
//                             id="demo-simple-select"
//                             value={sort}
//                             label="Sort By:"
//                             onChange={handleSortChange}
//                         >
//                             <MenuItem value={"breed:asc"}>Breed (A-Z)</MenuItem>
//                             <MenuItem value={"breed:desc"}>Breed (Z-A)</MenuItem>
//                             <MenuItem value={"age:asc"}>Youngest</MenuItem>
//                             <MenuItem value={"age:desc"}>Oldest</MenuItem>
//                             <MenuItem value={"name:asc"}>Name (A-Z)</MenuItem>
//                             <MenuItem value={"name:desc"}>Name (Z-A)</MenuItem>
//                         </Select>
//                     </FormControl> */}

//                     <DogsGrid />

//                     {/* <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
//                         {dogs.map(dog => {
//                             const location = locations.find(location => {
//                                 return location.zip_code === dog.zip_code;
//                             });

//                             return (
//                                 <DogCard key={dog.id} dog={dog} city={location.city} state={location.state}/>
//                             );
//                         }
//                         )}
//                     </div> */}
                    
//                     {/* <button>Prev</button>
//                     <button onClick={handleNextPage}>Next</button> */}
//                 </>
//             }
//         </div>
//     )
// }