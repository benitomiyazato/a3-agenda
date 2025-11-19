# Imagem base Node
FROM node:20-alpine

# Cria diretório de trabalho
WORKDIR /app

# Copia package.json e package-lock.json (se houver)
COPY package.json ./
# Copia todo o código fonte do backend
COPY . .

# Instala as dependências
RUN npm install

# Expõe a porta usada pelo backend (ex: 3000)
EXPOSE 3000

# Comando para iniciar o backend
CMD ["node", "server.js"]
