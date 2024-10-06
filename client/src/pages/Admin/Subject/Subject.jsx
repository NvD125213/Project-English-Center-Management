import { Space, Table, Typography, Button, Row, Col, Modal } from "antd"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSubject, addSubject, updateSubject, deleteSubject } from "../../../store/subjectSlice";
import Add from './Add'; // Import modal
import Update from './Update'
import './Subject.css'; 
import { toast, ToastContainer } from 'react-toastify';

function Subject() {
  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.subject);

  // Mở form thêm
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOk = () => {
    setIsModalOpen(false);
  };
  const handleAddClick = () => {
    setIsModalOpen(true);
  };
  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  // Mở form update

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [dataUpdateSubject, setDataUpdateSubject] = useState(null)
 
  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
  };


  const handleEdit = (record) => {
    setDataUpdateSubject(record)
    setIsUpdateModalOpen(true)
  }
  const handleUpdateFormSubmit = async (values) => {
    try {
      await dispatch(updateSubject({ ...dataUpdateSubject, ...values })); 
      await dispatch(getSubject())
      toast.success('Cập nhật thành công !')
      setIsUpdateModalOpen(false)
    } catch(error) {
      toast.error(error)
    }
  };

  // Xóa Subject
  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Xóa Chủ Đề',
      content: `Bạn có chắc chắn muốn xóa chủ đề "${record.name}" không?`,
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const response = await dispatch(deleteSubject(record._id)).unwrap(); 
          if (response.ok) {
            toast.success(response.message); 
          } else {
            toast.error(response.message); 
          }
        } catch (error) {
          toast.error("Xóa không thành công, có lỗi xảy ra!"); 
        }
      },
    });
  };

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });
  

  useEffect(() => {
    dispatch(getSubject());
  }, [dispatch]);

  const dataSource = Array.isArray(subjects) 
    ? subjects.map((subject, index) => ({ ...subject, key: subject.id || index }))
    : [];

  

  const handleFormSubmit = async (values) => {
    try {
      await dispatch(addSubject(values));  
      await dispatch(getSubject());  
      toast.success('Thêm chủ đề thành công!');
      setIsModalOpen(false);  
    } catch (error) {
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }     
     
  };

  return (
    <Space size={50} direction="vertical" className="table-container container-fluid">
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Title level={4}>
            Chủ Đề
          </Typography.Title>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAddClick}>Thêm</Button>
        </Col>
      </Row>
      
      <Table
        loading={loading}
        columns={[
          {
            title: "STT",
            dataIndex: "index",
            render: (text, record, index) => 
              (pagination.current - 1) * pagination.pageSize + index + 1,
          },
          {
            title: "Tên chủ đề",
            dataIndex: "name",
          },
          {
            title: "Hành động",
            render: (text, record) => (
              <Space size="middle">
                <Button className="btn btn-primary" onClick={() => handleEdit(record)}>Sửa</Button>
                <Button className="btn btn-danger" onClick={() => handleDelete(record)}>Xóa</Button>
              </Space>
            ),
          },
        ]}
        dataSource={dataSource}
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
        isModalOpen={isModalOpen}
        handleOk={handleModalOk}
        handleCancel={handleModalCancel}
        onSubmit={handleFormSubmit} 
      />

      <Update 
        isModalOpen={isUpdateModalOpen}
        handleCancel={handleUpdateCancel}
        initialValues={dataUpdateSubject} 
        onSubmit={handleUpdateFormSubmit}
      />
      <ToastContainer />
    </Space>
  );
}

export default Subject;
