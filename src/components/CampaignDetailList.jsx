import { useState, useEffect} from 'react';
import '../css/campaignListcss.css';
import '../css/lineclamp2css.css';
import {API_BASE_URL} from '../api.config.js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ScrollToTopButton from './ScrollToTopButton';
import Selection from './Selection';
import { useLocation} from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";
import { debounce } from "lodash";


function CampaignDetailList() {

  
  const location = useLocation();
  const PermcampaignHeaderId = ((location.state?.campaignHeaderId)===undefined?localStorage.getItem('campaignheaderId'):location.state.campaignHeaderId);
  const PermcampaignHeaderName = ((location.state?.campaignName)===undefined?localStorage.getItem('campaignName'):location.state.campaignName);


  const options = [
    { label: "Client Name(Eng)", value: "clientFullNameEng" },
    { label: "Client Name(Chi)", value: "clientFullNameChi" },
    { label: "Date of Birth", value: "dateOfBirth" },
    { label: "First Policy Issue Date", value: "firstPolicyIssueDate" },
    { label: "Latest Issued Policy", value: "latestIssuedPolicy" },
    { label: "Broker / Agent Code", value: "servAgentCode" },
    { label: "Company Name", value: "trNameEng" },
    { label: "Agent Name", value: "servAgentName" },
  ];

  const [selected, setSelected] = useState([]);
  const [inputs, setInputs] = useState(options.map((option) => ({ value: "" })));
  const [inputValue, setInputValue] = useState(options.map((option) => ({ value: "" })));

  const handleSelect = (selectedOption) => {
    setSelected(selectedOption);
  };

  const handleCancel = (optionToRemove) => {
    const newSelected = selected.filter((option) => option.value !== optionToRemove.value);
    setSelected(newSelected);
    const inputBox = document.getElementById(`input_${optionToRemove.value}`);
    if (inputBox) {
      inputBox.value = "";
      handleInputChange(optionToRemove, "");
    }
  };

  const handleInputChange = debounce((option, value) => {
    const newInputs = [...inputs];
    const index = options.findIndex((o) => o.value === option.value);
    newInputs[index].value = value;
    setInputs(newInputs);

    const inputValue = options.reduce((acc, cur) => {
      const inputIndex = options.findIndex((o) => o.value === cur.value);
      acc[cur.value] = newInputs[inputIndex].value.trim() === "" ? "" : newInputs[inputIndex].value || null;
      return acc;
    }, {});

    setInputValue(inputValue);
  }, 500);
  

 
  const [selectedValue, setSelectedValue] = useState();
  const [Page, setPage] = useState();
  const [Orderby, setOrderby] = useState("campaignDetailId");
  const [OrderSequence, setOrderSequence] = useState("desc");
  const [campaigns, setCampaigns] = useState([]);
  const [clientFullNameEng] = useState("");
  const [clientFullNameChi] = useState("");
  const [dateOfBirth] = useState("");
  const [firstPolicyIssueDate] = useState("");
  const [latestIssuedPolicy] = useState("");
  const [servAgentCode] = useState("");
  const [servAgentName] = useState("");
  const [trNameEng] = useState("");
  const [preResult, setPreResult] = useState();
  const [nextResult, setNextResult] = useState();
  const [pagination, setPagination] = useState({});
  const [isMobileScreen, setIsMobileScreen] = useState(((window.innerWidth <= 1250)?true:false));
  const [isXsMobileScreen, setXsIsMobileScreen] = useState(((window.screen.width<= 500)||(window.innerWidth<=500)?true:false));
  const [detailData, setDetailData] = useState({
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
    campaignDetailParameter: {
      campaignHeaderId: PermcampaignHeaderId,
      clientFullNameEng:clientFullNameEng,
      clientFullNameChi:clientFullNameChi,
      dateOfBirth:dateOfBirth,
      firstPolicyIssueDate:firstPolicyIssueDate,
      latestIssuedPolicy:latestIssuedPolicy,
      servAgentCode:servAgentCode,
      servAgentName:servAgentName,
      trNameEng:trNameEng
    }
  });


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setDetailData({
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
      campaignDetailParameter: {
        campaignHeaderId: PermcampaignHeaderId,
        clientFullNameEng:inputValue.clientFullNameEng,
        clientFullNameChi:inputValue.clientFullNameChi,
        dateOfBirth:inputValue.dateOfBirth,
        firstPolicyIssueDate:inputValue.firstPolicyIssueDate,
        latestIssuedPolicy:inputValue.latestIssuedPolicy,
        servAgentCode:inputValue.servAgentCode,
        servAgentName:inputValue.servAgentName,
        trNameEng:inputValue.trNameEng
      }
    });
  
  };
  
  const handlePageChange = (event) => {
    setPage(event)
    setDetailData({
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
      campaignDetailParameter: {
        campaignHeaderId: PermcampaignHeaderId,
        clientFullNameEng:inputValue.clientFullNameEng,
        clientFullNameChi:inputValue.clientFullNameChi,
        dateOfBirth:inputValue.dateOfBirth,
        firstPolicyIssueDate:inputValue.firstPolicyIssueDate,
        latestIssuedPolicy:inputValue.latestIssuedPolicy,
        servAgentCode:inputValue.servAgentCode,
        servAgentName:inputValue.servAgentName,
        trNameEng:inputValue.trNameEng
      }
    });
  
  };

  const handleCampaignChange = (campaignheaderId,campaignName) => {
    localStorage.setItem('campaignheaderId', campaignheaderId);
    localStorage.setItem('campaignName', campaignName);

    setDetailData({
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
      campaignDetailParameter: {
        campaignHeaderId: campaignheaderId,
        clientFullNameEng:inputValue.clientFullNameEng,
        clientFullNameChi:inputValue.clientFullNameChi,
        dateOfBirth:inputValue.dateOfBirth,
        firstPolicyIssueDate:inputValue.firstPolicyIssueDate,
        latestIssuedPolicy:inputValue.latestIssuedPolicy,
        servAgentCode:inputValue.servAgentCode,
        servAgentName:inputValue.servAgentName,
        trNameEng:inputValue.trNameEng,
      }
    });
  
  };

  const handleResetChange = () => {
    setPage(1)
    setDetailData({
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
        orderBy: "campaignDetailId",
        orderSequence: "desc"
      },
      campaignDetailParameter: {
        campaignHeaderId: PermcampaignHeaderId,
      }
    });
  
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/campaign/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detailData)
    })
      .then(response => response.json())
      .then(data => {
        setCampaigns(data.campaignDetailList);
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
  }, [detailData, selectedValue, Page]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [Page])
  
  useEffect(() => {
    function handleResize() {
      setIsMobileScreen(window.innerWidth <= 1250);
      setXsIsMobileScreen((window.screen.width<= 500)||(window.innerWidth<=500));
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


  const handleOrder = (event) =>{
    handleOrderBy(event);
    handlePostData(event);
  }

  const handleOrderBy = (event) =>{
    setOrderby(event)
  }

  const handlePostData = (event) =>{
    if(OrderSequence==="desc"){
      setOrderSequence("asc")
      setDetailData({
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
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          orderBy: event,
          orderSequence: "asc"
        },
        campaignDetailParameter: {
          campaignHeaderId: PermcampaignHeaderId,
          clientFullNameEng:clientFullNameEng,
          clientFullNameChi:clientFullNameChi,
          dateOfBirth:dateOfBirth,
          firstPolicyIssueDate:firstPolicyIssueDate,
          latestIssuedPolicy:latestIssuedPolicy,
          servAgentCode:servAgentCode,
          servAgentName:servAgentName,
          trNameEng:trNameEng
        }
      })
    }else{
      setOrderSequence("desc")
      setDetailData({
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
          pageNumber: pagination.pageNumber,
          pageSize: pagination.pageSize,
          orderBy: event,
          orderSequence: "desc"
        },
        campaignDetailParameter: {
          campaignHeaderId: PermcampaignHeaderId,
          clientFullNameEng:clientFullNameEng,
          clientFullNameChi:clientFullNameChi,
          dateOfBirth:dateOfBirth,
          firstPolicyIssueDate:firstPolicyIssueDate,
          latestIssuedPolicy:latestIssuedPolicy,
          servAgentCode:servAgentCode,
          servAgentName:servAgentName,
          trNameEng:trNameEng
        }
      })
    }
    
  }




  return (
    <>
    {isMobileScreen ? ( <div className='w-full '>
          <div className=''>
            <h1>Campaign Detail</h1>
          </div>
          <div className='mt-5 flex'>
            <div className='w-full'> 
              <Selection />
            </div>
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
          <div className='flex mt-5'>
            <a href="/Campagin" className='w-1/3 mr-2 px-3 py-2 text-center bg-white text-ft-light ring-1 ring-ft-light rounded'>Import</a>
            <a href="/Campagin" className='w-1/3 mr-2 px-3 py-2 text-center text-white bg-ft-light  rounded'>Export</a>
            <a href="/Campagin" className='w-1/3 mr-2 px-3 py-2 text-center text-white bg-ft-light  rounded'>Export All</a>
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
			      <thead className="sm:w-2/5 w-2/5 text-white">
            {campaigns.map((campaignMobileTitle) => {
              return (
				      <tr className="pl-1 bg-ft-light flex flex-col mb-2 border border-slate-300" key={campaignMobileTitle.campaignDetailId}>
                    {isXsMobileScreen?
                    <><th className='font-normal h-12'>Client Name(Eng)</th></>
                    :
                    <th className='h-6 font-normal'>Client Name(Eng)</th>}
                     {isXsMobileScreen?
                    <><th className='h-12 font-normal'>Client Name(Chi)</th></>
                    :
                    <th className='h-6 font-normal'>Client Name(Chi)</th>}
                {isXsMobileScreen?
                    <><th className='h-12 font-normal'>Date of Birth</th></>
                    :
                    <th className='h-6 font-normal'>Date of Birth</th>}
                
                {isXsMobileScreen?
                    <><th className='h-12 font-normal'>First Policy Issue Date</th></>
                    :
                    <th className='h-6 font-normal'>First Policy Issue Date</th>}
                      {isXsMobileScreen?
                    <><th className='h-12 font-normal'>Latest Issued Policy</th></>
                    :
                    <th className='h-6 font-normal'>Latest Issued Policy</th>}
                      {isXsMobileScreen?
                    <><th className='h-12 font-normal'>Broker / Agent Code</th></>
                    :
                    <th className='h-6 font-normal'>Broker / Agent Code</th>}

                {isXsMobileScreen?
                    <th className='h-12 truncate font-normal'>Company Name</th>
                    :
                    <th className='h-6 font-normal'>Company Name</th>}
                <th className='h-12 font-normal'>Agent Name</th>
                {/* <th className='h-6 font-normal mb-1'>Edit</th> */}
				      </tr>
              );})}
			      </thead>
			      <tbody className="sm:w-3/5 w-3/5 ">
            {campaigns.map((campaignMobileBody) => {
                const dateOfBirth = new Date(campaignMobileBody.dateOfBirth);
                const firstPolicyIssueDate = new Date(campaignMobileBody.firstPolicyIssueDate);
                const formattedDateOfBirth = dateOfBirth.toISOString().slice(0, 10);
                const formattedFirstPolicyIssueDate = firstPolicyIssueDate.toISOString().slice(0, 10);



                return (
                  <tr className="flex flex-col border border-slate-300 mb-2" key={campaignMobileBody.campaignDetailId}>
                    {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12 lineclamp2'>{campaignMobileBody.clientFullNameEng}</td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{campaignMobileBody.clientFullNameEng}</td>}
                    
                    {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12 break-all'>{campaignMobileBody.clientFullNameChi}</td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{campaignMobileBody.clientFullNameChi}</td>}
                    
                    {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12 break-all'>{formattedDateOfBirth}</td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{formattedDateOfBirth}</td>}

            
                    {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12 break-all'>{formattedFirstPolicyIssueDate}</td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{formattedFirstPolicyIssueDate}</td>}
                    {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12 break-all'>{campaignMobileBody.latestIssuedPolicy}</td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{      campaignMobileBody.latestIssuedPolicy}
                  </td>}
                                        {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12 break-all'>{campaignMobileBody.servAgentCode}</td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{campaignMobileBody.servAgentCode}</td>}
                    {isXsMobileScreen?
                    <td className='pl-3 pr-3 h-12'><div className='lineclamp2 '>{campaignMobileBody.trNameEng}</div></td>
                    :
                    <td className='pl-3 pr-3 h-6 truncate'>{campaignMobileBody.trNameEng}</td>}
                    <td className='pl-3 pr-3 h-12 break-all'>{campaignMobileBody.servAgentName}</td>
                    {/* <td className='pl-3 pr-3 h-6 mb-1'>
                      <a href='/EditCampaign' onClick={()=> EditCampaign(campaignMobileBody)}>
                        <svg className='campaign h-6' fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                        </svg>
                      </a>
                    </td> */}
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
          <h1><a href='/Campaign' className='text-ft-light hover:text-ft'>{PermcampaignHeaderName}</a></h1>
          </div>
         
        </div>
   
        <div className='w-full flex justify-center mb-4'>
        <div className="w-2/3 mr-5">
        <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={handleSelect}
        labelledBy={"Select"}
        isCreatable={true}
      />
      {selected.map((option, index) => (
        <div className="mt-2 " key={option.value}>
          <label>{option.label}:</label>
          <div className="flex">
            <input
              className="rounded mr-2"
              type={option.value==="dateOfBirth"||option.value==="firstPolicyIssueDate"?"date":"text"}
              id={`input_${option.value}`}
              defaultValue=""
              onInput={(e) => handleInputChange(option, e.target.value)}
            />
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleCancel({ ...option, index })}
            >
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
        </div>
        <div className="w-1/3 flex flex-col justify-between mt-2">
        
          <div className='h-1/2 flex'> 
          <div className='mr-5'>
            <a href="#PleaseEnableJavascript.html" onClick={() => handleCampaignChange(PermcampaignHeaderId,PermcampaignHeaderName)} className="bg-ft-light text-white px-3 py-2 rounded hover:bg-ft active:bg-white active:text-ft active:ring-1 active:ring-ft">
              Search
            </a>
          </div>
          <div className=''>
            <a href='#PleaseEnableJavascript.html' onClick={()=>handleResetChange(PermcampaignHeaderId,PermcampaignHeaderName)} className="bg-white text-ft-light ring-ft-light ring-1 px-3 py-2 rounded hover:bg-ft hover:text-white active:bg-ft-light active:ring-1 active:ring-ft">
              Reset
            </a>
          </div>
          </div>
        </div>
        </div>
        <div className='mt-5 flex justify-between'>
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
          <div>
            <a href="/Campagin" className='mr-2 px-3 py-2 bg-white text-ft-light ring-1 ring-ft-light rounded'>Import</a>
            <a href="/Campagin" className='mr-2 px-3 py-2 text-white bg-ft-light  rounded'>Export</a>
            <a href="/Campagin" className='mr-2 px-3 py-2 text-white bg-ft-light  rounded'>Export All</a>
          </div>
        </div>
        <div className='w-table flex '>
        <div className='overflow-x w-full '>
        <table className='table-fixed overflow-scroll w-full block'>
            <thead>
                <tr className='border border-slate-300 '>
                <th className=' hover:text-ft-light cursor-pointer pl-5 h-8' onClick={()=> handleOrder("clientFullNameEng")}>
                <div className='inline-block h-6 w-56'>
                Client Name(Eng)
                <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                </svg>
                </div>
              </th>
            <th className=' hover:text-ft-light cursor-pointer h-8 ' onClick={()=> handleOrder("clientFullNameChi")}>
            <div className='inline-block h-6 w-52'>Client Name(Chi)
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' hover:text-ft-light cursor-pointer h-8 ' onClick={()=> handleOrder("dateOfBirth")}>
            <div className='inline-block h-6 w-48'>
            Date of Birth
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' hover:text-ft-light cursor-pointer h-8' onClick={()=> handleOrder("firstPolicyIssueDate")}>
            <div className='inline-block h-6 w-56'>
            First Policy Issue Date
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' hover:text-ft-light cursor-pointer h-8' onClick={()=> handleOrder("latestIssuedPolicy")}>
            <div className='inline-block h-6 w-56'>
            Latest Issued Policy
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' hover:text-ft-light cursor-pointer h-8' onClick={()=> handleOrder("servAgentCode")}>
            <div className='inline-block h-6 w-48'>
            Broker / Agent Code
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' hover:text-ft-light cursor-pointer h-8' onClick={()=> handleOrder("servAgentName")}>
            <div className='inline-block h-6 w-44'>
              Company Name
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            <th className=' hover:text-ft-light cursor-pointer h-8' onClick={()=> handleOrder("trNameEng")}>
            <div className='inline-block h-6 w-44'>
            Agent Name
              <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="inline-block w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg>
              </div>
            </th>
            
            {/* <th className=' h-8'>
              <div className='inline-block h-6 w-16'>
                Edit
                 </div>
            </th> */}
           
                </tr>
            </thead>
            <tbody className='text-left '>
            {campaigns.map((campaign) => {
                const dateOfBirth = new Date(campaign.dateOfBirth);
                const firstPolicyIssueDate = new Date(campaign.firstPolicyIssueDate);
                const formattedDateOfBirth = dateOfBirth.toISOString().slice(0, 10);
                const formattedFirstPolicyIssueDate = firstPolicyIssueDate.toISOString().slice(0, 10);

                if(campaign.remark === "NULL"){
                  campaign.remark = '';
                }

                if(campaign.thumbnailDocID === 0){
                  campaign.thumbnailDocID = '';
                }

                return (
                  <tr className="border border-slate-300 h-16" key={campaign.campaignDetailId}>
                    <td className=''><div className='w-52 lineclamp2 pl-5 items-center'>{campaign.clientFullNameEng}</div></td>
                    <td className=''><div className='w-48 break-all  items-center align-middle' >{campaign.clientFullNameChi}</div></td>
                    <td className=''>{formattedDateOfBirth}</td>
                    <td className=''>{formattedFirstPolicyIssueDate}</td>
                    <td className=''>{campaign.latestIssuedPolicy}</td>
                    <td className=''>{campaign.servAgentCode}</td>
                    <td className=''><div data-tooltip-target="tooltip-default" className='w-40 lineclamp2'>{campaign.servAgentName}</div></td>
                    <td className=''>{campaign.trNameEng}</td>
                    {/* <td className=''>
                      <a href='/EditCampaign' onClick={()=> EditCampaign(campaign)}>
                        <svg className='campaign h-8' fill="none"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                        </svg>
                      </a>
                    </td> */}
                  </tr>
                );
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
  </div>)}
            </>
  )}

export default CampaignDetailList;