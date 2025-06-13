import { useEffect, useState } from 'react';
import { countries } from '../../../utils/Countries';
import { Plus } from 'lucide-react';

const PersonalDetails = ({
  handleChange,
  formData
}) => {
  const [imagePreview, setImagePreview] = useState('');

  const userImage = formData?.image
  useEffect(() => {
    if (userImage && typeof userImage === "object" && (userImage instanceof Blob || userImage instanceof File)) {
      const previewURL = URL.createObjectURL(userImage);
      setImagePreview(previewURL);

      return () => {
        URL.revokeObjectURL(previewURL);
      };
    }else if (typeof userImage === "string") {
      // If it's already a valid URL or base64 string
      setImagePreview(userImage);
    } else {
      setImagePreview(''); // Clear preview if nothing valid is passed
    }
  }, [userImage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleChange("image", null, file);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };


  return (
    <div className="space-y-6 font-Montserrat">
      {formData && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Details</h2>
          <div className="flex justify-center mb-6">
            <label className="relative w-full max-w-md aspect-[4/3] sm:aspect-[16/9] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={ handleFileChange}
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <Plus className='text-gray-500' strokeWidth={3} size={20}/>
                  <div className="text-gray-500 mb-2 mt-2">Upload Photo</div>
                  <div className="text-sm text-gray-400">Click to browse files</div>
                </div>
              )}
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Resume Title
              </label>
              <input
                type="text"
                id="title"
                autoComplete="off"
                value={formData?.personalDetails?.title}
                onChange={(e) => handleChange("personalDetails", "title", e.target.value)}
                className="resume-field"
                placeholder="job resume"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                autoComplete="name"
                value={formData?.personalDetails?.name}
                onChange={(e) => handleChange("personalDetails", "name", e.target.value)}
                className="resume-field"
                placeholder="joeboy"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                value={formData?.personalDetails?.email}
                onChange={(e) => handleChange("personalDetails", "email", e.target.value)}
                className="resume-field"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                autoComplete="tel"
                value={formData?.personalDetails?.phone}
                onChange={(e) => handleChange("personalDetails", "phone", e.target.value)}
                className="resume-field"
                placeholder="+232 011-111-555"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                autoComplete="street-address"
                value={formData?.personalDetails?.address}
                onChange={(e) => handleChange("personalDetails", "address", e.target.value)}
                className="resume-field"
                placeholder="12 Craze yard, Country"
              />
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
                Nationality
              </label>
              <input
                type="text"
                id="nationality"
                value={formData?.personalDetails?.nationality}
                onChange={(e) => handleChange("personalDetails", "nationality", e.target.value)}
                className="resume-field"
                placeholder="Your Nationality"
                autoComplete='country-name'
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={formatDate(formData?.personalDetails?.dob)}
                onChange={(e) => handleChange("personalDetails", "dob", e.target.value)}
                className="resume-field"
                autoComplete='bday'
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData?.personalDetails?.country}
                onChange={(e) => handleChange("personalDetails", "country", e.target.value)}
                autoComplete='country'
                className="resume-field"
              >
                <option value="">Select a Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
