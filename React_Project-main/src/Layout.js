import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import styled from 'styled-components';
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiCustomerService2Line } from 'react-icons/ri';
import { MdOutlineContactPage } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import Footer from './foot/Footer';

// 색상 변수
const basicColor = '#e71a0f'; // CGV 레드
const textColor = '#333'; // 기본 텍스트 색상

// 전체 레이아웃 스타일
const LayoutHead = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 1000px;
  border: 0.2px solid #ebebeb;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 10px 20px;
  margin: 0 auto;
  width: 90%;
`;

const Logo = styled.h1`
  font-size: 30px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: ${basicColor};

    &:hover {
      color: #cc1710;
    }
  }
`;

const Info = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;

  li {
    margin-left: 15px;
    display: flex;
    align-items: center;

    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      flex-direction: column;
      color: ${textColor};
      margin-right: 5px;

      span {
        font-size: 12px;
        color: ${textColor};
        margin-top: 5px;
      }

      &:hover {
        span {
          color: ${basicColor};
        }
      }
    }
  }
`;

const Menu = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.3px solid #ebebeb;
  border-bottom: 2px solid ${basicColor};
  width: 100%;
  list-style: none;
  text-decoration: none;

  .menucontent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
  }

  .category {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    margin-right: 10px;
  }

  .search {
    line-height: 10px;
  }

  li {
    margin: 8px 12px;
    font-weight: bold;
    font-size: 12px;
    color: #222;
    line-height: 1.5em;
  }
`;
const LoginLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  list-style: none;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  &:hover {
    li {
      color: ${basicColor};
    }
  }
`;

const LogOut = styled.button`
  border: 0;
  background-color: white;
  text-decoration: none;
  cursor: pointer;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    span {
      color: ${basicColor};
    }
`;

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용
  const location = useLocation(); // 현재 경로를 가져오기 위한 useLocation

  // 페이지 이동 시 검색어 초기화
  useEffect(() => {
    setSearchTerm(''); // 페이지가 변경될 때 검색어 초기화
  }, [location.pathname]); // 경로가 변경될 때마다 searchTerm 초기화

  useEffect(() => {
    const saveUserName = localStorage.getItem('userName');
    if (saveUserName) {
      setIsLoggedIn(true);
      setUserName(saveUserName);
    } else {
      console.log('로그인 상태 : ', false);
    }

    // 카카오 로그인 상태 확인
    if (window.Kakao && window.Kakao.Auth) {
      const accessToken = window.Kakao.Auth.getAccessToken();
      if (accessToken) {
        setIsLoggedIn(true);
        // 추가적인 사용자 정보 요청이 필요한 경우 여기에 구현
      }
    }
  }, []);

  // 검색 핸들러 함수
  const handleSearch = (e) => {
    e.preventDefault(); // 기본 동작 방지
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${searchTerm}`); // 검색 페이지로 이동하면서 검색어 전달
      setSearchTerm(''); // 검색어 초기화
    }
  };

  // 마이페이지 클릭 핸들러
  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      alert('로그인 이후에 이용이 가능합니다.');
      navigate('/login'); // 로그인 페이지로 이동
    }
    // 로그인이 되어 있을 때는 별도 동작이 없거나, 다른 처리 가능
  };

  //로그아웃
  const handleLogout = async () => {
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserName('');
    alert('로그아웃 완료');
    //카카오 로그아웃
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');

        setIsLoggedIn(false);
        navigate('/');
      });
    } else {
      alert('카카오 로그아웃 중 오류 발생');
    }
  };

  return (
    <LayoutHead>
      <Head>
        <HeaderContent>
          <Logo>
            <Link to="/">CGB</Link>
          </Logo>
          <Info>
            {isLoggedIn ? (
              <li>
                <LogOut onClick={handleLogout}>
                  <RiLockPasswordLine size="28px" />
                  <span>{userName}님</span>
                </LogOut>
              </li>
            ) : (
              <li>
                <LoginLink to="/login">
                  <RiLockPasswordLine size="28px" />
                  <span>로그인</span>
                </LoginLink>
              </li>
            )}
            <li>
              <Link to="/login" onClick={handleMyPageClick}>
                <MdOutlineContactPage size="28px" />
                <span>마이 페이지</span>
              </Link>
            </li>
            <li>
              <Link to="/service">
                <RiCustomerService2Line size="28px" />
                <span>고객센터</span>
              </Link>
            </li>
          </Info>
        </HeaderContent>
        <Menu>
          <div className="menucontent">
            <div className="category">
              <NavLink to="/movie">
                <li>영화 순위</li>
              </NavLink>
              <NavLink to="/newmovie">
                <li>상영 예정</li>
              </NavLink>
              <NavLink to="/bookmark">
                <li>즐겨찾기</li>
              </NavLink>
            </div>
            <div>
              <form onSubmit={handleSearch}>
                <input
                  placeholder="검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // 검색어 입력
                />
                <button type="submit">
                  <FaSearch size="16px" className="search" />
                </button>
              </form>
            </div>
          </div>
        </Menu>
        <main>
          <Outlet />
        </main>
        <Footer />
      </Head>
    </LayoutHead>
  );
};

export default Layout;
