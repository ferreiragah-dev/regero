FROM nginx:alpine

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia config correta
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia TODOS os arquivos do site
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
