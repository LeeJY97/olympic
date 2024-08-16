import { useState } from 'react'
import MedalSummary from '../components/MedalSummary'
import ButtonComponent from '../components/ButtonComponent'
import { DivInputBox, FormInput } from '../components/InputBox'
import { validateAddInput, validateUpdateInput, validateAlertMessage } from '../assets/common'
import constants from '../assets/constants'
const { INITIAL_STATE, FORM_INPUT_PROPERTIES } = constants;

export default function MainPage() {
    const [countries, setCountries] = useState([]);
    const [countryInfo, setCountryInfo] = useState(() => INITIAL_STATE); // 레이지 이니셜라이션

    const updateInfo = (value, property) => {
        const copyInfo = { ...countryInfo };
        copyInfo[property] = value;

        setCountryInfo(copyInfo);
    }

    const addCountry = () => {
        const validate = validateAddInput([...countries], countryInfo);

        if (!validate.isValid) {
            validateAlertMessage(validate);
            return;
        }

        setCountries([...countries, countryInfo].sort((a, b) => b.gold - a.gold));
        clearInput();
    }

    const updateCountry = () => {
        const validate = validateUpdateInput(countries, countryInfo);

        if (!validate.isValid) {
            validateAlertMessage(validate);
            return;
        }
        setCountries((arr) => {
            const copyArr = [...arr].map(cur => {
                if (cur.name === countryInfo.name) return countryInfo
                return cur;
            })
            copyArr.sort((a, b) => b.gold - a.gold);
            clearInput();
            return copyArr;
        })
    }
    const removeCountry = (country) => {
        const filteredCountries = countries.filter(cur => country.name !== cur.name);
        setCountries(filteredCountries);
    }


    const clearInput = () => {
        setCountryInfo(INITIAL_STATE)
    }


    const buttons = [
        { text: '국가추가', type: 'primary', onClick: addCountry },
        { text: '업데이트', type: 'primary', onClick: updateCountry },
    ]

    return (
        <div className='main-container'>
            <h2>2024 파리 올림픽</h2>
            <div className='input-container'>
                {FORM_INPUT_PROPERTIES.map((form, idx) => {
                    return (
                        // <DivInputBox className={['input-box']}> css module - styled랑 섞어서 써도 무방
                        <div className='input-box' key={idx}>
                            <FormInput
                                title={form.title}
                                type={form.type}
                                value={countryInfo[form.property]}
                                onChange={(e) => updateInfo(e.target.value, form.property)}
                            />
                        </div>
                    )
                })}
                {/* class 네이밍을 길게 medal...*/}
                {/* key값에 text넣을바에 index 넣기 */}
                <div className='input-box'>
                    {buttons.map((button, index) => <ButtonComponent key={index} onClick={button.onClick} text={button.text} type={button.type} />)}
                </div>
            </div>
            <MedalSummary countries={countries} removeCountry={removeCountry} />
        </div >
    )
}


