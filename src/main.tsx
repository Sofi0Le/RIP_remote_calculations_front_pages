import ReactDOM from 'react-dom';
import {HashRouter, Route, Routes} from "react-router-dom";
import CalculationsPage from './Calculations'; 

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/calculations/" element={<CalculationsPage />}/>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);