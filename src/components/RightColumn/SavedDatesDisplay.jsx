import React, { useState, useEffect } from 'react';
import {convertLunarToSolar} from "../LeftColumn/converter.js";

function DropDown({ selectedYear, handleYearChange, years }) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Saved Dates</h2>
            <div className="form-control">
                <select
                    className="select select-bordered"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

function SavedDatesDisplay({ savedDates, onDelete }) {
    const currentYear = new Date().getFullYear();

    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [displayedDates, setDisplayedDates] = useState([]);

    const generateYears = () => {
        const years = [];
        for (let year = currentYear - 5; year <= currentYear + 5; year++) {
            years.push(year);
        }
        return years;
    };

    const years = generateYears();

    const handleYearChange = (event) => {
        const newYear = parseInt(event.target.value, 10);
        setSelectedYear(newYear);
        console.log("Selected Year:", newYear);
    };

    useEffect(() => {
        const calculateAndSetDisplayDates = () => {
            const convertedDates = savedDates.map(date => {
                try {
                    const solarDate = convertLunarToSolar({
                        lunarMonth: date.month,
                        lunarDay: date.day,
                        approximateSolarYear: selectedYear
                    });
                    return {
                        ...date,
                        solarDay: solarDate.day,
                        solarMonth: solarDate.month,
                        solarYear: solarDate.year
                    };
                } catch (error) {
                    console.error(`Error converting lunar date ${date.month}/${date.day} for year ${selectedYear}:`, error);
                    return {
                        ...date,
                        solarDay: 'N/A',
                        solarMonth: 'N/A',
                        solarYear: selectedYear
                    };
                }
            });
            setDisplayedDates(convertedDates);
        };

        calculateAndSetDisplayDates();
    }, [savedDates, selectedYear]);

    return (
        <div>
            <DropDown selectedYear={selectedYear} handleYearChange={handleYearChange} years={years}/>

            <div className="overflow-x-auto border border-gray-200 rounded-md bg-gray-50 text-gray-600">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 text-left">Lunar Date</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-left">Solar Date</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayedDates.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center italic py-4">No saved dates to display for {selectedYear} or conversion failed.</td>
                        </tr>
                    ) : (
                        displayedDates.map((date) => (
                            <tr key={date.id}>
                                <td className="px-4 py-2">{`${date.day}/${date.month}`}</td>
                                <td className="px-4 py-2 break-words whitespace-normal max-w-xs"> {/* <-- FIX APPLIED HERE */}
                                    {date.desc}
                                </td>
                                <td className="px-4 py-2">
                                    {date.solarDay !== 'N/A' ?
                                        `${date.solarDay}/${date.solarMonth}/${date.solarYear}` :
                                        'N/A'}
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => onDelete(date.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SavedDatesDisplay;