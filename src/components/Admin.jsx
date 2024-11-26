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
    totalDomains: 30
    // totalRevenue: 3600
  };

  const vendors = [
    { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", Category: "Bret", Location: "hildegard.org" },
    { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", Category: "Antonette", Location: "anastasia.net" },
    { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", Category: "Samantha", Location: "ramiro.info" },
    { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", Category: "Karianne", Location: "kale.biz" },
    { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca", Category: "Kamren", Location: "demarco.info" },
    { id: 6, name: "Mrs. Dennis Schulist", email: "Karley_Dach@jasper.info", Category: "Leanne", Location: "rosamond.biz" },
    { id: 7, name: "Kurtis Considine", email: "Toby@marie.org", Category: "Marguerite", Location: "leannon.com" },
    { id: 8, name: "Briana Keebler", email: "Tremayne@denver.us", Category: "Kimberly", Location: "keebler.org" },
    { id: 9, name: "Glenna Reichert", email: "Emilee@russell.tv", Category: "Colleen", Location: "braxton.biz" },
    { id: 10, name: "Carmen Williamson", email: "Courtney@melissa.org", Category: "Lisa", Location: "heather.org" },
    { id: 11, name: "Ava Fischer", email: "Susan@jerry.org", Category: "Lindsey", Location: "florence.net" },
    { id: 12, name: "Lucas Olson", email: "Meredith@april.biz", Category: "Monica", Location: "redford.info" }
  ];

  const payments = [
    { id: 1, customerName: "John Doe", vendorName: "Mike's Carpentry", type: "Carpentry", status: "Paid" },
    { id: 2, customerName: "Jane Smith", vendorName: "Plumbing Experts", type: "Plumbing", status: "Not Paid" },
    { id: 3, customerName: "Jim Brown", vendorName: "Electricians Co", type: "Electrical", status: "Paid" },
    { id: 4, customerName: "Linda White", vendorName: "Pro Painters", type: "Painting", status: "Not Paid" },
    { id: 5, customerName: "Anna Lee", vendorName: "Sparkle Cleaners", type: "Cleaning", status: "Paid" },
    { id: 6, customerName: "David Wang", vendorName: "Plumbing Experts", type: "Plumbing", status: "Not Paid" },
    { id: 7, customerName: "Eve Green", vendorName: "Mike's Carpentry", type: "Carpentry", status: "Paid" },
    { id: 8, customerName: "Pauline Taylor", vendorName: "Electricians Co", type: "Electrical", status: "Not Paid" },
    { id: 9, customerName: "Christopher Brown", vendorName: "Mike's Carpentry", type: "Carpentry", status: "Paid" },
    { id: 10, customerName: "Sarah Williams", vendorName: "Plumbing Experts", type: "Plumbing", status: "Not Paid" },
    { id: 11, customerName: "Michael Jordan", vendorName: "Pro Painters", type: "Painting", status: "Paid" },
    { id: 12, customerName: "William Jackson", vendorName: "Sparkle Cleaners", type: "Cleaning", status: "Not Paid" }
  ];
  
  const COLORS = ['#4CAF50', '#f44336', '#2196F3', '#FFC107'];

  const pieData = [
    { name: 'Service Vendors', value: metrics.totalVendors },
    { name: 'Users', value: metrics.totalUsers },
    { name: 'Complaints', value: metrics.totalDomains }
    // { name: 'Revenue', value: metrics.totalRevenue }
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
        <div className="flex-1 p-8 h-screen overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Metric Boxes */}
            <div className="grid grid-cols-2 gap-4">
              <MetricBox icon={Users} label="Users" value={metrics.totalVendors} color="bg-green-500" />
              <MetricBox icon={FileText} label="Complaints" value={metrics.totalUsers} color="bg-red-500" />
              <MetricBox icon={Globe} label="Service Vendor" value={metrics.totalDomains} color="bg-blue-500" />
              {/* <MetricBox icon={DollarSign} label="" value={metrics.totalRevenue} color="bg-yellow-500" /> */}
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl mb-4 text-gray-700">Data Distribution</h2>
              <div className="h-64 overflow-y-auto">
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
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-xl mb-4 text-gray-700">Employee Records</h2>
              <div className="overflow-x-auto h-64 overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {['No', 'Name', 'Email', 'Category', 'Location'].map((header) => (
                        <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vendors.map((vendor) => (
                      <tr key={vendor.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{vendor.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{vendor.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{vendor.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{vendor.Category}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{vendor.Location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payment Table */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-xl mb-4 text-gray-700">Payments</h2>
              <div className="overflow-x-auto h-64 overflow-y-auto">
                <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {['No', 'Customer Name', 'Vendor Name', 'Type', 'Status'].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.customerName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.vendorName}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.status}</td>
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
