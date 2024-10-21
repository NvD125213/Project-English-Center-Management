import React, { useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { uploadFilesToFirebase } from '../../../../helpers/uploadFile';
import api from '../../../../services/instance';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../../../components/LoadingSpinner';

const { Option } = Select;

const DynamicForm2 = ({ examId, part, onQuestionsAdded }) => {
  const [groups, setGroups] = useState([{ id: 1, image: '', audio: '', questions: [{ text: '', choices: ['', '', '', ''], correctChoice: '' }] }]);
  const [loading, setLoading] = useState(false); 

  const addGroup = () => {
    setGroups((prevGroups) => [
      ...prevGroups,
      { id: prevGroups.length + 1, image: '', audio: '', questions: [{ text: '', choices: ['', '', '', ''], correctChoice: '' }] }
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

  const handleGroupChange = (groupIndex, field, value) => {
    setGroups((prevGroups) =>
      prevGroups.map((group, i) =>
        i === groupIndex ? { ...group, [field]: value } : group
      )
    );
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
   try {
    setLoading(true)
    const formData = new FormData();
    for(const group of groups) {
      const uploadedImageUrl = group.image ? await uploadFilesToFirebase([group.image], 'Image') : null;
      const uploadedAudioUrl = group.audio ? await uploadFilesToFirebase([group.audio], 'Audio') : null;

      const groupData = {
        audioUrl: uploadedAudioUrl ? uploadedAudioUrl[0] : null,
        imageUrl : uploadedImageUrl ? uploadedImageUrl[0] : null,
        questions: group.questions.map((q) => ({
          title: q.text,
          options: q.choices,
          correctOption: q.correctChoice
        }))
      };

      formData.append('groups', JSON.stringify(groupData))
    }

    const response = await api.post(`/question/create?idExam=${examId}&part=${part}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.status === 201) {
      setLoading(false)
      onQuestionsAdded(response.data.message);
    }  
   } catch (error) {
    toast.error("Có lỗi xảy ra khi thêm câu hỏi.");
    console.error(error);
   }
   finally {
    setLoading(false);  
  }
  };

  return (
    <div>
      {groups.map((group, groupIndex) => (
        <div key={group.id} className="border p-3 mb-3">
          <h4>Group {groupIndex + 1}</h4>

          <Form.Item label="Image" className="mb-3">
            <Input type="file" accept="image/*" onChange={(e) => handleGroupChange(groupIndex, 'image', e.target.files[0])} />
          </Form.Item>

          <Form.Item label="Audio" className="mb-3">
            <Input type="file" accept="audio/*" onChange={(e) => handleGroupChange(groupIndex, 'audio', e.target.files[0])} />
          </Form.Item>

          {group.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mb-3">
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
