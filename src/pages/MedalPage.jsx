import { useState } from 'react'
import MedalSummary from '../components/MedalSummary'
import ButtonComponent from '../components/ButtonComponent'
import { DivInputBox, FormInput } from '../components/InputBox'
import { validateAddInput, validateUpdateInput, validateAlertMessage } from '../assets/common'
import constants from '../assets/constants'
const { INITIAL_STATE, FORM_INPUT_PROPERTIES } = constants;

export default function MainPage() {
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState(INITIAL_STATE);

    const updateInfo = (value, property) => {
        const copyInfo = { ...countryInfo };
        copyInfo[property] = value;

        setCountryInfo(copyInfo);
    }

    const addCountry = () => {
        // const copyCountries = [...countries];

        // const validate = validateAddInput(copyCountries, countryInfo);

        // if (!validate.isValid) {
        //     validateAlertMessage(validate);
        //     return;ㅖ
        // }

        // copyCountries.push(countryInfo);
        // copyCountries.sort((a, b) => b.gold - a.gold);
        // setCountries(copyCountries);

        // https://react.dev/learn/queueing-a-series-of-state-updates
        // 확실한 최신값을 사용할 수 있다. (setState의 callback에서 작업하면 그 callback의 인자에는 확실한 최신값이 들어있음)
        setCountries((arr) => {
            const copyArr = [...arr];

            const validate = validateAddInput(copyArr, countryInfo);

            if (!validate.isValid) {
                validateAlertMessage(validate);
                return copyArr;
            }

            copyArr.push(countryInfo);
            copyArr.sort((a, b) => b.gold - a.gold);
            clearInput();
            return copyArr;
        })
        // setcountries의 작업이 끝나기 전에 다음 코드가 실행될 수 있는데
        // 나중에 useEffect() 쓰면 ㅇㅋ

        // clearInput();
    }

    const updateCountry = () => {
        const validate = validateUpdateInput(countries, countryInfo);

        if (!validate.isValid) {
            validateAlertMessage(validate);
            return;
        }

        setCountries((arr) => {
            // some ? 
            const copyArr = [...arr].map(cur => {
                if (cur.name === countryInfo.name) return countryInfo
                return cur;
            })
            copyArr.sort((a, b) => b.gold - a.gold);
            clearInput();
            return copyArr;
        })
    }

    const clearInput = () => {
        setCountryInfo(INITIAL_STATE)
    }

    const removeCountry = (country) => {
        const filteredCountries = countries.filter(cur => country.name !== cur.name);
        setCountries(filteredCountries);
    }

    return (
        <>
            <div className='main-container'>
                <h2>2024 파리 올림픽</h2>
                <div className='input-container'>
                    {FORM_INPUT_PROPERTIES.map(form => {
                        return <DivInputBox className={['input-box']}>
                            <FormInput
                                title={form.title}
                                type={form.type}
                                value={countryInfo[form.property]}
                                onChange={(e) => updateInfo(e.target.value, form.property)}
                            />
                        </DivInputBox>
                    })}

                    <DivInputBox className={['input-box']}>
                        <ButtonComponent
                            onClick={addCountry}
                            text='국가추가'
                            type='primary'
                        />
                        <ButtonComponent
                            onClick={updateCountry}
                            text='업데이트'
                            type='primary'
                        />
                    </DivInputBox>
                </div>
                <MedalSummary countries={countries} removeCountry={removeCountry} key={""} />
            </div >
        </>
    )
}


