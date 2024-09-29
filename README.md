## Backend

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mj300405/Analysoo.git
   cd Analysoo
   ```

2. **Create a `.env` File**

   Create a `.env` file in the project root directory with the following content:

   ```ini
   # .env

   SECRET_KEY=your-secret-key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   DATABASE_URL=postgres://your_db_user:your_db_password@db:5432/your_db_name
   REDIS_URL=redis://redis:6379/0
   OPENAI_API_KEY-your-secret-key
   ```

   - Replace `your-secret-key` with a securely generated secret key.
   - Replace `your_db_user`, `your_db_password`, and `your_db_name` with your desired database credentials.

3. **Build and Run the Application with Docker**

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start all services defined in `docker-compose.yml`, including the web application, Celery worker, PostgreSQL database, and Redis.

4. **Apply Database Migrations**

   In a new terminal window, run:

   ```bash
   docker-compose exec web python manage.py migrate
   ```

5. **Access the Application**

   Open your browser and navigate to [http://localhost:8000/](http://localhost:8000/).

## Additional Commands

- **Stopping the Application**

  To stop the Docker containers, press `Ctrl + C` in the terminal where `docker-compose up` is running, or run:

  ```bash
  docker-compose down
  ```

- **Rebuilding the Application**

  If you make changes to the code or dependencies, rebuild the containers:

  ```bash
  docker-compose up --build
  ```


## Notes

- Ensure Docker and Docker Compose are properly installed and running on your system.
- The `.env` file contains sensitive information; do not commit it to version control.
- For production deployment, configure environment variables appropriately and consider using a cloud storage service for static and media files.

## Frontend
Wersja NodeJs: v21.1.0
Wszystkie wersje paczek są zawarte w pliku package.json.

Instalacja frontend:
Część frontendowa aplikacji została umieszczona na platformie Vercel zgodnie z instrukcją znajdującą się na [tej stronie](https://vercel.com/docs/getting-started-with-vercel/import). 

1. Zalogowanie się na konto Github, które jest właścicielem repozytorium z projektem.
2. Wybranie repozytorium z projektem z listy
3. Zaimportowanie danego projektu
4. W części "Framework Preset" wybranie pozycji Next.js
5. Edytować pole "Root Directory" i wybrać folder "frontend".
6. Nacisnąć przycisk "Deploy".
7. Po skończonym procesie wyświetli się panel z adresem usługi.
