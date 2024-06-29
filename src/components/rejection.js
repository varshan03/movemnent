import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Spin, message } from 'antd';
import { IoMdCloseCircleOutline } from "react-icons/io";
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; 

function Rejection() {
  const columns = [
    {
      title: 'MID',
      dataIndex: 'MID',
    },
    {
      title: 'Date',
      dataIndex: 'Vdate',
      render: (text) => moment(text).format('DD-MMM-YYYY'),
    },
    {
      title: 'PartyName',
      dataIndex: 'partyName',
      className: 'blue-text',
    },
    {
      title: 'Vch Type',
      dataIndex: 'VchType',
    },
    {
      title: 'Vch Number',
      dataIndex: 'vchNo',
    },
    {
      title: 'Optional',
      dataIndex: 'iopy',
      render: (text) => (
        <span className={text === 'Yes' ? 'unapproved-text' : 'approved-text'}>
        {text === 'Yes' ? ' Un Approved' : ' Approved'}
        </span>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'VchAmt',
      align: 'right',
    },
  ];
  
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ cut , setCut] = useState(false)
  const navigate = useNavigate(); 



  useEffect(() => {
    fetchData();
  }, [searchQuery]); // Trigger fetchData when searchQuery changes
  
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      fetch('http://192.168.1.24:3002/amount/search')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          if (searchQuery.trim() === '') {
            setCut(false);
            const filteredData = data.filter(item => item.iopy == 'Yes');
            setRawData(filteredData); 
          } else {
  
            const filteredData = data.filter(item => item.iopy == 'Yes');

            const searchFilteredData = filteredData.filter(item => {
              return Object.values(item).some(value => {
                if (typeof value === 'string') {
                  return value.toLowerCase().includes(searchQuery.toLowerCase());
                }
                if (typeof value === 'number') {
                  return value.toString().includes(searchQuery.toString());
                }
                return false;
              });
            });
  
            setRawData(searchFilteredData);
            setCut(true);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          message.error('Failed to fetch data. Please try again later.');
          setLoading(false);
        });
    }, 300);
  };
  
  
  const handleRowClick = (record) => {
 
    navigate('/home', { state: { mid: record.MID } });
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  
  const  clearsearch = () =>{
    
    fetchData()
    setSearchQuery('')
  }
  console.log(rawData);
  
  return (
    <div className='approved-main'>
      <div className='approved-header'>
        <h5> REJECTION  </h5>
        <div className='search-approved'>
        <Input placeholder="Search....." value={searchQuery}  onChange={(e) => handleSearch(e.target.value)}  />  
    
        <spam onClick={clearsearch} style={{ position: "relative", cursor: 'pointer',  right: '35px' , fontSize:'18px',top:'2px' , color:'#5365cf' }}>
  {cut && <IoMdCloseCircleOutline />}
</spam>
          {/* <Button type="primary" onClick={handleSearch}>Search</Button> */}
        </div>
      </div>
      <div className='main-table'>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%', top: '10rem', position: 'relative' }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table columns={columns} dataSource={rawData}  pagination={{ pageSize: 15 } } onRow={(record, rowIndex) => ({
            onClick: () => handleRowClick(record),
          })}/>
        )}
      </div>
    </div>
  );
}

export default Rejection;
