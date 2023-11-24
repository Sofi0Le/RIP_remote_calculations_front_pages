import { FC, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import './Calculations.css';
import image_1 from '/images/image_1.jpg'

interface Calculation {
  calculation_id: number;
  calculation_name: string;
  calculation_description: string;
  full_url: string;
}

const mockCalculations: Calculation[] = [
  {
    calculation_id: 1,
    calculation_name: 'Подарочные корзины с цветами',
    calculation_description: 'Наши подарочные корзины - это полный праздник в одной упаковке. Мы предлагаем широкий выбор букетов цветов, которые можно дополнить шоколадом, вином, ароматическими свечами или даже плюшевыми мишками. Отправьте этот прекрасный подарок с доставкой к двери, чтобы порадовать кого-то особенного.',
    full_url: image_1,
  },
  // Add more mock bouquets as needed
];

const CalculationsPage: FC = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('title') || '';
  

  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [searchValue, setSearchValue] = useState(searchParam);

  const fetchCalculations = (searchText: string) => {
    // Fetch bouquet data using the relative path 
    const filteredCalculations = mockCalculations.filter(calculation =>
      calculation.calculation_name.toLowerCase().includes(searchText.toLowerCase())
    );

    setCalculations(filteredCalculations);

  };

  const breadcrumbsItems = [
    { label: 'Все операции', link:'' } // Link to the current page
  ];

  const handleSearchClick = () => {
    // Redirect to the same frontend page with the search query parameter
    navigateTo(`/calculations/?title=${searchValue}`);
    // Fetch data after navigating to the new URL
    fetchCalculations(searchValue);
  };

  useEffect(() => {
    // Fetch data when the component mounts for the first time or when search query changes
    fetchCalculations(searchValue);
  }, []); // Update the effect to run whenever searchValue changes

  return (
    <div className="album">
      <div className="container">
        <div className="row">
        <Breadcrumbs items={breadcrumbsItems} /> {/* Include Breadcrumbs component */}
            <div className="search-bar">
              <input
                type="text"
                id="search-input"
                placeholder="Поиск"
                value={searchValue}
                onChange={(event => setSearchValue(event.target.value))}
              />
              <button type="button" id="search-button" onClick={handleSearchClick}>
                Искать
              </button>
            </div>

            {calculations.map((calculation) => (
            <div className="col" key={calculation.calculation_id}>
              <div className="card">
              <img src={calculation.full_url} alt={calculation.calculation_name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{calculation.calculation_name}</h5>
                  <p className="card-text">{calculation.calculation_description}</p>
                  {/* Add more text elements here if needed */}
                  <a href={`/RIP_remote_calculations_front_pages/#/calculations/${calculation.calculation_id}/`} className="btn btn-primary">
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculationsPage;