import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

function App() {
  return ( 
    <Router>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
}

//     <>
//       <p>Finleys Friends</p>
      
//       <Router>
//         <Routes>
//             <Route path="/" element={<Layout />}>
//                 <Route index element={<Home />} />
//                 <Route path="/favorites" element={<Favorites />} />
//             </Route>

//             <Route path="/login" element={<Login />} />
//         </Routes>
//     </Router>
      
      
//       <button onClick={login}>
//         Login
//       </button>

//       <button onClick={logout}>
//         Logout
//       </button>

      

//       {(breeds && breeds.length > 0) &&
//       <>
//         <ul>
//             { breeds.map((breed, i) => (
//                 <li key={i}>{breed}</li>
//             ))}
//         </ul> 

//         <Autocomplete
//             multiple
//             limitTags={2}
//             id="multiple-limit-tags"
//             options={breeds}
//             getOptionLabel={(option) => option}
//             defaultValue={[breeds[13], breeds[12], breeds[11]]}
//             renderInput={(params) => (
//                 <TextField {...params} label="limitTags" placeholder="Favorites" />
//             )}
//             sx={{ width: '500px' }}
//         />
//         </>
//       }

//     {/* {(dogs && dogs.length > 0 && searchResults && searchResults.length > 0) &&
//         <ul>
//             { dogs.map(dog  => (
//                 <p key={dog.id}>{dog.name}</p>
//             ))}
//         </ul> 
//       } */}
//     </>
//   )
// }

export default App
