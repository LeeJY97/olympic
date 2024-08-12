/* eslint-disable react/prop-types */
import styled from "styled-components";
import ButtonComponent from "./ButtonComponent";

export default function MedalSummary({ countries, removeCountry, key }) {
    const len = countries.length;
    return (
        <div className='list-container'>
            {
                !len ?
                    <StyledEmptyDiv>값이 없스요</StyledEmptyDiv> :
                    <>
                        <div className='country-header'>
                            <div className="header-box"><h4>국가명</h4></div>
                            <div className="header-box"><h4>금</h4></div>
                            <div className="header-box"><h4>은</h4></div>
                            <div className="header-box"><h4>동</h4></div>
                            <div className="header-box"><h4>액션</h4></div>
                        </div>
                        {countries.map(country => {
                            // eslint-disable-next-line react/jsx-key
                            return <div className='country-container' key={key}>
                                <div className='info-box'>
                                    <p>{country.name}</p>
                                </div>
                                <div className='info-box'>
                                    <p>{country.gold}</p>
                                </div>
                                <div className='info-box'>
                                    <p>{country.silver}</p>
                                </div>
                                <div className='info-box'>
                                    <p>{country.bronze}</p>
                                </div>
                                <div className='info-box'>
                                    <ButtonComponent
                                        onClick={() => removeCountry(country)}
                                        // onClickFunc={removeCountry(country)}
                                        text='삭제'
                                        type='warning'
                                    />
                                    {/* <button onClick={(e) => removeCountry(country)}>삭제</button> */}
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