import React from 'react';
import styles from '../HomeRoadmap/HomeRoadmap.module.scss';
import '../HomeRoadmap/index.css';
import { Collapse, Card } from 'antd';

const HomeRoadmap = () => {

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
  `;

  const itemsNest = [
    {
      key: '1',
      title: 'Test đầu vào (1)',
      content: '20000+ lượt test',
    },
    {
      key: '2',
      title: 'Test đầu vào (2)',
      content: '20000+ lượt test',
    },
    {
      key: '3',
      title: 'Test đầu vào (3)',
      content: '20000+ lượt test',
    },
    {
      key: '4',
      title: 'Test đầu vào (4)',
      content: '20000+ lượt test',
    },
  ];

  const items = [
    {
      key: '1',
      label: <div style={{ textAlign: 'left', fontWeight: '600', fontSize: '1.5em', textTransform: 'uppercase' }}>Kiểm tra trình độ nền miễn phí</div>,
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {itemsNest.map(item => (
            <div key={item.key} style={{ width: '20%' }}>
              <Card 
                extra={<a href="https://example.com"><i className="bi bi-arrow-right-circle"></i></a>}
                title={<div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</div>} 
                style={{textAlign: 'left'}}
              >
                <p>{item.content}</p>
              </Card>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: <div style={{ textAlign: 'left', fontWeight: '600', fontSize: '1.5em', textTransform: 'uppercase' }}>Từ mất gốc đến 450+</div>,
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {itemsNest.map(item => (
            <div key={item.key} style={{ width: '20%' }}>
              <Card 
                extra={<a href="https://example.com"><i className="bi bi-arrow-right-circle"></i></a>}
                title={<div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</div>} 
                bodyStyle={{ textAlign: 'left' }} 
              >
                <p>{item.content}</p>
              </Card>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: <div style={{ textAlign: 'left', fontWeight: '600', fontSize: '1.5em', textTransform: 'uppercase' }}>Từ 450 đến 700+</div>,
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {itemsNest.map(item => (
            <div key={item.key} style={{ width: '20%' }}>
              <Card 
                extra={<a href="https://example.com"><i className="bi bi-arrow-right-circle"></i></a>}
                title={<div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</div>} 
                bodyStyle={{ textAlign: 'left' }} 
              >
                <p>{item.content}</p>
              </Card>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '4',
      label: <div style={{ textAlign: 'left', fontWeight: '600', fontSize: '1.5em', textTransform: 'uppercase' }}>Trên 700+</div>,
      children: (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {itemsNest.map(item => (
            <div key={item.key} style={{ width: '20%' }}>
              <Card 
                extra={<a href="https://example.com"><i className="bi bi-arrow-right-circle"></i></a>}
                title={<div style={{ textAlign: 'left', fontSize: '18px', fontWeight: 'bold' }}>{item.title}</div>} 
                bodyStyle={{ textAlign: 'left' }} 
              >
                <p>{item.content}</p>
              </Card>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className={`${styles.home_roadmap}`}>
      <div>
        {items.map(item => (
          <div key={item.key} style={{ marginBottom: '16px' }}>  {/* Khoảng cách giữa các Collapse */}
            <Collapse items={[item]} className='container' style={{ backgroundColor: '#fff' }} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeRoadmap;
