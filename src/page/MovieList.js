import React, { useState } from 'react';
import movieData from '../data/movie.json';
import Movie from '../component/Movie';

const MovieList = () => {
    const [selectedType, setSelectedType] = useState('All');

    // Get unique movie types
    const types = ['All', ...new Set(movieData.map(movie => movie.type))];

    // Filter movies if a specific type is selected
    const filteredMovies = selectedType === 'All'
        ? movieData
        : movieData.filter(movie => movie.type === selectedType);

    return (
        <>
            <div>
                <div className='header' style={styles.header}>
                    {types.map(type => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            style={{
                                ...styles.button,
                                backgroundColor: selectedType === type ? '#007BFF' : '#eee',
                                color: selectedType === type ? '#fff' : '#000'
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className='container' style={styles.container}>
                    {filteredMovies.map((data) => (
                        <div key={data.id}>
                            <Movie
                                movieName={data.movieName}
                                movieDescription={data.movieDescription}
                                poster={data.poster}
                                imdbRating={data.imdbRating}
                                googleRating={data.googleRating}
                                likes={data.likes}
                                type={data.type}
                                isAdult={data.isAdult}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        flexWrap: 'wrap',
        padding: '20px',
        backgroundColor: '#f5f5f5'
    },
    button: {
        padding: '10px 20px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px'
    },
    container: {
        display: 'flex',
        flex: '1',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '40px'
    }
};

export default MovieList;
