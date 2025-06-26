import {SolarDate} from "./SolarDate.jsx"

function NumberInput({value, setValue, placeHolder, children}) {
    return <label className="form-control w-full">
        <div className="label">
            <span className="label-text">{children}</span>
        </div>
        <input
            type="number"
            className="input input-bordered w-full rounded-md"
            placeholder={placeHolder}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
        />
    </label>;
}

export default function LunarConverter({setSolarDate, lunarDate, setLunarDate}) {


    return (
        <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lunar Date Converter</h2>
            {/* Input Fields */}
            <div className="flex flex-col sm:flex-row gap-4">
                <NumberInput value={lunarDate.month} setValue={month => setLunarDate({...lunarDate, month})}
                             placeHolder={"e.g., 1 (Jan), 12 (Dec)"}> Lunar
                    Month </NumberInput>
                <NumberInput value={lunarDate.day} setValue={day => setLunarDate({...lunarDate, day})}
                             placeHolder={"e.g., 15"}> Lunar Day </NumberInput>
            </div>

            <SolarDate lunarDate={lunarDate} setSolarDate={setSolarDate}/>
        </>
    );
}
