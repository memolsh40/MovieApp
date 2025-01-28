import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavGenreMovie } from "./NavGenreMovie";
import { NavGenreSeries } from "./NavGenreSeries";
import SearchForm from "./SearchForm";

export const Navigation = () => {
  const [searchFocus, setSearchFocus] = useState(false);
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  const [isSeriesDropdownOpen, setIsSeriesDropdownOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productListMode, setProductListMode] = useState(false);

  const link = "http://localhost:8080/api/productCategory";

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

  const handleFocus = () => {
    setSearchFocus(true);
    document.body.classList.add("search-active");
  };

  const handleBlur = () => {
    setSearchFocus(false);
    document.body.classList.remove("search-active");
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbarSupportedContent');
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-fixed');
        navbar.classList.remove('mt-4');
      } else {
        navbar.classList.remove('navbar-fixed');
        navbar.classList.add('mt-4');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        setProductData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const toggleMovieDropdown = () => {
    setIsMovieDropdownOpen((prevState) => {
      if (!prevState) {
        setIsSeriesDropdownOpen(false); // Close the series dropdown if movie dropdown is opened
      }
      return !prevState;
    });
  };

  const toggleSeriesDropdown = () => {
    setIsSeriesDropdownOpen((prevState) => {
      if (!prevState) {
        setIsMovieDropdownOpen(false); // Close the movie dropdown if series dropdown is opened
      }
      return !prevState;
    });
  };

  return (
    <div onClick={() => {
      setIsMovieDropdownOpen(false);
      setIsSeriesDropdownOpen(false);
    }}>
      <nav className="navbar navbar-expand-lg navbar-dark custom-dark-color rtl text-end fixed-nav" style={{ padding: '0px' }}>
        <div className="container-fluid">
          <img className="App-logo" src="/images/pngegg.png" alt="Logo" />

          <div className="col-3" style={{ marginRight: '10px' }}>
            <SearchForm setIsDropdownOpen={setIsSeriesDropdownOpen} />
          </div>

          <div className="col-2 me-auto">
            <div className="d-flex align-items-center">
              <button type="button" className="btn btn-warning" style={{ marginLeft: '5px', height: '39px', marginTop: '5px' }}>
                <Link className="nav-link active nav-text" to="/login">ورود</Link>
              </button>
              <button type="button" className="btn btn-warning d-none d-lg-flex" style={{ marginLeft: '5px', height: '39px', marginTop: '5px' }}>
                <Link className="nav-link active nav-text" to="/signup">ثبت نام</Link>
              </button>
              <button className="btn btn-outline-warning" style={{ marginRight: '10px', marginTop: '5px' }} type="submit">
                <i className="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>

          <button style={{ marginRight: '60px', marginTop: '5px' }} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <nav className="navbar-dark custom-dark-color d-lg-none">
            <div className="container-fluid custom-dark-color">
              <div className="offcanvas offcanvas-end custom-dark-color" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header custom-dark-color">
                  <img className="App-logo" src="/images/pngegg.png" alt="Logo" />
                  <button style={{ marginRight: '240px', color: 'white', backgroundColor: '#ffc107', borderColor: '#ffc107' }} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body custom-dark-color">
                  <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    <hr />
                    <li className="nav-item">
                      <Link className="nav-link active nav-text" to="/"><span className="fas fa-home" style={{ marginLeft: '5px', color: '#ffc107' }}></span> خانه</Link>
                      <hr />
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link nav-text" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="fas fa-film " style={{ marginLeft: '5px', color: '#ffc107' }}></span>
                        فیلم
                      </a>
                      <ul className="dropdown-menu  ">
                        {genres.map((item, index) => (
                          <li key={index}>
                            <a className="dropdown-item-custom custom-dark-color" href={`/movieList?genre=${item.title}`}>{item.title}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <hr />
                    <li className="nav-item dropdown">
                      <a className="nav-link nav-text" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="fas fa-tv" style={{ marginLeft: '5px', color: '#ffc107' }}></span>
                        سریال
                      </a>
                      <ul className="dropdown-menu">
                        {genres.map((item, index) => (
                          <li key={index}>
                            <a className="dropdown-item-custom custom-dark-color" href={`/seriesList?genre=${item.title}`}>{item.title}</a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg custom-dark-color rtl text-end" >
        <div className="collapse navbar-collapse d-none d-lg-block my-primary mt-4" id="navbarSupportedContent" style={{ height: '50px' }}>
          <ul className="navbar-nav mb-lg-0">
            <li className="nav-item nav-text">
              <Link className="nav-link active itemNavDesktop" to="/">
                <span className="fas fa-home"></span> خانه
              </Link>
            </li>

            <div style={{ marginTop: '8px' }}>
              <a className="btn-nav-icon" onMouseEnter={toggleMovieDropdown} href="/movieList" role="button" aria-expanded={isMovieDropdownOpen}>
                <span className="fas fa-film" style={{ marginLeft: '8px' }}></span>
                فیلم
              </a>
              <NavGenreMovie
                isDropdownOpen={isMovieDropdownOpen}
                setIsDropdownOpen={setIsMovieDropdownOpen}
                productListMode={productListMode}
                productData={productData}
                setProductListMode={setProductListMode}
              />
            </div>

            <div style={{ marginTop: '8px' }}>
              <a className="btn-nav-icon" onMouseEnter={toggleSeriesDropdown} href="/seriesList" role="button" aria-expanded={isSeriesDropdownOpen}>
                <span className="fas fa-tv" style={{ marginLeft: '8px', fontSize: '18px' }}></span>
                سریال
              </a>
              <NavGenreSeries
                isDropdownOpen={isSeriesDropdownOpen}
                setIsDropdownOpen={setIsSeriesDropdownOpen}
                productListMode={productListMode}
                productData={productData}
                setProductListMode={setProductListMode}
              />
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};
