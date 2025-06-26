import React, {useState} from 'react';

import LunarConverter from "../components/LeftColumn/LunarConverter.jsx";
import {SaveControl} from "../components/LeftColumn/SaveControl.jsx";
import {getTodayLunar} from "../components/LeftColumn/getTodayLunarDay.js";
import '../App.css'; // You might want to rename this to HomePage.css or keep it global

function HomePage() {
    const [solarDate, setSolarDate] = useState(null);
    const [lunarDate, setLunarDate] = useState(todayLunarDate);

    function todayLunarDate() {
        return {day: getTodayLunar().lunarDay, month: getTodayLunar().lunarMonth, year: getTodayLunar().lunarYear};
    }
    function handleSaveData() {

        const email = "hoang.nguyen@socratesadvice.com";
        const message = `Contact us for full functions: ${email}`;

        alert(message);
        console.log(`Save function blocked. Displayed message: "${message}"`);

    }



    return (
        <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-1">
                    <div className="col-span-1 space-y-6">
                        <LunarConverter setSolarDate={setSolarDate} lunarDate={lunarDate} setLunarDate={setLunarDate}/>
                        <SaveControl handleSaveData={handleSaveData}></SaveControl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;