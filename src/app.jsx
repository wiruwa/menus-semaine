import { useEffect, useRef, useState } from "react";
import "./index.css";
import { RECETTES } from "./recettes.js";

/* ------------------------------------------------------------------
   1. TOUS LES TEXTES DE L'APPLI
   Ils sont rangés au même endroit : la traduction sera très simple.
------------------------------------------------------------------- */
const TXT = {
  titre: "On mange quoi ce soir ?",
  sousTitre: "Le menu de la semaine et la liste de courses, en deux clics",
  qui: "Qui mange à la maison ?",
  prenom: "Prénom",
  prenomExemple: "ex. : Emma",
  detestes: "Ce qu'il/elle n'aime pas",
  detestesExemple: "ex. : poisson, champignons",
  groupesTitre: "En un clic :",
  groupes: {
    legumes: "Légumes",
    viande: "Viande",
    poisson: "Poisson",
    mer: "Fruits de mer",
    laitages: "Produits laitiers",
    oeufs: "Œufs",
  },
  cuisinesTitre: "🌍 Cuisines qu'il/elle aime",
  cuisinesAucune: "Aucune en particulier",
  cuisinesAide: "Chacun aura au moins un plat de ses cuisines préférées dans la semaine.",
  cuisines: {
    thai: "Thaï",
    polonaise: "Polonaise",
    indienne: "Indienne",
    mexicaine: "Mexicaine",
    belge: "Belge",
    italienne: "Italienne",
    francaise: "Française",
    marocaine: "Marocaine",
    japonaise: "Japonaise",
    chinoise: "Chinoise",
    libanaise: "Libanaise",
    espagnole: "Espagnole",
    grecque: "Grecque",
  },
  personneNumero: "Personne {n}",
  sansPlatCuisine: "Aucun plat de cuisine préférée pour {noms}, avec ces exclusions et ce temps maximum.",
  ajouter: "+ Ajouter une personne",
  retirer: "Retirer cette personne",
  tempsTitre: "Temps de préparation maximum",
  tempsLibre: "Peu importe",
  tempsAide: "Préparation et cuisson comprises (temps approximatif).",
  inconnu: "Aucun de nos plats ne contient : {mots}. Vérifie l'orthographe.",
  allergie: "En cas d'allergie, vérifie toujours les étiquettes : cette appli ne remplace pas ce contrôle.",
  generer: "Générer mon menu",
  regenerer: "Générer un autre menu",
  surprise: "Surprends-moi",
  surpriseSous: "un seul repas",
  fastfood: "Fast-food ce soir",
  fastfoodSous: "on se fait plaisir !",
  ceSoir: "Ce soir, on mange…",
  ceSoirFastfood: "Ce soir, fast-food !",
  fastfoodAide: "À commander… ou à faire maison avec ces ingrédients.",
  blagues: [
    "Le régime commence lundi. 😄",
    "Ce soir, on ne compte pas les calories !",
    "Personne ne râlera, promis.",
    "Un petit plaisir de temps en temps, ça fait du bien.",
    "Les légumes reviendront demain… peut-être.",
  ],
  unAutre: "🎲 Un autre plat",
  unAutreFastfood: "🍔 Un autre fast-food",
  valider: "✅ Valider ce plat",
  valide: "✅ Plat validé ! Tu peux l'envoyer avec sa liste de courses.",
  ceSoirTexte: "Ce soir",
  ceSoirFastfoodTexte: "Ce soir, fast-food",
  partagerPlat: "📤 Partager ce plat",
  aucunSurprise: "Aucun plat ne convient à ces goûts. Essaie avec moins d'exclusions.",
  aucunFastfood: "Aucun fast-food ne convient à ces goûts. Essaie avec moins d'exclusions.",
  menu: "Menu de la semaine",
  prixPour: "Prix estimés pour {n}",
  ingredients: "Ingrédients",
  menuAstuce: "Touche un plat pour voir ses ingrédients et sa recette.",
  voirRecette: "Voir la recette",
  masquerRecette: "Masquer la recette",
  recette: "Recette",
  recetteTitre: "Recette (pour 4 personnes)",
  recetteAide: "Recette pour 4 personnes : adapte les quantités si vous êtes plus ou moins nombreux. Du placard, pas dans la liste de courses : sel, poivre, huile, beurre, farine, sucre, bouillon, vinaigre, épices et herbes.",
  changer: "↻ Changer",
  pasAssez: "Seulement {n} plat(s) conviennent à toute la famille. On en ajoute bientôt !",
  pasAssezTemps: "Seulement {n} plat(s) conviennent à toute la famille en {temps} maximum. Essaie un temps plus long ou moins d'exclusions.",
  aucun: "Aucun plat ne convient à ces goûts. Essaie avec moins d'exclusions.",
  aucunTemps: "Aucun plat ne convient à ces goûts en {temps} maximum. Essaie un temps plus long ou moins d'exclusions.",
  courses: "Liste de courses",
  pour: "Pour",
  personne: "personne",
  personnes: "personnes",
  moins: "Une personne de moins",
  plus: "Une personne de plus",
  repas: "{n} repas",
  min: "min",
  heure: "h",
  gramme: "g",
  kilo: "kg",
  centilitre: "cl",
  litre: "L",
  unites: {
    piece: ["pièce", "pièces"],
    boite: ["boîte", "boîtes"],
    pot: ["pot", "pots"],
    tranche: ["tranche", "tranches"],
  },
  total: "Total estimé",
  parPersonne: "Soit environ {prix} par personne",
  prixIndicatif: "Prix indicatifs : ils varient selon ton magasin. On suppose que tu as déjà l'huile, le sel, le poivre, le beurre et les épices.",
  partager: "📤 Partager la liste",
  partagerTitre: "Liste de courses",
  partagerVia: "Envoyer la liste par :",
  copier: "📋 Copier",
  copie: "✓ Liste copiée : colle-la où tu veux.",
  copieEchec: "Copie impossible ici : sélectionne le texte ci-dessous et copie-le.",
  jours: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
  rayons: {
    legumes: "🥕 Fruits et légumes",
    viande: "🥩 Viandes et poissons",
    frais: "🧀 Produits frais",
    epicerie: "🍝 Épicerie et surgelés",
    pain: "🥖 Pain",
  },
};

/* ------------------------------------------------------------------
   2. LES INGRÉDIENTS
   prix = prix estimé en euros pour UN repas de 4 personnes.
   qte et unite = la quantité à acheter pour UN repas de 4 personnes
           (unite : "g", "cl", "piece", "boite", "pot" ou "tranche").
   aussi = autres mots qui doivent aussi exclure cet ingrédient
           (exemple : "porc" pour le jambon).
------------------------------------------------------------------- */
const RAYONS = ["legumes", "viande", "frais", "epicerie", "pain"]; // l'ordre dans la liste de courses

