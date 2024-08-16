/* eslint-disable react/prop-types */
import styled from "styled-components";
import ButtonComponent from "./ButtonComponent";

const headerTitle = {
    name: '국가명',
    gold: '금',
    silver: '은',
    bronze: '동',
    action: '액션',
}


export default function MedalSummary({ countries, removeCountry }) {
    const { length } = countries;
    return (
        <div className='list-container'>
            {
                !length ?
                    <StyledEmptyDiv>값이 없스요</StyledEmptyDiv> :
                    <>
                        <div key={''} className='country-header'>
                            {
                                Object.keys(headerTitle).map((item, index) => {
                                    return <div key={item} className="header-box"><h4>{headerTitle[item]}</h4></div>
                                })
                            }
                            {/* <div className="header-box"><h4>국가명</h4></div> */}
                            {/* <div className="header-box"><h4>금</h4></div>
                            <div className="header-box"><h4>은</h4></div>
                            <div className="header-box"><h4>동</h4></div>
                            <div className="header-box"><h4>액션</h4></div> */}
                        </div>
                        {countries.map(country => {
                            return <div className='country-container'>
                                {
                                    Object.values(country).map((item, index) => {
                                        return (
                                            <div key={index} className='info-box'>
                                                <p>{item}</p>
                                            </div>
                                        )
                                    })
                                }

                                {/* <div className='info-box'>
                                    <p>{country.gold}</p>
                                </div>
                                <div className='info-box'>
                                    <p>{country.silver}</p>
                                </div>
                                <div className='info-box'>
                                    <p>{country.bronze}</p>
                                </div>*/}
                                <div className='info-box'>
                                    <ButtonComponent
                                        onClick={() => removeCountry(country)}
                                        text='삭제'
                                        type='warning'
                                    />
                                </div>
                            </div>
                        })}
                    </>
            }
        </div>
    )
}

const StyledEmptyDiv = styled.div`
    color:black;
`