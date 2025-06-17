import {useState} from "react";

function TextInput({value, setValue}) {
    return <label className="form-control w-full">
        <div className="label">
            <span className="label-text">Description (Optional)</span>
        </div>
        <textarea
            className="textarea textarea-bordered h-24 w-full rounded-md"
            placeholder="Add a description for this date..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </label>;
}

export function SaveControl({handleSaveData}) {
    const [description, setDescription] = useState('');

    return <>
        <TextInput value={description} setValue={setDescription}></TextInput>

        {/* Save Button */}
        <button className="btn btn-primary w-full rounded-md" onClick={() => handleSaveData(description)}>
            Save Data
        </button>
    </>;
}