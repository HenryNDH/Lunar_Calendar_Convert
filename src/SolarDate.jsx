import {useCallback, useEffect, useState} from "react";
import {convertLunarToSolar} from "./converter.js";
import {Month} from "./Month.jsx";

export function SolarDate({lunarDate, setSolarDate}) {
    const [error, setError] = useState(null);
//    const solarDate = useCallback(() => handleConvert(lunarDate));
    const solarDate = handleConvert(lunarDate);

    useEffect(() => {
        setSolarDate(solarDate);
    }, [lunarDate, setSolarDate]);

    function handleConvert(lunarDate) {
        error && setError(null);

        try {
            return convertLunarToSolar({
                lunarMonth: lunarDate.month,
                lunarDay: lunarDate.day,
                approximateSolarYear: lunarDate.year,
            });
        } catch (err) {
            setError(`Conversion failed: ${err.message}`);
        }
    };

    return <div className="input input-bordered w-full rounded-md flex items-center bg-gray-50 text-gray-700">
        {solarDate && <span><Month month={solarDate.month}/> {solarDate.day}, {solarDate.year}</span>}
        {!lunarDate?.month && <span>Enter lunar month</span>}
        {lunarDate?.month < 1 || lunarDate?.month > 12 && <span>Enter valid lunar month between 1 and 12</span>}
        {!lunarDate?.day && <span>Enter lunar day</span>}
        {lunarDate?.day < 1 || lunarDate?.day > 29 && <span>Enter valid lunar day between 1 and 29</span>}
        {error && <span className="text-red-500">{error}</span>}
    </div>;
}
