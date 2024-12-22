import React, { useEffect, useState, useRef } from "react";
import HeaderTest from "./header";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { getExamDetail, submitExam } from "../../services/exam";
import { useSelector } from "react-redux"
import QuestionDetail from "./detailQuestion";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import './styles.css'
import CountDown from "./countDown";
import { useLocation } from 'react-router-dom';

const DetailTest = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user)
    const [groups, setGroups] = useState([]); // Danh sách các nhóm câu hỏi
    const [currentPartIndex, setCurrentPartIndex] = useState(0); // Chỉ số Part hiện tại
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Chỉ số câu hỏi trong Part hiện tại
    const location = useLocation();
    const selectedTime = location.state?.time;
    const navigateHompage = () => {
        Modal.confirm({
            title: "Xác nhận rời trang",
            content: (
                <>
                    <p>Bạn có muốn rời khỏi việc làm bài không?</p>
                    <p>Bài sẽ không được lưu</p>
                </>
            ),
            okText: "Có",
            cancelText: "Không",
            onOk() {
                navigate("/");
            },
        });
    }

    const isSubmitted = useRef(false);
    useEffect(() => {
        const loadExamDetails = async () => {
            try {
                const data = await getExamDetail(examId);
                setGroups(data); // Lưu danh sách Group
                const initialAnswers = data.reduce((acc, group) => {
                    acc[group._id] = {
                        groupQuestionId: group._id,
                        selectedAnswers: group.questions.reduce((questionsAcc, question) => {
                            questionsAcc[question._id] = ""; // Gán giá trị rỗng cho mỗi câu hỏi
                            return questionsAcc;
                        }, {}),
                    };
                    return acc;
                }, {});

                setAnswers(initialAnswers);
                setCurrentPartIndex(0); // Bắt đầu từ Part đầu tiên
                setCurrentQuestionIndex(0); // Bắt đầu từ câu hỏi đầu tiên
            } catch (error) {
                console.error("Error loading exam details:", error);
                navigate("/test-online");
            }
        };

        loadExamDetails();
    }, [examId, navigate]);

    // Lấy câu hỏi và Part hiện tại
    const currentPart = groups[currentPartIndex]?.questions || [];
    const currentQuestion = currentPart[currentQuestionIndex];

    // Xử lý khi nhấn Next
    const handleNext = () => {
        if (currentQuestionIndex < currentPart.length - 1) {
            // Nếu còn câu hỏi trong nhóm hiện tại, chuyển sang câu tiếp theo
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else if (currentPartIndex < groups.length - 1) {
            // Nếu hết câu hỏi trong nhóm, chuyển sang nhóm kế tiếp
            setCurrentPartIndex((prevIndex) => prevIndex + 1);
            setCurrentQuestionIndex(0); // Reset lại chỉ số câu hỏi
        } else {
            // Nếu hết tất cả các câu hỏi
            alert("Bạn đã hoàn thành tất cả các câu hỏi!");
        }
    };

    // Xử lý khi nhấn Prev
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            // Nếu không phải câu đầu tiên trong nhóm hiện tại
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        } else if (currentPartIndex > 0) {
            // Nếu là câu đầu tiên và có nhóm trước đó
            const prevPartIndex = currentPartIndex - 1;
            const prevPartQuestions = groups[prevPartIndex]?.questions || [];
            setCurrentPartIndex(prevPartIndex);
            setCurrentQuestionIndex(prevPartQuestions.length - 1);
        } else {
            // Nếu đang ở câu đầu tiên của nhóm đầu tiên
            alert("Đây là câu hỏi đầu tiên!");
        }
    };

    const currentGroup = groups[currentPartIndex] || {};

    // Xử lý khi mảng câu hỏi 
    // Xử lý data khi chọn câu trả lời
    const [answers, setAnswers] = useState({})

    const handleSelectAnswer = (groupId, questionId, selectedOption) => {
        setAnswers((prev) => ({
            ...prev,
            [groupId]: {
                groupQuestionId: groupId,
                selectedAnswers: {
                    ...prev[groupId]?.selectedAnswers, // giữ các câu hỏi đã chọn trước đó trong nhóm
                    [questionId]: selectedOption || "", // lưu giá trị trống nếu không chọn đáp án
                },
            },
        }));
    };


    // Kiểm tra nếu là câu hỏi cuối cùng của Part cuối cùng
    const isLastQuestion = currentPartIndex === groups.length - 1;

    // State kết quả và modal
    const [result, setResult] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleSubmitTest = async () => {
        if (isSubmitted.current) return;
        isSubmitted.current = true;

        try {
            const payload = {
                userId: user._id,
                examId: examId,
                answers,
            };

            const response = await submitExam(payload);
            setResult(response);
            setIsModalVisible(true);

        } catch (error) {
            console.error("Lỗi nộp bài:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        navigate('/test-online');
    };

    // Calculate total number of questions up to current part
    const totalQuestions = groups.reduce((acc, group) => {
        return acc + (group.questions?.length || 0);
    }, 0);


    return (
        <section>
            <HeaderTest
                navigateHomepage={navigateHompage}
                groups={groups}
                onQuestionSelect={(partIndex, questionIndex) => {
                    setCurrentPartIndex(partIndex);
                    setCurrentQuestionIndex(questionIndex);
                }}
                answers={answers}
            />
            <div className="container mt-4 mb-4">
                <div className="row p-4">
                    <div className="" style={{ justifyContent: 'space-between', display: 'flex' }}>
                        <h5 className="text-primary">PART {groups[currentPartIndex]?.part}</h5>
                        <div className="group-button-header">
                            <CountDown minutes={selectedTime} onTimeUp={handleSubmitTest} />
                            {
                                currentPartIndex === groups.length - 1 &&
                                (
                                    <button className="btn btn-success" onClick={handleSubmitTest}>
                                        Nộp bài
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
                {currentQuestion && (
                    <QuestionDetail
                        question={currentQuestion}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        group={currentGroup}
                        onSelectAnswer={handleSelectAnswer}
                        answers={answers}
                        part={groups[currentPartIndex]?.part}
                        isLastQuestion={isLastQuestion}
                    />
                )}

            </div>

            <Footer />
            <Modal
                title={<div style={{ backgroundColor: "#003a63", color: "#fff", padding: "10px 16px" }}>HOÀN THÀNH BÀI KIỂM TRA</div>}
                visible={isModalVisible}
                onCancel={handleCloseModal}
                closable={false}
                footer={[<Button key="view" type="primary" style={{ backgroundColor: "#0066ff" }} onClick={() => navigate(`/history-result/${result?.historyId}/${examId}`)}>Xem Đáp Án</Button>,
                <Button key="close" danger onClick={handleCloseModal}>Đóng</Button>]}
                style={{ top: 50 }}
            >
                <p style={{ marginLeft: '5px', fontSize: '18px' }}>
                    Bài thi của bạn đã được xử lý. Hãy chụp lại màn hình vì kết quả sẽ chỉ hiển thị một lần
                </p>
                <p style={{ marginBottom: "12px", marginLeft: '5px' }}>
                    <strong>Số câu đúng:</strong> {result?.correctAnswers} / {totalQuestions}
                </p>
                <p style={{ marginBottom: "12px", marginLeft: '5px' }}>
                    <strong>Tổng điểm:</strong> {result?.score || "10 điểm"}
                </p>
                <div style={{ marginTop: "20px", borderBottom: "1px solid #ccc", paddingTop: "10px" }}>
                    <span style={{ cursor: "pointer", color: "#0066ff" }}>
                        Xem số câu đúng mỗi part
                    </span>
                </div>
            </Modal>
        </section>
    );
};

export default DetailTest;
