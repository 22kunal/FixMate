import React from 'react'
import '/src/styles/ComplainCreation.css'

function ComplainCreation(){
  return (
    <div >
        <div class='complain'>
            <div className='complain_area'>
                <div className="complain_box">
                    <div className="complain_photo">
                        <h2>Photo</h2>
                        <input type="file" accept="image/*" id="photoInput" />
                    </div>
                    <div className='complain_own_detail'>
                        <div className="complain_name">
                            <h2>Name:</h2>
                            <input type="text" placeholder="Enter your name" required/>
                        </div>
                        <div className='complain_phone'>
                            <h2>Phone Number:</h2>
                            <input type="tel" pattern="[0-9]{10}" placeholder="Enter your Contact Number" required/>
                        </div>
                    </div>

                    <div className="complain_address">
                        <h2>Address:</h2>
                        <input type="text" placeholder="Enter your address"/>
                    </div>

                    <div className="complain_description">
                        <h2>Description:</h2>
                        <textarea placeholder="Enter your problem description" rows="5" required></textarea>
                    </div>
                    <div class='complain_sendbutton'>
                        <button>Send</button>
                    </div>
                </div>
            </div>
            <div className="complain_content">
                <div class='complain_rightup'>
                    <div className="complain_pic">

                    </div>
                </div>
                <div class='complain_rightdown'>
                    <div class='complain_benfits'>
                        <h1>FixMate Promise</h1>
                        <ul>
                            <li>Verified Professionals</li>
                            <li>Separate Charges Apply for Each Service Component</li>
                            <li>No Hidden Costs – Clear Pricing for Every Service</li>
                            <li>Commitment to Quality and Customer Satisfaction</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}

export default ComplainCreation
