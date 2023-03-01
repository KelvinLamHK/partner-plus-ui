import { useState, useEffect } from 'react';

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [pagination, setPagination] = useState({});
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
      pageNumber: 1,
      pageSize: 10,
      orderBy: "campaignNameEng",
      orderSequence: "desc"
    },
    campaignListParameter: {
      campaignCode: ""
    }
  });

  useEffect(() => {
    // Fetch campaign data using POST request
    fetch('http://localhost:8081/campaign', {
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
      })
      .catch(error => console.error(error));
  }, [postData]);

  const handlePageChange = (pageNumber) => {
    // Update the page number in postData
    const newPostData = { ...postData };
    newPostData.pageableParameter.pageNumber = pageNumber;
    setPostData(newPostData);
  };

  return (
    <div>
      {campaigns.map((campaign) => (
        <form key={campaign.campaignHeaderId}>
          <div>Created Date: {campaign.createdDate}</div>
          <div>Updated Date: {campaign.updatedDate}</div>
          <div>Created By: {campaign.createdBy}</div>
          <div>Updated By: {campaign.updatedBy}</div>
          <div>Campaign Code: {campaign.campaignCode}</div>
          <div>Campaign Name (English): {campaign.campaignNameEng}</div>
          <div>Campaign Name (Traditional Chinese): {campaign.campaignNameZHTW}</div>
          <div>Campaign Name (Simplified Chinese): {campaign.campaignNameZHCN}</div>
          <div>IFA/CA Indicator: {campaign.ifaCaIndicator}</div>
          <div>Remark: {campaign.remark}</div>
          <div>Campaign Start Date: {campaign.campaignStartDate}</div>
          <div>Campaign End Date: {campaign.campaignEndDate}</div>
          <div>Thumbnail Doc ID: {campaign.thumbnailDocID}</div>
          <div>Campaign Header ID: {campaign.campaignHeaderId}</div>
        </form>
      ))}
      <div>
        <button disabled={pagination.pageNumber === 1} onClick={() => handlePageChange(pagination.pageNumber - 1)}>Previous Page</button>
        <span>Page {pagination.pageNumber} of {pagination.totalPages}</span>
        <button disabled={!pagination.hasNext} onClick={() => handlePageChange(pagination.pageNumber + 1)}>Next Page</button>
      </div>
    </div>
  );
}

export default CampaignList;