import { ArrowLeft, LifeBuoy, BarChart2, FileText } from 'lucide-react';
import useAuth from '../../../../hooks/useAuth';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Menu = () => {
  const navigate = useNavigate();
  const { setActiveSectionHS } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { label: 'Help Center', icon: <LifeBuoy className="mr-2" />, value: 'helpCenter' },
    { label: 'Channel Reports', icon: <BarChart2 className="mr-2" />, value: 'channelReports' },
    { label: 'Terms and Conditions', icon: <FileText className="mr-2" />, value: 'terms' },
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-full px-4 py-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <ArrowLeft
          onClick={() => navigate(-1)}
          size={20}
          strokeWidth={2.5}
          className="text-gray-700 hover:text-gray-900 cursor-pointer"
        />
        <h1 className="text-lg font-semibold text-gray-800">Help & Support</h1>
        <div className="w-5" />
      </header>

      {/* Search */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium mb-3">Hey, how can we help you?</h2>
        <input
          type="search"
          name="search-bar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-[#ccc] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2A5D9E]"
        />
      </div>

      {/* Menu Items */}
      <div className="space-y-4 max-w-md mx-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveSectionHS(item.value)}
              className="flex items-center p-4 bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200 cursor-pointer transition"
            >
              {item.icon}
              {item.label}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No results found.</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
