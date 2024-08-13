// 명확하게 유효성 검사의 종류가 다르면 나누는게 맞지만
// 비슷한? 검사 정도면 합쳐도 ㄱㅊ

const validateAddInput = (copyCountries, { name, ...medals }) => {
    const validate = {
        isValid: true,
        message: ''
    }

    const filteredMedal = Object.values(medals).filter(m => m > 0)[0]
    const duplicateCountry = copyCountries.findIndex(country => name === country.name);

    if (!name) {
        validate.message = '나라명 입력'
        validate.isValid = false;
    } else if (!filteredMedal) {
        validate.message = '메달 하나라도 입력';
        validate.isValid = false;
    } else if (duplicateCountry >= 0) {
        validate.message = '나라가 겹침';
        validate.isValid = false;
    }

    return validate;
}

const validateUpdateInput = (copyCountries, { name }) => {
    const validate = {
        isValid: true,
        message: ''
    }

    // .find() 
    const existCountry = copyCountries.findIndex(country => name === country.name); // 인덱스는 0부터 시작하기 때문에 없을 경우 반환값은 0이 될 수없다.

    if (!name) {
        validate.message = '나라명 입력';
        validate.isValid = false;
    } else if (existCountry === -1) {
        validate.message = '추가된 나라 업데이트 가능';
        validate.isValid = false;
    }

    return validate;
}

const validateAlertMessage = (validate) => {
    alert(validate.message);

}

export { validateAddInput, validateUpdateInput, validateAlertMessage };