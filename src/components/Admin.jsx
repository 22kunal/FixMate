import React, { useContext, useState } from 'react';
import { Users, FileText, Globe, DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import image from '../assets/image.webp';
import { AuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

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
  const { name } = useContext(AuthContext);
  const adminInfo = {
    name: name,
    role: "Administrator"
  };
  const [vendors, setVendors] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayment] = useState([]);
  const [complains, setComplains] = useState([]);
  
  const metrics = {
    totalVendors: vendors.length,
    totalUsers: vendors.length + users.length,
    totalDomains: 4,
    Complains: complains.length,
    Payments: payments.length,
  };
  const COLORS = ['#4CAF50', '#f44336', '#2196F3', '#FFC107', '#9C27B0'];

  
  const pieData = [
    { name: 'Vendors', value: metrics.totalVendors },
    { name: 'Users', value: metrics.totalUsers },
    { name: 'Complaints', value: metrics.totalDomains },
    { name: 'Payments', value: metrics.Payments },
    // { name: 'Revenue', value: metrics.totalRevenue }
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/vendors")
      .then((response) => response.json())
      .then((vendor) => {
        setVendors(vendor);
      });
    
    fetch("http://localhost:5000/api/bill/all")
      .then((response) => response.json())
      .then((payment) => {
        setPayment(payment);
      });
    
    fetch("http://localhost:5000/api/auth/customers")
      .then((response) => response.json())
      .then((user) => {
        setUsers(user);
      })

    fetch("http://localhost:5000/api/complain/all")
      .then((response) => response.json())
      .then((complain) => {
        setComplains(complain);
      })
   }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 min-h-screen bg-gray-800 text-white p-6">
          <div className="text-center mb-8">
            <img
              src={image}
              alt="Admin"
              className="rounded-full w-32 h-32 mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{adminInfo.name}</h2>
            <p className="text-gray-400">{adminInfo.role}</p>
          </div>

          <nav className="space-y-4">
            {["Overview"].map((item) => (
              <a
                key={item}
                href="#"
                className={`block py-2 px-4 rounded ${
                  item === "Overview" ? "bg-gray-700" : "hover:bg-gray-700"
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
              <MetricBox
                icon={Users}
                label="Vendors"
                value={metrics.totalUsers}
                color="bg-green-500"
              />
              <MetricBox
                icon={FileText}
                label="Complaints"
                value={metrics.Complains}
                color="bg-red-500"
              />
              <MetricBox
                icon={Globe}
                label="Service Types"
                value={metrics.totalDomains}
                color="bg-blue-500"
              />
              <MetricBox
                icon={DollarSign}
                label="Payments"
                value={metrics.Payments}
                color="bg-yellow-500"
              />
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
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
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
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["No", "Name", "Email", "Category", "Experience"].map(
                        (header) => (
                          <th
                            key={header}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                          >
                            {header}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vendors.map((vendor, index) => (
                      <tr key={vendor.id}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {vendor.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {vendor.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {vendor.fieldsOfExpertise}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {vendor.yearsOfExperience}
                        </td>
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
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "No",
                        "Customer Name",
                        "Vendor Name",
                        "Type",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {payments.map((payment, index) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {payment.customerName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {payment.vendorName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {payment.type || "Online"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {payment.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Complaint Table */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-xl mb-4 text-gray-700">Complaints</h2>
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "No",
                        "Customer Name",
                        "Vendor Name",
                        "Type",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {complains.map((complain, index) => (
                      <tr key={complain.id}>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {complain.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {complain.vendorName || "not assigned"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {complain.fieldType}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {complain.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h2 className="text-xl mb-4 text-gray-700">Users</h2>
              <div className="overflow-x-auto overflow-y-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "No",
                        "Customer Name",
                        "Email",
                      ].map((header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
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
