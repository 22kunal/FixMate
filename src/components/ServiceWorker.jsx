import React from 'react'
import '/src/styles/ServiceWorker.css';
import electrician from '/src/assets/homePage/electrician.jpg'


function ServiceWorker() {
  return (
    <div>
        <div className='work_handle'>
            <div className='worker_content'>
              <div className='worker_detail'>

                <div className='worker_image'>
                  <img src={electrician} alt='Worker Image'></img>
                </div>

                <div className="worker_name">
                  <h1><b>Manoj</b></h1>
                </div>

                <div className="worker_progress">

                  <div className='worker_pending'>
                    <h2>Pending: <span>0</span></h2>
                  </div>

                  <div className="worker_completed">
                    <h2>Completed: <span>0</span></h2>
                  </div>

                  <div className="worker_canceled">
                    <h2>Canceled: <span>0</span></h2>
                  </div>

                </div>

              </div>

            </div>

            <div className='work_detail_content'>
              <div className='work_get'>

                  <div className="work_image">
                    <img src={electrician} alt='Worker Image'></img>
                  </div>

                  <div className="work_detail">
                    <div className="work_name">
                      <div className="work_own_name">
                        <h3>Kundan Don</h3>
                      </div>

                      <div className="work_location">
                        <h3>Jharkhand</h3>
                      </div>

                    </div>

                    <div className="work_description">
                      <h5>Description:</h5>
                      <div className='text_description'>
                        <p>Hello i love eating ducks</p>
                      </div>
                    </div>

                    <div className="work_category">
                        <div className='category_name'>
                          <h5>Electrician</h5>
                        </div>
                        <div className='work_choice'>
                          <button className='work_accept'>Accept</button>
                          <button className='work_reject'>Reject</button>
                        </div>
                    </div>

                  </div>

              </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceWorker