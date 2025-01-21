import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyPageIcon = ({ isLoggedIn }) => {
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const handleClick = () => {
    if (!isLoggedIn) {
      alert('로그인 후에 이용 가능합니다.');
      navigate('/login'); // history.push 대신 navigate 사용
    } else {
      // 마이페이지로 이동하는 로직
      navigate('/mypage');
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src="/path/to/mypage-icon.png" alt="My Page" />
    </div>
  );
};

export default MyPageIcon;
