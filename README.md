# 프로젝트 설명
리액트로 간단한 CRUD 기능을 구현한 페이지입니다. 

### (1). `MEdalPage`
사용자에게 보여질 페이지입니다. (컴포넌트 집합체)

### (2). `components`

ButtonComponent 
- 재사용 가능한 버튼 컴포넌트
- 국가추가, 업데이트, 삭제 등에 사용
- styled-component 적용
  
InputBox 
- 재사용 가능한 input폼 컴포넌트
- 국가 및 메달 정보 입력 등에 사용
- map() 으로 반복 출력

MedalSummary
- 추가된 국가가 1개 이상 있을 경우 보여지는 테이블 컴포넌트

### (3). `useState`  
countries
- 추가된 국가들
 
contryInfo 
- input폼에 입력된 데이터



