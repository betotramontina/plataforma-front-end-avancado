import { useEffect, useState } from "react";
import Item from "../components/Item";
import logo from '../assets/logo.png';
import ong1 from '../assets/ong1.png';
import ong2 from '../assets/ong2.png';
import ong3 from '../assets/ong3.png';
import ong4 from '../assets/ong4.png';
import { useNavigate } from 'react-router-dom';

const staticProducts = [
  { 
    id: 1, 
    name: "ONG Esperança", 
    image: ong1,
    description: "Ajude famílias carentes com alimentos essenciais.",
    // Adicione outras propriedades que seu componente Item precise
  },
  { 
    id: 2, 
    name: "ONG Mãos Unidas", 
    image:  ong2,
    description: "Garanta a saúde e dignidade com itens de higiene pessoal.",
  },
  { 
    id: 3, 
    name: "ONG Futuro Brilhante", 
    image: ong3,
    description: "Apoie a educação de crianças e jovens.",
  },
  { 
    id: 4, 
    name: "ONG Abraço Bom", 
    image: ong4,
    description: "Mantenha alguém aquecido no inverno.",
  },
  ];

export default function Products() {
  const navigate = useNavigate();
  const [weatherInfo, setWeatherInfo] = useState(""); // eslint-disable-next-line no-unused-vars
  const [cityIndex, setCityIndex] = useState(0); 

  const apiKey = "79f2870e4528540bb5f5079faa56e91f"; // Sua chave da API

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
        <div className="logo">
          <img src={logo} alt="Logo da Empresa" />
        </div>
        <div className="user">
          <span>Home</span>
        </div>
        <div className="user">
          <span>ONGs Parceiras</span>
        </div>
        <div className="user">
          <span>Seja Voluntário</span>
        </div>
      </header>

      {/* Div para exibir as informações do clima, posicionada abaixo do header */}
      <div className="weather-info-bar">
        {weatherInfo}
      </div>

      <section className="main-products"> 
        {staticProducts.map((p) => ( // <<< AGORA MAPEA 'staticProducts'
          <Item key={p.id} product={p} /> // <<< Certifique-se de que 'key' e 'product' usam a propriedade correta
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
