-- init.sql

-- Tabela użytkowników
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabela tokenów
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    access_token VARCHAR(255) NOT NULL,
    access_token_expires_at DATETIME NOT NULL,
    client_id VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Przykładowy użytkownik
INSERT INTO users (username, password) VALUES ('admin', 'alien998');
