import React from 'react';
import { Button, Modal, Form, Input } from 'antd';

const Add = ({ isModalOpen, handleOk, handleCancel, onSubmit }) => {
  const [form] = Form.useForm();

  
  const handleFormSubmit = (values) => {
    onSubmit(values); 
    form.resetFields(); 
  };

  return (
    <Modal title="Thêm Chủ Đề" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <Form form={form} onFinish={handleFormSubmit}>
        <Form.Item
          label="Tên Chủ Đề"
          name="name"
          rules={[{ required: true, message: 'Tên chủ đề không được để trống!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
