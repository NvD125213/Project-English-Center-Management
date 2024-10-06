import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExam, deleteExam, getExam } from '../../../store/examSlice';
import { Space, Table, Typography, Button, Row, Col, Modal} from "antd"; 
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../../components/LoadingSpinner/index.jsx'; // Import Loading component
import { closeAddModal, openAddModal } from '../../../store/modalSlice.js';
import Add from './Add.jsx';

const Exam = () => {
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const { exams, loading, error } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getExam());
  }, [dispatch]);

  const dataSource = Array.isArray(exams) 
  ? exams.map((exam, index) => ({ ...exam, key: exam.id || index }))
  : [];

  const isAddOpenModal = useSelector((state) => state.modal.isAddModalOpen)   
  const handleOpenAddModal = () => {
    dispatch(openAddModal());
  };
  const handleCloseAddModal = () => {
    dispatch(closeAddModal());
  };

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(createExam(values))
      await dispatch(getExam())
      dispatch(closeAddModal())
      const successMessage = result.payload?.message || 'Tạo bài thi thành công!';
      toast.success(successMessage);      
      
    } catch(error) {
      toast.error('Có lỗi xảy ra!')
    }

  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Xóa Bài Thi',
      content: `Bạn có chắc chắn muốn xóa bài thi "${record.name}" không?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await dispatch(deleteExam(record._id)).unwrap();  // Dùng unwrap để lấy dữ liệu trả về
          toast.success('Xóa bài thi thành công!');
          await dispatch(getExam()); 
        } catch(error) {
          toast.error('Xóa bài thi thành công!');

        }
        
      },
    });
  };

  return (
    <Space size={50} direction="vertical" className="table-container container-fluid">
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Title level={4}>Chủ Đề</Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={handleOpenAddModal}>Thêm</Button>
        </Col>
      </Row>

      <Table
        dataSource={dataSource}  
        columns={[
          {
            title: "STT",
            dataIndex: "index",
            render: (text, record, index) => 
                (pagination.current - 1) * pagination.pageSize + index + 1,
          },
          {
            title: "Tên bài thi",
            dataIndex: "name",
          },
          {
            title: "Chủ đề",
            dataIndex: "subject",
            render: (subject) => subject.name
          },
          {
            title: "Hành động",
            render: (text, record) => (
              <Space size="middle">
                <Button className="btn btn-primary">Sửa</Button>
                <Button className="btn btn-danger" onClick={() => handleDelete(record)}>Xóa</Button>
              </Space>
            ),
          },
        ]} 
        pagination={{
            pageSize: pagination.pageSize,
            current: pagination.current,
            onChange: (page, pageSize) => {
              setPagination({ current: page, pageSize });
            },
            className: "table-pagination",        
          }}
        style={{ width: '100%' }}
      />

    
      <Add 
         isModalOpen={isAddOpenModal}
         handleCancel={handleCloseAddModal}
         onSubmit={handleSubmit}
      />

      <ToastContainer />
    </Space>
  );
};

export default Exam;
