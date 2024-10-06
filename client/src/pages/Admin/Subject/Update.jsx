import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

function Update({ isModalOpen, handleCancel, onSubmit, initialValues }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); 
    }
  }, [initialValues, form]);

  const handleFormSubmit = () => {
    form.validateFields()
      .then(values => {
        onSubmit(values);
        form.resetFields(); 
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Cập nhật chủ đề"
      open={isModalOpen}
      onOk={handleFormSubmit}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Cập nhật
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="updateSubjectForm">
        <Form.Item
          name="name"
          label="Tên chủ đề"
          rules={[{ required: true, message: 'Vui lòng nhập tên chủ đề!' }]}
        >
          <Input placeholder="Nhập tên chủ đề" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Update;
