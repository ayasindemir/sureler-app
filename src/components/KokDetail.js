import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const KokDetail = () => {
  const { kok } = useParams(); // URL'den gelen kök
  const [ayetler, setAyetler] = useState([]);

  useEffect(() => {
    async function fetchKokData() {
      try {
        const response = await fetch(`http://localhost:8080/kuran/getByLatinKok?kok=${kok}`);
        const data = await response.json();
        setAyetler(data);
      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    }

    fetchKokData();
  }, [kok]);

  return (
    <div className="kok-detail" style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>
        <span style={{ color: 'darkred' }}>{kok}</span> kökü Kur'an'da {ayetler.length} defa geçmektedir.
      </h2>

      {ayetler.map((item, index) => (
        <div
          key={index}
          style={{
            borderTop: '1px solid #ddd',
            padding: '15px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '20px'
          }}
        >
          {/* Sol - Sure Adı ve No */}
          <div style={{ width: '15%', fontWeight: 'bold' }}>
            {item.sureAdi?.toUpperCase()}<br />
            {item.sureNo}:{item.ayetNo}
          </div>

          {/* Orta - Meâl */}
          <div style={{ width: '50%', fontSize: '15px' }}>
            {item.mealTr}
          </div>

          {/* Sağ - Arapça Ayet */}
          <div style={{
            width: '30%',
            fontSize: '22px',
            textAlign: 'right',
            direction: 'rtl'
          }}>
            {item.arapcaHarekeli}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KokDetail;
