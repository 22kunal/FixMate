import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BillDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { workDetails } = location.state || {}; 

  // State for negotiate modal
  const [showNegotiateBox, setShowNegotiateBox] = useState(false);
  const [negotiatedPrice, setNegotiatedPrice] = useState("");

  if (!workDetails) {
    return <p>No work details available.</p>;
  }
  const { vendorName, serviceDate, serviceDetails, serviceCharges, tax, totalAmount } = workDetails;
  const handleProceed = () => {
    // Add any validation or data processing here
    navigate('/payment-summary'); // Replace with your actual route
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleNegotiateClick = () => {
    setShowNegotiateBox(true);
  };

  const handleSendNegotiation = () => {
    console.log("Negotiated Price:", negotiatedPrice);
    setShowNegotiateBox(false);
    // Add further processing for the negotiated price here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="text-center border-b p-4">
          <h1 className="text-2xl font-bold">Service Bill</h1>
        </div>

        <div className="p-6 space-y-6">
          {/* Vendor Details Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Vendor Details</h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Vendor Name</p>
                <p className="font-medium">{workDetails.vendorName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Domain</p>
                <p className="font-medium">{workDetails.domain}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Service Details</h3>
            <div className="p-4 bg-gray-100 rounded-lg space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Service Date</p>
                <p className="font-medium">{workDetails.serviceDate}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Service Description</p>
                <p className="font-medium">{workDetails.serviceDetails}</p>
              </div>
            </div>
          </div>

          {/* Charges Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Charges</h3>
            <div className="p-4 bg-gray-100 rounded-lg space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Service Charges</p>
                <p className="font-medium">₹{workDetails.serviceCharges}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Tax (18%)</p>
                <p className="font-medium">₹{workDetails.tax}</p>
              </div>
              <div className="flex justify-between border-t pt-2">
                <p className="font-semibold">Total Amount</p>
                <p className="font-bold text-lg">₹{workDetails.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="flex justify-end space-x-4 p-6 border-t">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={handleNegotiateClick}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Negotiate
          </button>
          <button
            onClick={handleProceed}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>

      {/* Negotiate Modal */}
      {showNegotiateBox && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg space-y-4 w-80">
            <h2 className="text-lg font-semibold">Enter Your Price</h2>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded-lg"
              value={negotiatedPrice}
              onChange={(e) => setNegotiatedPrice(e.target.value)}
              placeholder="Enter negotiated price"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowNegotiateBox(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNegotiation}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
