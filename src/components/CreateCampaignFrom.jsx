import React, { useState } from 'react';

function CreateCampaignFrom() {
  const [values, setValues] = useState({
    campaignNameEng: '',
    campaignCode: '',
    campaignNameZHTW: '',
    campaignStartDate: '',
    campaignNameZHCN: '',
    campaignEndDate: '',
    ifaCaIndicator:'',
    remark:'',
    file:'',
  });

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        const fileContent = reader.result.split(',')[1];
        setValues({ ...values, [values.file]: fileContent });
      };
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form className='border border-red rounded p-1'>
      <div className="form-row flex m-3">
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="campaignNameEng">Campaign Name(Eng)</label>
                <input
                    type="text"
                    className="form-control"
                    id="campaignNameEng"
                    name="campaignNameEng"
                    value={values.campaignNameEng}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="campaignCode">Campaign Code</label>
                <input
                    type="text"
                    className="form-control"
                    id="campaignCode"
                    name="campaignCode"
                    value={values.campaignCode}
                    onChange={handleChange}
                />
            </div>
        </div>
      </div>
      <div className="form-row flex m-3">
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="campaignNameZHTW">Campaign Name(Trad Chi)</label>
                <input
                    type="text"
                    className="form-control"
                    id="campaignNameZHTW"
                    name="campaignNameZHTW"
                    value={values.campaignNameZHTW}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="campaignStartDate">Start Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="campaignStartDate"
                    name="campaignStartDate"
                    value={values.campaignStartDate}
                    onChange={handleChange}
                />
            </div>
        </div>
      </div>
      <div className="form-row flex m-3">
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="campaignNameZHCN">Campaign Name(Simp Chi)</label>
                <input
                    type="text"
                    className="form-control"
                    id="campaignNameZHCN"
                    name="campaignNameZHCN"
                    value={values.campaignNameZHCN}
                    onChange={handleChange}
                />
            </div>
        </div>
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="campaignEndDate">End Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="campaignEndDate"
                    name="campaignEndDate"
                    value={values.campaignEndDate}
                    onChange={handleChange}
                />
            </div>
        </div>
      </div>
      <div className="form-row flex m-3">
        <div className="form-group w-1/2 flex justify-center">
            <div className='w-11/12'>
                <label htmlFor="IFA/CA">IFA/CA</label>
                <select
                    id="IFACA"
                    aria-label="Select IFA/CA"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-ft-light focus:border-ft-light p-2.5"
                    value={values.ifaCaIndicator}
                    name="ifaCaIndicator"
                    onChange={handleChange}
                    >
                    <option value="IFA/CA">IFA / CA</option>
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
        <div className="form-row flex m-3">  
        <div className='px-4 w-full'>
                <label htmlFor="remark">Remarks</label>
                <textarea
                    type="text"
                    className="form-control"
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
                Browse to upload try try 
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                />
            </div>
        </div>
    </form>
  );
}

export default CreateCampaignFrom;