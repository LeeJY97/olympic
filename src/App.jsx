import { useState } from 'react'
import './App.css'
import CountryInputBox from './components/CountryInput'


function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({
    name: '',
    gold: 0,
    silver: 0,
    bronze: 0,
  });

  const updateInfo = (value, property) => {
    const copyInfo = { ...countryInfo };
    copyInfo[property] = value;

    setCountryInfo(copyInfo);
  }

  const addCountry = () => {
    const copyCountries = [...countries];

    if (!checkInput('add', copyCountries, countryInfo)) { return; }

    copyCountries.push(countryInfo);
    copyCountries.sort((a, b) => b.gold - a.gold);
    setCountries(copyCountries);
    clearInput();
  }

  const updateCountry = () => {
    if (!checkInput('update', [...countries], countryInfo)) { return; }

    const copyCountries = [...countries].map(cur => {

      if (cur.name === countryInfo.name) {
        cur.gold = countryInfo.gold;
        cur.silver = countryInfo.silver;
        cur.bronze = countryInfo.bronze;
      }
      return cur;
    })

    copyCountries.sort((a, b) => b.gold - a.gold);
    setCountries(copyCountries);
    clearInput();
  }

  const checkInput = (type, copyCountries, { name, ...medals }) => {
    const filterdMedal = Object.values(medals).filter(m => m > 0)[0]
    const filteredCountris = copyCountries.filter(country => {
      return country.name === name
    });
    const duplicateName = filteredCountris[0]?.name;


    if (!name) return alert('국가명 입력');

    if (type === 'add') {
      if (duplicateName) return alert('나라가 겹침');
      if (!filterdMedal) return alert('메달 하나라도 입력');
    } else if (type === 'update') {
      if (!duplicateName) return alert('추가된 나라 업데이트 가능');
    }

    return true;
  }

  const clearInput = () => {
    setCountryInfo({
      name: '',
      gold: 0,
      silver: 0,
      bronze: 0,
    })
  }

  const removeCountry = (country) => {
    const filteredCountris = countries.filter(cur => country.name !== cur.name);
    setCountries(filteredCountris);
  }


  return (
    <>
      <div className='main-container'>
        <h2>2024 파리 올림픽</h2>
        <div className='input-container'>
          <div className='input-box'>
            <CountryInputBox
              title={'국가명'}
              type={'text'}
              value={countryInfo.name}
              onChange={(e) => { updateInfo(e.target.value, 'name') }}
            />
          </div>
          <div className='input-box'>
            <CountryInputBox
              title={'금'}
              type={'number'}
              value={countryInfo.gold}
              onChange={(e) => { updateInfo(e.target.value, 'gold') }}
            />
          </div>
          <div className='input-box'>
            <CountryInputBox
              title={'은'}
              type={'number'}
              value={countryInfo.silver}
              onChange={(e) => { updateInfo(e.target.value, 'silver') }}
            />
          </div>
          <div className='input-box'>
            <CountryInputBox
              title={'동'}
              type={'number'}
              value={countryInfo.bronze}
              onChange={(e) => { updateInfo(e.target.value, 'bronze') }}
            />
          </div>
          <div className='input-box'>
            <button onClick={addCountry}>국가추가</button>
            <button onClick={updateCountry}>업데이트</button>
          </div>
        </div>
        <div className='list-container'>
          {!countries.length && <Empty />}
          {(countries.length > 0 && <CountryHeader />)}
          {countries.map(country => {
            return <List country={country} removeCountry={removeCountry}
            />
          })}
        </div>
      </div>
    </>
  )
}

const Empty = () => {
  return (
    <div style={{ color: 'black' }}>
      <p>데이터가 없슴</p>
    </div>
  )
}

const CountryHeader = () => {
  return (
    <div className='country-header'>
      <div className="header-box"><h4>국가명</h4></div>
      <div className="header-box"><h4>금</h4></div>
      <div className="header-box"><h4>은</h4></div>
      <div className="header-box"><h4>동</h4></div>
      <div className="header-box"><h4>액션</h4></div>
    </div>
  )
}
const List = ({ country, removeCountry }) => {
  return (
    <div className='country-container'>
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
        <button onClick={(e) => removeCountry(country)}>삭제</button>
      </div>
    </div>
  )
}

export default App
