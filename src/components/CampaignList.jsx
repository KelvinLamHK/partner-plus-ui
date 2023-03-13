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
      pageSize: 50,
      orderBy: "campaignNameEng",
      orderSequence: "desc"
    },
    campaignListParameter: {
      campaignCode: ""
    }
  });

  useEffect(() => {
    // Fetch campaign data using POST request
    fetch('http://localhost:8081/v1/campaign/headers', {
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
      <table className="table-auto border-collapse border border-slate-400 ">
        <thead >
          <tr className="border border-slate-300 ">
            <th >Campaign Name</th>
            <th >Campaign Code</th>
            <th >Start Date</th>
            <th>End Date</th>
            <th>Latest Update</th>
            <th>IFA/CA</th>
            <th>Remarks</th>
            <th>Poster</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr className="border border-slate-300 text-ft" key={campaign.campaignHeaderId}>
              <td ><a href="/Campaign">{campaign.campaignNameEng}</a></td>
              <td border border-slate-300>{campaign.campaignCode}</td>
              <td border border-slate-300>{campaign.campaignStartDate}</td>
              <td border border-slate-300>{campaign.campaignEndDate}</td>
              <td border border-slate-300>{campaign.updatedDate}</td>
              <td border border-slate-300>{campaign.ifaCaIndicator}</td>
              <td border border-slate-300>{campaign.thumbnailDocID}</td>
              <td border border-slate-300>{campaign.remark}</td>
            </tr>
          ))}
          
          </tbody>
          
          </table>
          </div>
  )}

export default CampaignList;