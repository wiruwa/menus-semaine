import { useEffect, useRef, useState } from "react";
import "./index.css";

/* ------------------------------------------------------------------
   1. TOUS LES TEXTES DE L'APPLI
   Ils sont rangés au même endroit : la traduction sera très simple.
------------------------------------------------------------------- */
const TXT = {
  titre: "Menus de la semaine",
  sousTitre: "Des repas que toute la famille mange, avec la liste de courses.",
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
  ajouter: "+ Ajouter une personne",
  retirer: "Retirer cette personne",
  tempsTitre: "Temps de préparation maximum",
  tempsLibre: "Peu importe",
  tempsAide: "Préparation et cuisson comprises (temps approximatif).",
  inconnu: "Aucun de nos plats ne contient : {mots}. Vérifie l'orthographe.",
  allergie: "En cas d'allergie, vérifie toujours les étiquettes : cette appli ne remplace pas ce contrôle.",
  generer: "Générer mon menu",
  regenerer: "Générer un autre menu",
  surprise: "🎲 Surprends-moi (un seul repas)",
  ceSoir: "Ce soir, on mange…",
  unAutre: "🎲 Un autre plat",
  valider: "✅ Valider ce plat",
  valide: "✅ Plat validé ! Tu peux l'envoyer avec sa liste de courses.",
  ceSoirTexte: "Ce soir",
  partagerPlat: "📤 Partager ce plat",
  aucunSurprise: "Aucun plat ne convient à ces goûts. Essaie avec moins d'exclusions.",
  menu: "Menu de la semaine",
  prixPour: "Prix estimés pour {n}",
  ingredients: "Ingrédients",
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
  aubergines: { nom: "Aubergines", prix: 2.4, rayon: "legumes", qte: 1, unite: "piece", aussi: "legume" },
  petits_pois: { nom: "Petits pois", prix: 1.6, rayon: "legumes", qte: 300, unite: "g", aussi: "legume" },
  endives: { nom: "Endives", prix: 2.5, rayon: "legumes", qte: 6, unite: "piece", aussi: "chicon legume" },
  chou: { nom: "Chou blanc", prix: 1.6, rayon: "legumes", qte: 1, unite: "piece", aussi: "legume" },
  potiron: { nom: "Potiron", prix: 2.2, rayon: "legumes", qte: 800, unite: "g", aussi: "courge legume" },
  citron: { nom: "Citron", prix: 0.5, rayon: "legumes", qte: 1, unite: "piece" },

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

  // Produits frais
  oeufs: { nom: "Œufs", prix: 2.2, rayon: "frais", qte: 6, unite: "piece" },
  creme: { nom: "Crème", prix: 1.2, rayon: "frais", qte: 20, unite: "cl", aussi: "laitage lactose" },
  lait: { nom: "Lait", prix: 0.6, rayon: "frais", qte: 25, unite: "cl", aussi: "laitage lactose" },
  fromage_rape: { nom: "Fromage râpé", prix: 2.2, rayon: "frais", qte: 100, unite: "g", aussi: "laitage lactose" },
  mozzarella: { nom: "Mozzarella", prix: 1.8, rayon: "frais", qte: 250, unite: "g", aussi: "fromage laitage lactose" },
  parmesan: { nom: "Parmesan", prix: 2.2, rayon: "frais", qte: 50, unite: "g", aussi: "fromage laitage lactose" },
  pierogi: { nom: "Pierogi ruskis", prix: 4.0, rayon: "frais", qte: 500, unite: "g", aussi: "fromage laitage lactose patate" },

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

  // Pain
  pain: { nom: "Pain", prix: 2.0, rayon: "pain", qte: 1, unite: "piece" },
  pain_mie: { nom: "Pain de mie", prix: 1.8, rayon: "pain", qte: 8, unite: "tranche" },
  pains_burger: { nom: "Pains à burger", prix: 2.2, rayon: "pain", qte: 4, unite: "piece" },
};