const INGREDIENTS = {
  // Fruits et légumes
  carottes: { nom: "Carottes", prix: 0.9, rayon: "legumes", qte: 400, unite: "g", aussi: "legume" },
  patates: { nom: "Pommes de terre", prix: 1.4, rayon: "legumes", qte: 800, unite: "g" },
  courgettes: { nom: "Courgettes", prix: 2.0, rayon: "legumes", qte: 600, unite: "g", aussi: "legume" },
  poireaux: { nom: "Poireaux", prix: 2.0, rayon: "legumes", qte: 500, unite: "g", aussi: "legume" },
  haricots_verts: { nom: "Haricots verts", prix: 2.6, rayon: "legumes", qte: 500, unite: "g", aussi: "haricot legume" },
  oignons: { nom: "Oignons", prix: 0.4, rayon: "legumes", qte: 2, unite: "piece", aussi: "ognon" },
  tomates: { nom: "Tomates", prix: 2.4, rayon: "legumes", qte: 400, unite: "g", aussi: "legume" },
  salade: { nom: "Salade", prix: 1.3, rayon: "legumes", qte: 1, unite: "piece", aussi: "legume" },
  poivrons: { nom: "Poivrons", prix: 2.5, rayon: "legumes", qte: 2, unite: "piece", aussi: "legume" },
  champignons: { nom: "Champignons", prix: 2.0, rayon: "legumes", qte: 250, unite: "g", aussi: "legume" },
  epinards: { nom: "Épinards", prix: 2.0, rayon: "legumes", qte: 300, unite: "g", aussi: "legume" },
  brocoli: { nom: "Brocoli", prix: 1.8, rayon: "legumes", qte: 500, unite: "g", aussi: "legume" },
  chou_fleur: { nom: "Chou-fleur", prix: 2.0, rayon: "legumes", qte: 1, unite: "piece", aussi: "chou legume" },
  aubergines: { nom: "Aubergines", prix: 3.0, rayon: "legumes", qte: 2, unite: "piece", aussi: "legume" },
  petits_pois: { nom: "Petits pois", prix: 1.6, rayon: "legumes", qte: 300, unite: "g", aussi: "legume" },
  endives: { nom: "Endives", prix: 2.5, rayon: "legumes", qte: 6, unite: "piece", aussi: "chicon legume" },
  chou: { nom: "Chou blanc", prix: 1.6, rayon: "legumes", qte: 1, unite: "piece", aussi: "legume" },
  potiron: { nom: "Potiron", prix: 2.2, rayon: "legumes", qte: 800, unite: "g", aussi: "courge legume" },
  citron: { nom: "Citron", prix: 0.5, rayon: "legumes", qte: 1, unite: "piece" },
  concombre: { nom: "Concombre", prix: 1.0, rayon: "legumes", qte: 1, unite: "piece", aussi: "legume" },
  avocat: { nom: "Avocats", prix: 2.4, rayon: "legumes", qte: 2, unite: "piece", aussi: "legume" },
  betteraves: { nom: "Betteraves cuites", prix: 2.0, rayon: "legumes", qte: 500, unite: "g", aussi: "betterave legume" },
  persil: { nom: "Persil frais", prix: 1.0, rayon: "legumes", qte: 1, unite: "piece" },
  basilic: { nom: "Basilic frais", prix: 1.5, rayon: "legumes", qte: 1, unite: "piece" },
  ail: { nom: "Ail", prix: 0.8, rayon: "legumes", qte: 1, unite: "piece" },

  // Viandes et poissons
  viande_hachee: { nom: "Viande hachée", prix: 5.9, rayon: "viande", qte: 500, unite: "g", aussi: "viande boeuf" },
  poulet: { nom: "Poulet", prix: 7.0, rayon: "viande", qte: 700, unite: "g", aussi: "viande volaille" },
  jambon: { nom: "Jambon", prix: 2.6, rayon: "viande", qte: 200, unite: "g", aussi: "viande porc" },
  lardons: { nom: "Lardons", prix: 2.2, rayon: "viande", qte: 200, unite: "g", aussi: "viande porc" },
  saucisses: { nom: "Saucisses", prix: 4.0, rayon: "viande", qte: 500, unite: "g", aussi: "viande porc" },
  boeuf: { nom: "Bœuf à braiser", prix: 8.5, rayon: "viande", qte: 800, unite: "g", aussi: "viande" },
  escalopes: { nom: "Escalopes de porc", prix: 5.5, rayon: "viande", qte: 4, unite: "piece", aussi: "viande" },
  saumon: { nom: "Saumon", prix: 12.5, rayon: "viande", qte: 500, unite: "g", aussi: "poisson" },
  cabillaud: { nom: "Cabillaud", prix: 11.0, rayon: "viande", qte: 500, unite: "g", aussi: "poisson" },
  crevettes: { nom: "Crevettes", prix: 9.0, rayon: "viande", qte: 400, unite: "g", aussi: "fruits de mer" },
  moules: { nom: "Moules", prix: 9.5, rayon: "viande", qte: 2000, unite: "g", aussi: "fruits de mer" },
  bacon: { nom: "Bacon", prix: 2.6, rayon: "viande", qte: 8, unite: "tranche", aussi: "viande porc" },
  chorizo: { nom: "Chorizo", prix: 3.0, rayon: "viande", qte: 200, unite: "g", aussi: "viande porc" },
  pepperoni: { nom: "Pepperoni", prix: 2.4, rayon: "viande", qte: 150, unite: "g", aussi: "viande porc" },
  viande_kebab: { nom: "Viande de kebab", prix: 5.0, rayon: "viande", qte: 400, unite: "g", aussi: "viande" },
  boeuf_lamelles: { nom: "Bœuf en lamelles", prix: 7.0, rayon: "viande", qte: 400, unite: "g", aussi: "viande boeuf" },
  fricadelles: { nom: "Fricadelles", prix: 3.4, rayon: "viande", qte: 4, unite: "piece", aussi: "viande" },

  // Produits frais
  oeufs: { nom: "Œufs", prix: 2.2, rayon: "frais", qte: 6, unite: "piece" },
  creme: { nom: "Crème", prix: 1.2, rayon: "frais", qte: 20, unite: "cl", aussi: "laitage lactose" },
  lait: { nom: "Lait", prix: 0.6, rayon: "frais", qte: 25, unite: "cl", aussi: "laitage lactose" },
  fromage_rape: { nom: "Fromage râpé", prix: 2.2, rayon: "frais", qte: 100, unite: "g", aussi: "laitage lactose" },
  mozzarella: { nom: "Mozzarella", prix: 1.8, rayon: "frais", qte: 250, unite: "g", aussi: "fromage laitage lactose" },
  parmesan: { nom: "Parmesan", prix: 2.2, rayon: "frais", qte: 50, unite: "g", aussi: "fromage laitage lactose" },
  pierogi: { nom: "Pierogi ruskis", prix: 4.0, rayon: "frais", qte: 500, unite: "g", aussi: "fromage laitage lactose patate" },
  yaourt: { nom: "Yaourt nature", prix: 1.2, rayon: "frais", qte: 2, unite: "pot", aussi: "laitage lactose" },
  feta: { nom: "Feta", prix: 2.6, rayon: "frais", qte: 200, unite: "g", aussi: "fromage laitage lactose" },
  houmous: { nom: "Houmous", prix: 2.0, rayon: "frais", qte: 1, unite: "pot", aussi: "chiche legumineuse" },
  filo: { nom: "Feuilles de filo", prix: 2.2, rayon: "frais", qte: 1, unite: "piece" },
  sauce_blanche: { nom: "Sauce blanche (kebab)", prix: 1.8, rayon: "frais", qte: 1, unite: "pot", aussi: "laitage lactose oeuf" },
  gnocchis: { nom: "Gnocchis", prix: 2.2, rayon: "frais", qte: 500, unite: "g", aussi: "patate" },

  // Épicerie et surgelés
  pates: { nom: "Pâtes", prix: 1.4, rayon: "epicerie", qte: 400, unite: "g", aussi: "pasta spaghetti" },
  riz: { nom: "Riz", prix: 1.4, rayon: "epicerie", qte: 300, unite: "g" },
  nouilles: { nom: "Nouilles", prix: 1.8, rayon: "epicerie", qte: 300, unite: "g" },
  sauce_tomate: { nom: "Sauce tomate", prix: 1.6, rayon: "epicerie", qte: 400, unite: "g" },
  lait_coco: { nom: "Lait de coco", prix: 1.6, rayon: "epicerie", qte: 40, unite: "cl" },
  lasagnes: { nom: "Feuilles de lasagnes", prix: 1.5, rayon: "epicerie", qte: 250, unite: "g" },
  pate_pizza: { nom: "Pâte à pizza", prix: 1.8, rayon: "epicerie", qte: 2, unite: "piece" },
  pate_brisee: { nom: "Pâte brisée", prix: 1.6, rayon: "epicerie", qte: 1, unite: "piece" },
  pesto: { nom: "Pesto", prix: 2.3, rayon: "epicerie", qte: 1, unite: "pot", aussi: "basilic" },
  lentilles: { nom: "Lentilles", prix: 1.6, rayon: "epicerie", qte: 300, unite: "g", aussi: "legumineuse" },
  pois_chiches: { nom: "Pois chiches", prix: 1.2, rayon: "epicerie", qte: 1, unite: "boite", aussi: "legumineuse" },
  haricots_rouges: { nom: "Haricots rouges", prix: 1.2, rayon: "epicerie", qte: 1, unite: "boite", aussi: "haricot legumineuse" },
  tortillas: { nom: "Tortillas", prix: 2.0, rayon: "epicerie", qte: 8, unite: "piece", aussi: "wrap galette" },
  frites: { nom: "Frites", prix: 2.5, rayon: "epicerie", qte: 800, unite: "g", aussi: "patate" },
  poisson_pane: { nom: "Poisson pané", prix: 4.2, rayon: "epicerie", qte: 8, unite: "piece" },
  thon: { nom: "Thon en boîte", prix: 3.0, rayon: "epicerie", qte: 2, unite: "boite", aussi: "poisson" },
  choucroute: { nom: "Choucroute", prix: 2.0, rayon: "epicerie", qte: 800, unite: "g", aussi: "chou legume" },
  semoule: { nom: "Semoule", prix: 1.3, rayon: "epicerie", qte: 300, unite: "g" },
  boulgour: { nom: "Boulgour", prix: 1.6, rayon: "epicerie", qte: 300, unite: "g" },
  nouilles_riz: { nom: "Nouilles de riz", prix: 2.0, rayon: "epicerie", qte: 250, unite: "g" },
  cacahuetes: { nom: "Cacahuètes", prix: 1.8, rayon: "epicerie", qte: 100, unite: "g", aussi: "arachide" },
  olives: { nom: "Olives", prix: 2.2, rayon: "epicerie", qte: 1, unite: "pot" },
  mayonnaise: { nom: "Mayonnaise", prix: 1.8, rayon: "epicerie", qte: 1, unite: "pot", aussi: "oeuf" },
  ketchup: { nom: "Ketchup", prix: 1.6, rayon: "epicerie", qte: 1, unite: "pot", aussi: "tomate" },
  sauce_soja: { nom: "Sauce soja", prix: 1.8, rayon: "epicerie", qte: 1, unite: "pot", aussi: "soja" },
  sauce_curry: { nom: "Sauce curry thaï", prix: 2.2, rayon: "epicerie", qte: 1, unite: "pot" },
  sauce_aigre_douce: { nom: "Sauce aigre-douce", prix: 1.8, rayon: "epicerie", qte: 1, unite: "pot" },
  tortilla_chips: { nom: "Tortilla chips", prix: 2.0, rayon: "epicerie", qte: 200, unite: "g" },
  ananas: { nom: "Ananas en boîte", prix: 1.5, rayon: "epicerie", qte: 1, unite: "boite" },
  mais: { nom: "Maïs en boîte", prix: 1.0, rayon: "epicerie", qte: 1, unite: "boite", aussi: "legume" },
  nems: { nom: "Nems", prix: 3.8, rayon: "epicerie", qte: 12, unite: "piece", aussi: "viande legume" },
  gyozas: { nom: "Gyozas (raviolis japonais)", prix: 4.2, rayon: "epicerie", qte: 16, unite: "piece", aussi: "viande porc legume" },
  falafels: { nom: "Falafels surgelés", prix: 3.4, rayon: "epicerie", qte: 16, unite: "piece", aussi: "chiche legumineuse" },
  poulet_pane: { nom: "Poulet pané (nuggets)", prix: 4.2, rayon: "epicerie", qte: 500, unite: "g", aussi: "viande volaille poulet" },
  croquettes_crevettes: { nom: "Croquettes de crevettes", prix: 5.0, rayon: "epicerie", qte: 8, unite: "piece", aussi: "fruits de mer" },
  chapelure: { nom: "Chapelure", prix: 0.6, rayon: "epicerie", qte: 100, unite: "g" },
  biere: { nom: "Bière brune", prix: 1.5, rayon: "epicerie", qte: 33, unite: "cl", aussi: "alcool" },

  // Pain
  pain: { nom: "Pain", prix: 2.0, rayon: "pain", qte: 1, unite: "piece" },
  pain_mie: { nom: "Pain de mie", prix: 1.8, rayon: "pain", qte: 8, unite: "tranche" },
  pains_burger: { nom: "Pains à burger", prix: 2.2, rayon: "pain", qte: 4, unite: "piece" },
  pita: { nom: "Pains pita", prix: 2.0, rayon: "pain", qte: 6, unite: "piece" },
  pain_kebab: { nom: "Pains kebab", prix: 2.2, rayon: "pain", qte: 4, unite: "piece" },
  pains_hotdog: { nom: "Pains à hot-dog", prix: 1.8, rayon: "pain", qte: 8, unite: "piece" },
  baguette: { nom: "Baguettes", prix: 3.0, rayon: "pain", qte: 2, unite: "piece" },
  bouchees: { nom: "Croûtes de vol-au-vent", prix: 2.8, rayon: "pain", qte: 4, unite: "piece" },
};

