import React, { useEffect, useState } from 'react';

function SavedDatesDisplay() {
    const [savedDates, setSavedDates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedDates = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/calendar-entries');
                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    setSavedDates(data);
                } else {
                    throw new Error(`HTTP error!`);
                }
            } catch (e) {
                setError(e);
            }
        };

        fetchSavedDates();
    }, []);

    const DateListItem = ({ date }) => (
        <p key={date.id}>
            Date: {`${date.day}/${date.month}/${date.year}`} - Description: {date.desc}
        </p>
    );

    if (error) {
        return (
            <div className="flex-1 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Dates</h2>
                <p className="text-red-500">Error loading saved dates: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="flex-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Saved Dates</h2>
            {/* Display for more API data, e.g., a list */}
            <div className="border border-gray-200 rounded-md p-4 h-64 overflow-y-auto bg-gray-50 text-gray-600">
                {savedDates.length === 0 ? (
                    <p className="italic">No saved dates to display.</p>
                ) : (
                    <ul className="list-disc pl-5 mt-2">
                        {savedDates.map((date) => (
                            <DateListItem key={date.id} date={date} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default SavedDatesDisplay;
