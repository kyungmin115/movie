import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
//1~4까지 훅과 라이브러리, 그리고 아이콘을 가져옴.
const Container = styled.div`
  width: 550px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;
const Containerinone = styled.div`
  margin: 20px auto;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  box-size: border-box;
`;

const Containertwo = styled.div`
  max-width: 550px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Label1 = styled.label`
  display: block;
  margin: 10px 0;
  font-weight: bold;
`;
const Question = styled.p`
  cursor: pointer;
  margin: 5px;
  color: black;

  &:hover {
    color: #e71a0f;
  }
`;
const Answer = styled.p`
  margin: 5px;
  font-size: 14px;
  color: #555;
`;
const Input = styled.input`
  width: 530px;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #bf3131;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #e71a0f;
  }
`;
const InquiryListContainer = styled.div`
  border-bottom: 2px solid #ddd;
`;

const InquiryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const InquiryItem = styled.li`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  display: flex; /* Flexbox를 사용하여 요소 정렬 */
  justify-content: space-between; /* 요소 사이의 간격 조절 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const RemoveButton = styled.button`
  padding: 5px;
  background-color: transparent; /* 배경을 투명으로 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 변경 */
  color: #ff6b6b; /* 텍스트 색상 */
  display: flex; /* Flexbox를 사용하여 아이콘 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
`;

const DateLabel = styled.p`
  margin: 0; /* 마진 제거 */
  font-size: 12px; /* 폰트 크기 조정 */
  color: #666; /* 텍스트 색상 조정 */
`;
//스타일 컴포넌트들 정의
function CustomerService() {
  const [inquiries, setInquiries] = useState([]); //문의 목록을 저장하는 상태
  const [inquiry, setInquiry] = useState(''); //입력된 문의 내용을 저장하는 상태
  const [expandedQuestion, setExpandedQuestion] = useState(null); //확장된 질문의 인덱스를 저장하는 상태
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editInquiry, setEditInquiry] = useState(null); // 수정할 문의

  const handleChange = (e) => {
    //입력창의 값을 변경하는 핸들러
    setInquiry(e.target.value); //입력된 값을 inquiry 상태로 설정
  };

  const saveInquiry = () => {
    if (inquiry === '') {
      alert('문의 내용을 입력해주세요.');
      return;
    }
    const newId =
      inquiries.length > 0
        ? Math.max(...inquiries.map((inq) => inq.id)) + 1
        : 1; // 최대 ID를 기반으로
    const newInquiry = {
      text: inquiry,
      date: new Date().toLocaleDateString(),
      id: newId,
    };
    setInquiries([...inquiries, newInquiry]);
    setInquiry('');
  };

  const handleKeyDown = (e) => {
    //enter를 눌렀을때 문의 내용을 저장하는 핸들러
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isEditing) {
        updateInquiry();
      } else {
        saveInquiry();
      }
    }
  };

  //특정 id의 문의를 삭제하는 함수
  const removeInquiry = (id) => {
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== id)); //해당 id를 제외하고 나머지를 문의 목록으로 업데이트
  };
  //질문을 확장하거나 축소하는 함수
  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index); //질문 인덱스를 토글합니다.
  };

  const handleEditInquiry = (inquiry) => {
    setIsEditing(true);
    setEditInquiry(inquiry);
    setInquiry(inquiry.text);
  };
  const updateInquiry = () => {
    if (inquiry === '') {
      alert('문의 내용을 입력해주세요.');
      return;
    }
    const updatedInquiries = inquiries.map((inq) =>
      inq.id === editInquiry.id ? { ...inq, text: inquiry } : inq
    );

    setInquiries(updatedInquiries);
    setInquiry('');
    setIsEditing(false);
    setEditInquiry(null);
  };

  return (
    <>
      <Container>
        <Title>고객센터</Title>
        <div>
          <div>
            <Label1>자주 묻는 질문 BEST5</Label1>
            <Containerinone>
              <Question onClick={() => toggleQuestion(0)}>
                {' '}
                {/* 질문 클릭 시 토글 */}
                1. 예매, 모바일오더 결제 시 할인쿠폰 자동 적용 버튼은
                무엇인가요?
              </Question>
              {expandedQuestion === 0 && (
                <Answer>
                  {/* 질문이 확장된 경우 답변 표시 */}- 할인쿠폰 자동 적용
                  버튼은 결제 화면에서 찾을 수 있습니다. 이 버튼을 클릭하면
                  가능한 쿠폰이 자동으로 적용됩니다.
                </Answer>
              )}
              <Question onClick={() => toggleQuestion(1)}>
                2. 예매할 수 있는 횟수나 매수 등의 제한이 있나요?
              </Question>
              {expandedQuestion === 1 && (
                <Answer>
                  - 예매 가능한 횟수나 매수는 영화관 및 상영작에 따라 다릅니다.
                  자세한 사항은 영화관에 문의해 주세요.
                </Answer>
              )}
              <Question onClick={() => toggleQuestion(2)}>
                3. 영화 예매 시 포인트 선택이 되지 않아요
              </Question>
              {expandedQuestion === 2 && (
                <Answer>
                  - 포인트 선택이 불가능한 경우는 영화관의 정책에 따라 다를 수
                  있습니다. 확인해 보세요.
                </Answer>
              )}
              <Question onClick={() => toggleQuestion(3)}>
                4. 인터넷 예매 시 부분환불/교환이 가능한가요?
              </Question>
              {expandedQuestion === 3 && (
                <Answer>
                  - 부분환불/교환은 영화관의 정책에 따라 가능합니다. 반드시
                  사전에 확인해 주세요.
                </Answer>
              )}
              <Question onClick={() => toggleQuestion(4)}>
                5. ARS 이용안내
              </Question>
              {expandedQuestion === 4 && (
                <Answer>
                  - ARS 이용은 전화로 진행할 수 있으며, 각 영화관의 안내에
                  따라주세요.
                </Answer>
              )}
            </Containerinone>
          </div>
          <Label1>문의 내용</Label1> {/* 문의 내용 입력 레이블 */}
          <Input
            type="text"
            value={inquiry}
            onChange={handleChange} // 입력 내용 변경 시 호출
            placeholder="문의 내용을 입력하세요" // 입력란의 플레이스홀더
            onKeyDown={handleKeyDown} // 키 다운 이벤트 처리
          />
        </div>
        <ButtonContainer>
          <Button onClick={isEditing ? updateInquiry : saveInquiry}>
            {isEditing ? '수정하기' : '글쓰기'}
            {/* 문의 내용을 저장하는 버튼 */}
          </Button>
        </ButtonContainer>
      </Container>
      <Containertwo>
        <InquiryListContainer>
          <Label1>문의 목록</Label1> {/* 문의 목록 레이블 */}
          <InquiryList>
            {inquiries.map(
              (
                inquiry // 문의 목록을 순회하여 표시
              ) => (
                <InquiryItem key={inquiry.id}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span>
                        {inquiry.id}. {inquiry.text} {/* 문의 내용 */}
                      </span>
                    </div>
                    <DateLabel>작성일: {inquiry.date}</DateLabel>{' '}
                    {/* 작성일 표시 */}
                  </div>
                  <RemoveButton onClick={() => handleEditInquiry(inquiry)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </RemoveButton>
                  <RemoveButton onClick={() => removeInquiry(inquiry.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </RemoveButton>
                </InquiryItem>
              )
            )}
          </InquiryList>
        </InquiryListContainer>
      </Containertwo>
    </>
  );
}

export default CustomerService;
