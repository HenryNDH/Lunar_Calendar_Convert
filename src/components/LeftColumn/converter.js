import moonTime from 'moon-time';

export function convertLunarToSolar({ lunarMonth, lunarDay, approximateSolarYear }) {
    if (
        typeof lunarMonth !== 'number' || lunarMonth < 1 || lunarMonth > 12 ||
        typeof lunarDay !== 'number' || lunarDay < 1 || lunarDay > 29 ||
        typeof approximateSolarYear !== 'number'
    ) {
        throw new Error("Invalid input. Please provide valid numbers for lunarMonth, lunarDay, and approximateSolarYear.");
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

export function convertSolarToLunar({ solarYear, solarMonth, solarDay }) {
    if (
        typeof solarYear !== 'number' ||
        typeof solarMonth !== 'number' || solarMonth < 1 || solarMonth > 12 ||
        typeof solarDay !== 'number' || solarDay < 1 || solarDay > 31
    ) {
        throw new Error("Invalid input. Please provide valid numbers for solarYear, solarMonth, and solarDay.");
    }

    // The moon-time library directly provides the lunar components for a given solar date.
    // Note: moonTime expects month as 1-12 and day as 1-31, just like our solarMonth and solarDay.
    try {
        const moon = moonTime({ year: solarYear, month: solarMonth, day: solarDay });

        // The moon-time library returns properties like 'month' and 'day' for the lunar date
        // and 'year' for the lunar year.
        return {
            lunarYear: moon.year, // moon-time returns the lunar year
            lunarMonth: moon.month,
            lunarDay: moon.day,
            isLeapMonth: moon.isLeapMonth // Include if you need to know if it's a leap lunar month
        };
    } catch (error) {
        throw new Error(`Failed to convert solar date to lunar: ${error.message}`);
    }
}