/* ------------------------------------------------------------------
   3. LES PLATS
   Pour en ajouter un : copie une ligne, puis change :
   - id : un mot unique, sans espace ni accent
   - nom : le nom du plat
   - type : sert à varier le menu (pas plus de 2 plats du même type par semaine)
   - cuisine : thai, polonaise, indienne, mexicaine, belge, italienne, francaise, marocaine,
     japonaise, chinoise, libanaise, espagnole ou grecque (ou supprime ce mot)
   - minutes : le temps total, préparation et cuisson comprises
   - emoji : le petit dessin affiché à côté du plat
   - ingredients : ils doivent exister dans la liste du dessus
   Les plats de type "fastfood" ne sont proposés que par le bouton « Fast-food ce soir ».
   La recette du plat s'écrit dans le fichier recettes.js, avec le même id (sans recette, pas de bouton « Voir la recette »).
------------------------------------------------------------------- */
const LES_PLATS = [
  // Pâtes
  { id: "bolognaise", nom: "Pâtes à la bolognaise", type: "pates", cuisine: "italienne", minutes: 30, emoji: "🍝", ingredients: ["pates", "viande_hachee", "sauce_tomate", "oignons"] },
  { id: "carbonara", nom: "Pâtes carbonara", type: "pates", cuisine: "italienne", minutes: 20, emoji: "🥓", ingredients: ["pates", "lardons", "creme", "parmesan"] },
  { id: "pesto", nom: "Pâtes au pesto et aux tomates", type: "pates", cuisine: "italienne", minutes: 15, emoji: "🍅", ingredients: ["pates", "pesto", "parmesan", "tomates"] },
  { id: "pates_thon", nom: "Pâtes au thon et à la tomate", type: "pates", cuisine: "italienne", minutes: 20, emoji: "🐟", ingredients: ["pates", "thon", "sauce_tomate", "oignons"] },
  { id: "gratin_pates", nom: "Gratin de pâtes au jambon", type: "pates", minutes: 40, emoji: "🧀", ingredients: ["pates", "jambon", "creme", "fromage_rape"] },
  { id: "pates_courgettes", nom: "Pâtes crémeuses aux courgettes", type: "pates", cuisine: "italienne", minutes: 25, emoji: "🥒", ingredients: ["pates", "courgettes", "creme", "parmesan"] },
  { id: "wok_poulet", nom: "Wok de poulet et nouilles", type: "pates", cuisine: "chinoise", minutes: 25, emoji: "🍜", ingredients: ["poulet", "nouilles", "carottes", "poivrons", "sauce_soja"] },
  { id: "pad_thai", nom: "Pad thaï au poulet et aux cacahuètes", type: "pates", cuisine: "thai", minutes: 30, emoji: "🍜", ingredients: ["nouilles_riz", "poulet", "oeufs", "cacahuetes", "carottes", "sauce_soja"] },
  { id: "yakisoba", nom: "Yakisoba (nouilles sautées au poulet et au chou)", type: "pates", cuisine: "japonaise", minutes: 25, emoji: "🥡", ingredients: ["nouilles", "poulet", "chou", "carottes", "sauce_soja"] },
  { id: "nouilles_legumes", nom: "Nouilles sautées aux légumes et aux œufs", type: "pates", cuisine: "chinoise", minutes: 25, emoji: "🥕", ingredients: ["nouilles", "carottes", "chou", "oeufs", "sauce_soja"] },

  // Riz
  { id: "curry_poulet", nom: "Curry de poulet et riz", type: "riz", cuisine: "indienne", minutes: 35, emoji: "🍛", ingredients: ["poulet", "riz", "lait_coco", "carottes", "oignons"] },
  { id: "riz_cantonais", nom: "Riz cantonais", type: "riz", cuisine: "chinoise", minutes: 25, emoji: "🍚", ingredients: ["riz", "oeufs", "petits_pois", "jambon", "carottes"] },
  { id: "risotto", nom: "Risotto aux champignons", type: "riz", cuisine: "italienne", minutes: 40, emoji: "🍄", ingredients: ["riz", "champignons", "oignons", "parmesan", "creme"] },
  { id: "poulet_creme", nom: "Poulet à la crème, champignons et riz", type: "riz", cuisine: "francaise", minutes: 35, emoji: "🥘", ingredients: ["poulet", "champignons", "creme", "riz"] },
  { id: "chili", nom: "Chili con carne et riz", type: "riz", cuisine: "mexicaine", minutes: 45, emoji: "🍲", ingredients: ["viande_hachee", "haricots_rouges", "sauce_tomate", "riz", "poivrons", "oignons"] },
  { id: "ratatouille", nom: "Ratatouille et riz", type: "riz", cuisine: "francaise", minutes: 50, emoji: "🍆", ingredients: ["aubergines", "courgettes", "poivrons", "sauce_tomate", "riz"] },
  { id: "riz_saute", nom: "Riz sauté aux légumes", type: "riz", cuisine: "chinoise", minutes: 25, emoji: "🥦", ingredients: ["riz", "carottes", "poivrons", "oeufs"] },
  { id: "curry_vert", nom: "Curry vert thaï au poulet et riz", type: "riz", cuisine: "thai", minutes: 35, emoji: "🍛", ingredients: ["poulet", "sauce_curry", "lait_coco", "haricots_verts", "riz"] },
  { id: "riz_ananas", nom: "Riz sauté thaï à l'ananas et aux œufs", type: "riz", cuisine: "thai", minutes: 25, emoji: "🍍", ingredients: ["riz", "ananas", "petits_pois", "oignons", "oeufs"] },
  { id: "tikka_masala", nom: "Poulet tikka masala et riz", type: "riz", cuisine: "indienne", minutes: 40, emoji: "🍗", ingredients: ["poulet", "sauce_tomate", "creme", "riz", "oignons"] },
  { id: "keema", nom: "Keema matar (viande hachée épicée aux petits pois) et riz", type: "riz", cuisine: "indienne", minutes: 35, emoji: "🍲", ingredients: ["viande_hachee", "petits_pois", "oignons", "tomates", "riz"] },
  { id: "burritos", nom: "Burritos au bœuf, riz et haricots rouges", type: "riz", cuisine: "mexicaine", minutes: 35, emoji: "🌯", ingredients: ["tortillas", "viande_hachee", "riz", "haricots_rouges", "fromage_rape"] },
  { id: "teriyaki", nom: "Poulet façon teriyaki, riz et brocoli", type: "riz", cuisine: "japonaise", minutes: 30, emoji: "🍱", ingredients: ["poulet", "riz", "brocoli", "sauce_soja"] },
  { id: "oyakodon", nom: "Oyakodon (bol de riz au poulet et à l'œuf)", type: "riz", cuisine: "japonaise", minutes: 30, emoji: "🍚", ingredients: ["riz", "poulet", "oeufs", "oignons", "sauce_soja"] },
  { id: "porc_aigre_doux", nom: "Porc sauce aigre-douce, ananas et riz", type: "riz", cuisine: "chinoise", minutes: 35, emoji: "🍍", ingredients: ["escalopes", "poivrons", "ananas", "sauce_aigre_douce", "riz"] },
  { id: "boeuf_brocoli", nom: "Bœuf sauté au brocoli et riz", type: "riz", cuisine: "chinoise", minutes: 30, emoji: "🥩", ingredients: ["boeuf_lamelles", "brocoli", "riz", "sauce_soja", "oignons"] },
  { id: "poulet_cacahuetes", nom: "Poulet aux cacahuètes et poivrons (kung pao), riz", type: "riz", cuisine: "chinoise", minutes: 30, emoji: "🥜", ingredients: ["poulet", "cacahuetes", "poivrons", "riz", "sauce_soja"] },
  { id: "paella", nom: "Paella au poulet et au chorizo", type: "riz", cuisine: "espagnole", minutes: 50, emoji: "🥘", ingredients: ["riz", "poulet", "chorizo", "poivrons", "petits_pois"] },

  // Pommes de terre
  { id: "poulet_roti", nom: "Poulet rôti et pommes de terre", type: "patates", cuisine: "francaise", minutes: 75, emoji: "🍗", ingredients: ["poulet", "patates", "carottes"] },
  { id: "hachis", nom: "Hachis parmentier", type: "patates", cuisine: "francaise", minutes: 60, emoji: "🥔", ingredients: ["viande_hachee", "patates", "lait", "fromage_rape", "oignons"] },
  { id: "saucisses_puree", nom: "Saucisses, purée et haricots verts", type: "patates", minutes: 35, emoji: "🌭", ingredients: ["saucisses", "patates", "lait", "haricots_verts"] },
  { id: "stoemp", nom: "Stoemp aux carottes et saucisses", type: "patates", cuisine: "belge", minutes: 45, emoji: "🥕", ingredients: ["patates", "carottes", "poireaux", "saucisses"] },
  { id: "gratin_dauphinois", nom: "Gratin dauphinois et jambon", type: "patates", cuisine: "francaise", minutes: 75, emoji: "🧀", ingredients: ["patates", "creme", "fromage_rape", "jambon"] },
  { id: "endives_jambon", nom: "Endives au jambon gratinées", type: "patates", cuisine: "belge", minutes: 60, emoji: "🥓", ingredients: ["endives", "jambon", "fromage_rape", "patates", "lait"] },
  { id: "escalope", nom: "Escalope panée, pommes de terre et salade", type: "patates", minutes: 35, emoji: "🥩", ingredients: ["escalopes", "oeufs", "chapelure", "patates", "salade", "citron"] },
  { id: "placki", nom: "Galettes de pommes de terre (placki)", type: "patates", cuisine: "polonaise", minutes: 35, emoji: "🥞", ingredients: ["patates", "oignons", "oeufs", "creme"] },
  { id: "pdt_lardons", nom: "Pommes de terre sautées, lardons et œufs", type: "patates", minutes: 35, emoji: "🍳", ingredients: ["patates", "lardons", "oeufs", "oignons"] },
  { id: "boulets", nom: "Boulets sauce tomate et frites", type: "patates", cuisine: "belge", minutes: 45, emoji: "🍖", ingredients: ["viande_hachee", "sauce_tomate", "oignons", "frites"] },
  { id: "burger", nom: "Burgers maison et frites", type: "patates", minutes: 35, emoji: "🍔", ingredients: ["pains_burger", "viande_hachee", "fromage_rape", "salade", "tomates", "frites"] },
  { id: "pierogi", nom: "Pierogi ruskis à la crème", type: "patates", cuisine: "polonaise", minutes: 20, emoji: "🥟", ingredients: ["pierogi", "oignons", "creme"] },
  { id: "schabowy", nom: "Kotlet schabowy (escalope panée), pommes de terre et concombre", type: "patates", cuisine: "polonaise", minutes: 40, emoji: "🥩", ingredients: ["escalopes", "oeufs", "chapelure", "patates", "concombre", "creme"] },
  { id: "salade_liegeoise", nom: "Salade liégeoise (haricots verts, pommes de terre, lardons)", type: "patates", cuisine: "belge", minutes: 35, emoji: "🥗", ingredients: ["haricots_verts", "patates", "lardons", "oignons"] },
  { id: "stoemp_veggie", nom: "Stoemp de carottes et poireaux, œufs au plat", type: "patates", cuisine: "belge", minutes: 45, emoji: "🥕", ingredients: ["patates", "carottes", "poireaux", "oeufs"] },
  { id: "patatas_bravas", nom: "Patatas bravas et chorizo grillé, pain", type: "patates", cuisine: "espagnole", minutes: 35, emoji: "🥔", ingredients: ["patates", "chorizo", "sauce_tomate", "pain"] },

  // Viande
  { id: "tacos", nom: "Tacos maison", type: "viande", cuisine: "mexicaine", minutes: 25, emoji: "🌮", ingredients: ["tortillas", "viande_hachee", "salade", "fromage_rape", "tomates"] },
  { id: "wraps", nom: "Wraps au poulet et crudités", type: "viande", minutes: 20, emoji: "🌯", ingredients: ["tortillas", "poulet", "salade", "tomates"] },
  { id: "golabki", nom: "Choux farcis (gołąbki) sauce tomate", type: "viande", cuisine: "polonaise", minutes: 90, emoji: "🍲", ingredients: ["chou", "viande_hachee", "riz", "sauce_tomate"] },
  { id: "waterzooi", nom: "Waterzooi de poulet", type: "viande", cuisine: "belge", minutes: 60, emoji: "🥣", ingredients: ["poulet", "poireaux", "carottes", "patates", "creme"] },
  { id: "carbonade", nom: "Carbonade flamande et frites", type: "viande", cuisine: "belge", minutes: 150, emoji: "🍖", ingredients: ["boeuf", "oignons", "biere", "frites"] },
  { id: "bigos", nom: "Bigos (choucroute aux saucisses)", type: "viande", cuisine: "polonaise", minutes: 60, emoji: "🥘", ingredients: ["choucroute", "saucisses", "lardons", "oignons"] },
  { id: "nuggets", nom: "Poulet pané et frites", type: "viande", minutes: 35, emoji: "🍗", ingredients: ["poulet", "oeufs", "chapelure", "frites", "salade"] },
  { id: "poulet_basilic", nom: "Poulet sauté au basilic thaï et riz", type: "viande", cuisine: "thai", minutes: 25, emoji: "🌿", ingredients: ["poulet", "haricots_verts", "poivrons", "riz", "sauce_soja", "basilic"] },
  { id: "fajitas", nom: "Fajitas de poulet et poivrons", type: "viande", cuisine: "mexicaine", minutes: 30, emoji: "🥙", ingredients: ["tortillas", "poulet", "poivrons", "oignons", "creme"] },
  { id: "vol_au_vent", nom: "Vol-au-vent de poulet aux champignons et frites", type: "viande", cuisine: "belge", minutes: 50, emoji: "🍗", ingredients: ["poulet", "champignons", "creme", "bouchees", "frites"] },
  { id: "tajine_poulet", nom: "Tajine de poulet au citron et aux olives, semoule", type: "viande", cuisine: "marocaine", minutes: 55, emoji: "🍲", ingredients: ["poulet", "oignons", "citron", "olives", "semoule"] },
  { id: "kefta", nom: "Kefta (boulettes) à la sauce tomate et semoule", type: "viande", cuisine: "marocaine", minutes: 40, emoji: "🍖", ingredients: ["viande_hachee", "sauce_tomate", "oignons", "semoule"] },
  { id: "brochettes_poulet", nom: "Brochettes de poulet, poivrons et semoule", type: "viande", cuisine: "marocaine", minutes: 35, emoji: "🍢", ingredients: ["poulet", "poivrons", "oignons", "semoule"] },
  { id: "gyozas", nom: "Gyozas poêlés, riz et carottes sautées", type: "viande", cuisine: "japonaise", minutes: 25, emoji: "🥟", ingredients: ["gyozas", "riz", "carottes", "sauce_soja"] },
  { id: "nems", nom: "Nems au poulet, nouilles de riz et salade", type: "viande", cuisine: "chinoise", minutes: 25, emoji: "🥟", ingredients: ["nems", "nouilles_riz", "salade", "carottes"] },
  { id: "shish_taouk", nom: "Shish taouk (brochettes de poulet), riz et salade", type: "viande", cuisine: "libanaise", minutes: 40, emoji: "🍢", ingredients: ["poulet", "riz", "yaourt", "salade", "tomates"] },
  { id: "kafta_taboule", nom: "Kafta de bœuf et taboulé libanais", type: "viande", cuisine: "libanaise", minutes: 40, emoji: "🥗", ingredients: ["viande_hachee", "boulgour", "tomates", "persil", "citron"] },
  { id: "shawarma", nom: "Shawarma de poulet en pita, crudités et sauce au yaourt", type: "viande", cuisine: "libanaise", minutes: 30, emoji: "🌯", ingredients: ["poulet", "pita", "yaourt", "tomates", "concombre"] },
  { id: "albondigas", nom: "Albóndigas (boulettes) sauce tomate et pain", type: "viande", cuisine: "espagnole", minutes: 40, emoji: "🍅", ingredients: ["viande_hachee", "sauce_tomate", "oignons", "pain"] },
  { id: "souvlaki", nom: "Souvlaki de poulet en pita, tzatziki et tomates", type: "viande", cuisine: "grecque", minutes: 35, emoji: "🥙", ingredients: ["poulet", "pita", "yaourt", "concombre", "tomates"] },

  // Poisson
  { id: "saumon_haricots", nom: "Saumon, haricots verts et pommes de terre", type: "poisson", minutes: 30, emoji: "🐟", ingredients: ["saumon", "haricots_verts", "patates", "citron"] },
  { id: "saumon_riz", nom: "Saumon, riz et brocoli", type: "poisson", minutes: 30, emoji: "🍣", ingredients: ["saumon", "riz", "brocoli", "citron"] },
  { id: "cabillaud", nom: "Cabillaud au four et légumes", type: "poisson", minutes: 45, emoji: "🐠", ingredients: ["cabillaud", "courgettes", "carottes", "patates", "citron"] },
  { id: "poisson_pane", nom: "Poisson pané et purée", type: "poisson", minutes: 30, emoji: "🍤", ingredients: ["poisson_pane", "patates", "lait", "petits_pois"] },
  { id: "moules_frites", nom: "Moules-frites", type: "poisson", cuisine: "belge", minutes: 35, emoji: "🍟", ingredients: ["moules", "frites", "oignons", "creme"] },
  { id: "crevettes_riz", nom: "Crevettes sautées et riz", type: "poisson", minutes: 25, emoji: "🦐", ingredients: ["crevettes", "riz", "petits_pois", "oignons"] },
  { id: "croquettes_crevettes", nom: "Croquettes de crevettes, frites et citron", type: "poisson", cuisine: "belge", minutes: 25, emoji: "🍤", ingredients: ["croquettes_crevettes", "frites", "salade", "citron"] },
  { id: "poke", nom: "Bol de riz au saumon et à l'avocat (poke bowl)", type: "poisson", cuisine: "japonaise", minutes: 25, emoji: "🍣", ingredients: ["riz", "saumon", "avocat", "concombre", "sauce_soja"] },
  { id: "gambas", nom: "Crevettes à l'ail et au citron, pain grillé", type: "poisson", cuisine: "espagnole", minutes: 20, emoji: "🦐", ingredients: ["crevettes", "ail", "pain", "citron", "salade"] },

  // Sans viande ni poisson
  { id: "omelette", nom: "Omelette au fromage et salade", type: "veggie", cuisine: "francaise", minutes: 15, emoji: "🍳", ingredients: ["oeufs", "fromage_rape", "salade", "tomates"] },
  { id: "shakshuka", nom: "Shakshuka (œufs à la tomate)", type: "veggie", cuisine: "marocaine", minutes: 30, emoji: "🥘", ingredients: ["oeufs", "sauce_tomate", "poivrons", "oignons", "pain"] },
  { id: "dahl", nom: "Dahl de lentilles et riz", type: "veggie", cuisine: "indienne", minutes: 35, emoji: "🍲", ingredients: ["lentilles", "lait_coco", "riz", "epinards", "oignons"] },
  { id: "curry_pois_chiches", nom: "Curry de pois chiches et riz", type: "veggie", cuisine: "indienne", minutes: 30, emoji: "🍛", ingredients: ["pois_chiches", "lait_coco", "riz", "epinards", "sauce_tomate"] },
  { id: "gratin_courgettes", nom: "Gratin de courgettes et pommes de terre", type: "veggie", minutes: 60, emoji: "🥒", ingredients: ["courgettes", "patates", "creme", "fromage_rape"] },
  { id: "curry_rouge_legumes", nom: "Curry rouge thaï au potiron et riz", type: "veggie", cuisine: "thai", minutes: 35, emoji: "🥥", ingredients: ["sauce_curry", "lait_coco", "potiron", "poivrons", "riz"] },
  { id: "nalesniki", nom: "Naleśniki aux champignons et au fromage (crêpes salées)", type: "veggie", cuisine: "polonaise", minutes: 40, emoji: "🥞", ingredients: ["oeufs", "lait", "champignons", "fromage_rape", "creme"] },
  { id: "aloo_gobi", nom: "Aloo gobi (pommes de terre et chou-fleur épicés) et riz", type: "veggie", cuisine: "indienne", minutes: 40, emoji: "🥘", ingredients: ["patates", "chou_fleur", "tomates", "oignons", "riz"] },
  { id: "nachos", nom: "Nachos gratinés aux haricots rouges et au maïs", type: "veggie", cuisine: "mexicaine", minutes: 20, emoji: "🌽", ingredients: ["tortilla_chips", "haricots_rouges", "mais", "fromage_rape", "tomates"] },
  { id: "couscous_legumes", nom: "Couscous aux légumes et pois chiches", type: "veggie", cuisine: "marocaine", minutes: 45, emoji: "🍲", ingredients: ["semoule", "carottes", "courgettes", "pois_chiches", "oignons"] },
  { id: "tamagoyaki", nom: "Tamagoyaki (omelette roulée), riz et concombre", type: "veggie", cuisine: "japonaise", minutes: 25, emoji: "🍳", ingredients: ["oeufs", "riz", "concombre", "sauce_soja"] },
  { id: "houmous_falafels", nom: "Houmous, falafels et pita", type: "veggie", cuisine: "libanaise", minutes: 20, emoji: "🥙", ingredients: ["houmous", "falafels", "pita", "tomates", "concombre"] },
  { id: "moujaddara", nom: "Moujaddara (lentilles, riz et oignons dorés)", type: "veggie", cuisine: "libanaise", minutes: 40, emoji: "🍚", ingredients: ["lentilles", "riz", "oignons", "yaourt"] },
  { id: "tortilla_esp", nom: "Tortilla espagnole (omelette de pommes de terre) et salade", type: "veggie", cuisine: "espagnole", minutes: 40, emoji: "🥚", ingredients: ["patates", "oeufs", "oignons", "salade"] },
  { id: "salade_grecque", nom: "Salade grecque (feta, olives, concombre) et pita", type: "veggie", cuisine: "grecque", minutes: 15, emoji: "🥗", ingredients: ["tomates", "concombre", "feta", "olives", "pita"] },

  // Au four
  { id: "pizza_jambon", nom: "Pizza maison jambon-mozzarella", type: "four", cuisine: "italienne", minutes: 30, emoji: "🍕", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "jambon"] },
  { id: "pizza_legumes", nom: "Pizza aux légumes", type: "four", cuisine: "italienne", minutes: 35, emoji: "🍕", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "poivrons", "champignons"] },
  { id: "quiche_lorraine", nom: "Quiche lorraine et salade", type: "four", cuisine: "francaise", minutes: 55, emoji: "🥧", ingredients: ["pate_brisee", "lardons", "oeufs", "creme", "salade"] },
  { id: "quiche_legumes", nom: "Quiche aux légumes", type: "four", cuisine: "francaise", minutes: 55, emoji: "🥧", ingredients: ["pate_brisee", "oeufs", "creme", "courgettes", "fromage_rape"] },
  { id: "lasagnes", nom: "Lasagnes à la bolognaise", type: "four", cuisine: "italienne", minutes: 75, emoji: "🍝", ingredients: ["lasagnes", "viande_hachee", "sauce_tomate", "fromage_rape", "oignons"] },
  { id: "croque", nom: "Croque-monsieur et salade", type: "four", cuisine: "francaise", minutes: 20, emoji: "🥪", ingredients: ["pain_mie", "jambon", "fromage_rape", "salade"] },
  { id: "gratin_chou_fleur", nom: "Gratin de chou-fleur et jambon", type: "four", minutes: 55, emoji: "🧀", ingredients: ["chou_fleur", "jambon", "creme", "fromage_rape"] },
  { id: "quesadillas", nom: "Quesadillas au poulet et au fromage", type: "four", cuisine: "mexicaine", minutes: 25, emoji: "🧀", ingredients: ["tortillas", "poulet", "fromage_rape", "poivrons"] },
  { id: "gnocchis", nom: "Gnocchis gratinés à la tomate et à la mozzarella", type: "four", cuisine: "italienne", minutes: 30, emoji: "🍅", ingredients: ["gnocchis", "sauce_tomate", "mozzarella", "parmesan"] },
  { id: "moussaka", nom: "Moussaka (aubergines, viande hachée et béchamel)", type: "four", cuisine: "grecque", minutes: 80, emoji: "🍆", ingredients: ["aubergines", "viande_hachee", "patates", "sauce_tomate", "lait", "fromage_rape"] },
  { id: "pastitsio", nom: "Pastitsio (gratin de pâtes à la viande et à la béchamel)", type: "four", cuisine: "grecque", minutes: 70, emoji: "🍝", ingredients: ["pates", "viande_hachee", "sauce_tomate", "lait", "fromage_rape"] },
  { id: "gemista", nom: "Poivrons farcis au riz et à la viande (gemista)", type: "four", cuisine: "grecque", minutes: 60, emoji: "🍅", ingredients: ["poivrons", "riz", "viande_hachee", "tomates", "oignons"] },
  { id: "spanakopita", nom: "Spanakopita (tourte aux épinards et à la feta)", type: "four", cuisine: "grecque", minutes: 60, emoji: "🥐", ingredients: ["filo", "epinards", "feta", "oeufs"] },

  // Soupes
  { id: "soupe_legumes", nom: "Soupe de légumes et croûtons", type: "soupe", minutes: 40, emoji: "🥣", ingredients: ["carottes", "poireaux", "patates", "pain"] },
  { id: "soupe_potiron", nom: "Soupe de potiron et tartines", type: "soupe", minutes: 40, emoji: "🎃", ingredients: ["potiron", "oignons", "creme", "pain"] },
  { id: "soupe_tomates", nom: "Soupe de tomates au riz (pomidorowa)", type: "soupe", cuisine: "polonaise", minutes: 30, emoji: "🍅", ingredients: ["sauce_tomate", "riz", "creme", "carottes"] },
  { id: "soupe_poireaux", nom: "Soupe de poireaux et pommes de terre", type: "soupe", cuisine: "francaise", minutes: 40, emoji: "🍲", ingredients: ["poireaux", "patates", "creme", "pain"] },
  { id: "tom_kha", nom: "Soupe thaï au poulet et au lait de coco (tom kha)", type: "soupe", cuisine: "thai", minutes: 30, emoji: "🥥", ingredients: ["poulet", "lait_coco", "champignons", "riz", "citron"] },
  { id: "barszcz", nom: "Barszcz (soupe de betteraves) et pain", type: "soupe", cuisine: "polonaise", minutes: 45, emoji: "🍲", ingredients: ["betteraves", "carottes", "patates", "creme", "pain"] },
  { id: "soupe_lentilles_corail", nom: "Soupe de lentilles corail au lait de coco", type: "soupe", cuisine: "indienne", minutes: 35, emoji: "🥕", ingredients: ["lentilles", "lait_coco", "carottes", "oignons", "citron"] },
  { id: "harira", nom: "Harira (soupe de lentilles et de pois chiches)", type: "soupe", cuisine: "marocaine", minutes: 45, emoji: "🥣", ingredients: ["lentilles", "pois_chiches", "sauce_tomate", "oignons", "citron"] },
  { id: "ramen", nom: "Ramen (soupe de nouilles) au poulet et aux œufs", type: "soupe", cuisine: "japonaise", minutes: 35, emoji: "🍜", ingredients: ["nouilles", "poulet", "oeufs", "champignons", "sauce_soja"] },
  { id: "shorbet_adas", nom: "Soupe libanaise de lentilles au citron (shorbet adas)", type: "soupe", cuisine: "libanaise", minutes: 35, emoji: "🍋", ingredients: ["lentilles", "carottes", "oignons", "citron", "pain"] },

  // Fast-food (proposés seulement par le bouton « Fast-food ce soir »)
  { id: "ff_cheeseburger", nom: "Double cheeseburger, frites et ketchup", type: "fastfood", minutes: 30, emoji: "🍔", ingredients: ["pains_burger", "viande_hachee", "fromage_rape", "ketchup", "frites"] },
  { id: "ff_bacon_burger", nom: "Burger bacon-fromage et frites", type: "fastfood", minutes: 30, emoji: "🥓", ingredients: ["pains_burger", "viande_hachee", "bacon", "fromage_rape", "frites"] },
  { id: "ff_poulet_burger", nom: "Burger de poulet croustillant et frites", type: "fastfood", minutes: 30, emoji: "🍗", ingredients: ["pains_burger", "poulet_pane", "salade", "mayonnaise", "frites"] },
  { id: "ff_pizza_pepperoni", nom: "Pizza pepperoni", type: "fastfood", minutes: 25, emoji: "🍕", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "pepperoni"] },
  { id: "ff_pizza_4fromages", nom: "Pizza quatre fromages", type: "fastfood", minutes: 25, emoji: "🧀", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "parmesan", "fromage_rape"] },
  { id: "ff_kebab", nom: "Kebab (pain turc, viande, crudités, sauce blanche)", type: "fastfood", minutes: 20, emoji: "🥙", ingredients: ["pain_kebab", "viande_kebab", "salade", "tomates", "sauce_blanche"] },
  { id: "ff_assiette_kebab", nom: "Assiette kebab, frites et sauce blanche", type: "fastfood", minutes: 25, emoji: "🥩", ingredients: ["viande_kebab", "frites", "salade", "sauce_blanche"] },
  { id: "ff_frites", nom: "Cornet de frites, mayonnaise et ketchup (façon friterie)", type: "fastfood", minutes: 20, emoji: "🍟", ingredients: ["frites", "mayonnaise", "ketchup"] },
  { id: "ff_fricadelles", nom: "Fricadelles, frites et mayonnaise", type: "fastfood", minutes: 25, emoji: "🍖", ingredients: ["fricadelles", "frites", "mayonnaise"] },
  { id: "ff_nuggets", nom: "Nuggets de poulet, frites et sauces", type: "fastfood", minutes: 25, emoji: "🍗", ingredients: ["poulet_pane", "frites", "ketchup", "mayonnaise"] },
  { id: "ff_tacos_belge", nom: "Tacos gratiné à la belge (poulet, frites, fromage)", type: "fastfood", minutes: 30, emoji: "🌮", ingredients: ["tortillas", "poulet", "frites", "fromage_rape", "creme"] },
  { id: "ff_mitraillette", nom: "Mitraillette (baguette, steak haché, frites, sauce)", type: "fastfood", minutes: 30, emoji: "🥖", ingredients: ["baguette", "viande_hachee", "frites", "salade", "mayonnaise"] },
  { id: "ff_hotdog", nom: "Hot-dogs, frites et ketchup", type: "fastfood", minutes: 20, emoji: "🌭", ingredients: ["pains_hotdog", "saucisses", "frites", "ketchup", "oignons"] },
  { id: "ff_wrap_croustillant", nom: "Wrap poulet croustillant et mayonnaise", type: "fastfood", minutes: 20, emoji: "🌯", ingredients: ["tortillas", "poulet_pane", "salade", "tomates", "mayonnaise"] },
];