/* ------------------------------------------------------------------
   3. LES PLATS
   Pour en ajouter un : copie une ligne, puis change :
   - id : un mot unique, sans espace ni accent
   - nom : le nom du plat
   - minutes : le temps total, préparation et cuisson comprises
   - emoji : le petit dessin affiché à côté du plat
   - ingredients : ils doivent exister dans la liste du dessus
   type = sert à varier le menu (pas plus de 2 plats du même type par semaine).
------------------------------------------------------------------- */
const LES_PLATS = [
  // Pâtes
  { id: "bolognaise", nom: "Pâtes à la bolognaise", type: "pates", minutes: 30, emoji: "🍝", ingredients: ["pates", "viande_hachee", "sauce_tomate", "oignons"] },
  { id: "carbonara", nom: "Pâtes carbonara", type: "pates", minutes: 20, emoji: "🥓", ingredients: ["pates", "lardons", "creme", "parmesan"] },
  { id: "pesto", nom: "Pâtes au pesto et aux tomates", type: "pates", minutes: 15, emoji: "🍅", ingredients: ["pates", "pesto", "parmesan", "tomates"] },
  { id: "pates_thon", nom: "Pâtes au thon et à la tomate", type: "pates", minutes: 20, emoji: "🐟", ingredients: ["pates", "thon", "sauce_tomate", "oignons"] },
  { id: "gratin_pates", nom: "Gratin de pâtes au jambon", type: "pates", minutes: 40, emoji: "🧀", ingredients: ["pates", "jambon", "creme", "fromage_rape"] },
  { id: "pates_courgettes", nom: "Pâtes crémeuses aux courgettes", type: "pates", minutes: 25, emoji: "🥒", ingredients: ["pates", "courgettes", "creme", "parmesan"] },
  { id: "wok_poulet", nom: "Wok de poulet et nouilles", type: "pates", minutes: 25, emoji: "🍜", ingredients: ["poulet", "nouilles", "carottes", "poivrons"] },

  // Riz
  { id: "curry_poulet", nom: "Curry de poulet et riz", type: "riz", minutes: 35, emoji: "🍛", ingredients: ["poulet", "riz", "lait_coco", "carottes", "oignons"] },
  { id: "riz_cantonais", nom: "Riz cantonais", type: "riz", minutes: 25, emoji: "🍚", ingredients: ["riz", "oeufs", "petits_pois", "jambon", "carottes"] },
  { id: "risotto", nom: "Risotto aux champignons", type: "riz", minutes: 40, emoji: "🍄", ingredients: ["riz", "champignons", "oignons", "parmesan", "creme"] },
  { id: "poulet_creme", nom: "Poulet à la crème, champignons et riz", type: "riz", minutes: 35, emoji: "🥘", ingredients: ["poulet", "champignons", "creme", "riz"] },
  { id: "chili", nom: "Chili con carne et riz", type: "riz", minutes: 45, emoji: "🍲", ingredients: ["viande_hachee", "haricots_rouges", "sauce_tomate", "riz", "poivrons", "oignons"] },
  { id: "ratatouille", nom: "Ratatouille et riz", type: "riz", minutes: 50, emoji: "🍆", ingredients: ["aubergines", "courgettes", "poivrons", "sauce_tomate", "riz"] },
  { id: "riz_saute", nom: "Riz sauté aux légumes", type: "riz", minutes: 25, emoji: "🥦", ingredients: ["riz", "carottes", "poivrons", "oeufs"] },

  // Pommes de terre
  { id: "poulet_roti", nom: "Poulet rôti et pommes de terre", type: "patates", minutes: 75, emoji: "🍗", ingredients: ["poulet", "patates", "carottes"] },
  { id: "hachis", nom: "Hachis parmentier", type: "patates", minutes: 60, emoji: "🥔", ingredients: ["viande_hachee", "patates", "lait", "fromage_rape", "oignons"] },
  { id: "saucisses_puree", nom: "Saucisses, purée et haricots verts", type: "patates", minutes: 35, emoji: "🌭", ingredients: ["saucisses", "patates", "lait", "haricots_verts"] },
  { id: "stoemp", nom: "Stoemp aux carottes et saucisses", type: "patates", minutes: 45, emoji: "🥕", ingredients: ["patates", "carottes", "poireaux", "saucisses"] },
  { id: "gratin_dauphinois", nom: "Gratin dauphinois et jambon", type: "patates", minutes: 75, emoji: "🧀", ingredients: ["patates", "creme", "fromage_rape", "jambon"] },
  { id: "endives_jambon", nom: "Endives au jambon gratinées", type: "patates", minutes: 60, emoji: "🥓", ingredients: ["endives", "jambon", "fromage_rape", "patates", "lait"] },
  { id: "escalope", nom: "Escalope panée, pommes de terre et salade", type: "patates", minutes: 35, emoji: "🥩", ingredients: ["escalopes", "patates", "salade", "citron"] },
  { id: "placki", nom: "Galettes de pommes de terre (placki)", type: "patates", minutes: 35, emoji: "🥞", ingredients: ["patates", "oignons", "oeufs", "creme"] },
  { id: "pdt_lardons", nom: "Pommes de terre sautées, lardons et œufs", type: "patates", minutes: 35, emoji: "🍳", ingredients: ["patates", "lardons", "oeufs", "oignons"] },
  { id: "boulets", nom: "Boulets sauce tomate et frites", type: "patates", minutes: 45, emoji: "🍖", ingredients: ["viande_hachee", "sauce_tomate", "oignons", "frites"] },
  { id: "burger", nom: "Burgers maison et frites", type: "patates", minutes: 35, emoji: "🍔", ingredients: ["pains_burger", "viande_hachee", "fromage_rape", "salade", "tomates", "frites"] },
  { id: "pierogi", nom: "Pierogi ruskis à la crème", type: "patates", minutes: 20, emoji: "🥟", ingredients: ["pierogi", "oignons", "creme"] },

  // Viande
  { id: "tacos", nom: "Tacos maison", type: "viande", minutes: 25, emoji: "🌮", ingredients: ["tortillas", "viande_hachee", "salade", "fromage_rape", "tomates"] },
  { id: "wraps", nom: "Wraps au poulet et crudités", type: "viande", minutes: 20, emoji: "🌯", ingredients: ["tortillas", "poulet", "salade", "tomates"] },
  { id: "golabki", nom: "Choux farcis (gołąbki) sauce tomate", type: "viande", minutes: 90, emoji: "🍲", ingredients: ["chou", "viande_hachee", "riz", "sauce_tomate"] },
  { id: "waterzooi", nom: "Waterzooi de poulet", type: "viande", minutes: 60, emoji: "🥣", ingredients: ["poulet", "poireaux", "carottes", "patates", "creme"] },
  { id: "carbonade", nom: "Carbonade flamande et frites", type: "viande", minutes: 150, emoji: "🍖", ingredients: ["boeuf", "oignons", "frites"] },
  { id: "bigos", nom: "Bigos (choucroute aux saucisses)", type: "viande", minutes: 60, emoji: "🥘", ingredients: ["choucroute", "saucisses", "lardons", "oignons"] },
  { id: "nuggets", nom: "Poulet pané et frites", type: "viande", minutes: 35, emoji: "🍗", ingredients: ["poulet", "frites", "salade"] },

  // Poisson
  { id: "saumon_haricots", nom: "Saumon, haricots verts et pommes de terre", type: "poisson", minutes: 30, emoji: "🐟", ingredients: ["saumon", "haricots_verts", "patates", "citron"] },
  { id: "saumon_riz", nom: "Saumon, riz et brocoli", type: "poisson", minutes: 30, emoji: "🍣", ingredients: ["saumon", "riz", "brocoli", "citron"] },
  { id: "cabillaud", nom: "Cabillaud au four et légumes", type: "poisson", minutes: 45, emoji: "🐠", ingredients: ["cabillaud", "courgettes", "carottes", "patates", "citron"] },
  { id: "poisson_pane", nom: "Poisson pané et purée", type: "poisson", minutes: 30, emoji: "🍤", ingredients: ["poisson_pane", "patates", "lait", "petits_pois"] },
  { id: "moules_frites", nom: "Moules-frites", type: "poisson", minutes: 35, emoji: "🍟", ingredients: ["moules", "frites", "oignons", "creme"] },
  { id: "crevettes_riz", nom: "Crevettes sautées et riz", type: "poisson", minutes: 25, emoji: "🦐", ingredients: ["crevettes", "riz", "petits_pois", "oignons"] },

  // Sans viande ni poisson
  { id: "omelette", nom: "Omelette au fromage et salade", type: "veggie", minutes: 15, emoji: "🍳", ingredients: ["oeufs", "fromage_rape", "salade", "tomates"] },
  { id: "shakshuka", nom: "Shakshuka (œufs à la tomate)", type: "veggie", minutes: 30, emoji: "🥘", ingredients: ["oeufs", "sauce_tomate", "poivrons", "oignons", "pain"] },
  { id: "dahl", nom: "Dahl de lentilles et riz", type: "veggie", minutes: 35, emoji: "🍲", ingredients: ["lentilles", "lait_coco", "riz", "epinards", "oignons"] },
  { id: "curry_pois_chiches", nom: "Curry de pois chiches et riz", type: "veggie", minutes: 30, emoji: "🍛", ingredients: ["pois_chiches", "lait_coco", "riz", "epinards", "sauce_tomate"] },
  { id: "gratin_courgettes", nom: "Gratin de courgettes et pommes de terre", type: "veggie", minutes: 60, emoji: "🥒", ingredients: ["courgettes", "patates", "creme", "fromage_rape"] },

  // Au four
  { id: "pizza_jambon", nom: "Pizza maison jambon-mozzarella", type: "four", minutes: 30, emoji: "🍕", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "jambon"] },
  { id: "pizza_legumes", nom: "Pizza aux légumes", type: "four", minutes: 35, emoji: "🍕", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "poivrons", "champignons"] },
  { id: "quiche_lorraine", nom: "Quiche lorraine et salade", type: "four", minutes: 55, emoji: "🥧", ingredients: ["pate_brisee", "lardons", "oeufs", "creme", "salade"] },
  { id: "quiche_legumes", nom: "Quiche aux légumes", type: "four", minutes: 55, emoji: "🥧", ingredients: ["pate_brisee", "oeufs", "creme", "courgettes", "fromage_rape"] },
  { id: "lasagnes", nom: "Lasagnes à la bolognaise", type: "four", minutes: 75, emoji: "🍝", ingredients: ["lasagnes", "viande_hachee", "sauce_tomate", "fromage_rape", "oignons"] },
  { id: "croque", nom: "Croque-monsieur et salade", type: "four", minutes: 20, emoji: "🥪", ingredients: ["pain_mie", "jambon", "fromage_rape", "salade"] },
  { id: "gratin_chou_fleur", nom: "Gratin de chou-fleur et jambon", type: "four", minutes: 55, emoji: "🧀", ingredients: ["chou_fleur", "jambon", "creme", "fromage_rape"] },

  // Soupes
  { id: "soupe_legumes", nom: "Soupe de légumes et croûtons", type: "soupe", minutes: 40, emoji: "🥣", ingredients: ["carottes", "poireaux", "patates", "pain"] },
  { id: "soupe_potiron", nom: "Soupe de potiron et tartines", type: "soupe", minutes: 40, emoji: "🎃", ingredients: ["potiron", "oignons", "creme", "pain"] },
  { id: "soupe_tomates", nom: "Soupe de tomates au riz (pomidorowa)", type: "soupe", minutes: 30, emoji: "🍅", ingredients: ["sauce_tomate", "riz", "creme", "carottes"] },
  { id: "soupe_poireaux", nom: "Soupe de poireaux et pommes de terre", type: "soupe", minutes: 40, emoji: "🍲", ingredients: ["poireaux", "patates", "creme", "pain"] },
];

