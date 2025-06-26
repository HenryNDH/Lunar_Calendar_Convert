import React, { useEffect, useState } from 'react';
import SavedDatesDisplay from "../components/RightColumn/SavedDatesDisplay.jsx";
import '../App.css'; // Assuming this has your general styling

function AdminPage() {
    const [savedDates, setSavedDates] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Manages loading state for user feedback

    // Function to fetch ALL saved dates from the backend
    const fetchAllSavedDates = async () => {
        setLoading(true); // Indicate that fetching has started
        try {
            // This URL calls your backend's /api/calendar-entries endpoint without a userId parameter,
            // which tells your Spring Boot controller to return all entries.
            const response = await fetch('http://localhost:8080/api/calendar-entries');
            console.log("Response for ALL dates (Admin):", response);

            if (response.ok) {
                const data = await response.json();
                setSavedDates(data); // Set the fetched data to state
                setError(null); // Clear any previous errors on successful fetch
            } else {
                // Attempt to parse a more specific error message from the backend response
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
            }
        } catch (e) {
            console.error("Failed to fetch all saved dates for admin:", e);
            setError(e); // Set the error state
            setSavedDates([]); // Clear the list on error
        } finally {
            setLoading(false); // End loading regardless of success or failure
        }
    };

    // Handles deleting a specific date entry from the backend
    function handleDelete(idToDelete) {
        console.log("Attempting to delete item with ID:", idToDelete);

        fetch(`http://localhost:8080/api/calendar-entries/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 204) { // HTTP 204 No Content typically means success with no body
                    return null;
                }
                if (!response.ok) {
                    // Handle non-2xx responses by trying to parse error message
                    return response.json().then(err => { throw new Error(err.message || `HTTP error! status: ${response.status}`); });
                }
                return response.json(); // For other successful responses (e.g., 200 OK with a body)
            })
            .then(data => {
                if (data) {
                    console.log("Successfully deleted:", data);
                } else {
                    console.log("Successfully deleted (no content returned from server).");
                }
                alert("Date deleted successfully!");
                // After deletion, re-fetch all data to ensure the admin view is up-to-date and reflects the change
                fetchAllSavedDates();
            })
            .catch(error => {
                console.error("Failed to delete data:", error);
                alert("Failed to delete data: " + error.message);
            });
    }

    // useEffect hook to fetch all data when the component first mounts
    useEffect(() => {
        fetchAllSavedDates();
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="grid grid-cols-1 w-full max-w-6xl bg-white rounded-lg shadow-xl p-6 gap-8">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin View: All Calendar Entries</h1>

                {/* Display loading, error, or empty states */}
                {loading && <p className="text-center text-blue-600">Loading all entries...</p>}
                {error && <p className="text-center text-red-500 font-medium">Error: {error.message}</p>}
                {!loading && !error && savedDates.length === 0 && (
                    <p className="text-center text-gray-600">No calendar entries found in the database.</p>
                )}

                {/* Render the SavedDatesDisplay component with all fetched data */}
                {/* SavedDatesDisplay is responsible for iterating and showing each entry, including UserID */}
                {!loading && <SavedDatesDisplay savedDates={savedDates} onDelete={handleDelete} error={error}/>}
            </div>
        </div>
    );
}

export default AdminPage;