const MAX_PAR_TYPE = 2; // pas plus de 2 plats du même type dans la semaine
const MAX_PAR_CUISINE = 2; // ni plus de 2 plats de la même cuisine

const TEMPS_CHOIX = [0, 30, 45, 60]; // les temps maximum proposés, en minutes (0 = peu importe)

// Les groupes qu'on peut exclure d'un seul bouton (mots = ce que l'appli cherche dans les plats)
const GROUPES = [
  { id: "legumes", mots: "légumes" },
  { id: "viande", mots: "viande" },
  { id: "poisson", mots: "poisson" },
  { id: "mer", mots: "fruits de mer" },
  { id: "laitages", mots: "laitages" },
  { id: "oeufs", mots: "œufs" },
];

// Les cuisines qu'on peut aimer (mots = pour exclure toute une cuisine en la tapant, exemple : "italien")
const CUISINES = [
  { id: "thai", mots: "thai thailandais" },
  { id: "polonaise", mots: "polonais polonaise" },
  { id: "indienne", mots: "indien indienne" },
  { id: "mexicaine", mots: "mexicain mexicaine" },
  { id: "belge", mots: "belge" },
  { id: "italienne", mots: "italien italienne" },
  { id: "francaise", mots: "francais francaise" },
  { id: "marocaine", mots: "marocain marocaine" },
  { id: "japonaise", mots: "japonais japonaise" },
  { id: "chinoise", mots: "chinois chinoise" },
  { id: "libanaise", mots: "libanais libanaise" },
  { id: "espagnole", mots: "espagnol espagnole" },
  { id: "grecque", mots: "grec grecque" },
];

