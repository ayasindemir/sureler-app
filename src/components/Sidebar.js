import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ sureler, onSureClick, selectedId }) {
  const navigate = useNavigate(); // ✅ yönlendirme için

  const handleClick = (sureNo) => {
    onSureClick(sureNo);         // seçilen sureyi yükle
    navigate('/');               // anasayfaya dön
  };

  return (
    <div className="sidebar">
      <ul>
        {sureler.map((sure) => (
          <li
            key={sure.sureNo}
            className={sure.sureNo === selectedId ? 'active' : ''}
            onClick={() => handleClick(sure.sureNo)} // 👈
          >
            {sure.sureNo} - {sure.sureAdi}
          </li>
        ))}
      </ul>
    </div>
  );
}
