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
    try {
        const [result] = await connection.query("SELECT * FROM produits");
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
});

app.get("/produits/:id", async (req, res) => {
    try {
        const [result] = await connection.query(
            "SELECT * FROM produits WHERE id_produit = ?",
            [req.params.id]
        );
        if (result.length === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération du produit" });
    }
});

app.post("/produits", async (req, res) => {
    try {
        const { reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur } = req.body;
        
        if (!reference || !nom || !prix_unitaire || !quantite || !id_categorie || !id_fournisseur) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        await connection.query(
            "INSERT INTO produits (reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur) VALUES (?, ?, ?, ?, ?, ?)",
            [reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur]
        );
        res.status(201).json({ message: "Produit ajouté avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout du produit" });
    }
});

app.put("/produits/:id", async (req, res) => {
    try {
        const { reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur } = req.body;

        if (!reference || !nom || !prix_unitaire || !quantite || !id_categorie || !id_fournisseur) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires" });
        }

        const [result] = await connection.query(
            "UPDATE produits SET reference = ?, nom = ?, prix_unitaire = ?, quantite = ?, id_categorie = ?, id_fournisseur = ? WHERE id_produit = ?",
            [reference, nom, prix_unitaire, quantite, id_categorie, id_fournisseur, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }

        res.json({ message: "Produit mis à jour" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour du produit" });
    }
});

app.delete("/produits/:id", async (req, res) => {
    try {
        const [result] = await connection.query("DELETE FROM produits WHERE id_produit = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Produit non trouvé" });
        }

        res.json({ message: "Produit supprimé" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du produit" });
    }
});

    // Routes categories
     app.get("/categories", async (req, res) => {
    try {
        const [result] = await connection.query("SELECT * FROM categories");
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des catégories" });
    }
});

app.get("/categories/:id", async (req, res) => {
    try {
        const [result] = await connection.query(
            "SELECT * FROM categories WHERE id_categorie = ?",
            [req.params.id]
        );

        if (result.length === 0) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de la catégorie" });
    }
});

app.post("/categories", async (req, res) => {
    try {
        const { nom } = req.body;

        if (!nom || nom.trim() === "") {
            return res.status(400).json({ error: "Le nom est obligatoire" });
        }

        await connection.query(
            "INSERT INTO categories (nom) VALUES (?)",
            [nom]
        );
        res.status(201).json({ message: "Catégorie ajoutée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout de la catégorie" });
    }
});

app.put("/categories/:id", async (req, res) => {
    try {
        const { nom } = req.body;

        if (!nom || nom.trim() === "") {
            return res.status(400).json({ error: "Le nom est obligatoire" });
        }

        const [result] = await connection.query(
            "UPDATE categories SET nom = ? WHERE id_categorie = ?",
            [nom, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        res.json({ message: "Catégorie mise à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la mise à jour de la catégorie" });
    }
});

app.delete("/categories/:id", async (req, res) => {
    try {
        const [result] = await connection.query(
            "DELETE FROM categories WHERE id_categorie = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        res.json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de la catégorie" });
    }
});

     // Routes fournisseurs
    app.get("/fournisseurs", async (req, res) => {
      const [result] = await connection.query("SELECT * FROM fournisseurs");
      res.json(result);
    });

    app.get("/fournisseurs/:id", async (req, res) => {
      const [result] = await connection.query(
          "SELECT * FROM fournisseurs WHERE id_fournisseur = ?",
          [req.params.id]
      );
      res.json(result.length ? result[0] : { error: "Fournisseur non trouvé" });
    });

    app.post("/fournisseurs", async (req, res) => {
      const { nom, contact, adresse } = req.body;

      if (!nom || !contact || !adresse) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (typeof nom !== "string" || typeof contact !== "string" || typeof adresse !== "string") {
          return res.status(400).json({ error: "Format invalide des champs" });
      }

      await connection.query(
          "INSERT INTO fournisseurs (nom, contact, adresse) VALUES (?, ?, ?)",
          [nom, contact, adresse]
      );

      res.json({ message: "Fournisseur ajouté avec succès" });
    });

    app.put("/fournisseurs/:id", async (req, res) => {
      const { nom, contact, adresse } = req.body;

      if (!nom || !contact || !adresse) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (typeof nom !== "string" || typeof contact !== "string" || typeof adresse !== "string") {
          return res.status(400).json({ error: "Format invalide des champs" });
      }

      const [fournisseurExists] = await connection.query(
          "SELECT id_fournisseur FROM fournisseurs WHERE id_fournisseur = ?",
          [req.params.id]
      );

      if (fournisseurExists.length === 0) {
          return res.status(404).json({ error: "Fournisseur non trouvé" });
      }

      await connection.query(
          "UPDATE fournisseurs SET nom = ?, contact = ?, adresse = ? WHERE id_fournisseur = ?",
          [nom, contact, adresse, req.params.id]
      );

      res.json({ message: "Fournisseur mis à jour avec succès" });
    });

    app.delete("/fournisseurs/:id", async (req, res) => {
      const [result] = await connection.query(
          "DELETE FROM fournisseurs WHERE id_fournisseur = ?",
          [req.params.id]
      );

      res.json(result.affectedRows ? { message: "Fournisseur supprimé avec succès" } : { error: "Fournisseur non trouvé" });
    });

    
    // Routes clients
    app.get("/clients", async (req, res) => {
      const [result] = await connection.query("SELECT * FROM clients");
      res.json(result);
    });

    app.get("/clients/:id", async (req, res) => {
      const [result] = await connection.query(
          "SELECT * FROM clients WHERE id_client = ?",
          [req.params.id]
      );
      res.json(result.length ? result[0] : { error: "Client non trouvé" });
    });

    app.post("/clients", async (req, res) => {
      const { nom, email, adresse } = req.body;

      // Validation des champs
      if (!nom || !email || !adresse) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (typeof nom !== "string" || typeof email !== "string" || typeof adresse !== "string") {
          return res.status(400).json({ error: "Format invalide des champs" });
      }

      // Insertion dans la base de données avec protection contre l'injection SQL
      await connection.query(
          "INSERT INTO clients (nom, email, adresse) VALUES (?, ?, ?)",
          [nom, email, adresse]
      );

      res.json({ message: "Client ajouté avec succès" });
    });

    app.put("/clients/:id", async (req, res) => {
      const { nom, email, adresse } = req.body;

      // Validation des champs
      if (!nom || !email || !adresse) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (typeof nom !== "string" || typeof email !== "string" || typeof adresse !== "string") {
          return res.status(400).json({ error: "Format invalide des champs" });
      }

      // Vérifier si le client existe
      const [clientExists] = await connection.query(
          "SELECT id_client FROM clients WHERE id_client = ?",
          [req.params.id]
      );

      if (clientExists.length === 0) {
          return res.status(404).json({ error: "Client non trouvé" });
      }

      // Mise à jour du client
      await connection.query(
          "UPDATE clients SET nom = ?, email = ?, adresse = ? WHERE id_client = ?",
          [nom, email, adresse, req.params.id]
      );

      res.json({ message: "Client mis à jour avec succès" });
    });

    app.delete("/clients/:id", async (req, res) => {
      // Suppression du client
      const [result] = await connection.query(
          "DELETE FROM clients WHERE id_client = ?",
          [req.params.id]
      );

      res.json(result.affectedRows ? { message: "Client supprimé avec succès" } : { error: "Client non trouvé" });
    });

      
    // Routes commandes
    app.get("/commandes", async (req, res) => {
      const [result] = await connection.query("SELECT * FROM commandes");
      res.json(result);
    });

    app.get("/commandes/:id", async (req, res) => {
      const { id } = req.params;
      const [result] = await connection.query(
          "SELECT * FROM commandes WHERE id_commande = ?",
          [id]
      );
      res.json(result.length ? result[0] : { error: "Commande non trouvée" });
    });

    app.post("/commandes", async (req, res) => {
      const { id_client, date_commande, total_prix } = req.body;

      if (!id_client || !date_commande || !total_prix) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (isNaN(id_client) || isNaN(total_prix)) {
          return res.status(400).json({ error: "Les champs id_client et total_prix doivent être des nombres" });
      }

      if (typeof date_commande !== "string" || isNaN(Date.parse(date_commande))) {
          return res.status(400).json({ error: "Le champ date_commande doit être une date valide" });
      }

      await connection.query(
          "INSERT INTO commandes (id_client, date_commande, total_prix) VALUES (?, ?, ?)",
          [id_client, date_commande, total_prix]
      );

      res.json({ message: "Commande ajoutée avec succès" });
    });

    app.put("/commandes/:id", async (req, res) => {
      const { id_client, date_commande, total_prix } = req.body;

      if (!id_client || !date_commande || !total_prix) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (isNaN(id_client) || isNaN(total_prix)) {
          return res.status(400).json({ error: "Les champs id_client et total_prix doivent être des nombres" });
      }

      if (typeof date_commande !== "string" || isNaN(Date.parse(date_commande))) {
          return res.status(400).json({ error: "Le champ date_commande doit être une date valide" });
      }

      const [commandeExists] = await connection.query(
          "SELECT id_commande FROM commandes WHERE id_commande = ?",
          [req.params.id]
      );

      if (commandeExists.length === 0) {
          return res.status(404).json({ error: "Commande non trouvée" });
      }

      await connection.query(
          "UPDATE commandes SET id_client = ?, date_commande = ?, total_prix = ? WHERE id_commande = ?",
          [id_client, date_commande, total_prix, req.params.id]
      );

      res.json({ message: "Commande mise à jour avec succès" });
    });

    app.delete("/commandes/:id", async (req, res) => {
      const [result] = await connection.query(
          "DELETE FROM commandes WHERE id_commande = ?",
          [req.params.id]
      );

      res.json(result.affectedRows ? { message: "Commande supprimée avec succès" } : { error: "Commande non trouvée" });
    });

    app.post("/lignes_commandes", async (req, res) => {
      const { id_commande, id_produit, quantite, prix_unitaire } = req.body;

      if (!id_commande || !id_produit || !quantite || !prix_unitaire) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (isNaN(id_commande) || isNaN(id_produit) || isNaN(quantite) || isNaN(prix_unitaire)) {
          return res.status(400).json({ error: "Les champs id_commande, id_produit, quantite et prix_unitaire doivent être des nombres" });
      }

      await connection.query(
          "INSERT INTO lignes_commandes (id_commande, id_produit, quantite, prix_unitaire) VALUES (?, ?, ?, ?)",
          [id_commande, id_produit, quantite, prix_unitaire]
      );

      res.json({ message: "Ligne de commande ajoutée avec succès" });
    });

    app.put("/lignes_commandes/:id", async (req, res) => {
      const { id_commande, id_produit, quantite, prix_unitaire } = req.body;

      if (!id_commande || !id_produit || !quantite || !prix_unitaire) {
          return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }

      if (isNaN(id_commande) || isNaN(id_produit) || isNaN(quantite) || isNaN(prix_unitaire)) {
          return res.status(400).json({ error: "Les champs id_commande, id_produit, quantite et prix_unitaire doivent être des nombres" });
      }

      const [ligneExists] = await connection.query(
          "SELECT id_ligne FROM lignes_commandes WHERE id_ligne = ?",
          [req.params.id]
      );

      if (ligneExists.length === 0) {
          return res.status(404).json({ error: "Ligne de commande non trouvée" });
      }

      await connection.query(
          "UPDATE lignes_commandes SET id_commande = ?, id_produit = ?, quantite = ?, prix_unitaire = ? WHERE id_ligne = ?",
          [id_commande, id_produit, quantite, prix_unitaire, req.params.id]
      );

      res.json({ message: "Ligne de commande mise à jour avec succès" });
    });

    app.delete("/lignes_commandes/:id", async (req, res) => {
      const [result] = await connection.query(
          "DELETE FROM lignes_commandes WHERE id_ligne = ?",
          [req.params.id]
      );

      res.json(result.affectedRows ? { message: "Ligne de commande supprimée avec succès" } : { error: "Ligne de commande non trouvée" });
    });


    PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
}); 