/* ------------------------------------------------------------------
   4. LES PETITS OUTILS
------------------------------------------------------------------- */

// Mots qui ne servent à rien dans "je n'aime pas les poireaux"
const MOTS_INUTILES = [
  "des", "les", "une", "pas", "aux", "sans", "avec", "pour", "aime", "aiment", "mange", "mangent",
  "deteste", "detestent", "veut", "veulent", "tout", "tous", "toute", "toutes", "plus", "non",
  "trop", "beaucoup", "aucun", "aucune", "rien",
];

// Des expressions de plusieurs mots qui comptent comme UN seul mot
const EXPRESSIONS = [
  [/pommes? de terre/g, "patate"],
  [/haricots? verts?/g, "haricotvert"],
  [/haricots? rouges?/g, "haricotrouge"],
  [/choux?[- ]fleurs?/g, "choufleur"],
  [/pois chiches?/g, "chiche"],
  [/lait de coco/g, "coco"],
  [/pates? a pizza/g, "pizza"],
  [/pates? brisees?/g, "tarte"],
  [/pates? a lasagnes?/g, "lasagne"],
];

// Met en minuscules et enlève les accents : "Pâtes" devient "pates", "œufs" devient "oeufs"
function normaliser(texte) {
  let propre = texte
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/ł/g, "l")
    .normalize("NFD") // sépare les lettres de leurs accents
    .replace(new RegExp("[" + String.fromCharCode(768) + "-" + String.fromCharCode(879) + "]", "g"), ""); // supprime les accents
  EXPRESSIONS.forEach(([modele, remplacement]) => {
    propre = propre.replace(modele, remplacement);
  });
  return propre;
}

// "tomates" devient "tomate", "poireaux" devient "poireau"
function singulier(mot) {
  return mot.length > 3 && (mot.endsWith("s") || mot.endsWith("x")) ? mot.slice(0, -1) : mot;
}

// Transforme un texte ("Je n'aime pas les Tomates !") en liste de mots utiles : ["tomate"]
function motsDe(texte) {
  return normaliser(texte)
    .split(/[^a-z0-9]+/)
    .filter((mot) => mot.length >= 3 && !MOTS_INUTILES.includes(mot))
    .map(singulier);
}

// Tous les mots qui décrivent un plat : son nom, ses ingrédients, leurs "aussi" et sa cuisine
function motsDuPlat(plat) {
  const textes = [plat.nom];
  plat.ingredients.forEach((id) => {
    textes.push(INGREDIENTS[id].nom + " " + (INGREDIENTS[id].aussi || ""));
  });
  const cuisine = CUISINES.find((c) => c.id === plat.cuisine);
  if (cuisine) textes.push(cuisine.mots);
  return [...new Set(motsDe(textes.join(" ")))];
}

// On garde les plats dont tous les ingrédients existent et dont le temps est indiqué, et on prépare leurs mots
const PLATS = LES_PLATS.filter((plat) => {
  const inconnus = plat.ingredients.filter((id) => !INGREDIENTS[id]);
  if (inconnus.length > 0) {
    console.warn("Plat ignoré (" + plat.nom + ") : ingrédient inconnu : " + inconnus.join(", "));
  }
  if (!(plat.minutes > 0)) {
    console.warn("Plat ignoré (" + plat.nom + ") : il manque son temps (minutes)");
  }
  if (plat.cuisine && !CUISINES.some((c) => c.id === plat.cuisine)) {
    console.warn("Cuisine inconnue pour " + plat.nom + " : " + plat.cuisine);
  }
  return inconnus.length === 0 && plat.minutes > 0;
}).map((plat) => ({
  ...plat,
  emoji: plat.emoji || "🍴",
  cuisine: CUISINES.some((c) => c.id === plat.cuisine) ? plat.cuisine : "",
  mots: motsDuPlat(plat),
}));

// Les plats de la semaine, et les plats fast-food (proposés seulement par leur bouton)
const PLATS_SEMAINE = PLATS.filter((plat) => plat.type !== "fastfood");
const PLATS_FASTFOOD = PLATS.filter((plat) => plat.type === "fastfood");

// Tous les mots que l'appli connaît (pour repérer les fautes de frappe)
const MOTS_CONNUS = new Set(PLATS.flatMap((plat) => plat.mots));

// Tous les mots à éviter, pour toute la famille (ce qui est tapé + les groupes cochés)
function listeDesInterdits(membres) {
  return membres.flatMap((m) => {
    const groupes = (m.groupes || []).flatMap((id) => {
      const groupe = GROUPES.find((g) => g.id === id);
      return groupe ? motsDe(groupe.mots) : [];
    });
    return [...motsDe(m.detestes), ...groupes];
  });
}

