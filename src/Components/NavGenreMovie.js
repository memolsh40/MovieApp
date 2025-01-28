import React, { useState } from "react";
import { Link } from "react-router-dom";

export const NavGenreMovie = (props) => {
  const [activeGenre, setActiveGenre] = useState(null);

  const genres = [
    { title: "ایرانی" },
    { title: "اکشن" },
    { title: "ماجراجویی" },
    { title: "کمدی" },
    { title: "درام" },
    { title: "ترسناک" },
    { title: "علمی-تخیلی" },
    { title: "عاشقانه" },
    { title: "هیجان‌انگیز" },
    { title: "فانتزی" },
    { title: "جنایی" },
  ];

  const getTextColorStyle = (genre) => {
    if (genre === activeGenre) {
      return { border: "1px solid #ffc107", borderRadius: "5px" };
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
        {genres.map((item) => (
          <li
            style={getTextColorStyle(item.title)}
            key={item.title}
            onMouseEnter={() => {
              props.setProductListMode(true);
              setActiveGenre(item.title);
            }}
          >
            <Link
              className="dropdown-item-custom"
              aria-current="page"
              to={`/movieList?genre=${encodeURIComponent(item.title)}`} 
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
