import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import './index.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createExam, deleteExam, getExam } from '../../../store/examSlice';
import { Space, Table, Typography, Button, Row, Col, Modal, Dropdown, Menu} from "antd"; 
import { toast, ToastContainer } from 'react-toastify';
import { closeAddModal, openAddModal } from '../../../store/modalSlice.js';
import Add from './Add.jsx';

const Exam = () => {
  // Dispatch lấy dữ liệu từ Slice 
  const dispatch = useDispatch();

  // Phân trang
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  // Navigate chuyển đổi Route
  const navigate = useNavigate()
  const handleMenuClick = (record, part) => {
    const examId = record._id;
    navigate(`/admin/detailExam?examID=${examId}&part=${part}`);
  };
  
  
  // Chuyển đổi dữ liệu giữa các part

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
          await dispatch(deleteExam(record._id)).unwrap();  
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
            render: (subject) => subject ? subject.name : 'Không có chủ đề'
          },
          {
            title: "Hành động",
            render: (text, record) => (
              <Space size="middle">
              <Dropdown
                overlay={(
                  <Menu className="dropdownPart" onClick={({ key }) => handleMenuClick(record, key)}>
                    <Menu.Item key="1">Part 1</Menu.Item>
                    <Menu.Item key="2">Part 2</Menu.Item>
                    <Menu.Item key="3">Part 3</Menu.Item>
                    <Menu.Item key="4">Part 4</Menu.Item>
                    <Menu.Item key="5">Part 5</Menu.Item>
                    <Menu.Item key="6">Part 6</Menu.Item>
                    <Menu.Item key="7">Part 7</Menu.Item>
                  </Menu>
                )}
              >
                <Typography.Link>
                  <Space>
                    Thao tác
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>           
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
