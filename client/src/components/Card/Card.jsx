import React from 'react';
import { Card, Avatar } from 'antd';

const CustomCard = ({ avatar, title, content }) => {
    return (
      <Card
        style={{ width: 400, height: 120, border: '1px solid black' }}
      >
        <Card.Meta
          avatar={<Avatar src={avatar} />}
          title={title}
          description={content}
        />
      </Card>
    );
  };

  export default CustomCard