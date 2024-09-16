import { useState, useEffect } from 'react';
import { login, logout, getBreeds, searchDogs, getDogs } from './common/api';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './App.css'

function App() {
    const [breeds, setBreeds] = useState();

    useEffect(() => {
        getBreeds().then(res => setBreeds(res));
        searchDogs().then(res => {
            console.log(res);
            getDogs(res.resultIds).then(res => {
                console.log(res);
            })
        });
    }, []);

  return (
    <>
      <p>Finleys Friends</p>
      <button onClick={login}>
        Login
      </button>

      <button onClick={logout}>
        Logout
      </button>

      

      {(breeds && breeds.length > 0) &&
      <>
        <ul>
            { breeds.map((breed, i) => (
                <li key={i}>{breed}</li>
            ))}
        </ul> 

        <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={breeds}
            getOptionLabel={(option) => option}
            defaultValue={[breeds[13], breeds[12], breeds[11]]}
            renderInput={(params) => (
                <TextField {...params} label="limitTags" placeholder="Favorites" />
            )}
            sx={{ width: '500px' }}
        />
        </>
      }

    {/* {(dogs && dogs.length > 0 && searchResults && searchResults.length > 0) &&
        <ul>
            { dogs.map(dog  => (
                <p key={dog.id}>{dog.name}</p>
            ))}
        </ul> 
      } */}
    </>
  )
}

export default App
