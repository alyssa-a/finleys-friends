import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { searchDogs, getPage, getBreeds } from "../common/api";
import DogsGrid from "../components/DogsGrid";
import DogsPagination from "../components/DogsPagination";
import DogsSort from "../components/DogsSort";
import BreedsFilter from "../components/BreedsFilter";
import { Stack } from "@mui/material";
import { getWithTTL } from "../common/localStorageTTL";

export default function Home() {
    const [breeds, setBreeds] = useState();
    const [searchResults, setSearchResults] = useState();
    const [sort, setSort] = useState("breed:asc");
    const [selectedBreeds, setSelectedBreeds] = useState();
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const loggedIn = getWithTTL("LoggedIn");

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
        if (loggedIn === null) {
            navigate("/login", { replace: true })
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        getBreeds().then(breedsData => {
            setBreeds(breedsData);
        })
    }, [])

    useEffect(() => {
        let params = ""
        const sortParam = `sort=${sort}`;

        if (selectedBreeds && selectedBreeds.length > 0) {
            const breedsParam = selectedBreeds.join("&breeds=")
            params = `breeds=${breedsParam}&${sortParam}`;
        } else {
            params = sortParam;
        }

        searchDogs(params).then(searchData => {
            setSearchResults(searchData)
        }).catch(error => {
            console.error(error);
            setError(true);
        });
    }, [sort, selectedBreeds]);

    if (error) {
        return <p>Error! Sorry, failed to execute search.</p>
    }

    return (
        <>
        <h2 className="font-bold text-3xl">Find your paw-fect match!</h2>

        <div className="flex flex-col gap-x-8 mt-8 md:flex-row">
            <div className="mb-8 md:w-1/3 md:mb-0">
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
                            offset={searchResults.next}
                            total={searchResults.total}
                        />
                    </>
                }
            </div>
        </div>
        </>
    )
}