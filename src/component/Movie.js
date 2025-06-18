import React, { useRef, useEffect, useState } from 'react';

const Movie = ({ movieName, movieDescription, poster, imdbRating, googleRating, likes, type, isAdult }) => {
    const [showModal, setShowModal] = useState(false);
    const descRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [isHovered, setIsHovered] = useState(false);



    useEffect(() => {
        const el = descRef.current;
        if (el) {
            const isOverflow = el.scrollWidth > el.clientWidth;
            setIsOverflowing(isOverflow);
        }
    }, [movieDescription]);

    const boxstyle = {
        width: '300px',
        border: '2px solid black',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif',
        margin: '20px auto',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: isHovered
            ? '0 8px 20px rgba(0,0,0,0.3)'
            : '0 4px 10px rgba(0,0,0,0.2)',
        cursor:isHovered?'pointer':'default'

    };


    return (
        <>
            <div className='container' style={boxstyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className='image' style={styles.imageContainer}>
                    <img
                        alt={`${movieName} Poster`}
                        src={poster}
                        className='image'
                        style={styles.image}
                    />
                </div>
                <div className='metadata' style={styles.metadata}>
                    <h3 style={styles.title}>{movieName}</h3>

                    {/* <p style={styles.description} ref={descRef}>
                        {movieDescription}
                    </p>
                    {isOverflowing &&
                        < span
                            style={styles.readMore}
                            onClick={() => setShowModal(true)}
                        >
                            Read more...
                        </span>
                    } */}

                    <div style={{ fontFamily: 'Arial', fontSize: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p
                                ref={descRef}
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    margin: 0,
                                    maxWidth: isOverflowing ? '200px' : '290px' // You can adjust this width
                                }}
                            >
                                {movieDescription}
                            </p>
                            {isOverflowing && (
                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'blue',
                                        marginLeft: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        padding: 0
                                    }}
                                    onClick={() => setShowPopup(true)}
                                >
                                    See more
                                </button>
                            )}
                        </div>

                        {/* Popup */}
                        {showPopup && (
                            <div style={popupStyles.overlay}>
                                <div style={popupStyles.popup}>
                                    <h3>Full Description</h3>
                                    <p>{movieDescription}</p>
                                    <button onClick={() => setShowPopup(false)}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>

                    <p><strong>Type:</strong> {type}</p>
                    <p><strong>IMDB:</strong> {imdbRating} | <strong>Google:</strong> {googleRating}</p>
                    <p><strong>Likes:</strong> {likes.toLocaleString()}</p>
                    <p><strong>Adult:</strong> {isAdult ? 'Yes' : 'No'}</p>
                </div>
            </div >

            {/* Modal Popup */}
            {
                showModal && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modal}>
                            <h3>{movieName}</h3>
                            <p>{movieDescription}</p>
                            <button onClick={() => setShowModal(false)} style={styles.closeButton}>Close</button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

const popupStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000
    },
    popup: {
        backgroundColor: 'white',
        padding: '20px',
        margin: '100px auto',
        maxWidth: '400px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)'
    }
};

const styles = {
    container: {
        width: '300px',
        border: '2px solid black',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        fontFamily: 'Arial, sans-serif',
        margin: '20px auto',
    },
    imageContainer: {
        width: '100%',
        height: '380px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    metadata: {
        padding: '10px',
        backgroundColor: '#f2f2f2'
    },
    title: {
        margin: '0',
        fontSize: '20px'
    },
    description: {
        margin: '5px 0',
        fontStyle: 'italic',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    readMore: {
        color: 'blue',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'inline-block',
        marginBottom: '5px'
    },
    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '400px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    },
    closeButton: {
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Movie;
