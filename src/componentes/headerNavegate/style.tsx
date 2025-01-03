import styled from "styled-components";

export const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  color: #333;
  text-align: center;
  background-color: #f8f8f8;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

export const LogoImage = styled.img`
    width: 100px;
`;


export const HeroSection = styled.section`
  position: relative;
  background-image: url("https://via.placeholder.com/1200x600");
  background-size: cover;
  background-position: center;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
`;

export const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  max-width: 600px;
`;
