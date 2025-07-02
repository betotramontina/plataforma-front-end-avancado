import { useEffect, useState } from "react";
import Item from "../components/Item";
import logo from '../assets/logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { staticProducts } from '../data/ongsData';

export default function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [weatherInfo, setWeatherInfo] = useState(""); // eslint-disable-next-line
  const [cityIndex, setCityIndex] = useState(0); 

  const apiKey = "79f2870e4528540bb5f5079faa56e91f";

  // Efeito para buscar o clima e atualizar a cada 5 segundos
  useEffect(() => {
    const cidades = [
      "Brasilia,BR", "São Paulo,BR", "Rio de Janeiro,BR", "Salvador,BR",
      "Belo Horizonte,BR", "Fortaleza,BR", "Manaus,BR", "Curitiba,BR",
      "Recife,BR", "Porto Alegre,BR"
    ];

    // Função que busca o clima da cidade atual e atualiza o estado
    const buscarClimaEAtualizar = () => {
      setCityIndex(prevIndex => {
        const currentCityIndexToFetch = prevIndex;
        const cidade = cidades[currentCityIndexToFetch];
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

        console.log(`[Clima] Buscando clima para: ${cidade} no tempo: ${new Date().toLocaleTimeString()}`);

        fetch(url)
          .then(response => {
            if (!response.ok) { // Verifica se a resposta da rede foi bem-sucedida
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            setWeatherInfo(
              `🌤️ ${cidade}: ${data.weather[0].description} | 🌡️ ${data.main.temp}°C | 💧 Umidade: ${data.main.humidity}%`
            );
            console.log(`[Clima] Sucesso para ${cidade}. Dados:`, data);
          })
          .catch(error => {
            console.error("[Clima] Erro ao buscar dados do clima:", error);
            setWeatherInfo("Não foi possível carregar o clima.");
          });

        return (prevIndex + 1) % cidades.length;
      });
    };

    console.log(`[Clima] useEffect de clima inicializado (Configurando intervalo).`);

    buscarClimaEAtualizar();

    // Configura o intervalo para chamar a função a cada 5 segundos
    const intervalId = setInterval(buscarClimaEAtualizar, 5000);
    console.log(`[Clima] Intervalo definido com ID: ${intervalId}`);

    return () => {
      console.log(`[Clima] Limpando intervalo com ID: ${intervalId}`);
      clearInterval(intervalId);
    };

  }, [apiKey]);

  return (
    <div className="content-product">
      <header>
        <div className="logo">
          <img src={logo} alt="Logo da Empresa" />
        </div>
        <div className="user">
          <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</Link>
        </div>
        <div className="user">
          <Link to="/products" className={location.pathname === '/products' ? 'active-link' : ''}>ONGs Parceiras</Link>
        </div>
        <div className="user">
          <Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>Seja Voluntário</Link>
        </div>
      </header>

      <div className="weather-info-bar">
        {weatherInfo}
      </div>

      <section className="main-products"> 
        {staticProducts.map((p) => (
          <Item key={p.id} product={p} />
        ))}
      </section>

      <section className="contact-content">
        <h2>Seja a mudança.</h2>
        <p>Seja um voluntário.</p>
        <button className='contact-form-submit-button' onClick={() => navigate('/contact')}> Cadastre-se</button>
      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Dowii. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
