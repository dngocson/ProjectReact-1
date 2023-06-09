import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";
const cities = [
  {
    name: "Ho Chi Minh",
    districts: [
      "Thu Duc",
      "Tan Phu",
      "Tan Binh",
      "District 12",
      "District 11",
      "District 10",
      "District 8",
      "District 7",
      "District 6",
      "District 5",
      "District 4",
      "District 3",
      "District 1",
      "Phu Nhuan",
      "Nha Be",
      "Hoc Mon",
      "Go Vap",
      "Cu Chi",
      "Can Gio",
      "Binh Thanh",
      "Binh Tan",
      "Binh Chanh",
    ],
  },
  {
    name: "Binh Duong",
    districts: [
      "Thuan An",
      "Thu Dau Mot",
      "Tan Uyen",
      "Phu Giao",
      "Di An",
      "Dau Tieng",
      "Ben Cat",
      "Bac Tan Uyen",
      "Bau Bang",
    ],
  },
  {
    name: "Can Tho",
    districts: [
      "Vinh Thanh",
      "Thoi Lai",
      "Thot Not",
      "Phong Dien",
      "O Mon",
      "Ninh Kieu",
      "Co Do",
      "Cai Rang",
      "Binh Thuy",
    ],
  },
  {
    name: "Da Nang",
    districts: [
      "Thanh Khe",
      "Son Tra",
      "Ngu Hanh Son",
      "Lien Chieu",
      "Hoang Sa",
      "Hoa Vang",
      "Hai Chau",
      "Cam Le",
    ],
  },
  {
    name: "Hanoi",
    districts: [
      "Ung Hoa",
      "Thuong Tin",
      "Thanh Xuan",
      "Thanh Tri",
      "Thanh Oai",
      "Thach That",
      "Tay Ho",
      "Son Tay",
      "Soc Son",
      "Quoc Oai",
      "Phuc Tho",
      "Phu Xuyen",
      "Nam Tu Liem",
      "My Duc",
      "Me Linh",
      "Long Bien",
      "Hoang Mai",
      "Hoan Kiem",
      "Hoai Duc",
      "Hai Ba Trung",
      "Ha Dong",
      "Gia Lam",
      "Dong Da",
      "Dong Anh",
      "Dan Phuong",
      "Chuong My",
      "Cau Giay",
      "Bac Tu Liem",
      "Ba Vi",
      "Ba Dinh",
    ],
  },
  {
    name: "Hai Phong",
    districts: [
      "Vinh Bao",
      "Tien Lang",
      "Thuy Nguyen",
      "Ngo Quyen",
      "Le Chan",
      "Kien Thuy",
      "Kien An",
      "Hong Bang",
      "Hai An",
      "Do Son",
      "Duong Kinh",
      "Cat Hai",
      "Bach Long Vi",
      "An Lao",
      "An Duong",
    ],
  },
];

function CityDistrictForm({ setCity, setDistrict }) {
  const dispatch = useDispatch();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const phoneNumber = useSelector((state) => state.ui.shippingInfo.phoneNumber);
  const address = useSelector((state) => state.ui.shippingInfo.address);
  const userCity = useSelector((state) => state.ui.shippingInfo.city);
  const userDistrict = useSelector((state) => state.ui.shippingInfo.district);
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setSelectedDistrict("");
  };
  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  useEffect(() => {
    if (selectedCity && selectedDistrict) {
      dispatch(
        uiActions.setShippingAddress({
          address,
          phoneNumber,
          city: selectedCity,
          district: selectedDistrict,
        })
      );
    }
  }, [selectedCity, selectedDistrict]);
  useEffect(() => {
    if (userCity && userDistrict) {
      setSelectedCity(userCity);
      setSelectedDistrict(userDistrict);
    }
  }, [userCity, userDistrict]);
  const cityOptions = cities.map((city) => (
    <option key={city.name} value={city.name}>
      {city.name}
    </option>
  ));
  let districtOptions = [];
  if (selectedCity) {
    const city = cities.find((city) => city.name === selectedCity);
    districtOptions = city?.districts.map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ));
  }

  return (
    <div className=" flex flex-col gap-1 md:gap-2 ">
      <div>
        <label className="text-base md:text-xl">
          City:
          <select value={selectedCity} required onChange={handleCityChange}>
            <option value="">--City--</option>
            {cityOptions}
          </select>
        </label>
      </div>
      <div>
        <label className="text-base md:text-xl">
          District:
          <select
            value={selectedDistrict}
            required
            onChange={handleDistrictChange}
          >
            <option value="">--District--</option>
            {districtOptions}
          </select>
        </label>
      </div>
    </div>
  );
}

export default CityDistrictForm;
