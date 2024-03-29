import { useState, useEffect } from 'react';
import '../css/campaignListcss.css';
import '../css/lineclamp2css.css';
import { API_BASE_URL } from '../api.config';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function EventCalendar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [Page, setPage] = useState();
  const [eventEngName, setEventEngName] = useState('');
  const [eventChiName, setEventChiName] = useState('');
  const [eventSimName, setEventSimName] = useState('');
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState('');
  const [preResult, setPreResult] = useState();
  const [nextResult, setNextResult] = useState();
  const [pagination, setPagination] = useState({});
  const [selectedValue, setSelectedValue] = useState("10");
  const [postData, setPostData] = useState({
    pageableParameter: {
      pageNumber: 0,
      pageSize: 10,
      orderBy: "latestUpdate",
      orderSequence: "desc"
    }
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/cms/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        setEvent(data.teventEntityList);
        setPagination(data.pagination);
        if (data.pagination.pageNumber === 0) {
          setPreResult(1);
          setNextResult(data.pagination.pageSize);
        }else{
          setPreResult(data.pagination.pageNumber*data.pagination.pageSize+1);
          setNextResult((data.pagination.pageNumber+1)*data.pagination.pageSize);
        }

  
        if (!data.pagination.hasNext) {
          setPreResult((data.pagination.totalPages - 1) * data.pagination.pageSize + 1);
          setNextResult(data.pagination.totalNumberOfRecords - (data.pagination.totalPages - 1) * data.pagination.pageSize+data.pagination.pageNumber*data.pagination.pageSize)
        }
      })
      .catch(error => console.error(error));
  }, [postData,selectedValue,Page]);
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setPostData({
      pageableParameter: {
        pageNumber: 0,
        pageSize: event.target.value,
        orderBy: "latestUpdate",
        orderSequence: "desc"
      }
    });
  
  };

  const handlePageChange = (event) => {
    setPage(event)
    setPostData({
      pageableParameter: {
        pageNumber: event-1,
        pageSize: pagination.pageSize,
        orderBy: "latestUpdate",
        orderSequence: "desc"
      }
    });
  
  };

  const openEdit = (data) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);
    setEventId(data.eventId)
    setEventEngName(data.eventEngName)
    setEventChiName(data.eventChiName)
    setEventSimName(data.eventSimName)
    setStartDate(formattedStartDate)
    setEndDate(formattedEndDate)
    setEditIsOpen(true);
  };

  const closeEdit = () => {
    setEditIsOpen(false);
    setEventChiName("")
    setEventEngName("")
    setEventSimName("")
    setStartDate("")
    setEndDate("")
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${API_BASE_URL}/cms/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        eventParameter: {
            startDate: startDate,
            endDate:endDate,
            eventEngName:eventEngName,
            eventChiName:eventChiName,
            eventSimName:eventSimName,
            status:"new"
          }
      }),
    }
    );
  
    // Handle response
    if (response.ok) {
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Created Event',
        showConfirmButton: false,
        timer: 1700
      }).then(function() {
        window.location = "/EventCalendar";
      });
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/cms/event`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        eventParameter: {
            eventId: eventId,
            startDate: startDate,
            endDate:endDate,
            eventEngName:eventEngName,
            eventChiName:eventChiName,
            eventSimName:eventSimName,
            status:"edit"
          }
      }),
    }

    );
  
    // Handle response
    if (response.ok) {
      closeEdit();
      Swal.fire({
        icon: 'success',
        title: 'Edited Event',
        showConfirmButton: false,
        timer: 1700
      }).then(function() {
        window.location = "/EventCalendar";
      });
    }
  }
  
  const customStyles = {
    content: {
      width: 'auto',
      maxWidth:'700px',
      height: '550px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
  };

  const handleDelete = async (eventId) => {
    // Show a confirmation dialog before deleting the URL
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure to delete the event?',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', // set confirm button color to red
      confirmButtonText: 'Delete'
    });
  
    // Check if the user clicked the delete button
    if (result.isConfirmed) {
      const response = await fetch(`${API_BASE_URL}/cms/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventParameter: {
            eventId: eventId,
            status: "d"
          }
        }),
      });
      // Handle response
      if (response.ok) {
        // Reload the page to show the updated list of links
        window.location.reload();
      } else {
        // Handle error
        console.error("Error deleting item");
      }
    }
  }

  return (
    <>

      <div className='w-deflaut px-2'>
        <div className='flex justify-content-between align-items-center my-3'>
          <div className=''>
            <h1>Event Calendar</h1>
          </div>
          <div onClick={openModal}>
          <a href='#EnableJavascript' className={'text-white bg-ft-light rounded px-3 py-2'}>
            Create
          </a>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
        <form onSubmit={handleSubmit}>
          <div className='w-link flex-col'>
            <div className='flex'>
                <div className='w-1/2 mr-5'>
                <label htmlFor='startDate'>Start Date:</label>
                <input
                    type='date'
                    id='startDate'
                    value={startDate}
                    className='w-full ring-ft-light focus:border-0 border-gray-500'
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />
                </div>
                <div className='w-1/2'>
                <label htmlFor='endDate'>End Date:</label>
                <input
                    type='date'
                    id='endDate'
                    value={endDate}
                    className='w-full ring-ft-light focus:border-0 border-gray-500'
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                />
                </div>
            </div>
            <div className='mt-3'>
              <label htmlFor='eventEngName'>Content(Eng):</label>
              <input
                type='text'
                id='eventEngName'
                value={eventEngName}
                className='w-full ring-ft-light focus:border-0 border-gray-500'
                required
                onChange={(e) => setEventEngName(e.target.value)}
              />
            </div>
            <div className='mt-3'>
              <label htmlFor='eventChiName'>Content(Trad):</label>
              <input
                type='text'
                id='eventChiName'
                value={eventChiName}
                className='w-full ring-ft-light focus:border-0 border-gray-500'
                required
                onChange={(e) => setEventChiName(e.target.value)}
              />
            </div>
            <div className='mt-3'>
              <label htmlFor='eventSimName'>Content(Simp):</label>
              <input
                type='text'
                id='eventSimName'
                value={eventSimName}
                className='w-full ring-ft-light focus:border-0 border-gray-500'
                required
                onChange={(e) => setEventSimName(e.target.value)}
              />
            </div>
         
          </div>
          <div className='w-auto max-w-96 flex mt-4'>
            <button type='submit' className='w-1/2 mr-5 px-3 py-2 ring-ft-light bg-ft-light text-white rounded ring-1 active:bg-ft active:ring-ft'>Create</button>
            <button type='button' className='w-1/2 rounded px-3 py-2 ring-1 ring-ft-light' onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={editIsOpen} onRequestClose={closeEdit} style={customStyles} ariaHideApp={false}>
        <form onSubmit={handleEdit}>
        <div className='w-link flex-col'>
            <div className='flex'>
                <div className='w-1/2 mr-5'>
                <label htmlFor='startDate'>Start Date:</label>
                <input
                    type='date'
                    id='startDate'
                    value={startDate}
                    className='w-full ring-ft-light focus:border-0 border-gray-500'
                    required
                    onChange={(e) => setStartDate(e.target.value)}
                />
                </div>
                <div className='w-1/2'>
                <label htmlFor='endDate'>End Date:</label>
                <input
                    type='date'
                    id='endDate'
                    value={startDate}
                    className='w-full ring-ft-light focus:border-0 border-gray-500'
                    required
                    onChange={(e) => setEndDate(e.target.value)}
                />
                </div>
            </div>
            <div className='mt-3'>
              <label htmlFor='eventEngName'>Content(Eng):</label>
              <input
                type='text'
                id='eventEngName'
                value={eventEngName}
                className='w-full ring-ft-light focus:border-0 border-gray-500'
                required
                onChange={(e) => setEventEngName(e.target.value)}
              />
            </div>
            <div className='mt-3'>
              <label htmlFor='eventChiName'>Content(Trad):</label>
              <input
                type='text'
                id='eventChiName'
                value={eventChiName}
                className='w-full ring-ft-light focus:border-0 border-gray-500'
                required
                onChange={(e) => setEventChiName(e.target.value)}
              />
            </div>
            <div className='mt-3'>
              <label htmlFor='eventSimName'>Content(Simp):</label>
              <input
                type='text'
                id='eventSimName'
                value={eventSimName}
                className='w-full ring-ft-light focus:border-0 border-gray-500'
                required
                onChange={(e) => setEventSimName(e.target.value)}
              />
            </div>
             
          </div>
          <div className='w-auto max-w-96 flex mt-4'>
            <button type='submit' className='w-1/2 mr-5 px-3 py-2 ring-ft-light bg-ft-light text-white rounded ring-1 active:bg-ft active:ring-ft'>Save</button>
            <button type='button' className='w-1/2 rounded px-3 py-2 ring-1 ring-ft-light' onClick={closeEdit}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
        </div>
        <div className='mr-5'>
          <p>Show
          <select
      id="countries"
      aria-label="Select page size"
      className="mx-2 w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-ft-light focus:border-ft-light p-2.5"
      value={selectedValue}
      onChange={handleChange}
    >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select> 
            records per page.
          </p>

        </div>
        <div className='p-2 flex align-middle justify-center'>
          <div className=''>
        <table className='w-full block'>
            <thead>
                <tr className='border border-slate-300 '>
                <th className='  pl-5 h-8' >
                <div className='inline-block h-6 w-date'>
                    Start Date
                </div>
              </th>
              <th className='  h-8 '>
            <div className='inline-block h-6 w-date'>
            End Date
  
              </div>
            </th>
            <th className='  h-8 '>
            <div className='inline-block h-6 w-link'>
            Event(Eng)
  
              </div>
            </th>
          
            <th className=' h-8'>
              <div className='inline-block h-6 w-linkEdit'>
                Edit

                 </div>
            </th>
            <th className=' h-8'>
              <div className='inline-block h-6 w-linkEdit mr-3'>
                Delete
                 </div>
            </th>
                </tr>
            </thead>
            <tbody className='text-left'>
            
            {event.map((campaign) => {

                const startDate = new Date(campaign.startDate);
                const endDate = new Date(campaign.endDate);
                const formattedStartDate = startDate.toISOString().slice(0, 10);
                const formattedEndDate = endDate.toISOString().slice(0, 10);

                      return(
                   
                    <tr className="border border-slate-300 h-16" key={campaign.eventId}>
                    <td className=''><div className='w-comAns truncate pl-5 items-center'>{formattedStartDate}</div></td>
                    <td className=''><div className='w-comAns truncate items-center align-middle' >{formattedEndDate}</div></td>
                    <td className=''><div className='w-linkres truncate items-center align-middle' >{campaign.eventEngName}</div></td>
              

                    <td className=''>
                    <a href='#EnableJavascript' onClick={() => openEdit(campaign)}>
                        <svg className='campaign h-8' fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                        </svg>
                    </a>
                    
                    </td>
                    <td className='relative'>
                <a href='#EnableJavascript' onClick={() => handleDelete(campaign.eventId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#009188" className="w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </a>
                </td>
                </tr>);
                })}
              </tbody>
        </table>
        </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
      <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
        <div>
          {pagination.totalNumberOfRecords===0?<p className="text-sm text-gray-700">
          No items to show...</p>:<p className="text-sm text-gray-700">
            Showing<span className="font-medium"> {preResult}</span> to <span className="font-medium">{nextResult}</span> of{' '}
            <span className="font-medium">{(pagination.totalNumberOfRecords)}</span> results
          </p>}
        </div>
          <div>
          {pagination && pagination.totalNumberOfRecords > 0 && (
            <Stack spacing={2}>
              <Pagination
                page={parseInt(pagination.pageNumber + 1)}
                shape={'circular'}
                count={
                  pagination.totalNumberOfRecords && pagination.pageSize && !isNaN(pagination.totalNumberOfRecords) && !isNaN(pagination.pageSize)
                    ? (pagination.totalNumberOfRecords % pagination.pageSize)===0?pagination.totalNumberOfRecords / pagination.pageSize: (parseInt(Math.trunc(pagination.totalNumberOfRecords / pagination.pageSize)+ 1))
                    : 0
                }
                onChange={(e, value) => handlePageChange(value)}
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  </div>
            </>
  )}

export default EventCalendar;