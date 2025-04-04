import React, {useState} from 'react'
import { countries } from '../../../utils/Countries';
const PersonalDetails = ({handleChange, formData, setStep}) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(URL.createObjectURL(file));
        }
    };
  return (
    <section className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-lg font-bold ml-2">Personal Details</h1>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center">
            <div className="flex justify-center items-center m-2">
                <label className="relative w-[307px] sm:w-[390px] md:w-[480px] h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {selectedFile ? (
                    <img
                        src={selectedFile}
                        alt="Selected"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    ) : (
                    <span className="text-gray-500">Upload Photo</span>
                    )}
                </label>
            </div>
            <input
                type="text"
                autoComplete="off"
                value={formData.personalDetails.name}
                onChange={(e) =>
                    handleChange("personalDetails", "name", e.target.value)
                }
                placeholder="Name"
                className="resume-field"
            />
            <input
                type="email"
                autoComplete="off"
                value={formData.personalDetails.email}
                onChange={(e) =>
                    handleChange("personalDetails", "email", e.target.value)
                }
                placeholder="example@gmail.com"
                className="resume-field"
            />
            <input
                type="number"
                autoComplete="off"
                value={formData.personalDetails.phone}
                onChange={(e) =>
                    handleChange("personalDetails", "phone", e.target.value)
                }
                placeholder="Telephone"
                className="resume-field"
            />
            <input
                type="text"
                autoComplete="off"
                value={formData.personalDetails.address}
                onChange={(e) =>
                    handleChange("personalDetails", "address", e.target.value)
                }
                placeholder="Address"
                className="resume-field"
            />
            <input
                type="date"
                autoComplete="off"
                value={formData.personalDetails.dob}
                onChange={(e) =>
                    handleChange("personalDetails", "dob", e.target.value)
                }
                className="resume-field"
            />
            <select
                id="country"
                name="country"
                className="resume-field"
                value={formData.personalDetails.country}
                onChange={(e) =>
                    handleChange("personalDetails", "country", e.target.value)
                }
            >
                <option value="">-- Select a Country --</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                    {country}
                    </option>
                ))}
            </select>
            <button
                type="button"
                className="m-2 next-btn"
                onClick={() => setStep(2)}
            >
                Next
            </button>
        </form>
    </section>
  )
}

export default PersonalDetails