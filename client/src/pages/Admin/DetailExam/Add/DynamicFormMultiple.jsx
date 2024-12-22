import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { uploadFilesToFirebase } from '../../../../helpers/uploadFile';
import api from '../../../../services/instance';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const { Option } = Select;

const DynamicForm2 = ({ examId, part, onQuestionsAdded }) => {
  const [groups, setGroups] = useState([
    { id: 1, image: null, audio: null, questions: [{ text: '', choices: ['', '', '', ''], correctChoice: '' }] }
  ]);
  const [loading, setLoading] = useState(false);

  const addGroup = () => {
    setGroups((prevGroups) => [
      ...prevGroups,
      { id: prevGroups.length + 1, image: null, audio: null, questions: [{ text: '', choices: ['', '', '', ''], correctChoice: '' }] }
    ]);
  };

  const addQuestion = (groupIndex) => {
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === groupIndex
          ? { ...group, questions: [...group.questions, { text: '', choices: ['', '', '', ''], correctChoice: '' }] }
          : group
      )
    );
  };

  const handleGroupChange = (groupIndex, field, files) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setGroups((prevGroups) =>
        prevGroups.map((group, i) =>
          i === groupIndex ? { ...group, [field]: fileArray } : group
        )
      );
    }
  };

  const handleQuestionChange = (groupIndex, questionIndex, field, value, choiceIndex = null) => {
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === groupIndex
          ? {
            ...group,
            questions: group.questions.map((question, qIndex) =>
              qIndex === questionIndex
                ? {
                  ...question,
                  [field]: choiceIndex !== null
                    ? question.choices.map((choice, cIndex) => (cIndex === choiceIndex ? value : choice))
                    : value
                }
                : question
            )
          }
          : group
      )
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadPromises = groups.map(async (group) => {
        const [imageURL, audioURL] = await Promise.all([
          group.image ? uploadFilesToFirebase(group.image, 'Image') : Promise.resolve(null),
          group.audio ? uploadFilesToFirebase(group.audio, 'Audio') : Promise.resolve(null)
        ]);

        const questions = group.questions.map(question => ({
          title: question.text,
          options: question.choices.map((choice, i) => ({
            option: ['A', 'B', 'C', 'D'][i],
            text: choice
          })),
          correctOption: question.correctChoice,
        }));

        return {
          type: 'group',
          elements: [{ typeUrl: 'audio', url: audioURL[0] || '' }, { typeUrl: 'image', url: imageURL[0] || '' }],
          questions
        };
      });

      const groupData = await Promise.all(uploadPromises);
      const response = await api.post(`/question/createWithGroups?idExam=${examId}&part=${part}`, {
        groups: groupData,
      });
      onQuestionsAdded(response.data.message);

    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi lưu câu hỏi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <LoadingSpinner />}
      {groups.map((group, groupIndex) => (
        <div key={group.id} className="border p-3 mb-3">
          <h4>Group {groupIndex + 1}</h4>

          <Form.Item label="Image" className="mb-3">
            <Input type="file" accept="image/*" onChange={(e) => handleGroupChange(groupIndex, 'image', e.target.files)} />
          </Form.Item>

          <Form.Item label="Audio" className="mb-3">
            <Input type="file" accept="audio/*" onChange={(e) => handleGroupChange(groupIndex, 'audio', e.target.files)} />
          </Form.Item>

          {group.questions.map((question, questionIndex) => (
            <div key={`${groupIndex}-${questionIndex}`} className="mb-3">
              <Form.Item label={`Text câu hỏi ${questionIndex + 1}`} className="mb-3">
                <Input.TextArea
                  value={question.text}
                  onChange={(e) => handleQuestionChange(groupIndex, questionIndex, 'text', e.target.value)}
                />
              </Form.Item>

              {['A', 'B', 'C', 'D'].map((label, choiceIndex) => (
                <Form.Item key={choiceIndex} label={`Choice ${label}`} className="mb-3">
                  <Input
                    value={question.choices[choiceIndex]}
                    onChange={(e) => handleQuestionChange(groupIndex, questionIndex, 'choices', e.target.value, choiceIndex)}
                  />
                </Form.Item>
              ))}

              <Form.Item label="Lựa chọn đúng" className="mb-3">
                <Select
                  value={question.correctChoice}
                  onChange={(value) => handleQuestionChange(groupIndex, questionIndex, 'correctChoice', value)}
                  placeholder="Chọn đáp án đúng"
                >
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                  <Option value="D">D</Option>
                </Select>
              </Form.Item>
            </div>
          ))}

          <Button className="btn btn-outline-primary mb-3" onClick={() => addQuestion(groupIndex)}>
            + Thêm câu hỏi
          </Button>
        </div>
      ))}

      <Button className="btn btn-outline-primary w-100 mb-3" onClick={addGroup}>
        + Thêm nhóm câu hỏi mới
      </Button>

      <Button className="btn btn-success" onClick={handleSubmit}>
        Lưu câu hỏi
      </Button>
    </div>
  );
};

export default DynamicForm2;
