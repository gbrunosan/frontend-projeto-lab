# Front-End - Projeto de Reservas de Laboratórios IFMS
Este é o front-end da aplicação de reservas de laboratórios para o **IFMS**. A aplicação permite que os usuários façam reservas de laboratórios de forma simples e responsiva.

## Como executar o projeto

### 1. Clone o repositório
git clone https://github.com/gbrunosan/frontend-projeto-lab

### 2. Entre no Repositório criado
cd frontend-projeto-lab

### 3. Instale as dependências
npm install

### 4. Gere um build local do projeto
npm run build

### 5. Começa a rodar localmente o projeto
npm start

### 6. Começa a rodar localmente o projeto
É só testar, o banco vai começar vazio então pode aproveitar para explorar as funções que expliquei acima.


## Rotas
#### Todas as rotas com exceção da login são autenticadas, então você não conseguirá navegar se não fizer login antes, elas também possuem um menu para o tipo de usuário "professor" e outro para "admin"

### /login
Rota inicial para fazer login existe uma conta do tipo "admin" no banco. Use-a para criar outros perfis.
email: admin@lab.com 
senha: 12345678

### / (home)
contém a listagem de laboratórios, admins veêm um botão de + para fazer novas reservas ou novos laboratórios, professores apenas reserva, clicar em um laboratório abre o calendário de reservas dele.

### /criarLab 
Usuários "admin" podem clicar no botão ' + ' > "novo laboratório" na home. Serve para, criar, editar e excluir laboratórios.

### /formReserva
É possível chegar aqui pelo botão "Nova reserva" na tela inicial e pelo calendário. É uma página com um formulário de reserva, é possível fazer múltiplas reservas marcando a opção "repetir reserva" e escolhendo as datas se elas estiverem disponíveis.

### /laboratorio/idLab
Chegamos aqui clicando em um dos laboratórios na tela inicial. Mostra um calendário para encontrar as reservas do laboratório escolhido por dia, selecione um dia e veja as reservas.

### /minhasReservas
Acessível pelo menu no cabeçalho, mostra suas próprias reservas separadas por laboratório, é possível editar (de acordo com a disponibilidade do horário) e excluir suas reservas.

### /novoUsuario
Acessível pelo menu no cabeçalho, usuários admin podem criar outros usuários do tipo "professor" e "admin".
