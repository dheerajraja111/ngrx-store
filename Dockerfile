# -- Stage 1: Build the Angular app --
FROM node:20-alpine as build-step

WORKDIR /app

#Install the dependencies
COPY package*.json ./
Run npm install

# Copy the source code
COPY . .
RUN npm run build

# -- Stage 2: Serve with Nginx --
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output to nginx folder
COPY --from=build-step /app/dist/ngrx-store/browser /usr/share/nginx/html

#Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]