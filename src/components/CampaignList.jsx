import { useState, useEffect } from 'react';
import '../css/campaignListcss.css';
import {API_BASE_URL} from '../api.config.js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function CampaignList() {
  const [selectedValue, setSelectedValue] = useState();
  const [Page, setPage] = useState();
  const [campaigns, setCampaigns] = useState([]);
  const [preResult, setPreResult] = useState();
  const [nextResult, setNextResult] = useState();
  const [pagination, setPagination] = useState({});
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [postData, setPostData] = useState({
    userParameter: {
      loginName: "IFA-0413518-00012",
      name: "XXXXXXXX Wong",
      companyID: "IFA",
      email: "xxxxxxxxxxxx@iamlegacy.com",
      brokerCode: "0413518;0419214",
      ifaIdentity: "ADMIN",
      pibaNumber: "PIBA-0433-022049",
      ifaCaNameEng: "XXXX Ip Wun",
      ifaCaNameOther: "IA9205",
      companyName: null,
      ifaCaLicenseNumber: "TR1234",
      role: "internal-admin"
    },
    pageableParameter: {
      pageNumber: 0,
      pageSize: 10,
      orderBy: "campaignNameEng",
      orderSequence: "desc"
    },
    campaignListParameter: {
      campaignCode: ""
    }
  });

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setPostData({
      userParameter: {
        loginName: "IFA-0413518-00012",
        name: "XXXXXXXX Wong",
        companyID: "IFA",
        email: "xxxxxxxxxxxx@iamlegacy.com",
        brokerCode: "0413518;0419214",
        ifaIdentity: "ADMIN",
        pibaNumber: "PIBA-0433-022049",
        ifaCaNameEng: "XXXX Ip Wun",
        ifaCaNameOther: "IA9205",
        companyName: null,
        ifaCaLicenseNumber: "TR1234",
        role: "internal-admin"
      },
      pageableParameter: {
        pageNumber: Page-1,
        pageSize: event.target.value,
        orderBy: "campaignNameEng",
        orderSequence: "desc"
      },
      campaignListParameter: {
        campaignCode: ""
      }
    });
  
  };
  

  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/campaign/headers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => response.json())
      .then(data => {
        setCampaigns(data.campaignList);
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
  }, [postData, selectedValue, Page]);


  
  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(window.innerWidth <= 1207);
    }
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    // Add this block to update isMobileScreen when the screen size is larger than 1207 pixels
    return () => {
      window.removeEventListener("resize", handleResize);
      setIsMobileScreen(false);
    };
  }, []);



  return (
    <>
    {isMobileScreen ? (<div></div>):(
      <div className='w-full'>
        <div className='flex justify-content-between align-items-center my-3'>
          <div className=''>
            <h1>Campaign</h1>
          </div>
          <div className=''>
            <a className='bg-ft-light text-white px-3 py-2 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft' href='/Campaign'>
              Create
            </a>
          </div>
        </div>
        <div className='w-full flex justify-center mb-4'>
        <div className="w-1/3 mr-5">
          <span>Campaign Name</span>
          <span className="input-search">
            <input
              data-input=""
              className="form-control"
              type="search"
              placeholder="Campaign Name"
              maxLength="500"
              value=""
              id="Input_SearchCampaignName"
              style={{ userSelect: "auto" }}
            />
          </span>
        </div>
        <div className="w-1/3 mr-5">
          <span>Campaign Code</span>
          <span className="input-search">
            <input
              data-input=""
              className="form-control"
              type="search"
              placeholder="Campaign Code"
              maxLength="500"
              value=""
              id="Input_SearchCampaignCode"
              style={{ userSelect: "auto" }}
            />
          </span>
        </div>
        <div className="w-1/3 flex flex-col justify-between">
          <div className='h-1/2'>
          </div>
          <div className='h-1/2 flex'> 
          <div className='mr-5'>
            <a href='/Campaign' className="bg-ft-light text-white px-3 py-2 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft">
              Search
            </a>
          </div>
          <div className=''>
            <a href='/Campaign' className="bg-ft-light text-white px-3 py-2 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft">
              Reset
            </a>
          </div>
          </div>
        </div>
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
        <div className='p-1 w-full'>
          <table className="rounded-md border-collapse border border-slate-800 w-full" style={{height: "auto"}}>
            <thead className='text-left'>
              <tr className="border border-slate-300">
                <th className='pl-3 pr-3'>Campaign Name</th>
                <th className='pl-3 pr-3'>Campaign Code</th>
                <th className='pl-3 pr-3'>Start Date</th>
                <th className='pl-3 pr-3'>End Date</th>
                <th className='pl-3 pr-3'>Latest Update</th>
                <th className='pl-3 pr-3'>IFA/CA</th>
                <th className='pl-3 pr-3'>Remarks</th>
                <th className='pl-3 pr-3'>Poster</th>
                <th className='pl-3 pr-3'>Edit</th>
              </tr>
            </thead>
            <tbody className='text-left'>
            {campaigns.map((campaign) => {
                const startDate = new Date(campaign.campaignStartDate);
                const endDate = new Date(campaign.campaignEndDate);
                const updatedDate = new Date(campaign.updatedDate);
                const formattedStartDate = startDate.toISOString().slice(0, 10);
                const formattedEndDate = endDate.toISOString().slice(0, 10);
                const formattedUpdatedDate = updatedDate.toISOString().slice(0, 10);

                if(campaign.remark === "NULL"){
                  campaign.remark = '';
                }

                if(campaign.thumbnailDocID === 0){
                  campaign.thumbnailDocID = '';
                }

                return (
                  <tr className="border border-slate-300" key={campaign.campaignHeaderId}>
                    <td className='pl-3 pr-3'><a className='text-ft-light hover:text-ft' href="/Campaign">{campaign.campaignNameEng}</a></td>
                    <td className='pl-3 pr-3'>{campaign.campaignCode}</td>
                    <td className='pl-3 pr-3'>{formattedStartDate}</td>
                    <td className='pl-3 pr-3'>{formattedEndDate}</td>
                    <td className='pl-3 pr-3'>{formattedUpdatedDate}</td>
                    <td className='pl-3 pr-3'>{campaign.ifaCaIndicator}</td>
                    <td className='pl-3 pr-3'>{campaign.remark}</td>
                    <td className='pl-3 pr-3'>{campaign.thumbnailDocID}</td>
                    <td className='pl-3 pr-3'>
                      <a href='/Campaign'>
                        <svg className='campaign ' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                        </svg>
                      </a>
                    </td>
                  </tr>
                );
              })}
              
              </tbody>
              
              </table>
              </div>
              <div className="flex items-center justify-between px-4 py-3 md:px-6">

      <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing<span className="font-medium"> {preResult}</span> to <span className="font-medium">{nextResult}</span> of{' '}
            <span className="font-medium">{pagination.totalNumberOfRecords}</span> results
          </p>
        </div>
        <div>
          <Stack spacing={2}>
            <Pagination count={pagination.totalNumberOfRecords} onChange={(e, value) => setPage(value)}/>
          </Stack>
        </div>
      </div>
    </div>
  </div>)}
            </>
  )}

export default CampaignList;