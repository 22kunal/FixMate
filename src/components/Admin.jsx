import React from 'react';
import { Users, FileText, Globe, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import image from '../assets/image.webp';

const MetricBox = ({ icon: Icon, label, value, color }) => (
  <div className={`${color} p-6 rounded-lg text-white`}>
    <div className="flex items-center mb-2">
      <Icon className="w-6 h-6 mr-2" />
      <span className="uppercase text-sm">{label}</span>
    </div>
    <div className="text-4xl font-light">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const adminInfo = {
    name: "Jacob Nejam",
    role: "Administrator"
  };
  
  const metrics = {
    totalVendors: 134,
    totalUsers: 200,
    totalDomains: 30,
    totalRevenue: 3600
  };

  const vendors = [
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", manager: "Bret", website: "hildegard.org" },
    { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", manager: "Antonette", website: "anastasia.net" },
    { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", manager: "Samantha", website: "ramiro.info" },
    { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", manager: "Karianne", website: "kale.biz" },
    { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca", manager: "Kamren", website: "demarco.info" }
  ];

  const COLORS = ['#4CAF50', '#f44336', '#2196F3', '#FFC107'];

  const pieData = [
    { name: 'Vendors', value: metrics.totalVendors },
    { name: 'Users', value: metrics.totalUsers },
    { name: 'Domains', value: metrics.totalDomains },
    { name: 'Revenue', value: metrics.totalRevenue }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 min-h-screen bg-gray-800 text-white p-6">
          <div className="text-center mb-8">
            <img src={image} alt="Admin"
              className="rounded-full w-32 h-32 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{adminInfo.name}</h2>
            <p className="text-gray-400">{adminInfo.role}</p>
          </div>
          
          <nav className="space-y-4">
            {['Overview'].map((item) => (
              <a 
                key={item}
                href="#" 
                className={`block py-2 px-4 rounded ${
                  item === 'Overview' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Metric Boxes */}
            <div className="grid grid-cols-2 gap-4">
              <MetricBox icon={Users} label="Users" value={metrics.totalVendors} color="bg-green-500" />
              <MetricBox icon={FileText} label="Complaints  " value={metrics.totalUsers} color="bg-red-500" />
              <MetricBox icon={Globe} label="Domains" value={metrics.totalDomains} color="bg-blue-500" />
              <MetricBox icon={DollarSign} label="Revenue" value={metrics.totalRevenue} color="bg-yellow-500" />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl mb-4 text-gray-700">Data Distribution</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl mb-4 text-gray-700">Employee Records</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['No', 'Name', 'Email', 'Manager', 'Website'].map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{vendor.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{vendor.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{vendor.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{vendor.manager}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{vendor.website}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;