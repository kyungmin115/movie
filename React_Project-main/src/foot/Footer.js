import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #f8f8f8;
  color: white;
  position: relative;
  bottom: 0;
  width: 100%;
`;
const FooterHead = styled.div`
  height: 25px;
`;
const FooterBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-between;
  max-width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid #cacac1;
`;
const FooterFoot = styled.div`
  font-size: 10px;
  color: #666;
  line-height: 1.667em;
  text-align: left;
  padding: 20px;
`;
const StyledLink = styled(Link)`
  color: black;
  font-size: 13px;
  text-decoration: none;
  margin: 10px 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterHead />
      <FooterBody>
        <StyledLink to="#">회사소개</StyledLink>
        <StyledLink to="#">지속가능경영</StyledLink>
        <StyledLink to="#">IR</StyledLink>
        <StyledLink to="#">채용정보</StyledLink>
        <StyledLink to="#">이용약관</StyledLink>
        <StyledLink to="#">편성기준</StyledLink>
        <StyledLink to="#">개인정보처리방침</StyledLink>
        <StyledLink to="#">법적고지</StyledLink>
        <StyledLink to="#">이메일주소무단수집거부</StyledLink>
        <StyledLink to="#">윤리경영</StyledLink>
        <StyledLink to="#">사이버감사실</StyledLink>
      </FooterBody>
      <FooterFoot>
        <address>
          (04377)서울특별시 용산구 한강대로 23길 55, 아이파크몰 6층(한강로동)
        </address>
        <p>
          대표이사 허민회 사업자등록번호 104-81-45690 통신판매업신고번호
          2017-서울용산-0662
        </p>
        <p>호스팅사업자 CJ올리브네트웍스 대표이메일 cjcgvmaster@cj.net</p>
        <p>© CJ CGV. All Rights Reserved</p>
      </FooterFoot>
    </FooterContainer>
  );
};

export default Footer;
