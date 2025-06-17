import moonTime from 'moon-time';

export function convertLunarToSolar({ lunarMonth, lunarDay, approximateSolarYear }) {
    if (
        typeof lunarMonth !== 'number' ||
        typeof lunarDay !== 'number' ||
        typeof approximateSolarYear !== 'number'
    ) {
        throw new Error("Invalid input. Please provide numbers for lunarMonth, lunarDay, and approximateSolarYear.");
    }

    let currentDate = new Date(approximateSolarYear, 0, 1);
    let foundSolarDate = null;

    for (let i = 0; i < 400; i++) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        const moon = moonTime({ year, month, day });

        if (moon.month === lunarMonth && moon.day === lunarDay) {
            day -= 1;
            foundSolarDate = { year, month, day };
            break;
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (foundSolarDate) {
        return foundSolarDate;
    } else {
        throw new Error(
            "No solar date found for the given lunar date and approximate year within the search range."
        );
    }
}
