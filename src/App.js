import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa'
import people from './components/data';
import './App.css';

function App() {

  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const slider = setInterval(() => {
    setIndex(checkIndex(index + 1));
    },1000);

    return () => clearInterval(slider)
  }, [index]);

  const checkIndex = (index) => {
    let newIndex;
    if(index < 0) {
      newIndex = people.length - 1;
      return newIndex;
    }
    if(index > people.length - 1) {
      newIndex = 0;
      return newIndex;
    }
    return index;
  };

  const handlePrev = () => {
    setIndex(checkIndex(index-1));
  };

  const handleNext = () => {
    setIndex(checkIndex(index+1));
  };

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center"> 
        {people.map((person, personIndex) => {
          const {id, image, name, title, quote} = person;

          let position = 'nextSlide';
          if(personIndex === index){
            position = 'activeSlide';
          }
          if(
            personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)
            ) {
            position = 'lastSlide'
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className='person-img'/>
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className='icon'/>
            </article>
          )
        })}
        <button className='prev' onClick={handlePrev}><FiChevronLeft /></button>
        <button className='next' onClick={handleNext}><FiChevronRight /></button>
      </div>
    </section>
  );
}

export default App;