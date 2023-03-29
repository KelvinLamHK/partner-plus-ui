import React, { useState} from 'react';
import {API_BASE_URL} from "../api.config.js"
import Swal from "sweetalert2";

const CreateCampaignForm = (props) =>  {
  const [IFACA, setIFACA] = useState("IFA/CA");
  const [values, setValues] = useState(props===""?{
    campaignNameEng: '',
    campaignCode: '',
    campaignNameZHTW: '',
    campaignStartDate: '',
    campaignNameZHCN: '',
    campaignEndDate: '',
    remark:'',
    file:'',
  }:{
    campaignNameEng:props.campaign.campaignNameEng,
    campaignCode: props.campaign.campaignCode,
    campaignNameZHTW: props.campaign.campaignNameZHTW,
    campaignStartDate: props.campaign.campaignStartDate.slice(0, 10),
    campaignNameZHCN: props.campaign.campaignNameZHCN,
    campaignEndDate: props.campaign.campaignStartDate.slice(0, 10),
    remark:props.campaign.remark,
    file:props.campaign.file,
  });
  const [postImage, setPostImage] = useState({
    myFile: "",
  });


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };



  const handleIFACAChange = (event) => {
    setIFACA(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const goBack = () => {
    window.location.href = "/Campaign";
    return null;
  }

  const handleSubmit = async (e) => {
    if(values.campaignNameZHCN === undefined || values.campaignNameZHCN === null){
        values.campaignNameZHCN=""
    }

    if(values.thumbnailDocID === undefined || values.thumbnailDocID === null){
        values.thumbnailDocID=""
    }

    if(values.remark === undefined || values.remark === null){
        values.remark=""
    }

    if(values.file === undefined || values.file === null){
        values.file=""
    }
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/v1/campaign/header`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userParameter: {
                loginName: "IFA-0317543-00006",
                name: "XXXXXXXX Wong",
                companyID: "IFA",
                email: "xxxxxxxxxxxx@iamlegacy.com",
                brokerCode: "0328693;0317543;0328693;0328693",
                ifaIdentity: "USER",
                pibaNumber: "PIBA-0433-022049",
                ifaCaNameEng: "XXXX Ip Wun",
                ifa_ca_name_oth: "XXX",
                ifaCaNameOther: "IA9205",
                companyName: null,
                ifaCaLicenseNumber: "TR1234",
                role: "internal-admin"
            },
            campaignHeaderParameter: {
                campaignCode: values.campaignCode,
                campaignNameEng: values.campaignNameEng,
                campaignNameZHTW: values.campaignNameZHTW,
                campaignNameZHCN:values.campaignNameZHCN,
                ifaCaIndicator: IFACA,
                remark: values.remark,
                thumbnailDocID: null,
                campaignStartDate: values.campaignStartDate,
                campaignEndDate: values.campaignEndDate
            }
        })
      });
      const data = await response.text();
      if (isNaN(+data)) {
        Swal.fire({
            icon: 'success',
            title: (props===""?'Created Campaign':'Updated Campaign'),
            showConfirmButton: false,
            timer: 1700
        }).then(function() {
            window.location = "/Campaign";
        });
    }
    } catch (error) {
    } 
  };



  return (
    <div>
        <form className='border border-red rounded p-1' onSubmit={handleSubmit}>
        <div className="form-row flex mx-3 my-5">
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="campaignNameEng">Campaign Name(Eng)<span className='text-red-600'>*</span></label>
                    <input
                        type="text"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="campaignNameEng"
                        name="campaignNameEng"
                        value={values.campaignNameEng}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="campaignCode">Campaign Code<span className='text-red-600'>*</span></label>
                    <input
                        type="text"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="campaignCode"
                        name="campaignCode"
                        value={values.campaignCode}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>
        <div className="form-row flex mx-3 my-5">
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="campaignNameZHTW">Campaign Name(Trad Chi)<span className='text-red-600'>*</span></label>
                    <input
                        type="text"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="campaignNameZHTW"
                        name="campaignNameZHTW"
                        value={values.campaignNameZHTW}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="campaignStartDate">Start Date<span className='text-red-600'>*</span></label>
                    <input
                        type="date"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="campaignStartDate"
                        name="campaignStartDate"
                        value={values.campaignStartDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>
        <div className="form-row flex mx-3 my-5">
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="campaignNameZHCN">Campaign Name(Simp Chi)</label>
                    <input
                        type="text"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="campaignNameZHCN"
                        name="campaignNameZHCN"
                        value={values.campaignNameZHCN}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="campaignEndDate">End Date<span className='text-red-600'>*</span></label>
                    <input
                        type="date"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="campaignEndDate"
                        name="campaignEndDate"
                        value={values.campaignEndDate}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
        </div>
        <div className="form-row flex mx-3 my-5">
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                    <label htmlFor="IFA/CA">IFA/CA<span className='text-red-600'>*</span></label>
                    <select
                        id="IFACA"
                        aria-label="Select IFA/CA"
                        className="w-full bg-white-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-ft-light focus:border-ft-light p-2.5"
                        value={IFACA}
                        name="ifaCaIndicator"
                        onChange={handleIFACAChange}
                        >
                        <option value="IFA/CA">IFA & CA</option>
                        <option value="IFA">IFA</option>
                        <option value="CA">CA</option>
                    </select> 
                </div>
            </div>
            <div className="form-group w-1/2 flex justify-center">
                <div className='w-11/12'>
                
                </div>
            </div>
        </div>
            <div className="form-row flex mx-3 my-5">  
            <div className='px-4 w-full'>
                    <label htmlFor="remark">Remarks</label>
                    <textarea
                        type="text"
                        className="form-control ring-0 hover:border-ft-light active:border-ft-light focus:border-ft-light"
                        id="remark"
                        name="remark"
                        value={values.remark}
                        onChange={handleChange}
                    />
                    
                </div>
            </div>
            <div className="form-row flex m-3">  
                <div className='px-4 w-full'>
                    <label htmlFor="file-upload" className="upload-label mr-3">
                        Browse to upload
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                    />
                </div>
            </div>
            <div className="px-6 py-4 flex justify-end">
            <button onClick={goBack} type="button" className="text-ft-light ring-1 ring-ft-light bg-white hover:bg-ft hover:text-white rounded-md px-4 py-2 active:bg-white active:text-red-500 active:ring-1 active:ring-red-500 transition">Cancel</button>
            <button type="Submit" className="ml-4 text-white bg-ft-light hover:bg-ft rounded-md px-4 py-2 active:bg-white active:text-ft active:ring-1 active:ring-ft transition">Save</button>
        </div>
        </form>
       
    </div>
  );
}

export default CreateCampaignForm;