import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Space, Table, Typography, Button, Modal, Alert } from "antd";
import DynamicFormSingle from './Add/DynamicFormSingle';
import DynamicFormMultiple from './Add/DynamicFormMultiple';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../../services/instance';
import LoadingSpinner from '../../../components/LoadingSpinner';

const Question = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const examId = queryParams.get('examID');
  const part = queryParams.get('part');

  const [questionsPart, setQuestionsPart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/question/getByExamAndPart?idExam=${examId}&part=${part}`);
      const questionGroups = response.data.questionGroups || [];
      const questions = questionGroups.flatMap(group => group.questions || []);
      setQuestionsPart(questions);
    } catch (error) {
      setError('Có lỗi xảy ra khi lấy danh sách câu hỏi.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (examId && part) {
      fetchQuestions();
    }
  }, [examId, part]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuestionsAdded = (message) => {
    toast.success(message); 
    fetchQuestions(); 
    handleCloseModal(); 
  };

  return (
    <div className="container-fluid" style={{ padding: '20px' }}>
      <Typography.Title level={4} className="mb-4">Danh sách câu hỏi cho Part {part}</Typography.Title>

      {loading && <LoadingSpinner />}

      {error && <Alert message={error} type="error" showIcon className="mb-4" />}

      {!loading && !error && questionsPart.length > 0 && (
        <div className="table-responsive">
          <Table 
            dataSource={questionsPart.map((q, index) => ({
              key: q._id,
              id: index + 1,
              title: q.title,
              element: q.element,
              correctOption: q.correctOption
            }))} 
            columns={[
              { title: 'STT', dataIndex: 'id' },
              { title: 'Question', dataIndex: 'title' },
              {
                title: 'Ảnh/Audio',
                dataIndex: 'element',
                render: (elements) => (
                  <div>
                    {part === '2' ? (
                      elements
                        .filter((element) => element.typeUrl === 'audio')
                        .map((element) => (
                          <audio controls key={element._id}>
                            <source src={element.url} type="audio/ogg" />
                          </audio>
                        ))
                    ) 
                    : (
                      elements.map((element) =>
                        element.typeUrl === 'image' ? (
                          <img
                            src={element.url}
                            alt="Image"
                            style={{ width: '100px', marginRight: '10px' }}
                            key={element._id}
                          />
                        ) : null
                      )
                    )}
                  </div>
                )
              },
              { title: 'Correct Answer', dataIndex: 'correctOption' },
              { 
                title: 'Hành động', 
                render: (text, record) => (
                  <Space size="middle">
                    <Button className="btn btn-primary">Sửa</Button>
                    <Button className="btn btn-danger">Xóa</Button>
                  </Space>
                ), 
              },
            ]}
            pagination={{ pageSize: 10 }}
          />
        </div>
      )}

      <Button 
        type="primary" 
        onClick={handleOpenModal} 
        style={{ marginTop: '20px' }} 
        className="btn btn-success"
      >
        Thêm câu hỏi mới
      </Button>
      <ToastContainer/>
      <Modal
        title='Thêm mới câu hỏi'
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        {(part === '1' || part === '2' || part === '5') ? (
          <DynamicFormSingle part={part} examId={examId} onQuestionsAdded={handleQuestionsAdded} />
        ) : (
          <DynamicFormMultiple examId={examId} part={part} onQuestionsAdded={handleQuestionsAdded} />
        )}
      </Modal>
    </div>
  );
};

export default Question;
