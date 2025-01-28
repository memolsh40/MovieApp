import React, { useState } from "react";
import axios from "axios";

const SearchForm = (props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownOpenSearch, setIsDropdownOpenSearch] = useState(false);

  

  const handleSearch = async (e) => {
    
    e.preventDefault();

    if (!query.trim()) {
      setResults([{ id: "noQuery", message: "لطفاً عبارت جستجو را وارد کنید", type: "info" }]);
      setIsDropdownOpenSearch(true);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/api/media/search`, { params: { query: query } });
    
      if (response.data?.length > 0) {
        setResults(
          response.data.map((item) => ({
            id: item.id,
            title: item.title,
            type: "movie", 
            image: item.image,
            description: item.description,
            rating: item.rating,
            countryMade: item.countryMade,
          }))
        );
      } else {
        setResults([{ id: "noResults", message: "هیچ نتیجه‌ای یافت نشد", type: "info" }]);
      }
    
      setIsDropdownOpenSearch(true);
    } catch (error) {
      console.error("Error during search:", error);
      setResults([{ id: "error", message: "خطا در جستجو", type: "error" }]);
      setIsDropdownOpenSearch(true);
    }
    
  };

  const handleCloseResults = () => {
    setIsDropdownOpenSearch(false);
  };

  return (
    <div style={{ position: "relative" }}>
 
      <form className="d-none d-lg-flex me-2" role="search" onSubmit={handleSearch}>
        <div
          style={{
            width: "600px",
            padding: "10px 0",
            display: "flex",
            alignItems: "center",
            border: "1px solid #ffc107",
            borderRadius: "50px",
            overflow: "hidden",
            
          }}
        >
          <input
            type="search"
            placeholder="جستجو"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="custom-dark-color"
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              alignItems:'end',
              padding: "17px",
              paddingBlock: "5px",
            }}
          />
          <button
            className="btn btn-warning"
            type="submit"
            style={{ borderRadius: "90px", marginLeft: "10px" ,cursor:'pointer'}}
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

   
      {isDropdownOpenSearch && (
     <div
     id="searchResults"
     className="dropdown-search-custom show"
        
   >
     <div
       style={{
         display: "flex",
         justifyContent: "flex-end", 
         
       }}
     >
       <button
         id="closeResults"
         className="btn text-warning"
         onClick={handleCloseResults}
         style={{
           fontSize: "14px",
           cursor: "pointer",
           margin: "0 10px", 
           padding: "5px 10px",

         }}
       >
          <i className="fas fa-close" style={{cursor:'pointer'}}></i>
       </button>
     </div>
   
     {results.map((item) =>
       item.type === "info" || item.type === "error" ? (
         <div
           key={item.id}
           className="dropdown-item-custom"
           style={{
             padding: "10px",
             direction: "rtl",
             textAlign: "right",
           }}
         >
           {item.message}
         </div>
       ) : (
         <a
           key={item.id}
           href={`/productDetail?productID=${item.id}`}
           className="dropdown-item-custom"
       
         >
           {item.title || "بدون عنوان"}
         </a>
       )
     )}
   </div>
   
      )}
    </div>
  );
};

export default SearchForm;
