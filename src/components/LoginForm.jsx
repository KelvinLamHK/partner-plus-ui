import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import NWL_bilingual from "../img/NWL_bilingual.png";
import "../css/LoginFormCss.css"
import {API_BASE_URL} from "../api.config.js"

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isRecord, setIsRecord] = useState(false);
    const [cookies, setCookies] = useState("");
    const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const deviceId = await getCurrentBrowserFingerPrint();
    const response = await fetch(`${API_BASE_URL}/authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        header: {
          send_sysname: "CLNT",
          sender: "ICBC",
          recv_sysname: "ECIF",
          receiver: "CCDC",
          msg_type: "ecif.301",
          msg_id: "20150514M3123213321421",
          send_time: "2021-09-06T12:34:56.789",
          checksum: "A1B2D3F4E5A6C7D8E9F0A1A2C3F4B5E6D7C8A9F0",
          signature: "BASE64Text",
          exts: {}
        },
        bodys: {
          body: [
            {
              username: username,
              password: password,
              otp_code: "LLL",
              login_type: "not-otp",
              deviceId:deviceId
            }
          ]
        } 
      }
    )
    });
    const data = await response.text();
    setCookies(data)
    if (data === "Invalid") {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Incorrect username or password",
        type: "error",
      });
      setIsError(true);
    } else {
      setIsSuccess(true);
    }
  } catch (error) {
    console.error(error);
    setIsError(true);
  } finally {
    setIsLoading(false);
  }
};

    useEffect(() => {
      const deviceId = getCurrentBrowserFingerPrint();
      const checkToken = async () => {
        const token = Cookies.get("PLUSID");
        if (token) {
          try {
            const response = await fetch(`${API_BASE_URL}/protected`, {
              mode:'no-cors',
              method: 'POST',
              headers: {
                'Authorization': 'plus ' + token,
                'DeviceId': deviceId
              }
            });
            const data = await response.text();
            if (data !== 'Invalid') {
              setIsRecord(true);
            }
          } catch (error) {
            console.error(error);
          }
        }
      };
      checkToken();
    }, []);
    
      if (isRecord) {
        window.location.href = "/Landing";
        return null;
      }
    
      if (isSuccess) {

        const handleAccept = () => {
          Cookies.set("PLUSID", cookies, { expires: 7 });
          window.location.href = "/Landing";
        };
      
        const handleDecline = () => {
          Cookies.remove('PLUSID');
          window.location.href = "/login";
        };
return(    
<div className="w-3/4 overflow-y-hidden rounded flex items-center">
<div className="" aria-labelledby="exampleModalScrollableTitle" role="dialog" aria-modal="true">
<div className="flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-lg ">
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-900" id="exampleModalScrollableTitle">Partner Plus - Terms of Use</h5>
      </div>
      <div className="modal-body h-96 overflow-y-auto">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife Insurance Company Limited (Incorporated in Bermuda with limited liability) ("FTLife") reserves any rights not expressly granted herein.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Partner Plus ("this web site") is an Internet-based private portal site solely for authorized FTLife agents, corporate agencies (including their duly authorized responsible officers and technical representatives, if any), distribution channels (including without limitation insurance brokers and independent financial advisors) and staff only.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The Partner Plus may contain e-mail services, bulletin board services, file download services, information inquiry services, electronic forms, financial needs analysis, insurance proposal and/or other message or communication facilities designed to enable authorized users to communicate with others and perform business supporting services (collectively, "Partner Plus Services").        
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        1. Modification of the Terms of Use        
        </h6>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife reserves the right to amend the terms, conditions, and notices contained herein ("Terms of Use") under which the Partner Plus Services are offered. You are responsible for regularly reviewing the Terms of Use and any other additional terms posted on particular web sites associated with the Partner Plus. Your continued use or visiting of this web site constitutes your agreement to all the Terms of Use and such other additional terms.        
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        2. General    
        </h6>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        By clicking the "Accept" button, or visiting/accessing this web site and any of its pages, or using the Partner Plus Services, you agree to abide by the Terms of Use.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You undertake fully and effectively to indemnify and keep indemnified at all times FTLife against all loss, damages, actions, proceedings, costs, claims, demands, liabilities and expenses whatsoever (including legal and other fees and disbursements) sustained, incurred or paid by FTLife directly or indirectly in respect of:        
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        (i) the access to this web site and any of its pages and/or use of the Partner Plus Services by you (other than as permitted by the Terms of Use and authorized by FTLife);
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        (ii) any information, data or material produced by you in whole or in part from this web site and/or any of its pages and/or the Partner Plus Services; or
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        (iii) any breach of or non-compliance with any of the provisions of Terms of Use by you.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You further undertake that you will not seek to recover and shall not be entitled to recover from FTLife or to be indemnified by FTLife in respect of any direct, indirect or consequential loss or damage or against any claims, proceedings, costs, demands, liabilities and expenses whatsoever sustained, incurred or paid by you arising from the use of this web site and any of its pages and/or the Partner Plus Services.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Without prejudice to the accrued rights of remedies of FTLife under the Terms of Use, FTLife shall be entitled to forthwith terminate your right to access this web site or use the Partner Plus Services if:
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        (i) you breach or fail to comply with the Term of Use; or
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        (ii) you do not have or fail to maintain valid and appropriate licences from relevant authorities in Hong Kong including without limitation the Office of the Commissioner of Insurance/Insurance Authority, the Professional Insurance Brokers Association, the Hong Kong Confederation of Insurance Brokers and the Securities and Futures Commission which are required for you to perform the business service anticipated hereunder; or
        </p>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        (iii) (a) your agent’s contract, corporate agency agreement or employment contract with FTLife is terminated; or (b) your employment contract in respect of your role of responsible officer or technical representative with an FTLife corporate agency is terminated; or (c) the distribution agreement between you or the Company you work for and FTLife is terminated or your employment contract with such the Company you work for is terminated.        
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        When a user attempts to login to the Partner Plus, certain information may be recorded including the IP address, username, browser type, and the login date/time. This information is recorded for security reasons and used for statistical and monitoring purposes.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        3. Site Content
        </h6>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The information contained on the pages of this web site and any of its pages or the Partner Plus Services is subject to modification and update from time to time without notice. FTLife cannot guarantee or ensure either the accuracy, completeness or authenticity of any site content, site functionality, or your transmission of any site content from the site to you.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Some of the information on this web site may contain projections or other forward-looking statements regarding future events or the future financial performance of investment related products. You are hereby cautioned that these statements are only predictions and that the actual events or results may differ materially.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        4. Governing Law And Jurisdiction
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The products and services posted on this web site are intended for citizens of Hong Kong Special Administrative Region ("HKSAR"), HKSAR permanent residents and foreign nationals residing in HKSAR. Nothing in this web site shall be construed as an offer to sell or solicitation to buy or provision of any product or service outside of HKSAR. FTLife and its affiliates do not offer or sell any insurance product or other product or service (collectively "Product") in any other jurisdictions in which such offering or sale of the Product is illegal under the laws of such jurisdiction. If any Product is offered / sold by FTLife or its affiliates in any jurisdiction in which such offering or sale is illegal (under the laws of such jurisdiction), such offering or sale shall neither be effective nor valid. Unless otherwise expressly set forth herein, FTLife or its affiliates has not made any representation that: (i) materials on this web site are appropriate for use in any location outside HKSAR; or (ii) the products and services available through this web site comply with the laws of any country outside HKSAR. In the event that the jurisdiction you are in imposes restrictions on our services or do not permit access to the contents of this web site, you shall comply with such restrictions or forthwith discontinue access (as the case may be) hereto. FTLife or its affiliates shall not be liable to any person in any way for visiting this web site.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        5. User Account & Password
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The Partner Plus user account id/name is assigned by FTLife following a defined convention as determined by FTLife. You shall not: (i) use a username in which another person has rights without such person's authorization; or (ii) use a username or password that FTLife, in its sole and absolute discretion, deems offensive or inappropriate. FTLife reserves the right to deny creation of your user account based on FTLife's inability to verify the authenticity of your registration information.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        It is your responsibility to protect your password. You agree not to reveal your password to other users and you agree to indemnify and hold FTLife harmless for any improper or illegal use of your Partner Plus user accounts. This includes illegal or improper use by someone to whom you have given permission to use your Partner Plus user accounts.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You shall be solely responsible for maintaining the confidentiality of your password. You shall immediately notify FTLife of any known or suspected unauthorized use(s) of your user account, or any known or suspected breach of security, including loss, theft, or unauthorized disclosure of your password information. You must logout from your user account at the end of each session. You shall not allow any third party to use your username and password. You are fully responsible for all usage or activity on your Partner Plus user account, including but not limited to the use of your user account by any third party authorized by you to use your username and password, and undertakes to indemnify at all times FTLife against any loss or damages suffered as a result of such usage or activity. FTLife reserves the right to terminate your user account, in its sole and absolute discretion, at any time without notice and cause.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        6. Storage Space and Other Limitations
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You agree that FTLife has the right to establish limits concerning use of any Partner Plus Services offered on this web site, including without limitation the maximum number of days that e-mail messages will be retained by any Partner Plus Services, the maximum number of e-mail messages that may be sent from or received by an Partner Plus user account on any Partner Plus Services, the maximum size of an e-mail message that may be sent from or received by an user account on any Partner Plus Services, the maximum disk space that will be allotted to you on FTLife's servers, and the maximum number of times and duration you may access any Partner Plus Services in a given period of time.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You agree that FTLife has no responsibility or liability for the deletion or corruption of or failure to store any messages or other content maintained or transmitted by any Partner Plus Services. You acknowledge that FTLife reserves the rights to log off user accounts that are inactive for an extended period of time without notice.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife MAKES NO WARRANTY THAT ANY PARTNER PLUS SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        7. Security
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife may update or change the security measures from time to time without notice or when it is deemed necessary.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Only authorized FTLife agents, corporate agencies (including their duly authorized responsible officers and technical representatives, if any), distribution channels (including without limitation insurance brokers and independent financial advisors) and staff who need the information to carry out specific functions are granted access to personally identifiable information. All authorized FTLife agents, corporate agencies (including their duly authorized responsible officers and technical representatives, if any), distribution channels (including without limitation insurance brokers and independent financial advisors) and staff are kept up to date on our security and privacy practices. The servers that we store personally identifiable information on are kept in a secure environment.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        We authorize access to an individual's personal information only to those who have a legitimate need to know in order to provide and maintain our products and services or are entitled to access the information as required by law. Authorized users who have access to this information are required to follow company procedures designed to keep the information secure and confidential. We maintain physical, electronic and procedural safeguards to protect this information.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Certain functions on the Partner Plus web site related to personal identifiable information are encrypted with 256bit strong encryption key.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        To insure secure communications over the Internet, Partner Plus uses industry standard Secure Socket Layer (SSL) encryption technology to protect transmitted information from being intercepted while it is in transit over the Internet. Access to Partner Plus requires proper authentication through the entry of correct user ID and password. Partner Plus is protected by firewalls and other access control systems to keep it secure from unauthorized access.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        As explained above, we share information only in the limited manner necessary to conduct business and provide service to our customers or as required by law.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        8. Warranties
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You warrant and undertake: (i) that you have and shall maintain at all times valid and appropriate licences from relevant authorities in Hong Kong including without limitation the Office of the Commissioner of Insurance/Insurance Authority, the Professional Insurance Brokers Association, the Hong Kong Confederation of Insurance Brokers and the Securities and Futures Commission which are required for you to perform the business services anticipated hereunder; and (ii) to advise clients on the appropriate disclaimer when you perform the business services anticipated hereunder.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        9. No Spam
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife will in its sole and absolute discretion immediately terminate any user account, which it believes is transmitting or is otherwise connected with any spam or other unsolicited bulk email.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        10. Intellectual Property
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        This web site and any of its pages and the Partner Plus Services including but not limited to text, data, photographs, video, audio and graphics contained herein or which may be accessible through this web site (the "Content"), is protected by copyrights, trademarks, service marks, international treaties and/or other proprietary rights and laws of the Hong Kong Special Administrative Region (HKSAR) and other countries.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The copyright and any and all of the copyright, trademarks, and other intellectual property rights subsisting in or used in connection with the Content including the manner in which it is presented or appears are (unless another owner is specified therein or thereon hereinafter referred to as the "Owner") the property of FTLife or Owner as the case may be.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The Content is also protected as a collective work or compilation under HKSAR copyright and other laws and treaties. All individual articles, columns and other elements making up the Content are also copyrighted works. You agree to abide by all applicable copyright and other laws, as well as any additional copyright notices or restrictions contained in the Content.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        11. Use of the Site
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife does not warrant the absence of delays, failures, errors, omissions or loss in respect of any information transmitted through this web site. FTLife does not guarantee any of the following: a) no viruses or other contaminating or destructive properties will be transmitted through this web site; or b) no damage will occur to any computer system connecting to this web site. Users of this web site shall have sole responsibility in protecting and backing up their data and/or equipment; and in taking any precautionary measures against computer viruses or other contaminating or destructive properties as they think appropriate and necessary.
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You shall use the Partner Plus Services only to post, send and receive messages and material that are proper and, related to servicing customers. In connection with your use of the Partner Plus Services, you undertake that you shall not:
        </p>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        a) Transmit any message, information, data, text, software or images, or other content ("Material") that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, or otherwise objectionable that may invade another's right of privacy or publicity;
        <br/>
        b) Impersonate any person or entity, including but not limited to, an FTLife official, policyholder, prospective policyholder, or host or falsely state or otherwise misrepresent your affiliation with a person or entity;        
        <br/>
        c) Post or transmit any Material that you do not have a right to reproduce, display or transmit under any law or under contractual (include the Terms of Use) or fiduciary relationships (such as non-disclosure agreements);
        <br/>
        d) Post or transmit any Material that contains a virus or corrupted data;
        <br/>
        e) Delete any author attributions, legal notices or proprietary designations or labels that you upload to any communication feature;
        <br/>
        f) Use the Site's communication features in a manner that adversely affects the availability of its resources to other users (e.g., excessive shouting, use of all caps, or flooding continuous posting of repetitive text);
        <br/>
        g) Post or transmit any unsolicited advertising, promotional materials, surveys, contests, "junk mail", "spam," "chain letters," "pyramid schemes" or any other form of solicitation or information such as opinions or notices, commercial or otherwise;
        <br/>
        h) Violate any applicable local, national or international law;
        <br/>
        i) Upload or transmit any Material that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party;
        <br/>
        j) Delete or revise any Material posted by any other person or entity;
        <br/>
        k) Manipulate or otherwise display the Partner Plus by using framing or similar navigational technology;
        <br/>
        l) Upload files that contain viruses, Trojan horses, worms, time bombs, cancelbots, corrupted files, or any other similar software or programs that may damage the operation of another's computer or property of another;
        <br/>
        m) Download any file posted by another user of Partner Plus that you know, or reasonably should know, cannot be legally distributed in such manner;
        <br/>
        n) Harvest or otherwise collect information about others, including e-mail addresses;
        <br/>
        o) Violate any applicable laws or regulations;
        <br/>
        p) Use, download or otherwise copy, or provide (whether or not for a fee) to a person or entity any directory of users of the Partner Plus Services or other user or usage information or any portion thereof;
        <br/>
        q) execute electronic forms on behalf of any person; and
        <br/>
        r) procure execution of electronic forms unless the use of electronic signature by a signatory (including but not limited to a policyholder or prospective policyholder) in the circumstances indicates authentication or approval of the information in the electronic form by the signatory.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        12. Indemnification
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Without prejudice to the accrued rights of remedies of FTLife under the Terms of Use, you undertake to defend, indemnify, and hold harmless FTLife and its subsidiary and other affiliated companies, and their employees, agents, contractors, officers, and directors from and against all liabilities, damages, claims, and expenses, including legal fees, that arise from your use or misuse of the Partner Plus Service (including without limitation (i) any negligent, wrongful conduct, or breach of or failure to comply with the Terms of Use on your part; or (ii) any use of the Partner Plus Service while you do not have or fail to maintain valid and appropriate licences as mentioned in clause 2 of the Terms of Use). FTLife reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with FTLife in asserting any available defenses.
        <br/><br/>
        FTLife reserves the right to release current or past Partner Plus user information if FTLife believes that a Partner Plus user's account is being used to commit unlawful acts or the information is subpoenaed and/or FTLife deems it necessary and/or appropriate.        
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        13. Disclaimer and Limitation of Liability
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        You agree and accept that your use of the Partner Plus Services is at your sole risk and acknowledge that the Partner Plus Services and anything contained within the Partner Plus Services or this web site and any of its pages, including, but not limited to the Content, services, goods or advertisements (the "Items") are provided "AS IS" and "AS AVAILABLE", and that FTLife makes no warranty of any kind, express or implied, as to the Items, including, but not limited to, merchantability, non-infringement, title or fitness for a particular purpose or use. FTLife does not warrant that the Partner Plus Services are compatible with your equipment or that the Partner Plus Services are free of errors or viruses, worms or "Trojan horses," or any other harmful, invasive, or corrupted files, and is not liable for any damage you may suffer as a result of such destructive features. You agree that FTLife, its subsidiaries and its third-party agents shall have no responsibility or liability for: (i) any injury or damages, whether caused by the negligence of FTLife, its employees, subcontractors, agents, suppliers or otherwise arising in connection with the Partner Plus Services or the Items and shall not be liable for any lost profits, losses, punitive, incidental or consequential damages or any claim against FTLife by any other party; or (ii) any fault, inaccuracy, omission, delay or any other failure in the Partner Plus Services caused by your computer equipment or arising from your use of the Partner Plus Services or the Items on such equipment.
        <br/><br/>
        The content of other web sites, services, goods or advertisements that may be linked to the Partner Plus Services is not maintained or controlled by FTLife. FTLife is therefore not responsible for the availability, content or accuracy of other web sites, services or goods that may be linked to, or advertised on, the Partner Plus Services. FTLife does not: (a) make any warranty, express or implied, with respect to the use of the links provided on, or to, the Partner Plus Services; (b) guarantee the accuracy, completeness, usefulness or adequacy of any other web sites, services, goods or advertisements that may be linked to the Partner Plus Services; or (c) make any endorsement, express or implied, of any other web sites, services, goods or advertisements that may be linked to the Partner Plus Services. FTLife is also not responsible for the reliability or continued availability of the telephone lines, wireless services, communications media and equipment you use to access the Partner Plus Services.
        <br/><br/>
        FTLife shall not be responsible for any detrimental reliance that you may place upon the Partner Plus Services, this web site and any of its pages or their contents whatsoever.
        <br/><br/>
        FTLIFE MAKES NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, LACK OF VIRUSES OR OTHER HARMFUL COMPONENTS AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS CONTAINED WITHIN THE PARTNER PLUS SERVICES, THIS WEB SITE AND ANY OF ITS PAGES FOR ANY PURPOSE. ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. FTLIFE HEREBY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANLIKE EFFORT, TITLE AND NON-INFRINGEMENT.
        <br/><br/>
        YOU SPECIFICALLY AGREE THAT FTLIFE SHALL NOT BE RESPONSIBLE FOR UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR TRANSMISSIONS OR DATA, ANY MATERIAL OR DATA SENT OR RECEIVED OR NOT SENT OR RECEIVED, OR ANY TRANSACTIONS ENTERED INTO THROUGH THE PARTNER PLUS SERVICES. YOU SPECIFICALLY AGREE THAT FTLIFE IS NOT RESPONSIBLE OR LIABLE FOR ANY THREATENING, DEFAMATORY, OBSCENE, OFFENSIVE OR ILLEGAL CONTENT OR CONDUCT OF ANY OTHER PARTY OR ANY INFRINGEMENT OF ANOTHER'S RIGHTS, INCLUDING WITHOUT LIMITATION INTELLECTUAL PROPERTY RIGHTS. YOU SPECIFICALLY AGREE THAT FTLIFE IS NOT RESPONSIBLE FOR ANY CONTENT SENT USING AND/OR INCLUDED IN PARTNER PLUS SERVICES BY ANY THIRD PARTY.
        <br/><br/>
        IN NO EVENT SHALL FTLIFE AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE PARTNER PLUS SERVICES OR THIS WEB SITE AND ANY OF ITS PAGES, WITH THE DELAY OR INABILITY TO USE THE PARTNER PLUS SERVICES OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE PARTNER PLUS SERVICES OR THIS WEB SITE AND ANY OF ITS PAGES, OR OTHERWISE ARISING OUT OF THE USE OF THE PARTNER PLUS SERVICES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF FTLIFE OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE PARTNER PLUS SERVICES, OR WITH ANY OF THE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE PARTNER PLUS SERVICES.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        14. Confidentiality/Privacy Notice
        </h6>  
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife is pledged to uphold the requirements of the Personal Data (Privacy) Ordinance (Chapter 486), Laws of Hong Kong Special Administrative Region) in collecting, processing and storing client's personal information over the Internet. You agree to take all practicable steps to protect the privacy of the client's personal information against leakage and unauthorized access or use.
        <br/><br/>
        You warrant and undertake: (i) to obtain the appropriate consent from client / potential client when collecting data for performing business services anticipated hereunder or otherwise required by FTLife; (ii) that you shall only use such data for the purpose for preparing financial needs analysis or insurance proposal system (as the case may be); and (iii) that you shall not divulge or otherwise allow others to access such data.
        <br/><br/>
        From time to time, FTLife may make changes to this notice. You should revisit this notice periodically to learn of any change in our Internet privacy policy.
        <br/><br/>
        For the purpose of this clause, "Information" means all text, photos, graphics, client data and policy information, which is under the consent of our customers to be used by or disclosed to individual or an organization for the purposes of insurance, or reinsurance related business or which is collected by you while performing business services anticipated hereunder or otherwise required by FTLife.
        <br/><br/>
        Partner Plus may present encrypted Information to authorized Partner Plus users, when we believe it is necessary for the conduct of our business, or where disclosure is permitted/required by law. You shall not allow any other person access to such Information without the prior permission of FTLife.
        <br/><br/>
        Information retrieved from the Partner Plus for any insurance policies should not be released to any parties except the very own policyholder under his/her consent.
        <br/><br/>
        No Information provided in the Partner Plus or collected by you may be reproduced, transmitted, or stored in a retrieval system, in any format or by any means, electronic, mechanical, photocopying, recording, or otherwise, without the prior written permission of FTLife.
        <br/><br/>
        The Information as processed by and / or provided to you is the property of FTLife and must not be used in any manner other than in the normal course of your agency or distribution activities in furtherance of the interests of FTLife.
        <br/><br/>
        All materials, whether tangible or intangible, provided to you shall remain at all times the property of FTLife and shall be returned and/or destroyed forthwith upon demand or at the termination of (a) your agent’s contract, corporate agency agreement or employment contract with FTLife; or (b) your employment contract in respect of your role of responsible officer or technical representative with an FTLife corporate agency; or (c) the distribution agreement between you or the Company you work for and FTLife or your employment contract with such the Company you work for.
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        15. Termination
        </h6>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        FTLife reserves the right, in its sole and absolute discretion with or without cause, to terminate your access to all or part of the Partner Plus Services or this web site at any time, with or without notice.
        <br/><br/>
        FTLife may also terminate or suspend your access to Partner Plus Services or this web site for inactivity, which is defined as failing to log into a particular service for an extended period of time, as determined by FTLife. Upon termination of the Partner Plus Service, your right to use the Partner Plus Service immediately ceases.
        <br/><br/>
        FTLife shall have no obligation to maintain any content or to forward any unread or unsent messages to you or any third party.        
        </p>
        <br/>
        <h6 className="font-semibold text-base leading-relaxed text-gray-500 dark:text-gray-400">
        16. Inconsistency in Wordings
        </h6>
        <br/>
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        In the event of any ambiguity or inconsistency between the English and Chinese versions of the Terms of Use, the English version will control and prevail.
        <br/>
        <br/>
        Copyright @2017, FTLife all rights reserve
        <br/>
        </p>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-100 flex justify-end">
    <button onClick={handleAccept} type="button" className="text-white bg-ft hover:bg-ft-light rounded-md px-4 py-2 active:bg-white active:text-ft active:ring-1 active:ring-ft transition">I Agree</button>
      <button onClick={handleDecline} type="button" className="text-red-500 ring-1 ring-red-500 bg-white hover:bg-red-700 hover:text-white rounded-md px-4 py-2 active:bg-white active:text-red-500 active:ring-1 active:ring-red-500 transition ml-2" data-dismiss="modal">I don't Agree</button>
    </div>
  </div>
</div>
</div>
</div>
      )
    }

  return (
    <div className="shadow-md rounded h-auto p-12 max-w-lg bg-white flex items-center justify-center">
        <form onSubmit={handleSubmit}>
            <img
              alt="NWL_bilingual"
              src={NWL_bilingual}
            />
            <h1 className="mt-4 text-center text-title ">
                <span className="text-2xl font-semibold">Partner+ FTL </span>
                <span className="text-2xl font-semibold">Admin</span>
            </h1>
            <div className="user-box h-10 mb-3">
                <input 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    type="text" 
                    required="requried" 
                    className="focus:ring-transparent focus:ring-offset-transparent focus:border-ft"
                />
                <label>Username</label>
            </div>
            <div className="user-box h-10 mb-10">
                <input                     
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    required="requried" 
                    className="focus:ring-transparent focus:ring-offset-transparent focus:border-ft"
                />
                <label>Password</label>
            </div>
            <div className="mb-4 full-width flex justify-center">
                <button
                    className="btn w-full p-2 bg-ft-light rounded text-white active:bg-white hover:bg-ft-light active:text-ft active:ring-1 border-0 active:ring-ft transition "
                    type="submit"
                    disabled={isLoading}
            style={{
              backgroundColor: isLoading
                ? "lightgray"
                : isSuccess
                ? "green"
                : "",
              transition: "all 0.5s ease-in-out",
            }}
                >
                    {isLoading ? (
              "Loading..."
            ) : "Login" }
                </button>
            </div>
        </form>
    </div>
  );
};

export default LoginForm;
