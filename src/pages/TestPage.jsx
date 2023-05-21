import React, { useState } from "react";
import Modal from "react-modal";


function LoginPage() {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const closeEdit = () => {
    setEditIsOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result.split(",")[1];
        setUploadedFile(base64String);
        setUploadedFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };



  const handlePreview = () => {
    if (!uploadedFile) {
      return <div>No file uploaded</div>;
    }
  
    const fileExtension = uploadedFileName.split(".").pop().toLowerCase();
  
    if (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif") {
      // Image preview
      return <img src={`data:image/${fileExtension};base64,${uploadedFile}`} alt="Document Thumbnail" />;
    } else {
      // Download link for other file types
      return (
        <div>
          <a href={`data:application/octet-stream;base64,${uploadedFile}`} download={uploadedFileName}>
            Download File
          </a>
        </div>
      );
    }
  };
  

  const customStyles = {
    content: {
      width: "auto",
      maxWidth: "700px",
      height: "550px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
  };

  return (
    <>
      <div className="bg-ft-light h-screen flex items-center justify-center">
        <p>testing</p>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={() => setEditIsOpen(true)}>Open Preview</button>
        <Modal isOpen={editIsOpen} onRequestClose={closeEdit} style={customStyles} ariaHideApp={false}>
          <p>Preview</p>
          {handlePreview()}
          <button onClick={closeEdit}>Close Preview</button>
        </Modal>
      </div>
    </>
  );
}

export default LoginPage;
