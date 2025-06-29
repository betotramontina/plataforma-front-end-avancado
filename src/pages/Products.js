import { useEffect, useState } from "react";
import Item from "../components/Item";
import banner from '../assets/banner.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cityIndex, setCityIndex] = useState(0); // Estado para controlar o índice da cidade

  const apiKey = "79f2870e4528540bb5f5079faa56e91f"; // Sua chave da API

  // Efeito para buscar a lista de produtos (executado uma única vez na montagem)
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/produtos')
      .then(res => setProductList(res.data.produtos))
      .catch(error => console.log(error));
  }, []); // Array de dependências vazio para executar apenas uma vez

  // Efeito para buscar o clima e atualizar a cada 5 segundos
  useEffect(() => {
    const cidades = [
      "Brasilia,BR", "São Paulo,BR", "Rio de Janeiro,BR", "Salvador,BR",
      "Belo Horizonte,BR", "Fortaleza,BR", "Manaus,BR", "Curitiba,BR",
      "Recife,BR", "Porto Alegre,BR"
    ];

    // Função que busca o clima da cidade atual e atualiza o estado
    const buscarClimaEAtualizar = () => {
      // Usamos o callback de setCityIndex para garantir que estamos sempre
      // trabalhando com o índice mais atualizado e para a próxima cidade.
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

        // Retorna o próximo índice para a próxima rodada da função no intervalo
        return (prevIndex + 1) % cidades.length;
      });
    };

    console.log(`[Clima] useEffect de clima inicializado (Configurando intervalo).`);

    // Chamada inicial para buscar o clima imediatamente na montagem do componente
    buscarClimaEAtualizar();

    // Configura o intervalo para chamar a função a cada 5 segundos
    const intervalId = setInterval(buscarClimaEAtualizar, 5000);
    console.log(`[Clima] Intervalo definido com ID: ${intervalId}`);

    // Função de limpeza: será executada quando o componente for desmontado para parar o intervalo
    return () => {
      console.log(`[Clima] Limpando intervalo com ID: ${intervalId}`);
      clearInterval(intervalId);
    };

  }, [apiKey]); // O efeito depende apenas da apiKey. cityIndex é gerenciado internamente pelo setState.

  return (
    <div className="content-product">
      <header>
        <div className="user">
          <span>Usuário</span>
        </div>
      </header>

      {/* Div para exibir as informações do clima, posicionada abaixo do header */}
      <div className="weather-info-bar">
        {weatherInfo}
      </div>
      
      <section className="banner">
        <img src={banner} alt="Banner" />
      </section>

      <section className="main-products">
        {productList.map((p, index) => (
          <Item key={index} product={p} />
        ))}
      </section>

            <section className="main-products">
        <div className='text-intro'>
          <p> Faça sua doação</p>
          <button className='more-info' onClick={() => navigate('/contact')}> Ver projetos</button>
        </div>
      </section>

      <footer></footer>
    </div>
  );
}
