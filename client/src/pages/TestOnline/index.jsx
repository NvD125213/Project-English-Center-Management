import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useDispatch, useSelector } from 'react-redux';
import { getSubject } from "../../store/subjectSlice";
import { Collapse, Card, Row, Col, Modal, Select, Button, message } from 'antd';
import axios from "axios";
import { ArrowRightOutlined } from '@ant-design/icons';

import './style.css';

const { Panel } = Collapse;
const { Option } = Select;
const TestOnlinePage = () => {
    const [activeSkill, setActiveSkill] = useState('Listening & Reading');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null); // State để lưu thời gian làm bài
    const [examCounts, setExamCounts] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { subjects } = useSelector((state) => state.subject);

    useEffect(() => {
        dispatch(getSubject());
    }, [dispatch]);


    const handleSkillClick = (skill) => {
        setActiveSkill(skill);
    };

    const showModal = (exam, subject) => {
        setSelectedExam(exam);
        setSelectedSubject(subject)
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (!selectedTime) {
            message.warning("Vui lòng chọn thời gian làm bài trước khi bắt đầu!");
            return;
        }
        setIsModalVisible(false);
        if (selectedExam) {
            navigate(`/stm-test/${selectedExam._id}`, { state: { time: selectedTime } });
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleTimeChange = (value) => {
        setSelectedTime(value);
    };

    const getCountExam = async (examId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/history/getExamCompletionCountById`, {
                params: { examId }
            });
            return response.data.completionCount || 0;
        } catch (error) {
            console.error(`Lỗi khi lấy lượt hoàn thành cho bài thi ${examId}:`, error);
            return 0; // Trả về 0 nếu có lỗi
        }
    };
    useEffect(() => {
        const fetchExamCounts = async () => {
            const counts = {};
            for (const subject of subjects) {
                for (const exam of subject.exams) {
                    const count = await getCountExam(exam._id);
                    counts[exam._id] = count;
                }
            }
            setExamCounts(counts);
        };

        if (subjects.length > 0) {
            fetchExamCounts();
        }
    }, [subjects]);



    return (
        <div>
            <PageTitle title="Test Online" />
            <div className="container mt-4">
                <h3 className="text-center" style={{ marginBottom: "30px", fontSize: '1.25em' }}>
                    ZENLISH LÀ TRUNG TÂM ĐẦU TIÊN TẠI VIỆT NAM CÓ TEST TOEIC 4 KỸ NĂNG GIỐNG 90% ĐỀ THI THẬT
                </h3>
                <div className="list-skill">
                    <div
                        className={`skill-item ${activeSkill === 'Listening & Reading' ? 'active' : ''}`}
                        onClick={() => handleSkillClick('Listening & Reading')}
                    >
                        Listening & Reading
                    </div>
                    <div
                        className={`skill-item ${activeSkill === 'Speaking & Writing' ? 'active' : ''}`}
                        onClick={() => handleSkillClick('Speaking & Writing')}
                    >
                        Speaking & Writing
                    </div>
                </div>
                <div className="zen-accordion">
                    <Collapse defaultActiveKey={['0']} accordion>
                        {subjects.map((subject, index) => (
                            <Panel header={subject.name} key={index}>
                                <Row gutter={[16, 16]}>
                                    {subject.exams.map((exam) => (
                                        <Col key={exam._id} xs={24} sm={12} md={8} lg={6}>
                                            <Card
                                                bordered
                                                hoverable
                                                style={{
                                                    border: '2px solid #1A73E8',
                                                    borderRadius: '8px',
                                                }}
                                                onClick={() => showModal(exam, subject)}
                                            >
                                                <div>
                                                    <h3 style={{ fontWeight: 'bold' }}>{exam.name}</h3>
                                                    <p style={{ color: '#6b6b6b' }}>
                                                        {examCounts[exam._id] !== undefined ? `${examCounts[exam._id]} lượt hoàn thành` : "Đang tải..."}
                                                    </p>
                                                </div>
                                                <ArrowRightOutlined
                                                    style={{
                                                        fontSize: '16px',
                                                        position: 'absolute',
                                                        top: '10px',
                                                        right: '15px',
                                                    }}
                                                />
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Panel>
                        ))}
                    </Collapse>
                </div>

                {/* Modal */}
                <Modal
                    title="Giới thiệu bài thi"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Bắt đầu thi"
                    cancelText="Hủy"
                >
                    {selectedExam && (
                        <>
                            <h3>{selectedExam.name} - {selectedSubject.name}</h3>
                            <p>Thời gian làm bài: {selectedExam.duration || "Không giới hạn"}</p>
                            <p>
                                {examCounts[selectedExam._id] !== undefined ? `${examCounts[selectedExam._id]} lượt hoàn thành` : "Đang tải..."}
                            </p>
                            <Select
                                placeholder="Chọn thời gian làm bài"
                                style={{ width: '100%' }}
                                onChange={handleTimeChange}
                            >
                                <Option value="30">30 phút</Option>
                                <Option value="60">60 phút</Option>
                                <Option value="75">75 phút</Option>
                                <Option value="90">90 phút</Option>
                                <Option value="90">120 phút</Option>

                            </Select>
                        </>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default TestOnlinePage;
