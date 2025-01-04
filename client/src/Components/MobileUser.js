import React from 'react';
import '../css/MobileUser.css';
import Spline from '@splinetool/react-spline';

const MobileUser = () => {
  return (
    <div className="app-container mobile">
      <div className="center-container">
        <h1>NewsMato</h1>
        <p>This page is not available on mobile devices.<br />Try this game instead or <br/> Try joining with Laptop.</p>
      </div>
      <div className="spline-model">
      <Spline scene="https://prod.spline.design/WcdWtNYBJ6US7PPX/scene.splinecode" />
      </div>
    </div>
  );
}

export default MobileUser;
