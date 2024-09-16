import { matchDog, getDogs } from "../common/api";
import { useState } from "react";
import DogsGrid from "../components/DogsGrid";

export default function Favorites() {
    const currentUser = localStorage.getItem("currentUser");
    const favorites = JSON.parse(localStorage.getItem(currentUser));
    const [match, setMatch] = useState();

    const onMatch = () => {
        // get favorites again
        const mostRecentFavorites = localStorage.getItem(currentUser);

        matchDog(mostRecentFavorites).then(matchData => {
            const dogId = matchData.match;
            getDogs([dogId]).then(dogsData => {
                setMatch(dogsData[0]);
            });
        });
    }

    return (
        <>
            <h2 className="font-bold text-3xl mb-8">{currentUser}&rsquo;s Favorite Dogs</h2>

            {!match &&
            <>
                <button
                    className="bg-cyan-700 text-white font-semibold rounded-md px-6 py-3 mb-8 hover:bg-cyan-950"
                    onClick={onMatch}
                >
                    Get Matched!
                </button>

                <DogsGrid dogIds={favorites}/>
            </>
            }

            {match &&
            <div className="bg-slate-100 flex flex-col items-center text-center p-10">
                <div className="w-96 h-96 mb-10">
                    <img className="object-cover w-full h-full rounded-full" src={match.img} alt={match.name}/>
                </div>
                <p className="text-2xl mb-3">Congratulations!</p>

                <p className="text-2xl leading-loose mb-8">You&rsquo;ve been matched with<br/>
                <span className="text-6xl font-bold">{match.name}</span></p>
                
                <button className="bg-cyan-700 text-white font-semibold rounded-md px-6 py-3 mb-3 hover:bg-cyan-950">
                    Apply to Adopt {match.name}
                </button>

                <button 
                    className="underline"
                    onClick={() => setMatch()}
                >
                    Try Again
                </button>
            </div>
            }
        </>
    )
}