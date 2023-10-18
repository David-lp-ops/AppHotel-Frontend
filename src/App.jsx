import { useState, useEffect } from 'react';
import Header from './components/Header';
import ReservationFormContainer from './components/Container/ReservationFormContainer';
import RoomFormContainer from './components/Container/RoomFormContainer';
import ReservationListContainer from './components/Container/ReservationListContainer';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className='mt-12 md:flex w-full'>

          <ReservationFormContainer />
          <RoomFormContainer />
          <ReservationListContainer />
       
      </div>
      <df-messenger
        intent="WELCOME"
        chat-title="Hotel"
        agent-id="b9bc4590-848e-484f-bc92-609144cc693f"
        language-code="es"
      ></df-messenger>
    </div>
  );
}

export default App;
