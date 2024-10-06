import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
import { getSubject } from '../../../store/subjectSlice';
import { useDispatch, useSelector } from 'react-redux';

const Add = ({ isModalOpen, handleOk, handleCancel, onSubmit }) => {
  
  const dispatch = useDispatch()
  // Lấy danh sách chủ đề 
  const { subjects } = useSelector((state) => state.subject)
  const [form] = Form.useForm();
  const handleFormSubmit = (values) => {
    onSubmit(values);
    form.resetFields();
  };
  useEffect(() => {
    dispatch(getSubject())
  }, [dispatch]);
  return (
    <Modal
      title="Thêm Bài Thi"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }} 
      >
        <Form.Item
          label="Tên Bài Thi"
          name="name"
          key="name"
          rules={[{ required: true, message: 'Tên bài thi không được để trống!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Chủ đề"
          rules={[{ required: true }]}
          name="subject"

        >
       <Select
          defaultValue="Lựa chọn chủ đề"
          style={{ width: '100%' }}
          rules={[{ required: true, message: 'Không được để trống chủ đề!' }]}
          options={Array.isArray(subjects) ? subjects.map(subject => ({
            value: subject._id,
            label: subject.name
          })) : []} 
        />

        </Form.Item>

        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
