import styled from "styled-components";

function ButtonComponent({ onClick, text, type }) {
    return (
        <StyledButton onClick={onClick} type={type}>{text}</StyledButton>
    )
}

// 이건 본인 컴포넌트에서 정의 하는 것 ?
const StyledButton = styled.button`
border: none;
width: 60px;
height: 30px;
font-weight: 900;
border-radius: 5px;


color: ${(props) => props.type === 'primary' ? 'black' : 'white'};
background-color: ${(props) => props.type === 'primary' ? 'rgb(255, 153, 0)' : 'rgb(230, 40, 87)'};
`

// props를 받아서 조건 등을 사용하기 편해서 사용 (리액트 친화적)
// 웹폰트나, 공통적인 것들은 sass 로 사용
// 통일해도 상관 x

// type switch로 나눠보기
export default ButtonComponent;