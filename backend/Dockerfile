# Use uma imagem base oficial do Node.js (versão LTS recomendada)
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
# Isso é feito primeiro para aproveitar o cache do Docker, pois essas dependências raramente mudam
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --production

# Copia todo o restante do código-fonte para o diretório de trabalho
COPY . .

# Expõe a porta em que a aplicação Node.js estará rodando
EXPOSE 3001

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm", "start"]