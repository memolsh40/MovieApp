import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SmallBanner() {
  const [smallBannerList, setSmallBannerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/smallBanner")
      .then((res) => {
        if (res.data?.dataList?.length > 0) {
          setSmallBannerList(res.data.dataList);
        } else {
          setError("بنرها به درستی بارگذاری نشده‌اند.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("خطا در بارگذاری بنرها");
        setLoading(false);
      });
  }, []);



  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (smallBannerList.length === 0) {
    return <div>بنرها به درستی بارگذاری نشده‌اند.</div>;
  }

  const banner = smallBannerList[0]; // داده اولین بنر

  return (
    <div className="smallBannerContainer">
      <div
        className="imageItem"
        style={{
          backgroundImage: `url(http://localhost:8080/api/utils/upload/files/${banner.firstImage})`,
        }}
      >
        <a
          href={banner.firstImageLink }
          style={{ display: "block", width: "100%", height: "100%",color:'white' }}
        >
          <div className="sliderTextContainer">
            <div className="title slider-Text">
              {banner.title || "بدون عنوان"}
            </div>
          </div>
        </a>
      </div>

      <div
        className="imageItem"
        style={{
          backgroundImage: `url(http://localhost:8080/api/utils/upload/files/${banner.secImage})`,
        }}
      >
        <a
          href={banner.secImageLink || "#"}
          style={{ display: "block", width: "100%", height: "100%" ,color:'white'}}
        >
          <div className="sliderTextContainer">
            <div className="title">
              {banner.titleSec || "بدون عنوان"}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