// Les mots écrits par la famille que l'appli ne connaît dans aucun plat
function motsInconnus(membres) {
  const mots = membres.flatMap((m) => motsDe(m.detestes));
  return [...new Set(mots.filter((mot) => !MOTS_CONNUS.has(mot)))];
}

// Un plat est accepté si aucun mot interdit ne le décrit
function platEstOk(plat, interdits) {
  return !interdits.some((interdit) => plat.mots.includes(interdit));
}

// Un plat est assez rapide si son temps ne dépasse pas le maximum choisi (0 = peu importe)
function platEstAssezRapide(plat, tempsMax) {
  return tempsMax === 0 || plat.minutes <= tempsMax;
}

// 45 devient "45 min", 60 devient "1 h", 90 devient "1 h 30"
function dureeTexte(minutes) {
  if (minutes < 60) return minutes + " " + TXT.min;
  const reste = minutes % 60;
  return Math.floor(minutes / 60) + " " + TXT.heure + (reste > 0 ? " " + (reste < 10 ? "0" : "") + reste : "");
}

// Mélange une liste au hasard
function melanger(liste) {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/* ----- Les cuisines préférées de chacun ----- */

// Un plat plaît à une personne si sa cuisine fait partie de ses cuisines préférées
function platPlaitA(plat, membre) {
  return !!plat.cuisine && (membre.cuisines || []).includes(plat.cuisine);
}

// Le prénom d'une personne ("Personne 2" si elle n'a pas encore de prénom)
function nomAffiche(membre, index) {
  const prenom = (membre.prenom || "").trim();
  return prenom || TXT.personneNumero.replace("{n}", index + 1);
}

// Les personnes à qui ce plat fait plaisir
function quiAime(plat, membres) {
  return membres.map((m, i) => (platPlaitA(plat, m) ? nomAffiche(m, i) : null)).filter((nom) => nom !== null);
}

// Les personnes qui ont choisi des cuisines mais qui n'ont aucun plat qui leur plaît dans ce menu
function nomsSansPlat(menu, membres) {
  return membres
    .map((m, i) => ((m.cuisines || []).length > 0 && !menu.some((plat) => platPlaitA(plat, m)) ? nomAffiche(m, i) : null))
    .filter((nom) => nom !== null);
}

// Les cuisines d'une personne, écrites en toutes lettres : "Thaï, Italienne"
function resumeCuisines(membre) {
  const noms = CUISINES.filter((c) => (membre.cuisines || []).includes(c.id)).map((c) => TXT.cuisines[c.id]);
  return noms.length > 0 ? noms.join(", ") : TXT.cuisinesAucune;
}

// Choisit 7 plats au hasard : chaque personne a au moins un plat de ses cuisines préférées,
// et jamais plus de 2 plats du même type ni de la même cuisine
function composerMenu(compatibles, membres = []) {
  const melange = melanger(compatibles);
  const menu = [];
  const parType = {};
  const parCuisine = {};

  // Reste-t-il de la place pour ce plat ?
  function place(plat) {
    return (
      menu.length < 7 &&
      !menu.includes(plat) &&
      (parType[plat.type] || 0) < MAX_PAR_TYPE &&
      (!plat.cuisine || (parCuisine[plat.cuisine] || 0) < MAX_PAR_CUISINE)
    );
  }

  function garder(plat) {
    menu.push(plat);
    parType[plat.type] = (parType[plat.type] || 0) + 1;
    if (plat.cuisine) parCuisine[plat.cuisine] = (parCuisine[plat.cuisine] || 0) + 1;
  }

  // 1. Chaque personne qui a choisi des cuisines reçoit un plat qu'elle aime (dans un ordre au hasard)
  melanger(membres).forEach((m) => {
    if (menu.some((plat) => platPlaitA(plat, m))) return; // elle a déjà son plat
    const choix =
      melange.find((plat) => place(plat) && platPlaitA(plat, m)) ||
      melange.find((plat) => menu.length < 7 && !menu.includes(plat) && platPlaitA(plat, m)); // sinon, sans les limites
    if (choix) garder(choix);
  });

  // 2. On complète avec le reste
  melange.forEach((plat) => {
    if (place(plat)) garder(plat);
  });

  // 3. S'il n'y a pas assez de choix, on complète sans ces limites
  melange.forEach((plat) => {
    if (menu.length < 7 && !menu.includes(plat)) menu.push(plat);
  });
  return melanger(menu);
}

// Choisit le plat qui en remplace un autre dans le menu : sans trop de plats du même type ou de la même cuisine,
// et sans enlever à quelqu'un son seul plat préféré de la semaine
function choisirRemplacant(menu, i, libres, membres) {
  if (libres.length === 0) return null;
  const autres = menu.filter((_, index) => index !== i);
  const sansExces = libres.filter(
    (p) =>
      autres.filter((a) => a.type === p.type).length < MAX_PAR_TYPE &&
      (!p.cuisine || autres.filter((a) => a.cuisine === p.cuisine).length < MAX_PAR_CUISINE)
  );
  // les personnes qui n'auraient plus aucun plat qu'elles aiment
  const aGarder = membres.filter((m) => platPlaitA(menu[i], m) && !autres.some((a) => platPlaitA(a, m)));
  const leurPlait = (liste) => liste.filter((p) => aGarder.every((m) => platPlaitA(p, m)));
  const choix = [leurPlait(sansExces), leurPlait(libres), sansExces, libres].find((liste) => liste.length > 0);
  return melanger(choix)[0];
}

/* ----- Les prix (tout est calculé en centimes pour éviter les erreurs d'arrondi) ----- */

function prixEnCentimes(prixPour4, personnes) {
  return Math.round((prixPour4 * 100 * personnes) / 4);
}

const FORMAT_EURO = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

function prixTexte(centimes) {
  return FORMAT_EURO.format(centimes / 100); // 1250 devient "12,50 €"
}

// Le prix d'un plat = la somme des lignes de sa liste de courses (même arrondi, donc même total)
function prixDuPlat(plat, personnes) {
  return plat.ingredients.reduce((somme, id) => somme + prixEnCentimes(INGREDIENTS[id].prix, personnes), 0);
}

function libellePersonnes(n) {
  return n + " " + (n > 1 ? TXT.personnes : TXT.personne);
}

/* ----- Les quantités (grammes, kilos, centilitres, litres ou pièces) ----- */

const FORMAT_NOMBRE = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });

// On arrondit vers le haut pour ne jamais en manquer : 425 g devient 450 g, 1,05 kg devient 1,1 kg
function quantiteTexte(quantite, unite) {
  if (unite === "g") {
    const g = quantite < 1000 ? Math.max(50, Math.ceil(quantite / 50) * 50) : Math.ceil(quantite / 100) * 100;
    return g < 1000 ? g + " " + TXT.gramme : FORMAT_NOMBRE.format(g / 1000) + " " + TXT.kilo;
  }
  if (unite === "cl") {
    const cl = Math.max(5, Math.ceil(quantite / 5) * 5);
    return cl < 100 ? cl + " " + TXT.centilitre : FORMAT_NOMBRE.format(cl / 100) + " " + TXT.litre;
  }
  const n = Math.max(1, Math.ceil(quantite)); // des pièces entières
  const noms = TXT.unites[unite] || [unite, unite];
  return n + " " + noms[n > 1 ? 1 : 0];
}

// La liste de courses : pour chaque ingrédient, pour combien de repas et combien ça coûte
function construireListe(menu, personnes) {
  const nombre = {};
  menu.forEach((plat) => {
    plat.ingredients.forEach((id) => {
      nombre[id] = (nombre[id] || 0) + 1;
    });
  });
  const lignes = Object.keys(nombre)
    .map((id) => ({
      id: id,
      nom: INGREDIENTS[id].nom,
      rayon: INGREDIENTS[id].rayon,
      repas: nombre[id],
      quantite: (INGREDIENTS[id].qte * nombre[id] * personnes) / 4,
      unite: INGREDIENTS[id].unite,
      centimes: prixEnCentimes(INGREDIENTS[id].prix * nombre[id], personnes),
    }))
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  const total = lignes.reduce((somme, ligne) => somme + ligne.centimes, 0);
  return { lignes: lignes, total: total };
}

// Le texte envoyé quand on partage la liste (WhatsApp, SMS, e-mail...)
// Pour le plat tiré au sort, on donne aussi le plat : le texte commence alors par son nom,
// et il se termine par sa recette (etapes = la liste des étapes de la recette)
function texteDeLaListe(liste, personnes, plat, etapes) {
  const SAUT = String.fromCharCode(10); // retour à la ligne
  const texte = [];
  if (plat) {
    const debut = plat.type === "fastfood" ? "🍔 " + TXT.ceSoirFastfoodTexte : "🍽️ " + TXT.ceSoirTexte;
    texte.push(debut + " : " + plat.nom + " (🕒 " + dureeTexte(plat.minutes) + ")", "");
  }
  texte.push("🛒 " + TXT.partagerTitre + " (" + libellePersonnes(personnes) + ")", "");
  RAYONS.forEach((rayon) => {
    const lignes = liste.lignes.filter((l) => l.rayon === rayon);
    if (lignes.length === 0) return;
    texte.push(TXT.rayons[rayon]);
    lignes.forEach((l) => {
      const repas = l.repas > 1 ? " (" + TXT.repas.replace("{n}", l.repas) + ")" : "";
      texte.push("- " + l.nom + " : " + quantiteTexte(l.quantite, l.unite) + repas + " · " + prixTexte(l.centimes));
    });
    texte.push("");
  });
  texte.push(TXT.total + " : " + prixTexte(liste.total));
  if (plat && etapes && etapes.length > 0) {
    texte.push("", "📖 " + TXT.recetteTitre + " :");
    etapes.forEach((etape, k) => texte.push(k + 1 + ". " + etape));
  }
  return texte.join(SAUT);
}

/* ----- La famille est gardée dans le téléphone, pour ne pas tout retaper ----- */

const CLE_FAMILLE = "menus-semaine-famille";

function lireFamille() {
  try {
    const donnees = JSON.parse(localStorage.getItem(CLE_FAMILLE));
    if (
      Array.isArray(donnees) &&
      donnees.length > 0 &&
      donnees.every((m) => m && typeof m.prenom === "string" && typeof m.detestes === "string")
    ) {
      return donnees.map((m) => ({
        prenom: m.prenom,
        detestes: m.detestes,
        groupes: (Array.isArray(m.groupes) ? m.groupes : []).filter((id) => GROUPES.some((g) => g.id === id)),
        cuisines: (Array.isArray(m.cuisines) ? m.cuisines : []).filter((id) => CUISINES.some((c) => c.id === id)),
      }));
    }
  } catch (erreur) {
    // pas grave : on repart d'une famille vide
  }
  return [{ prenom: "", detestes: "", groupes: [], cuisines: [] }];
}

// Le temps maximum choisi la dernière fois (0 = peu importe)
const CLE_TEMPS = "menus-semaine-temps";

function lireTemps() {
  try {
    const valeur = Number(localStorage.getItem(CLE_TEMPS));
    if (TEMPS_CHOIX.includes(valeur)) return valeur;
  } catch (erreur) {
    // pas grave : on repart sans limite de temps
  }
  return 0;
}

// ===== L'APPLICATION =====

