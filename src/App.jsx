import {useState} from 'react';
import './App.css';
import SavedDatesDisplay from './SavedDatesDisplay';
import LunarConverter from "./LunarConverter.jsx";
import {SaveControl} from "./SaveControl.jsx";

function App() {
    const [solarDate, setSolarDate] = useState(null);

    const handleSaveData = (description) => {
        if (!solarDate) {
            console.error("Invalid solar date");
            return;
        }

        const dataToSave = {
            ...solarDate,
            desc: description || 'No description',
        };

        fetch('http://localhost:8080/api/calendar-entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSave),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Successfully saved:", data);
                alert("Date saved successfully!");
            })
            .catch(error => {
                console.error("Failed to save data:", error);
                alert("Failed to save data.");
            });
    };


    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-xl p-6 gap-8">
                <div className="flex-1 space-y-6">
                    <LunarConverter setSolarDate={setSolarDate}/>
                    <SaveControl handleSaveData={handleSaveData}></SaveControl>
                </div>

                <SavedDatesDisplay/>
            </div>
        </div>
    );
}

export default App;
