import { useState } from "react";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-start items-start m-2">
      <label className="relative w-[307px] h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition">
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
  );
};

export default ImageUploader;
