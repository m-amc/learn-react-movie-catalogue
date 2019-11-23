import React, { useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import catalogueReducer from './catalogueReducer';

import { ConfigContext } from './App';

const Catalogue = () => {
    /* 
        useState demonstration
        Syntax: const [state, setState] = useState(initialState);
    */
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    /* 
        useReducer demonstration
        Syntax: 
        const [state, dispatch] = useReducer(reducer, initialState);

        useReducer is an alternative to useState and best used when there's a complex state logic.  This is not a complex app but for the purpose of demonstration, we will be using useReducer in year.
    */
    const [year, dispatch] = useReducer(catalogueReducer, '');


    /* 
        useContext demonstration 
        Syntax: const value = useContext(MyContext);

        Pass the ConfigContext you imported
    */
    const context = useContext(ConfigContext);

    /*  
        useEffect demonstration
        - useEffect Hook is componentDidMount, componentDidUpdate, and componentWillUnmount combined
        - By using useEffect hook, we are telling React that our component needs to do something after render. 
        - Fetching data using axios is an example of a  "side effect"
        - We will need to clean up the request (Effects with Clean up) to avoid memory leak i.e. detaching firebase, cancelling axios token
        - By passing a second argument in useEffect, we are telling useEffect to run again when the year has been changed
        - By passing an empty array as the second argument in useEffect, we are telling useEffect to only run an effect and clean it up once (on mount and unmount).  This means that the effect does not depend on any values from props or state so it never needs to re-run.
    */

    // useEffect that will run only once (empty array on second argument).  
    // We just need to set the current year initial render
    useEffect(() => {
        dispatch({
            type: "setCurrentYear"
        })
    }, []);

    // useEffect with dependency on year.
    // useEffect will re-render everytime there is a change in year
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
            setMovies(movieResults);
        }).catch( error => {
            setErrorMessage(error.message);
        })

        // Cleans up axios
        return () => {
            source.cancel();
        }
    }, [year]);

    const handleYearChange = (e) => {
        if (e.length < 4) return;

        // Here's how we use dispatch
        dispatch({
            type: "setYear",
            data: e.target.value
        })
    }

    // Here we are using the context to determine if we are rendering the catalog or not based on isAuthorized config
    return context.isAuthorized === false ? <p>You are not authorized</p> : (
        <main>
            <label htmlFor="movie-year">Year: </label>
            <input 
                id="movie-year"
                type="number" 
                defaultValue={year}
                onChange={handleYearChange}
            />

            <h2>Movies of {`${year}`}</h2>

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

            <div>{errorMessage}</div>

        </main>
    )
}

export default Catalogue;