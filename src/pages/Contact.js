import { useEffect, useState } from "react";
import logo from '../assets/logo.png';

export default function Contact() {
  const [weatherInfo, setWeatherInfo] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cityIndex, setCityIndex] = useState(0); // Estado para controlar o índice da cidade

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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ong: '',
    message: ''
  });
  const [errors, setErrors] = useState({}); // Para armazenar erros de validação
  const [submissions, setSubmissions] = useState([]); // Para armazenar e exibir as submissões

  // useEffect para carregar dados do localStorage na montagem
  useEffect(() => {
    const savedSubmissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    setSubmissions(savedSubmissions);
  }, []);

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para validar os campos
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório.";
    }
    // Validação do telefone: pelo menos 10 dígitos (DDD + número)
    // Exemplo de formato: (XX) XXXX-XXXX ou XX XXXX-XXXX
    const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/; // Regex para (XX) XXXX-XXXX ou XX XXXX-XXXX/XXXXX-XXXX
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Telefone inválido. Use o formato (XX) XXXX-XXXX ou XX XXXXX-XXXX.";
    }
    if (!formData.ong) {
      newErrors.ong = "Selecione uma ONG.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    if (validate()) {
      // Se a validação passar, salve os dados
      const newSubmission = { ...formData, id: Date.now() }; // Adiciona um ID único
      const updatedSubmissions = [...submissions, newSubmission];
      setSubmissions(updatedSubmissions); // Atualiza o estado da lista
      localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions)); // Salva no localStorage

      // Limpa o formulário após a submissão
      setFormData({
        name: '',
        phone: '',
        ong: '',
        message: ''
      });
      setErrors({}); // Limpa quaisquer erros antigos
      alert('Mensagem enviada com sucesso!'); // Feedback para o usuário
    } else {
      alert('Por favor, corrija os erros no formulário.');
    }
  };

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
      
    <section className="contact-content">
        <h2>Seja um voluntário</h2>
        <p>Preencha o formulário abaixo e escolha uma ONG para direcionarmos sua mensagem.</p>
        
        {/* Formulário com validação e salvamento no localStorage */}
        <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Nome:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            {errors.name && <span className="error-message">{errors.name}</span>}

            <label htmlFor="phone">Telefone:</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="(XX) XXXX-XXXX ou XX XXXXX-XXXX" 
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}

            <label htmlFor="ong">Escolha a ONG:</label>
            <select 
              id="ong" 
              name="ong" 
              value={formData.ong} 
              onChange={handleChange} 
              required
            >
                <option value="">-- Selecione uma ONG --</option>
                <option value="ong-esperanca">ONG Esperança</option>
                <option value="ong-abracobom">ONG Abraço Bom</option>
                <option value="ong-futurobrilhante">ONG Futuro Brilhante</option>
                <option value="ong-maosunidas">ONG Mãos Unidas</option>
            </select>
            {errors.ong && <span className="error-message">{errors.ong}</span>}

            <label htmlFor="message">Mensagem:</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required
            ></textarea>
            {errors.message && <span className="error-message">{errors.message}</span>}

            <button type="submit">Enviar Mensagem</button>
        </form>

        {/* Lista de Dados Preenchidos */}
        {submissions.length > 0 && (
          <div className="submission-list">
            <h3>Mensagens Enviadas:</h3>
            <ul>
              {submissions.map(submission => (
                <li key={submission.id}>
                  <strong>Nome:</strong> {submission.name} <br />
                  <strong>Telefone:</strong> {submission.phone} <br />
                  <strong>ONG:</strong> {submission.ong} <br />
                  <strong>Mensagem:</strong> {submission.message}
                </li>
              ))}
            </ul>
          </div>
        )}

      </section>

      <footer>
        <p>&copy; {new Date().getFullYear()} Dowii. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
