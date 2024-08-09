import { useState } from 'react'
import './App.css'

class Country {
  constructor(name, g = 0, s = 0, b = 0) {
    this.name = name;
    this.g = g;
    this.s = s;
    this.b = b;
  }
}

function App() {
  const [countries, setCountry] = useState([]);

  const [name, setName] = useState("");
  const [g, setG] = useState(0);
  const [s, setS] = useState(0);
  const [b, setB] = useState(0);

  const updateName = (e) => {
    setName(e.target.value);
  }
  const updateMedal = (e, setMedalState) => {
    setMedalState(e.target.value);
  }

  const addCountry = () => {
    const copyCountries = [...countries];
    const country = new Country(name, g, s, b);

    if (!checkInput('add', copyCountries, country)) { return; }

    copyCountries.push(country);
    copyCountries.sort((a, b) => b.g - a.g);
    setCountry(copyCountries);
    clearInput();
  }

  const updateCountry = () => {
    const country = new Country(name, g, s, b);

    if (!checkInput('update', [...countries], country)) { return; }

    const copyCountries = [...countries].map(cur => {

      if (cur.name === country.name) {
        cur.g = country.g;
        cur.s = country.s;
        cur.b = country.b;
      }
      return cur;
    })

    copyCountries.sort((a, b) => b.g - a.g);
    setCountry(copyCountries);
    clearInput();
  }

  const checkInput = (type, copyCountries, { name, ...medals }) => {
    const filterdMedal = Object.values(medals).filter(m => m > 0)[0]
    const duplicateName = copyCountries.filter(country => {
      return country.name === name
    })[0]?.name;


    if (type === 'add') {
      if (!name) return alert('국가명 입력');
      if (duplicateName) return alert('나라가 겹침');
      if (!filterdMedal) return alert('메달 하나라도 입력');
    } else if (type === 'update') {
      if (!duplicateName) return alert('추가된 나라 업데이트 가능');
    }

    return true;
  }

  const clearInput = () => {
    setName("");
    setG(0);
    setS(0);
    setB(0);
  }


  return (
    <>
      <div className='main-container'>
        <h2>24024 파리 올림픽</h2>
        <div className='input-container'>
          <div className='input-box'>
            <p>국가명</p>
            <input type="text" value={name} onChange={(e) => { updateName(e) }} />
          </div>
          <div className='input-box'>
            <p>금</p>
            <input type="number" value={g} onChange={(e) => { updateMedal(e, setG) }} />
          </div>
          <div className='input-box'>
            <p>은</p>
            <input type="number" value={s} onChange={(e) => { updateMedal(e, setS) }} />
          </div>
          <div className='input-box'>
            <p>동</p>
            <input type="number" value={b} onChange={(e) => { updateMedal(e, setB) }} />
          </div>
          <button onClick={addCountry}>국가 추가</button>
          <button onClick={updateCountry}>업데이트</button>
        </div>
      </div>
      <div className='list-container'>
        {countries.map(country => <List country={country} />)}
      </div>
    </>
  )
}


const List = ({ country }) => {
  return (
    <div className='country-container'>
      <div className='info-box'>
        {country.name}
      </div>
      <div className='info-box'>
        {country.g}
      </div>
      <div className='info-box'>
        {country.s}
      </div>
      <div className='info-box'>
        {country.b}
      </div>
      <div className='info-box'>
        <button onClick={''}>삭제</button>
      </div>
    </div>
  )
}

export default App
