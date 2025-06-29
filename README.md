#### MVP Desenvolvimento Front-end Avançado
##### Estudante: ROBERTO TRAMONTINA ARAUJO
##### Matrícula: 4052024001752
##### Curso: DESENVOLVIMENTO FULL STACK
##### Disciplina: Sprint: Desenvolvimento Front-end Avançado (40530010059_20250_01)
# Título: Agenda Aniversariantes 
### Essa é uma alternativa para você, que assim como eu, não tem Facebook, Instagram ou qualquer outra mídia social e por isso perdeu a sua agenda de aniversários. 
### Com a Agenda Aniversariantes você tem uma forma segura e não invasiva de guardar essas datas e contatos especiais, sem a obrigação de se cadastrar em qualquer site.  

# API externa: OpenWeatherMap
## A aplicação utiliza a API OpenWeatherMap para exibir informações meteorológicas no cabeçalho do site.
#### Licença de uso: não aplicável
#### Cadastro: não aplicável
#### Rota: GET `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`
#### Parâmetros: q = nome da cidade; appid = chave de API; units = define as unidades de medida; lang = define o idioma da resposta (pt_br)

# Como executar - Modo Desenvolvimento
#### Instalar Python
#### Instalar Visual Studio Code (ou outra ferramenta conveniente)
#### Utilizar terminal Linux (wsl ubuntu)
#### Abrir VS Code e clonar o seguinte repositório: 
#### Abrir docs em um terminal integrado e executar os seguintes comandos:
#### Criar ambiente virtual $ python3 -m venv venv_api
#### Ativar ambiente virtual $ source venv_api/bin/activate
#### Atualizar os pacotes do Ubuntu no WSL $ sudo apt update $ sudo apt upgrade -y
#### Instalar o curl (se ainda não tiver) $ sudo apt install curl -y
#### Instalar o NVM (Node Version Manager) no WSL $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh
#### Recarregar o ambiente do shell no WSL $ source ~/.bashrc
#### Verificar a instalação do NVM $ command -v nvm
#### Instalar o Node.js usando NVM no WSL $ nvm install --lts
#### Definir a versão do Node.js a ser usada $ nvm use --lts
#### Instalar e iniciar $ npm install $ npm start
#### Abra o http://localhost:3000/#/ no navegador.
#### Interagir com a aplicação
