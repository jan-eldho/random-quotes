import axios from 'axios';
import React, { useEffect, useState } from 'react';

function RandomQuotes() {
    const [quotes, setQuotes] = useState([]); // State for all quotes
    const [currentQuote, setCurrentQuote] = useState(null); // State for current quote
    const [isFlipped, setIsFlipped] = useState(false); // Flip control
    const base_api = 'https://dummyjson.com/quotes';

    // Fetch quotes from API
    const fetchQuotes = async () => {
        try {
            const response = await axios.get(base_api);
            setQuotes(response.data.quotes); // Store all quotes
            setCurrentQuote(response.data.quotes[0]); // Set initial quote
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    // Flip the card and change the quote
    const flipQuote = () => {
        setIsFlipped(!isFlipped); // Toggle flip state

        // Select a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center w-100 mt-3">
            <h2 className="text-center mt-5" style={{ fontSize: '44px', color: "white" }}>Random Quotes</h2>

            <div className="flip-box mt-2" style={{ width: '85%', height: '350px', perspective: '1000px' }} onClick={flipQuote}>
                <div className={`flip-box-inner ${isFlipped ? 'flipped' : ''}`} style={{ position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s', transformStyle: 'preserve-3d' }}>
                    {/* Front Side */}
                    <div className="flip-box-front text-center" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#f8f9fa', color: 'blue', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                        <h3>"{currentQuote?.quote}"</h3>
                        <h5 style={{color:'#cf4f4c'}}>- {currentQuote?.author}</h5>
                    </div>

                    {/* Back Side */}
                    <div className="flip-box-back" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', backgroundColor: '#007bff', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotateY(180deg)' }}>
                        <h4>{isFlipped ? "Click to reveal another quote!" : "Flip for the next quote!"}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RandomQuotes;
