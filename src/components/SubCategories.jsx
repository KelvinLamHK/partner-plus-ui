import { useState, useEffect } from 'react';
import '../css/campaignListcss.css';
import '../css/lineclamp2css.css';
import { API_BASE_URL } from '../api.config';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useLocation} from 'react-router-dom';


function SubCategories() {
    const location = useLocation();
    const mainCategoryId = ((location.state?.mainCategoryId)===undefined?"":location.state.mainCategoryId);
    const mainCategoryEnglish = ((location.state?.mainCategoryEnglish)===undefined?"":location.state.mainCategoryEnglish);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryEnglish, setCategoryEnglish] = useState('');
  const [categoryZHTW, setCategoryZHTW] = useState('');
  const [categoryZHCN, setCategoryZHCN] = useState('');
//   const [categoryId, setCategoryId] = useState('');
  const [upperCategoryId, setUpperCategoryId] = useState('');
  const [categoryId, setCategoryId] = useState('');



  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/document-center/category/list`, {
      method: 'POST',

    })
      .then(response => response.json())
      .then(data => {
        setCategories(data.firstLevelCategoryList);
      })
      .catch(error => console.error(error));
  }, []);
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openEdit = (data) => {
    setCategoryEnglish(data.categoryEnglish);
    setCategoryZHCN(data.categoryZHCN);
    setCategoryZHTW(data.categoryZHTW);
    setUpperCategoryId(data.upperCategoryId);
    setCategoryId(data.categoryId);
    setEditIsOpen(true);
  };

  const closeEdit = () => {
    setEditIsOpen(false);
    setCategoryEnglish("");
    setCategoryZHCN("");
    setCategoryZHTW("");
    setUpperCategoryId("");
    setCategoryId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(`${API_BASE_URL}/v1/document-center/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        documentCenterCategoryParameter: {
            upperCategoryId: 0,
            categoryEnglish: categoryEnglish,
            categoryZHTW:categoryZHTW,
            categoryZHCN:categoryZHCN,
          }
      }),
    }
    );
  
    // Handle response
    if (response.ok) {
      closeModal();
      Swal.fire({
        icon: 'success',
        title: 'Created Category',
        showConfirmButton: false,
        timer: 1700
      }).then(function() {
        window.location = "/Categories";
      });
    }
  }

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/v1/document-center/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        documentCenterCategoryParameter: {
            categoryId:categoryId,
            upperCategoryId: upperCategoryId,
            categoryEnglish: categoryEnglish,
            categoryZHTW:categoryZHTW,
            categoryZHCN:categoryZHCN,
          }
      }),
    }

    );
  
    // Handle response
    if (response.ok) {
      closeEdit();
      Swal.fire({
        icon: 'success',
        title: 'Edited Category',
        showConfirmButton: false,
        timer: 1700
      }).then(function() {
        window.location = "/Categories";
      });
    }
  }
  
  const customStyles = {
    content: {
      width: 'auto',
      maxWidth:'650px',
      height: '425px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
  };



  return (
    <>

      <div className='w-deflaut px-2'>
        <div className='flex justify-content-between align-items-center my-3'>
          <div className=''>
            <h1>{mainCategoryEnglish}-Sub Categories</h1>
          </div>
          <div onClick={openModal}>
          <a href='#EnableJavascript' className={'text-white bg-ft-light rounded px-3 py-2'}>
            Create
          </a>
      </div>

        </div>
  </div>
            </>
  )}

export default SubCategories;