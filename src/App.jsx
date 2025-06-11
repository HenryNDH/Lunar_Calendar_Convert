import { useState } from 'react';
import './App.css';
import { convertLunarToSolar } from './converter';

function App() {
    const [lunarMonth, setLunarMonth] = useState('');
    const [lunarDay, setLunarDay] = useState('');
    const curYear = new Date().getFullYear();
    const [approximateSolarYear] = useState(curYear);
    const [solarDateResult, setSolarDateResult] = useState('');
    const [error, setError] = useState('');

    const handleConvert = () => {
        setError('');
        setSolarDateResult('');

        if (!lunarMonth || !lunarDay || !approximateSolarYear) {
            setError('Please enter Lunar Month, Lunar Day, and Approximate Solar Year.');
            return;
        }

        try {
            const { year, month, day } = convertLunarToSolar({
                lunarMonth: parseInt(lunarMonth),
                lunarDay: parseInt(lunarDay),
                approximateSolarYear: approximateSolarYear,
            });

            setSolarDateResult(`Solar Date: ${month}/${day}/${year}`);
        } catch (err) {
            setError(`Failed to convert date: ${err.message}`);
        }
    };

    return (
        <div className="app-container">
            <div className="converter-box">
                <h1 className="title">Lunar to Solar Date Converter</h1>

                <div className="form">


                    <div className="input-group">
                        <label htmlFor="lunarDay">Lunar Day:</label>
                        <input
                            type="number"
                            id="lunarDay"
                            value={lunarDay}
                            onChange={(e) => setLunarDay(e.target.value)}
                            placeholder="e.g., 25"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lunarMonth">Lunar Month:</label>
                        <input
                            type="number"
                            id="lunarMonth"
                            value={lunarMonth}
                            onChange={(e) => setLunarMonth(e.target.value)}
                            placeholder="e.g., 9"
                        />
                    </div>
                    <button onClick={handleConvert}>Convert to Solar Date</button>
                </div>

                {error && <div className="message error">Error: {error}</div>}
                {solarDateResult && !error && (
                    <div className="message result">{solarDateResult}</div>
                )}
            </div>
        </div>
    );
}

export default App;
