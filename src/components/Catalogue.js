import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { ConfigContext } from './App';

const Catalogue = () => {
    const [movies, setMovies] = useState([]);
    const [year, setYear] = useState((new Date()).getFullYear());

    // Demonstrating how to consume the Context API
    const context = useContext(ConfigContext);

    /*
        - By using useEffect hook, we are telling React that our component needs to do something after render. 
        - Fetching data using axios is an example of a  "side effect"
        - We will need to clean up the request (Effects with Clean up) to avoid memory leak
        - By passing a second argument in useEffect, we are telling useEffect to run again when the year has been changed
    */

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios({
            url: 'https://api.themoviedb.org/3/discover/movie',
            method: 'get',
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: 'false',
                include_video: 'false',
                page: 1,
                primary_release_year: `${year}`,
            },
            cancelToken: source.token
        }).then( response => {

            const movieResults = response.data.results;
            setMovies(movieResults)

        }).catch( error => {
            alert('error')
            console.log(error);
        })

        // Cleans up useEffect
        return () => {
            source.cancel();
        }
    }, [year]);

    // Here we are using the context to determine if we are rendering the catalog or not based on isAuthorized config
    return context.isAuthorized === false ? <p>You are not authorized</p> : (
        <React.Fragment>
            <p>This simple app uses react hooks</p>

            <label htmlFor="movie-year">Year: </label>
            <input 
                id="movie-year"
                type="number" 
                defaultValue={year}
                onChange={(e) => 
                    e.target.value.length === 4 ? setYear(e.target.value) : ''
                }
            />

            <h2>{`Movie Year: ${year}`}</h2>

            <div className='movie-catalogue'>
                {    
                    movies.map(movie => {
                        return(
                            <div key={movie.id} className="movie-poster">
                                <img src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`} alt=""/>
                            </div>
                        )   
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Catalogue;