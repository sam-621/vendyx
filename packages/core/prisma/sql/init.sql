CREATE USER app_user WITH PASSWORD 'app_secure_password';
ALTER USER app_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE vendyx TO app_user;