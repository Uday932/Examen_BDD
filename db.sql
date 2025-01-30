DROP DATABASE IF EXISTS usinepapier;
CREATE DATABASE IF NOT EXISTS usinepapier;

USE usinepapier;

CREATE TABLE categories (
    id_categorie INT PRIMARY KEY AUTO_INCREMENT,
    nom_categorie VARCHAR(255) NOT NULL
);

CREATE TABLE fournisseurs (
    id_fournisseur INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    adresse TEXT
);

CREATE TABLE produits (
    id_produit INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    quantite_stock INT NOT NULL,
    id_categorie INT,
    id_fournisseur INT,
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie),
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseurs(id_fournisseur)
);

CREATE TABLE clients (
    id_client INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT
);

CREATE TABLE commandes (
    id_commande INT PRIMARY KEY AUTO_INCREMENT,
    id_client INT,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_prix DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_client) REFERENCES clients(id_client)
);

CREATE TABLE lignes_commandes (
    id_ligne INT PRIMARY KEY AUTO_INCREMENT,
    id_commande INT,
    id_produit INT,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_commande) REFERENCES commandes(id_commande),
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit)
);

