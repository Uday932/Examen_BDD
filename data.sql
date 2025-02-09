USE usinepapier;

INSERT INTO categories (nom) VALUES 
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


INSERT INTO produits (reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur) VALUES 
('CONC001', 'Concorde', 89.99, 10, 1, 1),
('MIR2000', 'Mirage 2000', 45.99, 25, 2, 2),
('BLKH001', 'Black Hawk', 54.99, 20, 3, 3),
('BOE-C17', 'Boeing C-17 Globemaster', 74.99, 15, 1, 4),
('LCK-U2', 'Lockheed U-2', 65.99, 12, 2, 5),
('ZEP-LZ129', 'Zeppelin LZ 129 Hindenburg', 99.99, 8, 3, 6),
('PBY-CAT', 'Hydravion PBY Catalina', 69.99, 14, 4, 7),
('EXT-330', 'Extra 330SC', 49.99, 18, 5, 8),
('WRT-FLY', 'Wright Flyer', 79.99, 6, 6, 9),
('FJX-001', 'Futur Jet X-1', 109.99, 4, 7, 10),
('MOD-003', 'Model 3', 150.99, 5, 8, 1),
('FER-F8', 'Ferrari F8', 120.00, 8, 9, 2),
('CHE-CAM', 'Chevrolet Camaro', 110.50, 7, 9, 3),
('VW-GOLF', 'Volkswagen Golf', 95.75, 10, 8, 4),
('SUB-2020', 'Submarine 2020', 190.00, 3, 10, 5),
('YAC-LUX', 'Yacht de luxe', 210.00, 6, 6, 1),
('CRG-TRN', 'Cargo Train', 150.00, 4, 9, 2),
('HD-MOTO', 'Harley Davidson', 180.00, 12, 5, 3),
('ELE-BIKE', 'Electric Bike', 250.00, 8, 10, 4);

INSERT INTO fournisseurs_produits (id_produit, id_fournisseur, prix_achat) VALUES
(1, 1, 80.00),   
(2, 2, 40.00),   
(3, 3, 50.00),   
(4, 4, 70.00),    
(5, 5, 60.00),   
(6, 6, 90.00),   
(7, 7, 65.00),   
(8, 8, 45.00), 
(9, 9, 75.00),  
(10, 10, 100.00), 
(11, 1, 140.00),  
(12, 2, 115.00), 
(13, 3, 105.00),  
(14, 4, 90.00), 
(15, 5, 180.00);

INSERT INTO clients (nom, email, adresse) VALUES 
('Jean Marie', 'jean.marie@example.com','10 rue de Paris, Paris'),
('Marie Martin', 'marie.martin@example.com', '15 avenue des Champs, Lyon'),
('Pierre Dupuis', 'pierre.dupuis@example.com', '22 rue de la République, Marseille'),
('Lucie Robert', 'lucie.robert@example.com',  '30 rue des Tilleuls, Bordeaux'),
('Paul Petit', 'paul.petit@example.com','40 avenue des Alpes, Toulouse'),
('Sophie Lefevre', 'sophie.lefevre@example.com', '50 boulevard du Mont Blanc, Nice'),
('Catherine Lemoine', 'catherine.lemoine@example.com', '60 place de la Gare, Lille'),
('Michel Martin', 'michel.martin@example.com',  '70 rue de l’Église, Nantes'),
('Claire Lefevre', 'claire.lefevre@example.com', '80 avenue de la Mer, Marseille'),
('Bernard Dufresne', 'bernard.dufresne@example.com','90 rue de la Paix, Paris');


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
(4, 10, 1, 109.99);