// La liste des ingrédients d'un plat, avec les quantités pour le nombre de personnes
function ListeIngredients({ plat, personnes, classe }) {
  return (
    <ul className={classe} aria-label={TXT.ingredients}>
      {plat.ingredients.map((id) => (
        <li key={id}>
          <span className="ing-nom">{INGREDIENTS[id].nom}</span>{" "}
          <span className="ing-qte">{quantiteTexte((INGREDIENTS[id].qte * personnes) / 4, INGREDIENTS[id].unite)}</span>
        </li>
      ))}
    </ul>
  );
}

// La recette d'un plat : un bouton qui l'affiche ou la cache
function Recette({ plat }) {
  const [ouverte, setOuverte] = useState(false);
  const etapes = RECETTES[plat.id];
  if (!etapes) return null; // pas de recette écrite pour ce plat : pas de bouton
  return (
    <div className="recette">
      <button type="button" className="bouton-recette" aria-expanded={ouverte ? "true" : "false"} onClick={() => setOuverte(!ouverte)}>
        <span aria-hidden="true">📖 </span>
        {ouverte ? TXT.masquerRecette : TXT.voirRecette}
      </button>
      {ouverte && (
        <>
          <ol className="recette-etapes" aria-label={TXT.recette}>
            {etapes.map((etape, k) => (
              <li key={k}>{etape}</li>
            ))}
          </ol>
          <p className="recette-aide">{TXT.recetteAide}</p>
        </>
      )}
    </div>
  );
}

// Les petites étiquettes d'un plat : sa cuisine, et les personnes à qui il fait plaisir
function Etiquettes({ plat, membres }) {
  const qui = quiAime(plat, membres);
  if (!plat.cuisine && qui.length === 0) return null;
  return (
    <span className="etiquettes">
      {plat.cuisine && <span className="etiquette">{TXT.cuisines[plat.cuisine]}</span>}
      {qui.length > 0 && <span className="etiquette etiquette-coeur">{"♥ " + qui.join(", ")}</span>}
    </span>
  );
}

