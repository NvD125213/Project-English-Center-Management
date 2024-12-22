import React, { useState } from "react";
import { Drawer } from "antd";
import "./styles.css";

const HeaderTest = ({ navigateHomepage, groups, onQuestionSelect, answers }) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // Grouping logic for groupedData (unchanged)
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
            acc[partIndex].groupIds.push(curr._id || curr.groupQuestionId);
        }

        return acc;
    }, []);

    let questionIndexGlobal = 1;

    console.log(">>>", groupedData)
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
                                {group.questions?.map((question, questionIndex) => {
                                    // Check if any groupId has a selected answer for this question
                                    const isSelected = group.groupIds.some(groupId => {
                                        const groupAnswer = answers[groupId];
                                        return groupAnswer?.selectedAnswers?.[question._id];
                                    });

                                    // Use questionIndexGlobal to keep track of the global question number
                                    const globalQuestionIndex = questionIndexGlobal++;

                                    return (
                                        <li
                                            key={question._id}
                                            className={`question-item ${isSelected ? "selected-answer" : ""}`}
                                            onClick={() => {
                                                const partIndex = groups.findIndex(group =>
                                                    group.questions.some(q => q._id === question._id)
                                                );

                                                if (partIndex !== -1) {
                                                    const questionIndex = groups[partIndex].questions.findIndex(
                                                        q => q._id === question._id
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

export default HeaderTest;
