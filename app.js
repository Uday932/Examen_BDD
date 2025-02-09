const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'usinepapier',
    multipleStatements: true
};
    
const executeSQLFile = async (connection, filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    console.log(`${filePath} exécuté avec succès`);
};

const initDB = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connexion à MySQL réussie');

        await executeSQLFile(connection, 'db.sql');

        await connection.changeUser({ database: 'usinepapier' });

        await executeSQLFile(connection, 'data.sql');

        console.log('Base de données initialisée avec succès');
        return connection;
    } catch (err) {
        console.error('Erreur lors de l\'initialisation de la base de données :', err);
        process.exit(1);
    }
};

initDB().then(connection => {
    
  // Routes produits
    app.get("/produits", async (req, res) => {
        const [result] = await connection.query("SELECT * FROM produits");
        res.json(result);
      });
    
      app.get("/produits/:id", async (req, res) => {
        const [result] = await connection.query(
          `SELECT * FROM produits WHERE id_produit=${req.params.id}`
        );
        res.json(result);
      });
    
      app.post("/produits", async (req, res) => {
        const { reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur } = req.body;
        const query = `INSERT INTO produits (reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur) VALUES ('${reference}', '${nom}', ${prix_unitaire}, ${quantite}, ${id_categorie}, ${id_fournisseur})`;
        await connection.query(query);
        res.status(201).json({ message: "Produit ajouté avec succès" });
      });
    
      app.put("/produits/:id", async (req, res) => {
        const { reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur } = req.body;
        await connection.query(
          `UPDATE produits SET reference = '${reference}', nom = '${nom}', prix_unitaire = ${prix_unitaire}, quantite = ${quantite}, id_categorie = ${id_categorie}, id_fournisseur = ${id_fournisseur} WHERE id_produit = ${req.params.id}`
        );
        res.json({ message: "Produit mis à jour" });
      });
    
      app.delete("/produits/:id", async (req, res) => {
        await connection.query(`DELETE FROM produits WHERE id_produit = ${req.params.id}`);
        res.json({ message: "Produit supprimé" });
      });
    
    // Routes categories
      app.get("/categories", async (req, res) => {
        const [result] = await connection.query("SELECT * FROM categories");
        res.json(result);
      });
    
      app.get("/categories/:id", async (req, res) => {
        const [result] = await connection.query(
          `SELECT * FROM categories WHERE id_categorie = ${req.params.id}`
        );
        res.json(result);
      });
    
      app.post("/categories", async (req, res) => {
        const { nom } = req.body;
        await connection.query(`INSERT INTO categories (nom) VALUES ('${nom}')`);
        res.json({ message: "Catégorie ajoutée" });
      });
    
      app.put("/categories/:id", async (req, res) => {
        const { nom } = req.body;
        await connection.query(
          `UPDATE categories SET nom = '${nom}' WHERE id_categorie = ${req.params.id}`
        );
        res.json({ message: "Catégorie mise à jour" });
      });
    
      app.delete("/categories/:id", async (req, res) => {
        await connection.query(
          `DELETE FROM categories WHERE id_categorie = ${req.params.id}`
        );
        res.json({ message: "Catégorie supprimé" });
      });

    // Routes fournisseurs
      app.get("/fournisseurs", async (req, res) => {
        const [result] = await connection.query("SELECT * FROM fournisseurs");
        res.json(result);
      });
    
      app.get("/fournisseurs/:id", async (req, res) => {
        const [result] = await connection.query(
          `SELECT * FROM fournisseurs WHERE id_fournisseur = ${req.params.id}`
        );
        res.json(result);
      });
    
      app.post("/fournisseurs", async (req, res) => {
        const { nom, contact, adresse } = req.body;
        await connection.query(
          `INSERT INTO fournisseurs (nom, contact, adresse) VALUES ('${nom}', '${contact}', '${adresse}')`
        );
        res.json({ message: "Fournisseur ajouté" });
      });
    
      app.put("/fournisseurs/:id", async (req, res) => {
        const { nom, contact, adresse } = req.body;
        await connection.query(
          `UPDATE fournisseurs SET nom = '${nom}', contact = '${contact}', adresse = '${adresse}' WHERE id_fournisseur = ${req.params.id}`
        );
        res.json({ message: "Fournisseur mis à jour" });
      });
    
      app.delete("/fournisseurs/:id", async (req, res) => {
        await connection.query(
          `DELETE FROM fournisseurs WHERE id_fournisseur = ${req.params.id}`
        );
        res.json({ message: "Fournisseur supprimé" });
      });
    
    // Routes clients
      app.get("/clients", async (req, res) => {
        const [result] = await connection.query("SELECT * FROM clients");
        res.json(result);
      });
    
      app.get("/clients/:id", async (req, res) => {
        const [result] = await connection.query(
          `SELECT * FROM clients WHERE id_client = ${req.params.id}`
        );
        res.json(result);
      });
    
      app.post("/clients", async (req, res) => {
        const { nom, email, adresse } = req.body;
        await connection.query(
          `INSERT INTO clients (nom, email, adresse) VALUES ('${nom}', '${email}', '${adresse}')`
        );
        res.json({ message: "Client ajouté" });
      });
    
      app.put("/clients/:id", async (req, res) => {
        const { nom, email, adresse } = req.body;
        await connection.query(
          `UPDATE clients SET nom = '${nom}', email = '${email}', adresse = '${adresse}' WHERE id_client = ${req.params.id}`
        );
        res.json({ message: "Client mis à jour" });
      });
    
      app.delete("/clients/:id", async (req, res) => {
        await connection.query(`DELETE FROM clients WHERE id_client = ${req.params.id}`);
        res.json({ message: "Client supprimé" });
      });
      
    // Routes commandes
      app.get("/commandes", async (req, res) => {
        const [result] = await connection.query("SELECT * FROM commandes");
        res.json(result);
      });
    
      app.get("/commandes/:id", async (req, res) => {
        const { id } = req.params;
        const [result] = await connection.query(
          `SELECT * FROM commandes WHERE id_commande = ${id}`
        );
        res.json(result);
      });
    
      app.post("/commandes", async (req, res) => {
        const { id_client, date_commande, total_prix } = req.body;
        await connection.query(
          `INSERT INTO commandes (id_client, date_commande, total_prix) 
         VALUES (${id_client}, '${date_commande}', ${total_prix})`
        );
        res.json({ message: "Commande ajoutée" });
      });
    
      app.put("/commandes/:id", async (req, res) => {
        const { id_client, date_commande, total_prix } = req.body;
        await connection.query(
          `UPDATE commandes SET id_client = ${id_client}, date_commande = '${date_commande}', total_prix = ${total_prix} 
         WHERE id_commande = ${req.params.id}`
        );
        res.json({ message: "Commande mise à jour" });
      });
    
      app.delete("/commandes/:id", async (req, res) => {
        await connection.query(`DELETE FROM commandes WHERE id_commande = ${req.params.id}`);
        res.json({ message: "Commande supprimée" });
      });

    // Routes lignes_commande
      app.post("/lignes_commandes", async (req, res) => {
        const { id_commande, id_produit, quantite, prix_unitaire } = req.body;
        await connection.query(
          `INSERT INTO lignes_commandes (id_commande, id_produit, quantite, prix_unitaire) 
         VALUES (${id_commande}, ${id_produit}, ${quantite}, ${prix_unitaire})`
        );
        res.json({ message: "Ligne de commande ajoutée" });
      });
    
      app.put("/lignes_commandes/:id", async (req, res) => {
        const { id_commande, id_produit, quantite, prix_unitaire } = req.body;
        await connection.query(
          `UPDATE lignes_commandes SET id_commande = ${id_commande}, id_produit = ${id_produit}, 
         quantite = ${quantite}, prix_unitaire = ${prix_unitaire} WHERE id_ligne = ${req.params.id}`
        );
        res.json({ message: "Ligne de commande mise à jour" });
      });
    
      app.delete("/lignes_commandes/:id", async (req, res) => {
        await connection.query(
          `DELETE FROM lignes_commandes WHERE id_ligne = ${req.params.id}`
        );
        res.json({ message: "Ligne de commande supprimée" });
      });

    PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
}); 