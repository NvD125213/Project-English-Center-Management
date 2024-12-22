import React, { useState } from "react";
import { Drawer } from "antd";
import "./styles.css";

const HeaderHistory = ({ navigateHomepage, groups, onQuestionSelect }) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // Grouping logic for groupedData 
    const groupedData = groups.reduce((acc, curr) => {
        const partIndex = acc.findIndex(item => item.part === curr.part);

        if (partIndex === -1) {
            acc.push({
                part: curr.part,
                questions: [...curr.questions],
                elements: [...curr.elements],
                groupIds: [curr._id || curr.groupQuestionId]
            });
        } else {
            acc[partIndex].questions = [...acc[partIndex].questions, ...curr.questions];
            acc[partIndex].elements = [...acc[partIndex].elements, ...curr.elements];
            acc[partIndex].groupIds.push(curr._id);
        }

        return acc;
    }, []);

    console.log(groupedData)
    let questionIndexGlobal = 1;
    return (
        <header
            className="text-white"
            style={{ backgroundColor: "#043555", padding: "32px" }}
        >
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="h3 m-0" style={{ textTransform: "uppercase" }}>
                    Hệ thống thi trực tuyến
                </h1>
                <div className="button-header" style={{ display: 'flex', gap: '8px' }}>
                    <button
                        type="button"
                        className="btn"
                        style={{ background: '#f97630', color: '#fff' }}
                        onClick={navigateHomepage}>Về trang chủ</button>

                    <button
                        onClick={showDrawer}
                        className="btn btn-light d-flex align-items-center"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menu"
                        aria-expanded="false"
                        aria-controls="menu"
                    >
                        <i className="bi bi-list" />
                    </button>
                </div>
            </div>
            <Drawer title="Danh sách câu hỏi" onClose={onClose} open={open}>
                <div className="menu-main">
                    {groupedData.map((group, index) => (
                        <div className="part-item" key={index}>
                            <p>Part {group.part}</p>
                            <ul className="question-list">
                                {group.questions?.map((question) => {

                                    // Use questionIndexGlobal to keep track of the global question number
                                    const globalQuestionIndex = questionIndexGlobal++;
                                    const checkCorrect = question?.isCorrect;
                                    const correctClass = checkCorrect === "true" ? "true-correct" : "false-correct";
                                    return (
                                        <li
                                            key={question.questionId}
                                            className={`question-item ${correctClass}`}
                                            onClick={() => {
                                                const partIndex = groups.findIndex(group =>
                                                    group.questions.some(q => q.questionId === question.questionId)
                                                );

                                                if (partIndex !== -1) {
                                                    const questionIndex = groups[partIndex].questions.findIndex(
                                                        q => q.questionId === question.questionId
                                                    );

                                                    if (questionIndex !== -1) {
                                                        onQuestionSelect(partIndex, questionIndex);
                                                        onClose();
                                                    }
                                                }
                                            }}
                                        >
                                            {globalQuestionIndex}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </Drawer>
        </header>
    );
};

export default HeaderHistory;
