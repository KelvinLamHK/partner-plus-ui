import { useState, useEffect } from 'react';
import '../css/campaignListcss.css';
import '../css/lineclamp2css.css';
import { API_BASE_URL } from '../api.config';

function QuickLink() {

  const [Link, setLink] = useState([]);


  useEffect(() => {
    fetch(`${API_BASE_URL}/cms/links`, {
      method: 'POST',

    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLink(data);
      })
      .catch(error => console.error(error));
  }, []);
  


  
 

  return (
    <>

      <div className='w-deflaut px-2'>
        <div className='flex justify-content-between align-items-center my-3'>
          <div className=''>
            <h1>Quick Links</h1>
            <p className=''>*At most 15 links can be added</p>
          </div>
          <div>
            <a href='/' className='text-white bg-ft-light rounded px-3 py-2'>Create</a>
          </div>
        </div>
        <div className='p-2 flex align-middle justify-center'>
          <div className=''>
        <table className='w-full block'>
            <thead>
                <tr className='border border-slate-300 '>
                <th className=' hover:text-ft-light cursor-pointer pl-5 h-8' >
                <div className='inline-block h-6 w-link'>
                URL name(Eng)
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
                </div>
              </th>
            <th className=' hover:text-ft-light cursor-pointer h-8 '>
            <div className='inline-block h-6 w-link'>
            URL
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' h-8'>
              <div className='inline-block h-6 w-linkEdit'>
                Edit
                 </div>
            </th>
                </tr>
            </thead>
            <tbody className='text-left'>
            
            {Link.map((campaign) => (
  <tr className="border border-slate-300 h-16" key={campaign.linkId}>
    <td className=''><div className='w-52 lineclamp2 pl-5 items-center'>{campaign.linkEngName}</div></td>
    <td className=''><div className='w-36 break-all  items-center align-middle' >{campaign.url}</div></td>
    <td className=''>
      <a href='/EditCampaign' >
        <svg className='campaign h-8' fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
        </svg>
      </a>
    </td>
  </tr>
))}
              </tbody>
        </table>
        </div>
        </div>
  </div>
            </>
  )}

export default QuickLink;