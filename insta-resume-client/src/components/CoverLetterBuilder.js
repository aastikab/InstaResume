import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CoverLetterBuilder = () => {
  const { templateId } = useParams();
  const [coverLetterData, setCoverLetterData] = useState({
    recipientName: '',
    companyName: '',
    position: '',
    introduction: '',
    body: '',
    conclusion: '',
    signature: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your cover letter generation logic here
    console.log('Generating cover letter with template:', templateId);
    console.log('Cover letter data:', coverLetterData);
  };

  return (
    <Container>
      <Title>Cover Letter Builder</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Recipient's Name</Label>
          <Input
            type="text"
            value={coverLetterData.recipientName}
            onChange={(e) => setCoverLetterData({...coverLetterData, recipientName: e.target.value})}
          />
        </FormGroup>

        <FormGroup>
          <Label>Company Name</Label>
          <Input
            type="text"
            value={coverLetterData.companyName}
            onChange={(e) => setCoverLetterData({...coverLetterData, companyName: e.target.value})}
          />
        </FormGroup>

        <FormGroup>
          <Label>Position</Label>
          <Input
            type="text"
            value={coverLetterData.position}
            onChange={(e) => setCoverLetterData({...coverLetterData, position: e.target.value})}
          />
        </FormGroup>

        <FormGroup>
          <Label>Introduction</Label>
          <Textarea
            value={coverLetterData.introduction}
            onChange={(e) => setCoverLetterData({...coverLetterData, introduction: e.target.value})}
            placeholder="Write your opening paragraph..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Body</Label>
          <Textarea
            value={coverLetterData.body}
            onChange={(e) => setCoverLetterData({...coverLetterData, body: e.target.value})}
            placeholder="Write the main content of your cover letter..."
          />
        </FormGroup>

        <FormGroup>
          <Label>Conclusion</Label>
          <Textarea
            value={coverLetterData.conclusion}
            onChange={(e) => setCoverLetterData({...coverLetterData, conclusion: e.target.value})}
            placeholder="Write your closing paragraph..."
          />
        </FormGroup>

        <Button type="submit">Generate Cover Letter</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

export default CoverLetterBuilder; 