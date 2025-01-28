import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const NavProduct = (props) => {
  const [activeCategoryID, setActiveCategoryID] = useState(null);


  const getTextColorStyle = (id) => {
    if (id === activeCategoryID) {
      return { border: "1px solid #ffc107",borderRadius: "5px"}; 
    }
    return {};
  };
  

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        transition: "width 4.3s ease",
      }}
      onMouseEnter={() => props.setIsDropdownOpen(true)}
      onMouseLeave={() => props.setIsDropdownOpen(false)}
    >

      <ul
        className={`dropdown-menu-custom bg-dark ${
          props.isDropdownOpen ? "d-block" : "d-none"
        }`}
        style={{
          width: "200px",
        }}
      >
        {props.data.map((item) => (
          <li
            style={getTextColorStyle(item.id)}
            key={item.id}
            onMouseEnter={() => {
              props.setProductListMode(true);
              setActiveCategoryID(item.id);
            }}
          >
             <Link className="dropdown-item-custom"
              aria-current="page"
              onMouseEnter={() => props.setDataProductItem(item.id)}
               to={`/productCList?categoryID=${item.id}`} 
               >{item.title}</Link>
          </li>
        ))}
      </ul>

   
      <ul
  className={`dropdown-menu-custom bg-dark ${
    props.productListMode && props.isDropdownOpen ? "d-block" : ""
  }`}
  style={{
    width: props.productListMode ? "200px" : "0px",
    marginTop: "15px",
    marginRight: "200px",
  }}
>
  {props.productData.map((item) => (
    <li key={item.id}>
      <Link
        className="dropdown-item-custom"
        onMouseEnter={() => {
          props.setProductListMode(true);
          setActiveCategoryID(item.category.id);
        }}
        aria-current="page"
        to={`/productDetail?productID=${item.id}`}
      >
        {item.title}
      </Link>
    </li>
  ))}
</ul>

    </div>
  );
};
