# Lino's Food

Site vitrine moderne et interactif pour le restaurant Lino's Food.  
Le projet presente le restaurant, ses services, ses evenements, sa carte, son panier de commande et une prise de contact rapide via WhatsApp.

## Stack

- React
- Vite
- Tailwind CSS
- Framer Motion
- Google Maps Embed
- WhatsApp deep links

## Fonctionnalites

- Loader anime avec le logo du restaurant.
- Hero avec slides en images de fond.
- Section "Notre carte" sous forme de galerie horizontale draggable.
- Cartes de plats suspendues avec interaction et ajout au panier.
- Panier lateral avec recapitulatif de commande.
- Validation de commande via WhatsApp avec recap et lien consultable.
- Services avec CTA WhatsApp personnalises.
- Section evenements et devis traiteur via WhatsApp.
- Section contact avec formulaire visuel et carte Google Maps.
- Footer typographique avec police Genty.
- Navigation responsive avec menu mobile et panier visible quand un plat est selectionne.

## Installation

```bash
npm install
```

## Lancement en developpement

```bash
npm run dev
```

Puis ouvrir l'URL indiquee par Vite, generalement :

```text
http://localhost:5173
```

## Build production

```bash
npm run build
```

## Preview production

```bash
npm run preview
```

## Scripts disponibles

```bash
npm run dev      # lance le serveur Vite
npm run build    # genere le build de production
npm run preview  # sert le build en local
npm run lint     # lance ESLint
```

## Structure principale

```text
restaurant-app/
  public/
    fonts/
    hero-slide-1.jpg
    hero-slide-2.jpg
    hero-slide-3.jpg
    linos-logo.png
  src/
    components/
      cart/
      common/
      layout/
      sections/
    data/
      menuItems.js
      siteData.js
    hooks/
    utils/
      whatsapp.js
    App.jsx
    index.css
    main.jsx
```

## Configuration du contenu

### Informations du restaurant

Les informations globales sont dans :

```text
src/data/siteData.js
```

On y retrouve notamment :

- nom du restaurant
- telephone
- email
- adresse
- horaires
- liens de navigation
- services
- evenements

### Plats de la carte

Les plats affiches dans la timeline interactive sont dans :

```text
src/data/menuItems.js
```

Chaque plat contient :

- code court
- categorie
- nom
- description
- prix
- image

### WhatsApp

Le numero et les messages WhatsApp sont centralises dans :

```text
src/utils/whatsapp.js
```

Numero actuel :

```js
22966451342
```

Les messages sont personnalises selon le bouton clique : reservation, commande, devis, evenement, service traiteur, etc.

## Images

Les images du hero doivent etre placees dans `public/` avec ces noms :

```text
hero-slide-1.jpg
hero-slide-2.jpg
hero-slide-3.jpg
```

Le logo principal est :

```text
public/linos-logo.png
```

## Polices

La police Genty est utilisee dans le footer.  
Elle est installee dans :

```text
public/fonts/genty/
```

Note : la version presente dans le projet est une version demo/personnelle. Pour un usage commercial, verifier la licence de la police.

Les chiffres utilisent une configuration CSS basee sur Lucida Fax lorsque la police est disponible sur l'appareil.

## Carte Google Maps

La carte de localisation est integree dans :

```text
src/components/sections/Contact.jsx
```

Elle utilise un iframe Google Maps avec l'adresse du restaurant.

## Notes

- Le panier ne s'ouvre pas automatiquement quand un plat est ajoute.
- Sur mobile, le bouton panier apparait a cote du menu apres le premier plat selectionne.
- Les commandes WhatsApp contiennent le recapitulatif des plats et les images associees.

