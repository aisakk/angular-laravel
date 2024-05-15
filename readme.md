Para instalar el proyecto de angular ejecutar
    -cd frontend
    -npm install
Para instalar el proyecto de laravel ejecutar:
    -cd backend
    -composer install

Para instalar la base de datos, revisar el .env del backend de laravel:
    -cd backend
    -.env
    - crear una base de datos en el gestor de base de datos para la instalacion
    - para generar datos automaticos random: "php artisan db:seed" o "php artisan migrate:fresh --seed"