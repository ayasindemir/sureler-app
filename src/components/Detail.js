import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Detail({ detail, currentAyetNo, setCurrentAyetNo, maxAyetNo }) {
  const navigate = useNavigate();
  const [mealList, setMealList] = useState([]); // ✅ tüm meal listesi

  useEffect(() => {
    if (!detail || detail.length === 0) return;

    const sureNo = detail[0].sureNo;
    const ayetNo = currentAyetNo;

    async function fetchMeal() {
      try {
        const response = await fetch(`http://localhost:8080/meal/getBySureNoAndAyetNo?sureNo=${sureNo}&ayetNo=${ayetNo}`);
        const data = await response.json();
        setMealList(data); // ✅ tüm liste
      } catch (error) {
        console.error("Meal verisi alınamadı:", error);
        setMealList([]);
      }
    }

    fetchMeal();
  }, [detail, currentAyetNo]);

  if (!detail || detail.length === 0) {
    return <div className="detail">Veri yok</div>;
  }

  const handlePrev = () => {
    if (currentAyetNo > 1) setCurrentAyetNo(currentAyetNo - 1);
  };

  const handleNext = () => {
    if (currentAyetNo < maxAyetNo) setCurrentAyetNo(currentAyetNo + 1);
  };

  return (
    <div className="detail">
      {/* ✅ Tüm meal listesi */}
      {mealList.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f7f7f7' }}>
          {mealList.map((meal, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <strong>{meal.yazar}:</strong> {meal.meal}
            </div>
          ))}
        </div>
      )}

      <div className="detail-header">
        <h2>{detail[0].sureNo}. {detail[0].sureAdi} Suresi</h2>
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentAyetNo <= 1}>⟨ Önceki</button>
          <button onClick={handleNext} disabled={currentAyetNo >= maxAyetNo}>Sonraki ⟩</button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Ayet No</th>
            <th>Kelime No</th>
            <th>Arapça</th>
            <th>Kök 1</th>
            <th>Kök 2</th>
            <th>Meal</th>
          </tr>
        </thead>
        <tbody>
          {detail.map((item, index) => (
            <tr key={index}>
              <td>{item.ayetNo}</td>
              <td>{item.kelimeNo}</td>
              <td className="arapca-yazi">{item.arapcaHarekeli}</td>
              <td className="arapca-yazi">{item.arapcaKok}</td>
              <td>
                <span
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => navigate(`/kok/${item.latinKok}`)}
                >
                  {item.latinKok}
                </span>
              </td>
              <td>{item.mealTr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
