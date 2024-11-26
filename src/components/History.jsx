import React, { useState, useEffect,useContext } from "react";
import "/src/styles/ServiceWorker.css";
import { useNavigate } from "react-router-dom";
import user from "/user.avif";
import { AuthContext } from "../context/AuthContext";

function History() {
  const [upcomingWork, setUpcomingWork] = useState([]);
  const { name, id } = useContext(AuthContext);
  const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        if (!id) return; 

        try {
          const response = await fetch(
            `http://localhost:5000/api/upcoming-work?userId=${id}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setUpcomingWork(data);
          } else {
            console.error("Failed to fetch data");
          }
        } catch (error) {
          console.error("Error while fetching data:", error);
        } 
      };

      fetchData();
    }, [id]);

   const acceptedCount = upcomingWork.filter(
     (work) => work.status === "accepted"
   ).length;
   const rejectedCount = upcomingWork.filter(
     (work) => work.status === "rejected"
   ).length;
  console.log(upcomingWork);

  return (
    <div className="page-container">
      <div className="worker-details-section">
        <div className="worker-info">
          <div className="worker-image">
            <img src={user} alt="Worker" />
          </div>
          <div className="worker-name">
            <h1>
              <strong>{name}</strong>
            </h1>
          </div>
          <div className="worker-stats">
            <div className="stat-item">
              <h2>
                Total: <span>{upcomingWork.length}</span>
              </h2>
            </div>
            <div className="stat-item">
              <h2>
                Accepted: <span>{acceptedCount}</span>
              </h2>
            </div>
            <div className="stat-item">
              <h2>
                Rejected: <span>{rejectedCount}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="upcoming-work-section">
        {upcomingWork.length > 0 ? (
          upcomingWork.map((work, index) => (
            <div className="work-item" key={index}>
              <div className="work-image">
                <img src={`../../server/public${work.photo}`} alt="Work" />
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
                  <h5>{work.fieldType}</h5>
                  <div className="work-actions">
                    {work.status === "pending" && (
                      <button className="btn-pending">Pending</button>
                    )}
                    {work.status === "rejected" && (
                      <button className="btn-reject">Rejected</button>
                    )}
                    {work.status === "accepted" && (
                      <button className="btn-accept">Accepted</button>
                    )}
                    {work.status === "reviewed" && (
                      <button
                        className="btn-accept bg-yellow-500"
                        onClick={() =>
                          navigate("/BillDetails", {
                            state: { workDetails: work },
                          })
                        }
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-work-message">No History available.</p>
        )}
      </div>
    </div>
  );
}

export default History;
