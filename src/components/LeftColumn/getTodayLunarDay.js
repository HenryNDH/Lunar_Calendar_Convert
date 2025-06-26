import { convertSolarToLunar } from './converter.js'; // Assuming converter.js now contains convertSolarToLunar


export function getTodayLunar() {
    const today = new Date();
    const currentSolarMonth = today.getMonth() + 1; // getMonth() is 0-indexed
    const currentSolarDay = today.getDate();
    const currentSolarYear = today.getFullYear();

    try {
        // Pass the solar date components to convertSolarToLunar
        const convertedLunarDate = convertSolarToLunar({
            solarYear: currentSolarYear,
            solarMonth: currentSolarMonth,
            solarDay: currentSolarDay + 1,
        });
        return convertedLunarDate;
    } catch (error) {
        // Updated error message to reflect the correct conversion
        console.error("Error converting today's solar date to lunar:", error);
        return null;
    }
}