import { useState, useEffect,useRef } from 'react';
import '../css/campaignListcss.css';
import {API_BASE_URL} from '../api.config.js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ScrollToTopButton from './ScrollToTopButton';

function CampaignList() {
  const inputRefCamName = useRef(null);
  const inputRefCamCode = useRef(null);
  const [selectedValue, setSelectedValue] = useState();
  const [Page, setPage] = useState();
  const [Orderby, setOrderby] = useState("updatedDate");
  const [OrderSequence, setOrderSequence] = useState("desc");
  const [campaigns, setCampaigns] = useState([]);
  const [CampaignCode, setCampaignCode] = useState();
  const [CampaignName, setCampaignName] = useState();
  const [preResult, setPreResult] = useState();
  const [nextResult, setNextResult] = useState();
  const [pagination, setPagination] = useState({});
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isXsMobileScreen, setXsIsMobileScreen] = useState(false);
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
      orderBy: Orderby,
      orderSequence: OrderSequence
    },
    campaignListParameter: {
      campaignCode: CampaignCode,
      campaignName: CampaignName
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
        pageNumber: 0,
        pageSize: event.target.value,
        orderBy: Orderby,
        orderSequence: OrderSequence
      },
      campaignListParameter: {
        campaignCode: CampaignCode,
        campaignName: CampaignName
      }
    });
  
  };
  
  const handlePageChange = (event) => {
    setPage(event)
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
        pageNumber: event-1,
        pageSize: pagination.pageSize,
        orderBy: Orderby,
        orderSequence: OrderSequence
      },
      campaignListParameter: {
        campaignCode: CampaignCode,
        campaignName: CampaignName
      }
    });
  
  };

  const handleCampaignChange = () => {
    setCampaignCode(inputRefCamCode.current.value)
    setCampaignName(inputRefCamName.current.value)
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
        pageNumber: 0,
        pageSize: pagination.pageSize,
        orderBy: Orderby,
        orderSequence: OrderSequence
      },
      campaignListParameter: {
        campaignCode: inputRefCamCode.current.value,
        campaignName: inputRefCamName.current.value
      }
    });
  
  };

  const handleResetChange = () => {
    inputRefCamCode.current.value=""
    inputRefCamName.current.value=""
    setCampaignCode("")
    setCampaignName("")
    setPage(1)
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
        pageNumber: 0,
        pageSize: pagination.pageSize,
        orderBy: "updatedDate",
        orderSequence: "desc"
      },
      campaignListParameter: {
        campaignCode: "",
        campaignName: ""
      }
    });
  
  };



  useEffect(() => {
    console.log(postData);
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
    window.scrollTo(0, 0)
  }, [Page])
  
  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(window.innerWidth <= 1250);
      setXsIsMobileScreen(window.innerWidth <= 385);
    }
  
    handleResize();
    window.addEventListener("resize", handleResize);
  
    // Add this block to update isMobileScreen when the screen size is larger than 1207 pixels
    return () => {
      window.removeEventListener("resize", handleResize);
      setIsMobileScreen(false);
      setXsIsMobileScreen(false);
    };
  }, []);

  useEffect(() => {
    // action on update of movies
  }, []);


  const handleOrder = (event) =>{
    handleOrderSequence();
    handleOrderBy(event);
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
        pageNumber: 0,
        pageSize: pagination.pageSize,
        orderBy: Orderby,
        orderSequence: OrderSequence
      },
      campaignListParameter: {
        campaignCode: inputRefCamCode.current.value,
        campaignName: inputRefCamName.current.value
      }
    });
  }

  const handleOrderSequence = () =>{
    if(OrderSequence==="desc"){
      setOrderSequence("asc")
    }else{
      setOrderSequence("desc")
    }
    console.log(OrderSequence);
  }

  const handleOrderBy = (event) =>{
    setOrderby(event)
    console.log(Orderby);
  }

  return (
    <>
    {isMobileScreen ? ( <div className='w-full '>
          <div className=''>
            <h1>Campaign</h1>
          </div>
          <div className='mt-4 flex'>
            <a className='bg-ft-light text-center w-full text-white py-3 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft' href='/Campaign'>
              Create
            </a>
          </div>
        <div className="mt-4">
          <span>Campaign Name</span>
          <span className="input-search">
            <input
              data-input=""
              className="form-control py-3"
              type="search"
              placeholder="Campaign Name"
              maxLength="500"
              id="Input_SearchCampaignName"
              ref={inputRefCamName}
              style={{ userSelect: "auto" }}
            />
          </span>
        </div>
        <div className="mt-3">
          <span>Campaign Code</span>
          <span className="input-search">
            <input
              data-input=""
              className="form-control py-3"
              type="search"
              placeholder="Campaign Code"
              maxLength="500"
              ref={inputRefCamCode}
              id="Input_SearchCampaignCode"
              style={{ userSelect: "auto" }}
            />
          </span>
        </div>


          <div className='flex mt-4'>
            <a href="#PleaseEnableJavascript.html" onClick={() => handleCampaignChange()} className="text-center w-full bg-ft-light text-white py-3 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft">
              Search
            </a>
          </div>
          <div className='flex mt-3'>
            <a href='#PleaseEnableJavascript.html' onClick={()=>handleResetChange()} className="text-center w-full bg-white text-ft-light ring-ft-light ring-1 py-3 rounded hover:bg-ft hover:text-white active:bg-ft-light active:ring-1 active:ring-ft">
              Reset
            </a>
          </div>

        <div className='mt-4'>
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

        <div className="flex">
		      <table className=" flex w-full bg-white">
			      <thead className="sm:w-1/5 w-2/5 text-white">
            {campaigns.map((campaignMobileHead) => {
              return (
				      <tr className="pl-1 bg-ft-light flex flex-col mb-2 border border-slate-300" key={campaignMobileHead.campaignHeaderId}>
                 {((campaignMobileHead.campaignNameEng.length>22)&&(isXsMobileScreen))?
                    <><th className='font-normal h-12'>campaigns Name</th></>
                    :
                    <th className='h-6 font-normal'>campaigns Name</th>}
                <th className='h-6 font-normal'>campaigns Code</th>
                <th className='h-6 font-normal'>Start Date</th>
                <th className='h-6 font-normal'>End Date</th>
                <th className='h-6 font-normal'>Latest Update</th>
                <th className='h-6 font-normal'>IFA/CA</th>
                {(!campaignMobileHead.remark===null)&&((campaignMobileHead.remark.length>22)&&(isXsMobileScreen))?
                    <th className='h-12 truncate font-normal'>Remarks</th>
                    :
                    <th className='h-6 font-normal'>Remarks</th>}
                <th className='h-6 font-normal'>Poster</th>
                <th className='h-6 font-normal mb-1'>Edit</th>
				      </tr>
              );})}
			      </thead>
			      <tbody className="sm:w-4/5 w-3/5 ">
            {campaigns.map((campaignMobileBody) => {
                const startDate = new Date(campaignMobileBody.campaignStartDate);
                const endDate = new Date(campaignMobileBody.campaignEndDate);
                const updatedDate = new Date(campaignMobileBody.updatedDate);
                const formattedStartDate = startDate.toISOString().slice(0, 10);
                const formattedEndDate = endDate.toISOString().slice(0, 10);
                const formattedUpdatedDate = updatedDate.toISOString().slice(0, 10);

                if(campaignMobileBody.remark === "NULL"){
                  campaignMobileBody.remark = '';
                }

                if(campaignMobileBody.thumbnailDocID === 0){
                  campaignMobileBody.thumbnailDocID = '';
                }

                return (
                  <tr className="flex flex-col border border-slate-300 mb-2" key={campaignMobileBody.campaignHeaderId}>
                    {((campaignMobileBody.campaignNameEng.length>22)&&(isXsMobileScreen))?
                    <td className='pl-3 pr-3 h-12 '><a className='text-ft-light hover:text-ft' href="/Campaign">{campaignMobileBody.campaignNameEng}</a></td>
                    :
                    <td className='pl-3 pr-3 h-6'><a className='text-ft-light hover:text-ft' href="/Campaign">{campaignMobileBody.campaignNameEng}</a></td>}
                    <td className='pl-3 pr-3 h-6'>{campaignMobileBody.campaignCode}</td>
                    <td className='pl-3 pr-3 h-6'>{formattedStartDate}</td>
                    <td className='pl-3 pr-3 h-6'>{formattedEndDate}</td>
                    <td className='pl-3 pr-3 h-6'>{formattedUpdatedDate}</td>
                    <td className='pl-3 pr-3 h-6'>{campaignMobileBody.ifaCaIndicator}</td>
                    {(!campaignMobileBody.remark===null)&&((campaignMobileBody.remark.length>22)&&(isXsMobileScreen))?
                    <td className='pl-3 pr-3 h-12 truncate'>{campaignMobileBody.remark}</td>
                    :
                    <td className='pl-3 pr-3 h-6'>{campaignMobileBody.remark}</td>}
                    <td className='pl-3 pr-3 h-6'>{campaignMobileBody.thumbnailDocID}</td>
                    <td className='pl-3 pr-3 h-6 mb-1'>
                      <a href='/Campaign'>
                        <svg className='campaign h-6' fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                        </svg>
                      </a>
                    </td>
                  </tr>
                );
              })}
			      </tbody>
		      </table>
	      </div>
        <div className="flex flex-col items-center">
        <div>
          {pagination.totalNumberOfRecords===0?<p className="text-sm text-gray-700">
          No items to show...</p>:<p className="text-sm text-gray-700">
            Showing<span className="font-medium"> {preResult}</span> to <span className="font-medium">{nextResult}</span> of{' '}
            <span className="font-medium">{(pagination.totalNumberOfRecords)}</span> results
          </p>}
        </div>
        {pagination && pagination.totalNumberOfRecords > 0 && (
            <Stack spacing={2}>
              <Pagination
                page={parseInt(pagination.pageNumber + 1)}
                shape={'circular'}
                count={
                  pagination.totalNumberOfRecords && pagination.pageSize && !isNaN(pagination.totalNumberOfRecords) && !isNaN(pagination.pageSize)
                    ? parseInt(Math.trunc(pagination.totalNumberOfRecords / pagination.pageSize) + 1)
                    : 0
                }
                onChange={(e, value) => handlePageChange(value)}
              />
            </Stack>
          )}
        </div>
        <ScrollToTopButton />
  </div>
  
  )
  :   
  (
      <div className='w-deflaut px-2'>
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
              id="Input_SearchCampaignName"
              ref={inputRefCamName}
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
              ref={inputRefCamCode}
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
            <a href="#PleaseEnableJavascript.html" onClick={() => handleCampaignChange()} className="bg-ft-light text-white px-3 py-2 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft">
              Search
            </a>
          </div>
          <div className=''>
            <a href='#PleaseEnableJavascript.html' onClick={()=>handleResetChange()} className="bg-white text-ft-light ring-ft-light ring-1 px-3 py-2 rounded hover:bg-ft hover:text-white active:bg-ft-light active:ring-1 active:ring-ft">
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
        <div className='overflow-y-hidden' >
          <table className="rounded-md border-collapse border border-slate-800 w-table " >
          <thead className=''>
            <tr className="border border-slate-300 " >
              <th className=' hover:text-ft-light cursor-pointer pl-5' onClick={()=> handleOrder("campaignNameEng")}>
                Campaign Name
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
              </th>
            <th className=' hover:text-ft-light cursor-pointer '>
              Campaign Code
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer'>
              Start Date
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer'>
              End Date
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer'>
              Latest Update
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer'>
              IFA/CA
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer'>
              Remarks
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer'>
              Poster
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
            <th className=' hover:text-ft-light cursor-pointer w-20'>
              Edit
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
            </th>
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
                  <tr className="border border-slate-300 " key={campaign.campaignHeaderId}>
                    <td className=''><a className='text-ft-light hover:text-ft pl-5' href="/Campaign">{campaign.campaignNameEng}</a></td>
                    <td className=''>{campaign.campaignCode}</td>
                    <td className=''>{formattedStartDate}</td>
                    <td className=''>{formattedEndDate}</td>
                    <td className=''>{formattedUpdatedDate}</td>
                    <td className=''>{campaign.ifaCaIndicator}</td>
                    <td className=''>{campaign.remark}</td>
                    <td className=''>{campaign.thumbnailDocID}</td>
                    <td className=''>
                      <a href='/Campaign'>
                        <svg className='campaign h-8' fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
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
                    ? parseInt(Math.trunc(pagination.totalNumberOfRecords / pagination.pageSize) + 1)
                    : 0
                }
                onChange={(e, value) => handlePageChange(value)}
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  </div>)}
            </>
  )}

export default CampaignList;