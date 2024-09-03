import React,{useState,useEffect} from 'react'
import '/src/styles/ServiceWorker.css';
import electrician from '/src/assets/homePage/electrician.jpg'


function ServiceWorker() {

  const [workerDetails, setWorkerDetails] = useState({});
  const [upcomingWork, setUpcomingWork] = useState([]);

  useEffect(() => {
    // Fetch upcoming work
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/upcoming-work", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setUpcomingWork(data);
        console.log("fetched successfully");
      } else {
        console.error("Failed to fetch data");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="page-container">
      <div className="worker-details-section">
        <div className="worker-info">
          <div className="worker-image">
            <img src={electrician} alt="Worker" />
          </div>
          <div className="worker-name">
            <h1>
              <strong>Manoj</strong>
            </h1>
          </div>
          <div className="worker-stats">
            <div className="stat-item">
              <h2>
                Pending: <span>0</span>
              </h2>
            </div>
            <div className="stat-item">
              <h2>
                Completed: <span>0</span>
              </h2>
            </div>
            <div className="stat-item">
              <h2>
                Canceled: <span>0</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="upcoming-work-section">
        {upcomingWork.length>0 ? (
          upcomingWork.map((work, index) => (
            <div className="work-item" key={index}>
              <div className="work-image">
                <img src={electrician} alt="Work" />
              </div>
              <div className="work-details">
                <div className="work-header">
                  <h3 className="work-owner">{work.name}</h3>
                  <h3 className="work-location">{work.address}</h3>
                </div>
                <div className="work-description">
                  <h5>Description:</h5>
                  <p>{work.description}</p>
                </div>
                <div className="work-category">
                  <h5>{work.category||"electrician"}</h5>
                  <div className="work-actions">
                    <button className="btn-accept">Accept</button>
                    <button className="btn-reject">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-work-message">No upcoming work available.</p>
        )}
      </div>
    </div>
  );
}

export default ServiceWorker