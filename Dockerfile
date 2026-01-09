FROM nginx:alpine

# Remove config padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia config custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia TODO o frontend
COPY public/ /usr/share/nginx/html/

EXPOSE 80
