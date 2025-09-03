import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Detail from './components/Detail';
import KokDetail from './components/KokDetail'; // 👈 yeni sayfa

import { fetchSureList, fetchSureDetail } from './services/sureService';
import './styles.css';

function App() {
  const [sureler, setSureler] = useState([]);
  const [selectedSureNo, setSelectedSureNo] = useState(null);
  const [fullSureData, setFullSureData] = useState([]);
  const [currentAyetNo, setCurrentAyetNo] = useState(1);

  useEffect(() => {
    async function loadSureler() {
      const data = await fetchSureList();
      setSureler(data);
    }

    loadSureler();
  }, []);

  useEffect(() => {
    async function loadDetail() {
      if (selectedSureNo != null) {
        const detail = await fetchSureDetail(selectedSureNo);
        setFullSureData(detail);
        setCurrentAyetNo(1);
      }
    }

    loadDetail();
  }, [selectedSureNo]);

  const filteredData = fullSureData.filter(item => parseInt(item.ayetNo) === currentAyetNo);
  const maxAyetNo = Math.max(...fullSureData.map(item => parseInt(item.ayetNo)), 0); // max fallback

  return (
    <Router>
      <div className="container">
        <Sidebar
          sureler={sureler}
          onSureClick={setSelectedSureNo}
          selectedId={selectedSureNo}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Detail
                detail={filteredData}
                currentAyetNo={currentAyetNo}
                setCurrentAyetNo={setCurrentAyetNo}
                maxAyetNo={maxAyetNo}
              />
            }
          />

          <Route path="/kok/:kok" element={<KokDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
