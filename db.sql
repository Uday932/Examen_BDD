    DROP DATABASE IF EXISTS usinepapier;
    CREATE DATABASE IF NOT EXISTS usinepapier;

    USE usinepapier;

    CREATE TABLE categories (
        id_categorie INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) NOT NULL UNIQUE
    );

    CREATE TABLE fournisseurs (
    id_fournisseur INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    contact VARCHAR(255),
    adresse VARCHAR(255)
    );

 
    CREATE TABLE produits (
        id_produit INT PRIMARY KEY AUTO_INCREMENT,
        reference VARCHAR(50) NOT NULL UNIQUE,
        nom VARCHAR(255) NOT NULL,
        prix_unitaire DECIMAL(10,2) NOT NULL,
        quantite INT NOT NULL,
        id_categorie INT,
        id_fournisseur INT,
        FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie) ON DELETE CASCADE, 
        FOREIGN KEY (id_fournisseur) REFERENCES fournisseurs(id_fournisseur) ON DELETE CASCADE
    );


-- Table de relation entre produits et fournisseurs
    CREATE TABLE fournisseurs_produits (
        id_produit INT,
        id_fournisseur INT,
        prix_achat DECIMAL(10,2),
        PRIMARY KEY (id_produit, id_fournisseur),
        FOREIGN KEY (id_produit) REFERENCES produits(id_produit) ON DELETE CASCADE,
        FOREIGN KEY (id_fournisseur) REFERENCES fournisseurs(id_fournisseur) ON DELETE CASCADE
    );

    CREATE TABLE clients (
        id_client INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        adresse VARCHAR(255) NOT NULL
    );

    CREATE TABLE commandes (
        id_commande INT PRIMARY KEY AUTO_INCREMENT,
        id_client INT,
        date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
        total_prix DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (id_client) REFERENCES clients(id_client) ON DELETE CASCADE
    );  

    CREATE TABLE lignes_commandes (
        id_ligne INT PRIMARY KEY AUTO_INCREMENT,
        id_commande INT NOT NULL,
        id_produit INT NOT NULL,
        quantite INT NOT NULL,
        prix_unitaire DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (id_commande) REFERENCES commandes(id_commande) ON DELETE CASCADE,
        FOREIGN KEY (id_produit) REFERENCES produits(id_produit) ON DELETE CASCADE
    );