const MAX_PAR_TYPE = 2; // pas plus de 2 plats du même type dans la semaine

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

// Tous les mots qui décrivent un plat : son nom, ses ingrédients et leurs "aussi"
function motsDuPlat(plat) {
  const textes = [plat.nom];
  plat.ingredients.forEach((id) => {
    textes.push(INGREDIENTS[id].nom + " " + (INGREDIENTS[id].aussi || ""));
  });
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
  return inconnus.length === 0 && plat.minutes > 0;
}).map((plat) => ({ ...plat, emoji: plat.emoji || "🍴", mots: motsDuPlat(plat) }));

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

// Choisit 7 plats au hasard, sans trop de plats du même type
function composerMenu(compatibles) {
  const melange = melanger(compatibles);
  const menu = [];
  const parType = {};
  melange.forEach((plat) => {
    if (menu.length < 7 && (parType[plat.type] || 0) < MAX_PAR_TYPE) {
      menu.push(plat);
      parType[plat.type] = (parType[plat.type] || 0) + 1;
    }
  });
  // S'il n'y a pas assez de choix, on complète sans cette limite
  melange.forEach((plat) => {
    if (menu.length < 7 && !menu.includes(plat)) menu.push(plat);
  });
  return melanger(menu);
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
// Pour le plat tiré au sort, on donne aussi le plat : le texte commence alors par son nom
function texteDeLaListe(liste, personnes, plat) {
  const SAUT = String.fromCharCode(10); // retour à la ligne
  const texte = [];
  if (plat) {
    texte.push("🍽️ " + TXT.ceSoirTexte + " : " + plat.nom + " (🕒 " + dureeTexte(plat.minutes) + ")", "");
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
      }));
    }
  } catch (erreur) {
    // pas grave : on repart d'une famille vide
  }
  return [{ prenom: "", detestes: "", groupes: [] }];
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
  const debutMenu = useRef(null);
  const debutSurprise = useRef(null);
  const minuteur = useRef(null);

  const interditsActuels = listeDesInterdits(membres);
  const inconnus = motsInconnus([{ detestes: verifie }]);
  // Un plat convient s'il ne contient rien d'interdit et s'il est assez rapide
  const convient = (plat) => platEstOk(plat, interditsActuels) && platEstAssezRapide(plat, tempsMax);
  const platsLibres = menu ? PLATS.filter((plat) => convient(plat) && !menu.some((m) => m.id === plat.id)) : [];
  const liste = menu && menu.length > 0 ? construireListe(menu, personnes) : null;
  const texteListe = liste ? texteDeLaListe(liste, personnes) : "";
  // Le texte envoyé quand on partage le plat tiré au sort (une fois validé)
  const texteSurprise =
    surprise && surprise.valide
      ? texteDeLaListe(construireListe([surprise.plat], personnes), personnes, surprise.plat)
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

  function ajouterMembre() {
    setMembres([...membres, { prenom: "", detestes: "", groupes: [] }]);
    setPersonnes(Math.min(20, personnes + 1));
  }

  function retirerMembre(i) {
    setMembres(membres.filter((_, index) => index !== i));
    setPersonnes(Math.max(1, personnes - 1));
  }

  function changerPersonnes(difference) {
    setPersonnes(Math.min(20, Math.max(1, personnes + difference)));
  }

  function genererMenu() {
    setMenu(composerMenu(PLATS.filter(convient)));
    setTempsDuMenu(tempsMax);
    setCoches({});
    setOuverts({});
    setNumero(numero + 1);
  }

  function changerPlat(i) {
    if (platsLibres.length === 0) return;
    // On évite d'avoir trop de plats du même type
    const autres = menu.filter((_, index) => index !== i);
    const sansExces = platsLibres.filter((p) => autres.filter((a) => a.type === p.type).length < MAX_PAR_TYPE);
    const nouveau = melanger(sansExces.length > 0 ? sansExces : platsLibres)[0];
    setMenu(menu.map((plat, index) => (index === i ? nouveau : plat)));
  }

  // Le bouton "Surprends-moi" : un plat au hasard, avec un petit effet de tirage
  function surprendre() {
    const candidats = PLATS.filter(convient);
    clearInterval(minuteur.current);
    setNumeroSurprise(numeroSurprise + 1);
    if (candidats.length === 0) {
      setSurprise({ vide: true, temps: tempsMax });
      return;
    }
    const precedent = surprise && surprise.plat ? surprise.plat.id : null;
    const choix = candidats.length > 1 ? candidats.filter((p) => p.id !== precedent) : candidats;
    const gagnant = melanger(choix)[0];
    let tour = 0;
    setSurprise({ plat: melanger(candidats)[0], enCours: true });
    minuteur.current = setInterval(() => {
      tour = tour + 1;
      if (tour >= 10) {
        clearInterval(minuteur.current);
        setSurprise({ plat: gagnant, enCours: false });
      } else {
        setSurprise({ plat: melanger(candidats)[0], enCours: true });
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
      setSurprise({ plat: surprise.plat, enCours: false, valide: true });
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
          <button type="button" className="bouton bouton-surprise" onClick={surprendre}>
            {TXT.surprise}
          </button>
          <p className="aide">{TXT.allergie}</p>
        </section>

        {surprise && (
          <section className="carte carte-surprise" ref={debutSurprise}>
            <h2>{TXT.ceSoir}</h2>
            {surprise.vide ? (
              <p className="info">
                {surprise.temps > 0 ? TXT.aucunTemps.replace("{temps}", dureeTexte(surprise.temps)) : TXT.aucunSurprise}
              </p>
            ) : (
              <>
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
                    <ListeIngredients plat={surprise.plat} personnes={personnes} classe="ingredients" />
                  </>
                )}
                {surprise.valide ? (
                  <>
                    <p className="valide" role="status">
                      {TXT.valide}
                    </p>
                    <Partage
                      texte={texteSurprise}
                      titre={TXT.ceSoirTexte + " : " + surprise.plat.nom}
                      libelle={TXT.partagerPlat}
                    />
                  </>
                ) : (
                  <button type="button" className="bouton bouton-principal" disabled={surprise.enCours} onClick={validerSurprise}>
                    {TXT.valider}
                  </button>
                )}
                <button type="button" className="bouton bouton-secondaire" disabled={surprise.enCours} onClick={surprendre}>
                  {TXT.unAutre}
                </button>
              </>
            )}
          </section>
        )}

        {menu && (
          <section className="carte" ref={debutMenu}>
            <h2>{TXT.menu}</h2>
            {menu.length > 0 && <p className="sous-titre">{TXT.prixPour.replace("{n}", libellePersonnes(personnes))}</p>}
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
                  </button>
                  <button type="button" className="changer" disabled={platsLibres.length === 0} onClick={() => changerPlat(i)}>
                    {TXT.changer}
                  </button>
                </div>
                {ouverts[i] && <ListeIngredients plat={plat} personnes={personnes} classe="ingredients jour-ingredients" />}
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