// Le bouton « Partager » et ses choix (WhatsApp, SMS, e-mail, copier).
// texte = ce qui sera envoyé, titre = le titre du message, libelle = le texte du bouton
function Partage({ texte, titre, libelle }) {
  const [panneau, setPanneau] = useState(false); // le panneau de partage est-il ouvert ?
  const [etatCopie, setEtatCopie] = useState(null); // null, "ok" ou "echec"
  const debutPanneau = useRef(null);

  // Quand on ouvre le panneau de partage, on le fait apparaître à l'écran
  useEffect(() => {
    if (panneau && debutPanneau.current) {
      debutPanneau.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [panneau]);

  // Quand le texte change, le message "copié" n'est plus vrai
  useEffect(() => {
    setEtatCopie(null);
  }, [texte]);

  // Sur téléphone, le bouton ouvre le partage habituel (WhatsApp, SMS...)
  async function partager() {
    if (navigator.share) {
      try {
        await navigator.share({ title: titre, text: texte });
        return;
      } catch (erreur) {
        if (erreur && erreur.name === "AbortError") return; // la personne a simplement fermé la fenêtre
      }
    }
    setPanneau(true); // sinon, on affiche nos propres boutons
  }

  async function copier() {
    try {
      await navigator.clipboard.writeText(texte);
      setEtatCopie("ok");
    } catch (erreur) {
      setEtatCopie("echec");
    }
  }

  const liens = {
    whatsapp: "https://wa.me/?text=" + encodeURIComponent(texte),
    sms: "sms:?&body=" + encodeURIComponent(texte),
    email: "mailto:?subject=" + encodeURIComponent(titre) + "&body=" + encodeURIComponent(texte),
  };

  return (
    <>
      <button type="button" className="bouton bouton-principal" onClick={partager}>
        {libelle}
      </button>

      {panneau && (
        <div className="partage-panneau" ref={debutPanneau}>
          <p>{TXT.partagerVia}</p>
          <div className="partage-liens">
            <a className="lien-partage" href={liens.whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a className="lien-partage" href={liens.sms}>
              SMS
            </a>
            <a className="lien-partage" href={liens.email}>
              E-mail
            </a>
            <button type="button" className="lien-partage" onClick={copier}>
              {TXT.copier}
            </button>
          </div>
          {etatCopie === "ok" && <p className="info info-ok">{TXT.copie}</p>}
          {etatCopie === "echec" && (
            <>
              <p className="info">{TXT.copieEchec}</p>
              <textarea readOnly rows={8} value={texte} onFocus={(e) => e.target.select()} />
            </>
          )}
        </div>
      )}
    </>
  );
}

export function App() {
  const [membres, setMembres] = useState(lireFamille);
  const [personnes, setPersonnes] = useState(membres.length); // pour le calcul des prix
  const [menu, setMenu] = useState(null); // la liste des plats de la semaine
  const [coches, setCoches] = useState({}); // les ingrédients déjà cochés
  const [numero, setNumero] = useState(0); // compte les menus générés
  const [surprise, setSurprise] = useState(null); // le plat tiré au sort
  const [numeroSurprise, setNumeroSurprise] = useState(0);
  const [verifie, setVerifie] = useState(""); // ce qui a été tapé, une fois la frappe terminée
  const [ouverts, setOuverts] = useState({}); // les plats dont on voit les ingrédients (par jour)
  const [tempsMax, setTempsMax] = useState(lireTemps); // le temps maximum choisi (0 = peu importe)
  const [tempsDuMenu, setTempsDuMenu] = useState(0); // le temps maximum utilisé pour le menu affiché
  const [ouvertsCuisines, setOuvertsCuisines] = useState({}); // les fiches dont on voit les cuisines (par personne)
  const [sansCuisine, setSansCuisine] = useState([]); // les personnes sans plat de leurs cuisines dans le menu
  const debutMenu = useRef(null);
  const debutSurprise = useRef(null);
  const minuteur = useRef(null);

  const interditsActuels = listeDesInterdits(membres);
  const inconnus = motsInconnus([{ detestes: verifie }]);
  // Un plat convient s'il ne contient rien d'interdit et s'il est assez rapide
  const convient = (plat) => platEstOk(plat, interditsActuels) && platEstAssezRapide(plat, tempsMax);
  const platsLibres = menu ? PLATS_SEMAINE.filter((plat) => convient(plat) && !menu.some((m) => m.id === plat.id)) : [];
  const liste = menu && menu.length > 0 ? construireListe(menu, personnes) : null;
  const texteListe = liste ? texteDeLaListe(liste, personnes) : "";
  // Le texte envoyé quand on partage le plat tiré au sort (une fois validé)
  const texteSurprise =
    surprise && surprise.valide
      ? texteDeLaListe(construireListe([surprise.plat], personnes), personnes, surprise.plat, RECETTES[surprise.plat.id])
      : "";

  // Après chaque nouveau menu, la page défile jusqu'à lui
  useEffect(() => {
    if (numero > 0 && debutMenu.current) {
      debutMenu.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [numero]);

  // Pareil pour le plat tiré au sort
  useEffect(() => {
    if (numeroSurprise > 0 && debutSurprise.current) {
      debutSurprise.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [numeroSurprise]);

  // On arrête le tirage au sort si on quitte la page
  useEffect(() => {
    return () => clearInterval(minuteur.current);
  }, []);

  // Le nom de l'appli s'affiche aussi dans l'onglet du navigateur
  useEffect(() => {
    document.title = TXT.titre;
  }, []);

  // On vérifie l'orthographe un instant après la fin de la frappe (pas à chaque lettre)
  useEffect(() => {
    const attente = setTimeout(() => {
      setVerifie(membres.map((m) => m.detestes).join(", "));
    }, 900);
    return () => clearTimeout(attente);
  }, [membres]);

  // On garde la famille en mémoire
  useEffect(() => {
    try {
      localStorage.setItem(CLE_FAMILLE, JSON.stringify(membres));
    } catch (erreur) {
      // pas grave
    }
  }, [membres]);

  // On garde aussi le temps maximum choisi
  useEffect(() => {
    try {
      localStorage.setItem(CLE_TEMPS, String(tempsMax));
    } catch (erreur) {
      // pas grave
    }
  }, [tempsMax]);

  function majMembre(i, champ, valeur) {
    setMembres(membres.map((m, index) => (index === i ? { ...m, [champ]: valeur } : m)));
  }

  // Toucher un bouton « En un clic » exclut (ou réintègre) tout un groupe d'aliments
  function basculerGroupe(i, id) {
    const groupes = membres[i].groupes || [];
    majMembre(i, "groupes", groupes.includes(id) ? groupes.filter((g) => g !== id) : [...groupes, id]);
  }

  // Toucher une cuisine l'ajoute (ou la retire) des cuisines préférées de la personne
  function basculerCuisine(i, id) {
    const cuisines = membres[i].cuisines || [];
    majMembre(i, "cuisines", cuisines.includes(id) ? cuisines.filter((c) => c !== id) : [...cuisines, id]);
  }

  function ajouterMembre() {
    setMembres([...membres, { prenom: "", detestes: "", groupes: [], cuisines: [] }]);
    setPersonnes(Math.min(20, personnes + 1));
  }

  function retirerMembre(i) {
    setMembres(membres.filter((_, index) => index !== i));
    setOuvertsCuisines({});
    setPersonnes(Math.max(1, personnes - 1));
  }

  function changerPersonnes(difference) {
    setPersonnes(Math.min(20, Math.max(1, personnes + difference)));
  }

  function genererMenu() {
    const nouveau = composerMenu(PLATS_SEMAINE.filter(convient), membres);
    setMenu(nouveau);
    setSansCuisine(nomsSansPlat(nouveau, membres));
    setTempsDuMenu(tempsMax);
    setCoches({});
    setOuverts({});
    setNumero(numero + 1);
  }

  function changerPlat(i) {
    const nouveau = choisirRemplacant(menu, i, platsLibres, membres);
    if (!nouveau) return;
    const autreMenu = menu.map((plat, index) => (index === i ? nouveau : plat));
    setMenu(autreMenu);
    setSansCuisine(nomsSansPlat(autreMenu, membres));
  }

  // Les boutons "Surprends-moi" et "Fast-food ce soir" : un plat au hasard, avec un petit effet de tirage
  function surprendre(fastfood) {
    const candidats = (fastfood ? PLATS_FASTFOOD : PLATS_SEMAINE).filter(convient);
    clearInterval(minuteur.current);
    setNumeroSurprise(numeroSurprise + 1);
    if (candidats.length === 0) {
      setSurprise({ vide: true, temps: tempsMax, fastfood: fastfood });
      return;
    }
    const precedent = surprise && surprise.plat ? surprise.plat.id : null;
    const choix = candidats.length > 1 ? candidats.filter((p) => p.id !== precedent) : candidats;
    const gagnant = melanger(choix)[0];
    const blague = TXT.blagues[Math.floor(Math.random() * TXT.blagues.length)];
    let tour = 0;
    setSurprise({ plat: melanger(candidats)[0], enCours: true, fastfood: fastfood, blague: blague });
    minuteur.current = setInterval(() => {
      tour = tour + 1;
      if (tour >= 10) {
        clearInterval(minuteur.current);
        setSurprise({ plat: gagnant, enCours: false, fastfood: fastfood, blague: blague });
      } else {
        setSurprise({ plat: melanger(candidats)[0], enCours: true, fastfood: fastfood, blague: blague });
      }
    }, 110);
  }

  // Toucher un plat montre ou cache ses ingrédients
  function basculer(i) {
    setOuverts({ ...ouverts, [i]: !ouverts[i] });
  }

  function cocher(id) {
    setCoches({ ...coches, [id]: !coches[id] });
  }

  // Le bouton "Valider" : on garde ce plat, et on peut alors l'envoyer à la famille
  function validerSurprise() {
    if (surprise && surprise.plat && !surprise.enCours) {
      setSurprise({ ...surprise, enCours: false, valide: true });
    }
  }

  return (
    <>
      <header className="entete">
        <div className="entete-contenu">
          <h1>🍽️ {TXT.titre}</h1>
          <p>{TXT.sousTitre}</p>
        </div>
      </header>

      <main className="page">
        <section className="carte">
          <h2>{TXT.qui}</h2>

          {membres.map((m, i) => (
            <div className="membre" key={i}>
              <label>
                {TXT.prenom}
                <input
                  type="text"
                  placeholder={TXT.prenomExemple}
                  value={m.prenom}
                  onChange={(e) => majMembre(i, "prenom", e.target.value)}
                />
              </label>
              <label>
                {TXT.detestes}
                <input
                  type="text"
                  placeholder={TXT.detestesExemple}
                  value={m.detestes}
                  onChange={(e) => majMembre(i, "detestes", e.target.value)}
                />
              </label>
              <div className="groupes">
                <span className="groupes-titre">{TXT.groupesTitre}</span>
                <div className="groupes-choix">
                  {GROUPES.map((g) => (
                    <label className="puce petite" key={g.id}>
                      <input
                        type="checkbox"
                        checked={(m.groupes || []).includes(g.id)}
                        onChange={() => basculerGroupe(i, g.id)}
                      />
                      <span>{TXT.groupes[g.id]}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="cuisines">
                <button
                  type="button"
                  className="cuisines-bouton"
                  aria-expanded={ouvertsCuisines[i] ? "true" : "false"}
                  onClick={() => setOuvertsCuisines({ ...ouvertsCuisines, [i]: !ouvertsCuisines[i] })}
                >
                  <span className="cuisines-titre">{TXT.cuisinesTitre}</span>
                  <span className="cuisines-resume">{resumeCuisines(m)}</span>
                  <span className="cuisines-fleche" aria-hidden="true">
                    {ouvertsCuisines[i] ? "▴" : "▾"}
                  </span>
                </button>
                {ouvertsCuisines[i] && (
                  <>
                    <div className="cuisines-choix">
                      {CUISINES.map((c) => (
                        <label className="puce petite" key={c.id}>
                          <input
                            type="checkbox"
                            checked={(m.cuisines || []).includes(c.id)}
                            onChange={() => basculerCuisine(i, c.id)}
                          />
                          <span>{TXT.cuisines[c.id]}</span>
                        </label>
                      ))}
                    </div>
                    <p className="cuisines-aide">{TXT.cuisinesAide}</p>
                  </>
                )}
              </div>
              {membres.length > 1 && (
                <button type="button" className="retirer" aria-label={TXT.retirer} onClick={() => retirerMembre(i)}>
                  ×
                </button>
              )}
            </div>
          ))}

          {inconnus.length > 0 && <p className="info">{TXT.inconnu.replace("{mots}", inconnus.join(", "))}</p>}

          <button type="button" className="bouton bouton-secondaire" onClick={ajouterMembre}>
            {TXT.ajouter}
          </button>

          <fieldset className="temps">
            <legend>{TXT.tempsTitre}</legend>
            <div className="temps-choix">
              {TEMPS_CHOIX.map((minutes) => (
                <label className="puce" key={minutes}>
                  <input type="radio" name="temps" checked={tempsMax === minutes} onChange={() => setTempsMax(minutes)} />
                  <span>{minutes === 0 ? TXT.tempsLibre : dureeTexte(minutes)}</span>
                </label>
              ))}
            </div>
            <p className="temps-aide">{TXT.tempsAide}</p>
          </fieldset>

          <button type="button" className="bouton bouton-principal" onClick={genererMenu}>
            {menu ? TXT.regenerer : TXT.generer}
          </button>
          <div className="boutons-soir">
            <button type="button" className="bouton bouton-surprise" onClick={() => surprendre(false)}>
              <span className="bouton-emoji" aria-hidden="true">
                🎲
              </span>
              <span className="bouton-titre">{TXT.surprise}</span>
              <span className="bouton-sous">{TXT.surpriseSous}</span>
            </button>
            <button type="button" className="bouton bouton-fastfood" onClick={() => surprendre(true)}>
              <span className="bouton-emoji" aria-hidden="true">
                🍔
              </span>
              <span className="bouton-titre">{TXT.fastfood}</span>
              <span className="bouton-sous">{TXT.fastfoodSous}</span>
            </button>
          </div>
          <p className="aide">{TXT.allergie}</p>
        </section>

        {surprise && (
          <section className={surprise.fastfood ? "carte carte-surprise carte-fastfood" : "carte carte-surprise"} ref={debutSurprise}>
            <h2>{surprise.fastfood ? TXT.ceSoirFastfood : TXT.ceSoir}</h2>
            {surprise.vide ? (
              <p className="info">
                {surprise.temps > 0
                  ? TXT.aucunTemps.replace("{temps}", dureeTexte(surprise.temps))
                  : surprise.fastfood
                    ? TXT.aucunFastfood
                    : TXT.aucunSurprise}
              </p>
            ) : (
              <>
                {surprise.fastfood && !surprise.enCours && <p className="blague">{surprise.blague}</p>}
                <div className={surprise.enCours ? "surprise-tete en-cours" : "surprise-tete"}>
                  <div className={"grande-vignette type-" + surprise.plat.type} aria-hidden="true">
                    {surprise.plat.emoji}
                  </div>
                  <div className={surprise.enCours ? "surprise-nom tourne" : "surprise-nom"}>{surprise.plat.nom}</div>
                </div>
                {!surprise.enCours && (
                  <>
                    <p className="surprise-prix">
                      {prixTexte(prixDuPlat(surprise.plat, personnes)) +
                        " · " +
                        libellePersonnes(personnes) +
                        " · 🕒 " +
                        dureeTexte(surprise.plat.minutes)}
                    </p>
                    <Etiquettes plat={surprise.plat} membres={membres} />
                    <ListeIngredients plat={surprise.plat} personnes={personnes} classe="ingredients" />
                    {surprise.fastfood && <p className="aide aide-fastfood">{TXT.fastfoodAide}</p>}
                    <Recette key={surprise.plat.id} plat={surprise.plat} />
                  </>
                )}
                {surprise.valide ? (
                  <>
                    <p className="valide" role="status">
                      {TXT.valide}
                    </p>
                    <Partage
                      texte={texteSurprise}
                      titre={(surprise.fastfood ? TXT.ceSoirFastfoodTexte : TXT.ceSoirTexte) + " : " + surprise.plat.nom}
                      libelle={TXT.partagerPlat}
                    />
                  </>
                ) : (
                  <button type="button" className="bouton bouton-principal" disabled={surprise.enCours} onClick={validerSurprise}>
                    {TXT.valider}
                  </button>
                )}
                <button
                  type="button"
                  className="bouton bouton-secondaire"
                  disabled={surprise.enCours}
                  onClick={() => surprendre(!!surprise.fastfood)}
                >
                  {surprise.fastfood ? TXT.unAutreFastfood : TXT.unAutre}
                </button>
              </>
            )}
          </section>
        )}

        {menu && (
          <section className="carte" ref={debutMenu}>
            <h2>{TXT.menu}</h2>
            {menu.length > 0 && (
              <p className="sous-titre">
                {TXT.prixPour.replace("{n}", libellePersonnes(personnes))}
                <br />
                {TXT.menuAstuce}
              </p>
            )}
            {menu.length === 0 && (
              <p className="info">
                {tempsDuMenu > 0 ? TXT.aucunTemps.replace("{temps}", dureeTexte(tempsDuMenu)) : TXT.aucun}
              </p>
            )}
            {menu.length > 0 && menu.length < 7 && (
              <p className="info">
                {(tempsDuMenu > 0 ? TXT.pasAssezTemps : TXT.pasAssez)
                  .replace("{n}", menu.length)
                  .replace("{temps}", dureeTexte(tempsDuMenu))}
              </p>
            )}
            {menu.length > 0 && sansCuisine.length > 0 && (
              <p className="info">{TXT.sansPlatCuisine.replace("{noms}", sansCuisine.join(", "))}</p>
            )}
            {menu.map((plat, i) => (
              <div className="jour" key={plat.id}>
                <div className="jour-ligne">
                  <div className={"pastille type-" + plat.type}>
                    <span className="pastille-image" aria-hidden="true">
                      {plat.emoji}
                    </span>
                    <span className="pastille-jour">{TXT.jours[i].slice(0, 3)}</span>
                  </div>
                  <button type="button" className="jour-texte" aria-expanded={ouverts[i] ? "true" : "false"} onClick={() => basculer(i)}>
                    <span className="jour-nom">{plat.nom}</span>
                    <span className="jour-sous">
                      <span className="jour-prix">{"≈ " + prixTexte(prixDuPlat(plat, personnes))}</span>
                      <span className="jour-duree">
                        <span aria-hidden="true">🕒 </span>
                        {dureeTexte(plat.minutes)}
                      </span>
                      <span className="jour-voir">
                        {TXT.ingredients}
                        <span aria-hidden="true">{ouverts[i] ? " ▴" : " ▾"}</span>
                      </span>
                    </span>
                    <Etiquettes plat={plat} membres={membres} />
                  </button>
                  <button type="button" className="changer" disabled={platsLibres.length === 0} onClick={() => changerPlat(i)}>
                    {TXT.changer}
                  </button>
                </div>
                {ouverts[i] && (
                  <>
                    <ListeIngredients plat={plat} personnes={personnes} classe="ingredients jour-ingredients" />
                    <Recette key={plat.id} plat={plat} />
                  </>
                )}
              </div>
            ))}
          </section>
        )}

        {liste && (
          <section className="carte">
            <h2>{TXT.courses}</h2>

            <div className="personnes">
              <span>{TXT.pour}</span>
              <div className="stepper">
                <button type="button" aria-label={TXT.moins} disabled={personnes <= 1} onClick={() => changerPersonnes(-1)}>
                  −
                </button>
                <span className="stepper-nombre">{personnes}</span>
                <button type="button" aria-label={TXT.plus} disabled={personnes >= 20} onClick={() => changerPersonnes(1)}>
                  +
                </button>
              </div>
              <span>{personnes > 1 ? TXT.personnes : TXT.personne}</span>
            </div>

            {RAYONS.map((rayon) => {
              const lignes = liste.lignes.filter((l) => l.rayon === rayon);
              if (lignes.length === 0) return null;
              return (
                <div className="rayon" key={rayon}>
                  <h3>{TXT.rayons[rayon]}</h3>
                  {lignes.map((l) => (
                    <label className={coches[l.id] ? "course fait" : "course"} key={l.id}>
                      <input type="checkbox" checked={!!coches[l.id]} onChange={() => cocher(l.id)} />
                      <span className="course-nom">
                        {l.nom}{" "}
                        <small>
                          <strong>{quantiteTexte(l.quantite, l.unite)}</strong>
                          {l.repas > 1 && " · " + TXT.repas.replace("{n}", l.repas)}
                        </small>
                      </span>
                      <span className="course-prix">{prixTexte(l.centimes)}</span>
                    </label>
                  ))}
                </div>
              );
            })}

            <div className="total">
              <span>{TXT.total}</span>
              <span className="total-prix">{prixTexte(liste.total)}</span>
            </div>
            <p className="total-detail">
              {TXT.parPersonne.replace("{prix}", prixTexte(Math.round(liste.total / personnes)))}
            </p>
            <p className="aide">{TXT.prixIndicatif}</p>

            <Partage texte={texteListe} titre={TXT.partagerTitre} libelle={TXT.partager} />
          </section>
        )}
      </main>
    </>
  );
}