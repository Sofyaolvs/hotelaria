# Backend Hotelaria

API REST para gerenciamento de hotéis, hóspedes e reservas.

## Tecnologias

- NestJS
- TypeORM
- PostgreSQL
- JWT Authentication
- Docker

## Como Executar

### Com Docker 

**docker-compose up --build -d**

Isso irá iniciar:
- **Backend**: http://localhost:3000
- **PostgreSQL**: localhost:5432

Para parar os containers:
**docker-compose down**


## Autenticação

A API utiliza autenticação JWT. Todas as rotas (exceto login) precisam do token no header

### Login

```
POST /auth/login
```

**Body:**
```json
{
  "email": "admin@hotel.com",
  "password": "123456"
}
```

**Resposta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Usando o Token

Coloque o header em todas as requisições:
```
Authorization: Bearer <seu_token>
```

## Endpoints

### Hotéis

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/hotel` | Criar hotel |
| GET | `/hotel` | Listar hotéis |
| GET | `/hotel/:id` | Buscar hotel por ID |
| DELETE | `/hotel/:id` | Deletar hotel |

**Criar Hotel:**
```json
{
  "name": "Hotel Exemplo",
  "city": "São Paulo",
  "rooms": 100
}
```

### Hóspedes

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/guest` | Criar hóspede |
| GET | `/guest` | Listar hóspedes |
| GET | `/guest/:id` | Buscar hóspede por ID |
| DELETE | `/guest/:id` | Deletar hóspede |

**Criar Hóspede:**
```json
{
  "name": "João Silva",
  "document": "12345678901",
  "phone": "11999999999"
}
```

> O campo `document` aceita CPF ou passaporte válido.
(Pode usar algum site para gerar o número como o [https://www.4devs.com.br/gerador_de_cpf] para cpf)

### Reservas

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/bookings` | Criar reserva |
| GET | `/bookings` | Listar reservas |
| GET | `/bookings/:id` | Buscar reserva por ID |
| GET | `/bookings/:id/guests` | Listar hóspedes da reserva |
| DELETE | `/bookings/:id` | Deletar reserva |

**Criar Reserva:**
```json
{
  "hotelId": "uuid-do-hotel",
  "guestIds": ["uuid-hospede-1", "uuid-hospede-2"],
  "checkInDate": "2025-01-20",
  "checkOutDate": "2025-01-25",
  "responsibleName": "João Silva"
}
```

## Exemplo de Uso

```bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@hotel.com", "password": "123456"}'

# 2. Criar hotel (use o token gerado no login)
curl -X POST http://localhost:3000/hotel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name": "Hotel Central", "city": "Rio de Janeiro", "rooms": 50}'

# 3. Criar hóspede
curl -X POST http://localhost:3000/guest \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name": "Joe Doe", "document": "98765432100", "phone": "21988888888"}'

# 4. Criar reserva
curl -X POST http://localhost:3000/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"hotelId": "ID_DO_HOTEL", "guestIds": ["ID_DO_HOSPEDE"], "checkInDate": "2025-02-01", "checkOutDate": "2025-02-05", "responsibleName": "Joe Doe"}'
```

## Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| DB_HOST | Host do PostgreSQL |
| DB_PORT | Porta do PostgreSQL |
| DB_USERNAME | Usuário do banco |
| DB_PASSWORD | Senha do banco |
| DB_DATABASE | Nome do banco |
| JWT_SECRET | Chave secreta para JWT |
