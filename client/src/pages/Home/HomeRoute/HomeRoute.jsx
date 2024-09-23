import React, { useState } from 'react';
import './index.css';
import { Card, Col, Row, Radio } from 'antd';

const HomeRoute = () => {
  const [selectedValue, setSelectedValue] = useState(1); 

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const [selectedGoal, setSelectedGoal] = useState(1); 

  const handleGoal = (e) => {
    setSelectedGoal(e.target.value);
  };
  return (
    <section className='home-route'>
      <div className="container">
        <h2 style={{ textAlign: 'center' }}>
          <strong>Lộ trình luyện thi TOEIC</strong>
          <br />
          <strong>theo đúng trình độ nền của cá nhân bạn</strong>
        </h2>
        <div className="level-goal">
          <div className="select-level">
            <h4 style={{ textAlign: 'left' }}>Hãy chọn trình độ hiện tại của bạn</h4>
            <Row gutter={16}>
              <Col span={8}>
                <Card 
                  title={
                    <div>
                      <Radio 
                        value={1} 
                        checked={selectedValue === 1} 
                        onChange={handleChange} 
                      /> TOEIC 1-295
                    </div>
                  }
                >
                  Mất gốc
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title={
                    <div>
                      <Radio 
                        value={2} 
                        checked={selectedValue === 2} 
                        onChange={handleChange} 
                      /> TOEIC 296-495
                    </div>
                  }
                >
                  Cơ bản LR
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title={
                    <div>
                      <Radio 
                        value={3} 
                        checked={selectedValue === 3} 
                        onChange={handleChange} 
                      /> TOEIC 496-695
                    </div>
                  }
                >
                  Có nền tảng LR
                </Card>
              </Col>
            </Row>
          </div>
          <div className="select-goal">
            <h4 style={{ textAlign: 'left' }}>Chọn tiếp mục tiêu bạn muốn chinh phục</h4>
            <Row gutter={16}>
              <Col span={8}>
                <Card 
                  title={
                    <div>
                      <Radio 
                        value={1} 
                        checked={selectedGoal === 1} 
                        onChange={handleGoal} 
                      /> TOEIC: 300+
                    </div>
                  }
                >
                  Cơ bản
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title={
                    <div>
                      <Radio 
                        value={2} 
                        checked={selectedGoal === 2} 
                        onChange={handleGoal} 
                      /> TOEIC: 600+
                    </div>
                  }
                >
                  Khá
                </Card>
              </Col>
              <Col span={8}>
                <Card 
                  title={
                    <div>
                      <Radio 
                        value={3} 
                        checked={selectedGoal === 3} 
                        onChange={handleGoal} 
                      /> TOEIC: 800+
                    </div>
                  }
                >
                  Xuất sắc
                </Card>
              </Col>
            </Row>
          </div>
          <a href="" className="link_test ">Làm bài kiểm tra đầu vào</a>
          <button type="button" className="btn btn-success">
            Xác định trình độ và mục tiêu  <br />
            click vào đây để được tư vấn lộ trình miễn phí
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeRoute;
