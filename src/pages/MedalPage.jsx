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
        const copyCountries = [...countries];

        const validate = validateAddInput(copyCountries, countryInfo);

        if (!validate.isValid) {
            validateAlertMessage(validate);
            return;
        }

        copyCountries.push(countryInfo);
        copyCountries.sort((a, b) => b.gold - a.gold);
        setCountries(copyCountries);
        // 함수로 setState 사용? useState의 callback 함수 (setState callback 함수  react.docs)
        // https://react.dev/learn/queueing-a-series-of-state-updates
        clearInput();
    }

    const updateCountry = () => {
        const validate = validateUpdateInput(countries, countryInfo);

        if (!validate.isValid) {
            validateAlertMessage(validate);
            return;
        }


        // some ? 
        const copyCountries = [...countries].map(cur => {

            if (cur.name === countryInfo.name) {
                return countryInfo;
            }
            return cur;
        })

        copyCountries.sort((a, b) => b.gold - a.gold);
        setCountries(copyCountries);
        clearInput();
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


