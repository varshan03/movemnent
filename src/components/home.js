import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { Spin, message } from 'antd'; // Assuming you're using Ant Design for the Spin component
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom'; 
function Home() {
  const location = useLocation();
  const { mid } = location.state;
  const { location1 } = location.state;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupVisible2, setPopupVisible2] = useState(false);
  const [popupVisible3, setPopupVisible3] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.13:3002/amount/search/home?mid=${mid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false whether request succeeds or fails
      }
    };

    fetchData();
  }, [mid]); // Fetch data whenever `mid` changes
  console.log('upper',location1);
  const [updateData, setUpdateData] = useState('');
  const [updateApproved, setUpdateApproved] = useState('');

  const unapproved = () => {
    fetch(`http://192.168.1.24:3002/amount/search/update?mid=${mid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(data => {
        setUpdateData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const approved = () => {
    fetch(`http://192.168.1.24:3002/amount/search/update/approved?mid=${mid}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(data => {
        setUpdateData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleApproval = () => {
    // unapproved(); 
    setPopupVisible(true);
  };
  const handlePopupApproval = () => {
    approved(); 
    setPopupVisible(false); 
    message.success(' Approved Successfully.')
    navigate('/approved')
  };
  const handlePopupApproval2 = () => {
    unapproved(); 
    setPopupVisible(false); 
    message.success('Un Approved Successfully.')
    navigate('/unapproved')
  };

  const handleUnapproval = () => {
    setPopupVisible2(true);
  };
  const handleRejection = () => {
    setPopupVisible3(true);
  };
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/')
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  console.log(mid);

  return (
    <div style={{ width: '87vw', position: 'relative',overflowY:'auto' , overflowX:'hidden' , height:'100vh'  }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%', width: '100%', top: '20rem', left: '0rem', position: 'absolute' }}>
          <Spin size="large" />
        </div>
      ) : (
        <div className='topper'>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <h4 style={{ position: 'absolute', left: '10px', margin: 0 }}>Payment No: 3</h4>
            <h4 style={{ position: 'absolute', right: '10px', margin: 0 }}>03-jan-2024</h4>
            <h4 style={{ position: 'absolute', right: '10px', margin: 0, top: "30px" }}>   <p>MID: {mid}</p></h4>
            <h4 style={{ position: 'absolute', left: '10px', margin: 0, top: "4rem" }}>Account : 2B002-KOTAK MAHINDRA BANK LTD</h4>
          </div>
        </div>
      )}


      {!loading && (
        <Stack direction={'column'} gap={2} style={{ flexWrap: 'wrap', marginLeft: "20px", width: '100%' }}>
            <div  className='main-small-box'>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: '0%' }}>
  <h4 style={{ margin: 0 }}>Particulars</h4>
  <h4 style={{ margin: 0 }}>Amount</h4>
</div>
  <hr style={{ margin: 'auto', width: '100%' }} />



          {data && data.map((item, index) => (
              <Stack direction="column" spacing={1}>
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', bottom: '10px', marginBottom:'-32px' }}>
                  <h5>{item.partyName}</h5>
                  <h5>{item.VchAmt}</h5>
                </div>
              </Stack>
          ))}
            </div>
        </Stack>
  
      )}
        {!loading && (
      <div style={{ marginTop: '20px', display:'flex', justifyContent:'space-around', marginBottom:'30px' }}>
        <button style={{ marginRight: '10px', backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px',cursor:'pointer' ,borderRadius: '5px' }} onClick={handleApproval}>Approved</button>
        <button style={{ marginRight: '10px', backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px',cursor:'pointer' , borderRadius: '5px' }} onClick={handleUnapproval}>Un Approved</button>
        <button style={{ marginRight: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px',cursor:'pointer' , borderRadius: '5px' }} onClick={handleRejection}>Rejection</button>
        <button style={{ backgroundColor: 'gray', color: 'white', border: 'none', cursor:'pointer' ,padding: '10px 20px', borderRadius: '5px' }} onClick={handleCancel}>Cancel</button>
      </div>
        )}
      {popupVisible && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '999', backdropFilter: 'blur(5px)' }}></div>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}>
            <h2>Approval </h2>
            {/* <p>Do you want to approve?</p> */}
            <div style={{ marginBottom: '10px',  display:'flex' , flexDirection:'column'}}>
              <label htmlFor="description">Remarks:</label>
              <textarea id="description" name="description" className='text-area-popup' value={description} onChange={handleDescriptionChange}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'   }}>
              <button style={{ marginRight: '10px', backgroundColor: 'gray', color: 'white', border: 'none', cursor:'pointer' ,padding: '10px 20px', borderRadius: '5px' }} onClick={() => setPopupVisible(false)}>Close</button>
              <button style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px',cursor:'pointer' , borderRadius: '5px' }} onClick={handlePopupApproval} >Approve</button>
            </div>
          </div>
        </>
      )}


{popupVisible2 && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '999', backdropFilter: 'blur(5px)' }}></div>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}>
            <h2>Un Approval </h2>
            {/* <p>Do you want to approve?</p> */}
            <div style={{ marginBottom: '10px',  display:'flex' , flexDirection:'column'}}>
              <label htmlFor="description">Remarks:</label>
              <textarea id="description" name="description" className='text-area-popup' value={description} onChange={handleDescriptionChange}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'   }}>
              <button style={{ marginRight: '10px', backgroundColor: 'gray', color: 'white', border: 'none', cursor:'pointer' ,padding: '10px 20px', borderRadius: '5px' }} onClick={() => setPopupVisible2(false)}>Close</button>
              <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px 20px',cursor:'pointer' , borderRadius: '5px' }} onClick={handlePopupApproval2}>Un Approved</button>
            </div>
          </div>
        </>
      )}

      
{popupVisible3 && (
        <>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '999', backdropFilter: 'blur(5px)' }}></div>
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', transition: 'transform 0.3s ease' }}>
            <h2>Rejection </h2>
            {/* <p>Do you want to approve?</p> */}
            <div style={{ marginBottom: '10px',  display:'flex' , flexDirection:'column'}}>
              <label htmlFor="description">Remarks:</label>
              <textarea id="description" name="description" className='text-area-popup' value={description} onChange={handleDescriptionChange}></textarea>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between'   }}>
              <button style={{ marginRight: '10px', backgroundColor: 'gray', color: 'white', border: 'none', cursor:'pointer' ,padding: '10px 20px', borderRadius: '5px' }} onClick={() => setPopupVisible3(false)}>Close</button>
              <button style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '10px 20px',cursor:'pointer' , borderRadius: '5px' }} onClick={() => { /* Handle approval logic */ setPopupVisible3(false) }}>Rejection</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
