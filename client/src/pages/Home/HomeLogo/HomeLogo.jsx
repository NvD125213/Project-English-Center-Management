import React from 'react'
import './HomeLogo.css'

const HomeLogo = () => {
    const schoolLogos = [
        {
          name: "Trường Đại học Bách Khoa",
          logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
        },
        {
          name: "Trường Đại học Kinh doanh và Công nghệ",
          logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
        },
        {
          name: "Trường Đại học Khoa học xã hội và Nhân văn",
          logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-17-1-300x300-1.png",
        },
        {
            name: "Trường Đại học Dược Hà Nội",
            logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-15-1-300x300-1.png",
          },
          {
            name: "Trường Đại học Bách Khoa",
            logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
          },
          {
            name: "Trường Đại học Kinh doanh và Công nghệ",
            logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
          },
          {
            name: "Trường Đại học Khoa học xã hội và Nhân văn",
            logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-17-1-300x300-1.png",
          },
          {
              name: "Trường Đại học Dược Hà Nội",
              logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-15-1-300x300-1.png",
            },
            {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
              {
                name: "Trường Đại học Bách Khoa",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-19-1-300x300-1.jpg",
              },
              {
                name: "Trường Đại học Kinh doanh và Công nghệ",
                logoUrl: "https://zenlishtoeic.vn/wp-content/uploads/2024/07/zenlish-18-1-300x300-1.png",
              },
           
      ];
  return (
    <div className="school-logos">
        <h2><strong>Zenlish tự hào khi là lựa chọn của +30.000 sinh viên </strong></h2> 
        <h2><strong>tại nhiều trường Đại học, Cao đẳng</strong></h2>

        <div className="logo-list container">
        {schoolLogos.map((school, index) => (
          <div key={index} className="logo-item">
            <img src={school.logoUrl} alt={school.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeLogo
