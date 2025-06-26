import {useEffect, useState} from "react";
import {convertLunarToSolar} from "./converter.js";

export function SolarDate({lunarDate, setSolarDate}) {
    const [conversionResult, setConversionResult] = useState({});

    useEffect(() => {
        setConversionResult(convert(lunarDate));
    }, [lunarDate]);

    useEffect(() => {
        if (conversionResult.solarDate) {
            setSolarDate(conversionResult.solarDate);
        }
    }, [conversionResult, setSolarDate]);

    function convert(lunarDate) {
        try {
            return {
                solarDate: convertLunarToSolar({
                    lunarMonth: lunarDate.month,
                    lunarDay: lunarDate.day,
                    approximateSolarYear: lunarDate.year,
                })
            };
        } catch (err) {
            return {
                error: `Conversion failed: ${err.message}`
            };
        }
    }

    console.log("Conversion Result", conversionResult);

    return <div className="input input-bordered w-full rounded-md flex items-center bg-gray-50 text-gray-700">
        {conversionResult.solarDate && <span>{formatDate(conversionResult.solarDate)}</span>}
        {!lunarDate?.month && <span>Enter lunar month</span>}
        {(lunarDate?.month < 1 || lunarDate?.month > 12) && <span>Enter valid lunar month between 1 and 12.</span>}
        {!lunarDate?.day && <span>Enter lunar day</span>}
        {(lunarDate?.day < 1 || lunarDate?.day > 29) && <span>Enter valid lunar day between 1 and 29.</span>}
        {conversionResult.error && <span className="text-red-500">{conversionResult.error}</span>}
    </div>;

    function formatDate(date) {
        return new Date(date.year, date.month - 1, date.day)
            .toLocaleDateString('en-US', {
                // weekday: 'long',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
    }
}
