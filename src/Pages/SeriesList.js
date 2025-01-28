import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const SeriesList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genre = queryParams.get('genre'); 
  
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mediaListMode, setMediaListMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [title, setTitle] = useState('');
  const [isEndOfList, setIsEndOfList] = useState(false);

  const calculateTotalPages = (totalCount) => {
    return Math.ceil(totalCount / 12);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);


  useEffect(() => {
    let url;
   if (genre) {
    if (genre === 'ایرانی') {
      debugger;
      url = `http://localhost:8080/api/series/iranianS?pageNumber=${currentPage}&pageSize=12`;
      setTitle(`سریال های ${genre}`);
    } else {
      url = `http://localhost:8080/api/series/genre/${genre}?pageNumber=${currentPage}&pageSize=12`;
      setTitle(`سریال های ${genre}`);
    }
    
} else {
  url = `http://localhost:8080/api/series/getAll?pageNumber=${currentPage}&pageSize=12`; 
  setTitle("سریال ها");
}


    axios
      .get(url)
      .then((res) => {
        const dataList = res.data.dataList;
        setMediaData(dataList);
        setLoading(false);
        setMediaListMode(dataList.length  > 0);
        setTotalPages(calculateTotalPages(res.data.totalCount));
        setIsEndOfList(currentPage + 1 >= res.data.totalPages);
    
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    
  }, [genre, currentPage]); 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
  };

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  return (
    <div>
      <h3 className='titleStyle mt-5'>{title}</h3>
      {mediaListMode ? (
        <div className="media-grid">
          {mediaData.map((media) => (
            <div className="media-card" key={media.id}>
              <img
                src={`http://localhost:8080/api/utils/upload/files/${media.image}`}
                alt={media.title}
                className="media-image"
              />
              <h4 className='mediaItemTextStyle'>{media.title}</h4>
            </div>
          ))}
        </div>
      ) : (
        <div>محصولی برای این ژانر موجود نیست.</div>
      )}
<nav aria-label="Page navigation">
  <ul className="pagination justify-content-center mb-5">
    {/* دکمه قبلی */}
    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
      <span
        className="page-link yellow-text"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        قبلی
      </span>
    </li>

    {/* نمایش شماره صفحات به صورت خلاصه */}
    {totalPages > 4 ? (
      <>
        {/* صفحات اول */}
        {currentPage > 1 && (
          <>
            <li className="page-item">
              <span
                className="page-link yellow-text"
                onClick={() => handlePageChange(0)}
              >
                1
              </span>
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          </>
        )}

        {/* صفحات نزدیک به صفحه فعلی */}
        {Array.from({ length: 5 }).map((_, index) => {
          const pageNumber = currentPage - 2 + index;
          if (pageNumber >= 0 && pageNumber < totalPages) {
            return (
              <li
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
              >
                <span
                  className="page-link yellow-text"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber + 1}
                </span>
              </li>
            );
          }
          return null;
        })}

        {/* صفحات آخر */}
        {currentPage < totalPages - 3 && (
          <>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li className="page-item">
              <span
                className="page-link yellow-text"
                onClick={() => handlePageChange(totalPages - 1)}
              >
                {totalPages}
              </span>
            </li>
          </>
        )}
      </>
    ) : (
      // اگر تعداد صفحات کمتر از 6 باشد، تمام صفحات را نمایش دهید
      Array.from({ length: totalPages }).map((_, index) => (
        <li
          key={index}
          className={`page-item ${currentPage === index ? 'active' : ''}`}
        >
          <span
            className="page-link yellow-text"
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </span>
        </li>
      ))
    )}

    {/* دکمه بعدی */}
    <li
      className={`page-item ${
        !mediaListMode || currentPage + 1 >= totalPages || mediaData.length < 12 ? 'disabled' : ''
      }`}
    >
      <span
        className="page-link yellow-text"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        بعدی
      </span>
    </li>
  </ul>
</nav>



    </div>
  );
};
