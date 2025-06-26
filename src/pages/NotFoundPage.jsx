import React from 'react';
import { useRouteError, Link } from 'react-router-dom'; // Import Link for navigation

function NotFoundPage() {
    // useRouteError hook provides error details from React Router DOM
    // This is particularly useful for debugging or displaying specific error messages.
    const error = useRouteError();
    console.error(error);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80vh', // Take up most of the viewport height
                textAlign: 'center',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                backgroundColor: '#f8f8f8',
            }}
        >
            <h1 style={{ fontSize: '4em', margin: '0 0 10px 0', color: '#e74c3c' }}>
                404
            </h1>
            <h2 style={{ fontSize: '2em', margin: '0 0 20px 0' }}>Page Not Found</h2>
            <p style={{ fontSize: '1.2em', maxWidth: '600px', lineHeight: '1.5' }}>
                Oops! It looks like the page you're trying to reach doesn't exist.
            </p>

            {/* Optionally display error details if available (e.g., for specific types of errors) */}
            {error && (
                <p style={{ fontStyle: 'italic', color: '#777', marginTop: '10px' }}>
                    <i>{error.statusText || error.message}</i>
                </p>
            )}

            <div style={{ marginTop: '30px' }}>
                <Link
                    to="/" // Link back to your home page
                    style={{
                        textDecoration: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '12px 25px',
                        borderRadius: '5px',
                        fontSize: '1.1em',
                        transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
                >
                    Go to Home Page
                </Link>
            </div>
        </div>
    );
}

export default NotFoundPage;