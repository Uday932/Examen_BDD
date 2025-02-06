USE usinepapier;

INSERT INTO categories (nom_categorie) VALUES 
('Avion'),
('Hélicoptère'),
('Dirigeable'),
('Véhicules terrestres'),
('Véhicules marins'),
('Bateaux'),
('Sous-marins'),
('Trains'),
('Motos'),
('Bicyclette');


INSERT INTO fournisseurs (nom, contact, adresse) VALUES 
('Fournisseur A', 'contactA@fournisseur.com', '1 rue des Fournisseurs, Paris'),
('Fournisseur B', 'contactB@fournisseur.com', '2 avenue des Partenaires, Lyon'),
('Fournisseur C', 'contactC@fournisseur.com', '3 boulevard des Vendeurs, Marseille'),
('Fournisseur D', 'contactD@fournisseur.com', '4 place des Fournisseurs, Lille'),
('Fournisseur E', 'contactE@fournisseur.com', '5 rue des Produits, Toulouse'),
('Fournisseur F', 'contactF@fournisseur.com', '6 avenue des Marchands, Nice'),
('Fournisseur G', 'contactG@fournisseur.com', '7 rue des Modèles, Bordeaux'),
('Fournisseur H', 'contactH@fournisseur.com', '8 place des Produits, Nantes'),
('Fournisseur I', 'contactI@fournisseur.com', '9 rue des Maquettes, Strasbourg'),
('Fournisseur J', 'contactJ@fournisseur.com', '10 rue des Artisans, Montpellier');


INSERT INTO produits (nom, description, prix_unitaire, quantite_stock, id_categorie, id_fournisseur) VALUES 
('Concorde', 'Maquette du mythique Concorde.', 89.99, 10, 1, 1),
('Mirage 2000', 'Modèle réduit du chasseur français Mirage 2000.', 45.99, 25, 2, 2),
('Black Hawk', 'Réplique détaillée de l’hélicoptère UH-60 Black Hawk.', 54.99, 20, 3, 3),
('Boeing C-17 Globemaster', 'Maquette de l’avion de transport militaire C-17.', 74.99, 15, 1, 4),
('Lockheed U-2', 'Modèle de l’avion espion U-2.', 65.99, 12, 2, 5),
('Zeppelin LZ 129 Hindenburg', 'Maquette du dirigeable allemand Hindenburg.', 99.99, 8, 3, 6),
('Hydravion PBY Catalina', 'Modèle réduit de l’hydravion militaire PBY Catalina.', 69.99, 14, 4, 7),
('Extra 330SC', 'Maquette de l’avion de voltige Extra 330SC.', 49.99, 18, 5, 8),
('Wright Flyer', 'Réplique du premier avion des frères Wright.', 79.99, 6, 6, 9),
('Futur Jet X-1', 'Concept d’avion du futur.', 109.99, 4, 7, 10),
('Model 3', 'Maquette du véhicule électrique Tesla Model 3.', 150.99, 5, 8, 1),
('Ferrari F8', 'Réplique de la Ferrari F8 Tributo.', 120.00, 8, 9, 2),
('Chevrolet Camaro', 'Modèle réduit de la Chevrolet Camaro.', 110.50, 7, 9, 3),
('Volkswagen Golf', 'Modèle de la voiture compacte Volkswagen Golf.', 95.75, 10, 8, 4),
('Submarine 2020', 'Maquette d’un sous-marin moderne.', 190.00, 3, 10, 5),
('Yacht de luxe', 'Modèle d’un yacht de luxe moderne.', 210.00, 6, 6, 1),
('Cargo Train', 'Modèle réduit d’un train de marchandises.', 150.00, 4, 9, 2),
('Harley Davidson', 'Réplique d’une moto Harley Davidson.', 180.00, 12, 5, 3),
('Electric Bike', 'Vélo électrique de nouvelle génération.', 250.00, 8, 10, 4);


INSERT INTO clients (nom, email, telephone, adresse) VALUES 
('Jean Marie', 'jean.marie@example.com', '123456789', '10 rue de Paris, Paris'),
('Marie Martin', 'marie.martin@example.com', '987654321', '15 avenue des Champs, Lyon'),
('Pierre Dupuis', 'pierre.dupuis@example.com', '567892345', '22 rue de la République, Marseille'),
('Lucie Robert', 'lucie.robert@example.com', '876543210', '30 rue des Tilleuls, Bordeaux'),
('Paul Petit', 'paul.petit@example.com', '234567890', '40 avenue des Alpes, Toulouse'),
('Sophie Lefevre', 'sophie.lefevre@example.com', '345678901', '50 boulevard du Mont Blanc, Nice'),
('Catherine Lemoine', 'catherine.lemoine@example.com', '456789012', '60 place de la Gare, Lille'),
('Michel Martin', 'michel.martin@example.com', '567890123', '70 rue de l’Église, Nantes'),
('Claire Lefevre', 'claire.lefevre@example.com', '678901234', '80 avenue de la Mer, Marseille'),
('Bernard Dufresne', 'bernard.dufresne@example.com', '789012345', '90 rue de la Paix, Paris');


INSERT INTO commandes (id_client, total_prix) VALUES 
(1, 350.99),
(2, 425.99),
(3, 290.50),
(4, 180.00),
(5, 410.75),
(6, 600.00),
(7, 550.00),
(8, 700.00),
(9, 150.00),
(10, 320.00);

INSERT INTO lignes_commandes (id_commande, id_produit, quantite, prix_unitaire) VALUES 
(1, 1, 2, 89.99),
(1, 2, 1, 45.99),
(1, 3, 1, 54.99),
(2, 4, 2, 74.99),
(2, 5, 1, 65.99),
(2, 6, 1, 99.99),
(3, 7, 2, 69.99),
(3, 8, 1, 49.99),
(3, 9, 1, 79.99),
(4, 10, 1, 109.99),
(5, 11, 1, 150.99),
(5, 12, 1, 120.00),
(6, 13, 1, 110.50),
(6, 14, 1, 95.75),
(7, 15, 1, 190.00),
(7, 16, 1, 210.00),
(8, 17, 2, 150.00),
(9, 18, 1, 180.00),
(10, 19, 1, 250.00);