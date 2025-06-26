import React, { useEffect, useState } from 'react';
import SavedDatesDisplay from "../components/RightColumn/SavedDatesDisplay.jsx";
import LunarConverter from "../components/LeftColumn/LunarConverter.jsx";
import { SaveControl } from "../components/LeftColumn/SaveControl.jsx";
import { getTodayLunar } from "../components/LeftColumn/getTodayLunarDay.js";
import { useParams } from "react-router-dom";
import '../App.css';

function HomePage() {
    const [solarDate, setSolarDate] = useState(null);
    // lunarDate state initialization using a function to ensure it runs only once
    const [lunarDate, setLunarDate] = useState(() => todayLunarDate());
    const [savedDates, setSavedDates] = useState([]);
    const [error, setError] = useState(null);

    // Destructure USERID directly from useParams
    const { USERID } = useParams();

    // Log the current USERID for debugging
    console.log("HomePage: Current USERID from URL:", USERID);

    // Helper function to get today's lunar date
    function todayLunarDate() {
        const today = getTodayLunar();
        return { day: today.lunarDay, month: today.lunarMonth, year: today.lunarYear };
    }

    // Handles saving data to the backend
    function handleSaveData(description) {
        if (!solarDate) {
            console.error("Invalid solar date. Cannot save.");
            alert("Please select a solar date before saving.");
            return;
        }

        // Essential: Check if USERID is available before attempting to save
        if (!USERID) {
            console.error("User ID is missing. Cannot save data.");
            alert("User ID is missing from the URL. Please ensure you navigate to a user-specific page (e.g., /yourUserID).");
            return;
        }

        fetch('http://localhost:8080/api/calendar-entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                UserID: USERID,
                day: lunarDate.day,
                month: lunarDate.month,
                desc: description || 'No description'
            }),
        })
            .then(response => {
                if (!response.ok) {
                    // Try to parse error message from backend if available
                    return response.json().then(err => { throw new Error(err.message || `HTTP error! status: ${response.status}`); });
                }
                return response.json();
            })
            .then(data => {
                console.log("Successfully saved:", data);
                alert("Date saved successfully!");
                // Re-fetch saved dates to ensure the list is up-to-date with the new entry
                // This is more reliable than optimistically adding, especially if backend has validation/transformation
                fetchSavedDates();
            })
            .catch(error => {
                console.error("Failed to save data:", error);
                alert("Failed to save data: " + error.message);
            });
    }

    // Handles deleting data from the backend
    function handleDelete(idToDelete) {
        console.log("Attempting to delete item with ID:", idToDelete);

        fetch(`http://localhost:8080/api/calendar-entries/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                // Handle 204 No Content for successful deletion
                if (response.status === 204) {
                    return null; // No content to parse
                }
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || `HTTP error! status: ${response.status}`); });
                }
                return response.json(); // Still try to parse if there's content and it's 200 OK
            })
            .then(data => {
                if (data) {
                    console.log("Successfully deleted:", data);
                } else {
                    console.log("Successfully deleted (no content returned from server).");
                }
                alert("Date deleted successfully!");
                // Filter out the deleted item from the current state
                setSavedDates(savedDates.filter(date => date.id !== idToDelete));
            })
            .catch(error => {
                console.error("Failed to delete data:", error);
                alert("Failed to delete data: " + error.message);
            });
    }

    // Function to fetch saved dates, potentially filtered by USERID
    const fetchSavedDates = async () => {
        // Only fetch if USERID is available from the URL params
        if (!USERID) {
            console.warn("USERID is not available yet. Skipping fetch for saved dates.");
            setSavedDates([]); // Clear saved dates if no user is specified
            setError(null); // Clear any previous errors
            return;
        }

        try {
            // Construct the URL with the userId query parameter
            const response = await fetch(`http://localhost:8080/api/calendar-entries?userId=${USERID}`);
            console.log("Response for user-specific dates:", response);

            if (response.ok) {
                const data = await response.json();
                setSavedDates(data);
                setError(null); // Clear error on successful fetch
            } else {
                const errorData = await response.json(); // Attempt to read error message from backend
                throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
            }
        } catch (e) {
            console.error("Failed to fetch saved dates for user:", USERID, e);
            setError(e);
            setSavedDates([]); // Clear list on error
        }
    };

    // useEffect hook to fetch data when the component mounts or USERID changes
    useEffect(() => {
        fetchSavedDates();
    }, [USERID]); // Dependency array includes USERID, so it re-runs when USERID changes

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl bg-white rounded-lg shadow-xl p-6 gap-8">
                <div className="flex-1 space-y-6">
                    <LunarConverter setSolarDate={setSolarDate} lunarDate={lunarDate} setLunarDate={setLunarDate}/>
                    <SaveControl handleSaveData={handleSaveData}></SaveControl>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <SavedDatesDisplay savedDates={savedDates} onDelete={handleDelete} error={error}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;