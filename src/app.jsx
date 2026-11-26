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
  ajouter: "+ Ajouter une personne",
  retirer: "Retirer cette personne",
  inconnu: "Aucun de nos plats ne contient : {mots}. Vérifie l'orthographe.",
  allergie: "En cas d'allergie, vérifie toujours les étiquettes : cette appli ne remplace pas ce contrôle.",
  generer: "Générer mon menu",
  regenerer: "Générer un autre menu",
  surprise: "🎲 Surprends-moi (un seul repas)",
  ceSoir: "Ce soir, on mange…",
  unAutre: "🎲 Un autre plat",
  aucunSurprise: "Aucun plat ne convient à ces goûts. Essaie avec moins d'exclusions.",
  menu: "Menu de la semaine",
  prixPour: "Prix estimés pour {n}",
  ingredients: "Ingrédients",
  changer: "↻ Changer",
  pasAssez: "Seulement {n} plat(s) conviennent à toute la famille. On en ajoute bientôt !",
  aucun: "Aucun plat ne convient à ces goûts. Essaie avec moins d'exclusions.",
  courses: "Liste de courses",
  pour: "Pour",
  personne: "personne",
  personnes: "personnes",
  moins: "Une personne de moins",
  plus: "Une personne de plus",
  repas: "{n} repas",
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
   aussi = autres mots qui doivent aussi exclure cet ingrédient
           (exemple : "porc" pour le jambon).
------------------------------------------------------------------- */
const RAYONS = ["legumes", "viande", "frais", "epicerie", "pain"]; // l'ordre dans la liste de courses

const INGREDIENTS = {
  // Fruits et légumes
  carottes: { nom: "Carottes", prix: 0.9, rayon: "legumes", aussi: "legume" },
  patates: { nom: "Pommes de terre", prix: 1.4, rayon: "legumes" },
  courgettes: { nom: "Courgettes", prix: 2.0, rayon: "legumes", aussi: "legume" },
  poireaux: { nom: "Poireaux", prix: 2.0, rayon: "legumes", aussi: "legume" },
  haricots_verts: { nom: "Haricots verts", prix: 2.6, rayon: "legumes", aussi: "haricot legume" },
  oignons: { nom: "Oignons", prix: 0.4, rayon: "legumes", aussi: "ognon" },
  tomates: { nom: "Tomates", prix: 2.4, rayon: "legumes" },
  salade: { nom: "Salade", prix: 1.3, rayon: "legumes" },
  poivrons: { nom: "Poivrons", prix: 2.5, rayon: "legumes", aussi: "legume" },
  champignons: { nom: "Champignons", prix: 2.0, rayon: "legumes" },
  epinards: { nom: "Épinards", prix: 2.0, rayon: "legumes", aussi: "legume" },
  brocoli: { nom: "Brocoli", prix: 1.8, rayon: "legumes", aussi: "legume" },
  chou_fleur: { nom: "Chou-fleur", prix: 2.0, rayon: "legumes", aussi: "chou legume" },
  aubergines: { nom: "Aubergines", prix: 2.4, rayon: "legumes", aussi: "legume" },
  petits_pois: { nom: "Petits pois", prix: 1.6, rayon: "legumes", aussi: "legume" },
  endives: { nom: "Endives", prix: 2.5, rayon: "legumes", aussi: "chicon legume" },
  chou: { nom: "Chou blanc", prix: 1.6, rayon: "legumes", aussi: "legume" },
  potiron: { nom: "Potiron", prix: 2.2, rayon: "legumes", aussi: "courge legume" },
  citron: { nom: "Citron", prix: 0.5, rayon: "legumes" },

  // Viandes et poissons
  viande_hachee: { nom: "Viande hachée", prix: 5.9, rayon: "viande", aussi: "viande boeuf" },
  poulet: { nom: "Poulet", prix: 7.0, rayon: "viande", aussi: "viande volaille" },
  jambon: { nom: "Jambon", prix: 2.6, rayon: "viande", aussi: "viande porc" },
  lardons: { nom: "Lardons", prix: 2.2, rayon: "viande", aussi: "viande porc" },
  saucisses: { nom: "Saucisses", prix: 4.0, rayon: "viande", aussi: "viande porc" },
  boeuf: { nom: "Bœuf à braiser", prix: 8.5, rayon: "viande", aussi: "viande" },
  escalopes: { nom: "Escalopes de porc", prix: 5.5, rayon: "viande", aussi: "viande" },
  saumon: { nom: "Saumon", prix: 12.5, rayon: "viande", aussi: "poisson" },
  cabillaud: { nom: "Cabillaud", prix: 11.0, rayon: "viande", aussi: "poisson" },
  crevettes: { nom: "Crevettes", prix: 9.0, rayon: "viande", aussi: "fruits de mer" },
  moules: { nom: "Moules", prix: 9.5, rayon: "viande", aussi: "fruits de mer" },

  // Produits frais
  oeufs: { nom: "Œufs", prix: 2.2, rayon: "frais" },
  creme: { nom: "Crème", prix: 1.2, rayon: "frais", aussi: "laitage lactose" },
  lait: { nom: "Lait", prix: 0.6, rayon: "frais", aussi: "laitage lactose" },
  fromage_rape: { nom: "Fromage râpé", prix: 2.2, rayon: "frais", aussi: "laitage lactose" },
  mozzarella: { nom: "Mozzarella", prix: 1.8, rayon: "frais", aussi: "fromage laitage lactose" },
  parmesan: { nom: "Parmesan", prix: 2.2, rayon: "frais", aussi: "fromage laitage lactose" },
  pierogi: { nom: "Pierogi ruskis", prix: 4.0, rayon: "frais", aussi: "fromage laitage lactose patate" },

  // Épicerie et surgelés
  pates: { nom: "Pâtes", prix: 1.4, rayon: "epicerie", aussi: "pasta spaghetti" },
  riz: { nom: "Riz", prix: 1.4, rayon: "epicerie" },
  nouilles: { nom: "Nouilles", prix: 1.8, rayon: "epicerie" },
  sauce_tomate: { nom: "Sauce tomate", prix: 1.6, rayon: "epicerie" },
  lait_coco: { nom: "Lait de coco", prix: 1.6, rayon: "epicerie" },
  lasagnes: { nom: "Feuilles de lasagnes", prix: 1.5, rayon: "epicerie" },
  pate_pizza: { nom: "Pâte à pizza", prix: 1.8, rayon: "epicerie" },
  pate_brisee: { nom: "Pâte brisée", prix: 1.6, rayon: "epicerie" },
  pesto: { nom: "Pesto", prix: 2.3, rayon: "epicerie", aussi: "basilic" },
  lentilles: { nom: "Lentilles", prix: 1.6, rayon: "epicerie", aussi: "legumineuse" },
  pois_chiches: { nom: "Pois chiches", prix: 1.2, rayon: "epicerie", aussi: "legumineuse" },
  haricots_rouges: { nom: "Haricots rouges", prix: 1.2, rayon: "epicerie", aussi: "haricot legumineuse" },
  tortillas: { nom: "Tortillas", prix: 2.0, rayon: "epicerie", aussi: "wrap galette" },
  frites: { nom: "Frites", prix: 2.5, rayon: "epicerie", aussi: "patate" },
  poisson_pane: { nom: "Poisson pané", prix: 4.2, rayon: "epicerie" },
  thon: { nom: "Thon en boîte", prix: 3.0, rayon: "epicerie", aussi: "poisson" },
  choucroute: { nom: "Choucroute", prix: 2.0, rayon: "epicerie", aussi: "chou" },

  // Pain
  pain: { nom: "Pain", prix: 2.0, rayon: "pain" },
  pain_mie: { nom: "Pain de mie", prix: 1.8, rayon: "pain" },
  pains_burger: { nom: "Pains à burger", prix: 2.2, rayon: "pain" },
};

/* ------------------------------------------------------------------
   3. LES PLATS
   Pour en ajouter un : copie une ligne, change le nom et les ingrédients
   (les ingrédients doivent exister dans la liste du dessus).
   type = sert à varier le menu (pas plus de 2 plats du même type par semaine).
------------------------------------------------------------------- */
const LES_PLATS = [
  // Pâtes
  { id: "bolognaise", nom: "Pâtes à la bolognaise", type: "pates", ingredients: ["pates", "viande_hachee", "sauce_tomate", "oignons"] },
  { id: "carbonara", nom: "Pâtes carbonara", type: "pates", ingredients: ["pates", "lardons", "creme", "parmesan"] },
  { id: "pesto", nom: "Pâtes au pesto et aux tomates", type: "pates", ingredients: ["pates", "pesto", "parmesan", "tomates"] },
  { id: "pates_thon", nom: "Pâtes au thon et à la tomate", type: "pates", ingredients: ["pates", "thon", "sauce_tomate", "oignons"] },
  { id: "gratin_pates", nom: "Gratin de pâtes au jambon", type: "pates", ingredients: ["pates", "jambon", "creme", "fromage_rape"] },
  { id: "pates_courgettes", nom: "Pâtes crémeuses aux courgettes", type: "pates", ingredients: ["pates", "courgettes", "creme", "parmesan"] },
  { id: "wok_poulet", nom: "Wok de poulet et nouilles", type: "pates", ingredients: ["poulet", "nouilles", "carottes", "poivrons"] },

  // Riz
  { id: "curry_poulet", nom: "Curry de poulet et riz", type: "riz", ingredients: ["poulet", "riz", "lait_coco", "carottes", "oignons"] },
  { id: "riz_cantonais", nom: "Riz cantonais", type: "riz", ingredients: ["riz", "oeufs", "petits_pois", "jambon", "carottes"] },
  { id: "risotto", nom: "Risotto aux champignons", type: "riz", ingredients: ["riz", "champignons", "oignons", "parmesan", "creme"] },
  { id: "poulet_creme", nom: "Poulet à la crème, champignons et riz", type: "riz", ingredients: ["poulet", "champignons", "creme", "riz"] },
  { id: "chili", nom: "Chili con carne et riz", type: "riz", ingredients: ["viande_hachee", "haricots_rouges", "sauce_tomate", "riz", "poivrons", "oignons"] },
  { id: "ratatouille", nom: "Ratatouille et riz", type: "riz", ingredients: ["aubergines", "courgettes", "poivrons", "sauce_tomate", "riz"] },
  { id: "riz_saute", nom: "Riz sauté aux légumes", type: "riz", ingredients: ["riz", "carottes", "poivrons", "oeufs"] },

  // Pommes de terre
  { id: "poulet_roti", nom: "Poulet rôti et pommes de terre", type: "patates", ingredients: ["poulet", "patates", "carottes"] },
  { id: "hachis", nom: "Hachis parmentier", type: "patates", ingredients: ["viande_hachee", "patates", "lait", "fromage_rape", "oignons"] },
  { id: "saucisses_puree", nom: "Saucisses, purée et haricots verts", type: "patates", ingredients: ["saucisses", "patates", "lait", "haricots_verts"] },
  { id: "stoemp", nom: "Stoemp aux carottes et saucisses", type: "patates", ingredients: ["patates", "carottes", "poireaux", "saucisses"] },
  { id: "gratin_dauphinois", nom: "Gratin dauphinois et jambon", type: "patates", ingredients: ["patates", "creme", "fromage_rape", "jambon"] },
  { id: "endives_jambon", nom: "Endives au jambon gratinées", type: "patates", ingredients: ["endives", "jambon", "fromage_rape", "patates", "lait"] },
  { id: "escalope", nom: "Escalope panée, pommes de terre et salade", type: "patates", ingredients: ["escalopes", "patates", "salade", "citron"] },
  { id: "placki", nom: "Galettes de pommes de terre (placki)", type: "patates", ingredients: ["patates", "oignons", "oeufs", "creme"] },
  { id: "pdt_lardons", nom: "Pommes de terre sautées, lardons et œufs", type: "patates", ingredients: ["patates", "lardons", "oeufs", "oignons"] },
  { id: "boulets", nom: "Boulets sauce tomate et frites", type: "patates", ingredients: ["viande_hachee", "sauce_tomate", "oignons", "frites"] },
  { id: "burger", nom: "Burgers maison et frites", type: "patates", ingredients: ["pains_burger", "viande_hachee", "fromage_rape", "salade", "tomates", "frites"] },
  { id: "pierogi", nom: "Pierogi ruskis à la crème", type: "patates", ingredients: ["pierogi", "oignons", "creme"] },

  // Viande
  { id: "tacos", nom: "Tacos maison", type: "viande", ingredients: ["tortillas", "viande_hachee", "salade", "fromage_rape", "tomates"] },
  { id: "wraps", nom: "Wraps au poulet et crudités", type: "viande", ingredients: ["tortillas", "poulet", "salade", "tomates"] },
  { id: "golabki", nom: "Choux farcis (gołąbki) sauce tomate", type: "viande", ingredients: ["chou", "viande_hachee", "riz", "sauce_tomate"] },
  { id: "waterzooi", nom: "Waterzooi de poulet", type: "viande", ingredients: ["poulet", "poireaux", "carottes", "patates", "creme"] },
  { id: "carbonade", nom: "Carbonade flamande et frites", type: "viande", ingredients: ["boeuf", "oignons", "frites"] },
  { id: "bigos", nom: "Bigos (choucroute aux saucisses)", type: "viande", ingredients: ["choucroute", "saucisses", "lardons", "oignons"] },
  { id: "nuggets", nom: "Poulet pané et frites", type: "viande", ingredients: ["poulet", "frites", "salade"] },

  // Poisson
  { id: "saumon_haricots", nom: "Saumon, haricots verts et pommes de terre", type: "poisson", ingredients: ["saumon", "haricots_verts", "patates", "citron"] },
  { id: "saumon_riz", nom: "Saumon, riz et brocoli", type: "poisson", ingredients: ["saumon", "riz", "brocoli", "citron"] },
  { id: "cabillaud", nom: "Cabillaud au four et légumes", type: "poisson", ingredients: ["cabillaud", "courgettes", "carottes", "patates", "citron"] },
  { id: "poisson_pane", nom: "Poisson pané et purée", type: "poisson", ingredients: ["poisson_pane", "patates", "lait", "petits_pois"] },
  { id: "moules_frites", nom: "Moules-frites", type: "poisson", ingredients: ["moules", "frites", "oignons", "creme"] },
  { id: "crevettes_riz", nom: "Crevettes sautées et riz", type: "poisson", ingredients: ["crevettes", "riz", "petits_pois", "oignons"] },

  // Sans viande ni poisson
  { id: "omelette", nom: "Omelette au fromage et salade", type: "veggie", ingredients: ["oeufs", "fromage_rape", "salade", "tomates"] },
  { id: "shakshuka", nom: "Shakshuka (œufs à la tomate)", type: "veggie", ingredients: ["oeufs", "sauce_tomate", "poivrons", "oignons", "pain"] },
  { id: "dahl", nom: "Dahl de lentilles et riz", type: "veggie", ingredients: ["lentilles", "lait_coco", "riz", "epinards", "oignons"] },
  { id: "curry_pois_chiches", nom: "Curry de pois chiches et riz", type: "veggie", ingredients: ["pois_chiches", "lait_coco", "riz", "epinards", "sauce_tomate"] },
  { id: "gratin_courgettes", nom: "Gratin de courgettes et pommes de terre", type: "veggie", ingredients: ["courgettes", "patates", "creme", "fromage_rape"] },

  // Au four
  { id: "pizza_jambon", nom: "Pizza maison jambon-mozzarella", type: "four", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "jambon"] },
  { id: "pizza_legumes", nom: "Pizza aux légumes", type: "four", ingredients: ["pate_pizza", "sauce_tomate", "mozzarella", "poivrons", "champignons"] },
  { id: "quiche_lorraine", nom: "Quiche lorraine et salade", type: "four", ingredients: ["pate_brisee", "lardons", "oeufs", "creme", "salade"] },
  { id: "quiche_legumes", nom: "Quiche aux légumes", type: "four", ingredients: ["pate_brisee", "oeufs", "creme", "courgettes", "fromage_rape"] },
  { id: "lasagnes", nom: "Lasagnes à la bolognaise", type: "four", ingredients: ["lasagnes", "viande_hachee", "sauce_tomate", "fromage_rape", "oignons"] },
  { id: "croque", nom: "Croque-monsieur et salade", type: "four", ingredients: ["pain_mie", "jambon", "fromage_rape", "salade"] },
  { id: "gratin_chou_fleur", nom: "Gratin de chou-fleur et jambon", type: "four", ingredients: ["chou_fleur", "jambon", "creme", "fromage_rape"] },

  // Soupes
  { id: "soupe_legumes", nom: "Soupe de légumes et croûtons", type: "soupe", ingredients: ["carottes", "poireaux", "patates", "pain"] },
  { id: "soupe_potiron", nom: "Soupe de potiron et tartines", type: "soupe", ingredients: ["potiron", "oignons", "creme", "pain"] },
  { id: "soupe_tomates", nom: "Soupe de tomates au riz (pomidorowa)", type: "soupe", ingredients: ["sauce_tomate", "riz", "creme", "carottes"] },
  { id: "soupe_poireaux", nom: "Soupe de poireaux et pommes de terre", type: "soupe", ingredients: ["poireaux", "patates", "creme", "pain"] },
];

const MAX_PAR_TYPE = 2; // pas plus de 2 plats du même type dans la semaine

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

// On garde les plats dont tous les ingrédients existent, et on prépare leurs mots
const PLATS = LES_PLATS.filter((plat) => {
  const inconnus = plat.ingredients.filter((id) => !INGREDIENTS[id]);
  if (inconnus.length > 0) {
    console.warn("Plat ignoré (" + plat.nom + ") : ingrédient inconnu : " + inconnus.join(", "));
  }
  return inconnus.length === 0;
}).map((plat) => ({ ...plat, mots: motsDuPlat(plat) }));

// Tous les mots que l'appli connaît (pour repérer les fautes de frappe)
const MOTS_CONNUS = new Set(PLATS.flatMap((plat) => plat.mots));

// Tous les mots à éviter, pour toute la famille
function listeDesInterdits(membres) {
  return membres.flatMap((m) => motsDe(m.detestes));
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

function prixDuPlat(plat, personnes) {
  const pour4 = plat.ingredients.reduce((somme, id) => somme + INGREDIENTS[id].prix, 0);
  return prixEnCentimes(pour4, personnes);
}

function libellePersonnes(n) {
  return n + " " + (n > 1 ? TXT.personnes : TXT.personne);
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
      centimes: prixEnCentimes(INGREDIENTS[id].prix * nombre[id], personnes),
    }))
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
  const total = lignes.reduce((somme, ligne) => somme + ligne.centimes, 0);
  return { lignes: lignes, total: total };
}

// Le texte envoyé quand on partage la liste (WhatsApp, SMS, e-mail...)
function texteDeLaListe(liste, personnes) {
  const SAUT = String.fromCharCode(10); // retour à la ligne
  const texte = ["🛒 " + TXT.partagerTitre + " (" + libellePersonnes(personnes) + ")", ""];
  RAYONS.forEach((rayon) => {
    const lignes = liste.lignes.filter((l) => l.rayon === rayon);
    if (lignes.length === 0) return;
    texte.push(TXT.rayons[rayon]);
    lignes.forEach((l) => {
      const repas = l.repas > 1 ? " (" + TXT.repas.replace("{n}", l.repas) + ")" : "";
      texte.push("- " + l.nom + repas + " : " + prixTexte(l.centimes));
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
      return donnees;
    }
  } catch (erreur) {
    // pas grave : on repart d'une famille vide
  }
  return [{ prenom: "", detestes: "" }];
}

// ===== L'APPLICATION =====
export function App() {
  const [membres, setMembres] = useState(lireFamille);
  const [personnes, setPersonnes] = useState(membres.length); // pour le calcul des prix
  const [menu, setMenu] = useState(null); // la liste des plats de la semaine
  const [coches, setCoches] = useState({}); // les ingrédients déjà cochés
  const [numero, setNumero] = useState(0); // compte les menus générés
  const [surprise, setSurprise] = useState(null); // le plat tiré au sort
  const [numeroSurprise, setNumeroSurprise] = useState(0);
  const [panneau, setPanneau] = useState(false); // le panneau de partage est-il ouvert ?
  const [etatCopie, setEtatCopie] = useState(null); // null, "ok" ou "echec"
  const [verifie, setVerifie] = useState(""); // ce qui a été tapé, une fois la frappe terminée
  const [ouverts, setOuverts] = useState({}); // les plats dont on voit les ingrédients (par jour)
  const debutMenu = useRef(null);
  const debutSurprise = useRef(null);
  const debutPanneau = useRef(null);
  const minuteur = useRef(null);

  const interditsActuels = listeDesInterdits(membres);
  const inconnus = motsInconnus([{ detestes: verifie }]);
  const platsLibres = menu
    ? PLATS.filter((plat) => platEstOk(plat, interditsActuels) && !menu.some((m) => m.id === plat.id))
    : [];
  const liste = menu && menu.length > 0 ? construireListe(menu, personnes) : null;
  const texteListe = liste ? texteDeLaListe(liste, personnes) : "";

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

  // Quand on ouvre le panneau de partage, on le fait apparaître à l'écran
  useEffect(() => {
    if (panneau && debutPanneau.current) {
      debutPanneau.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [panneau]);

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

  // Quand la liste change, le message "copié" n'est plus vrai
  useEffect(() => {
    setEtatCopie(null);
  }, [texteListe]);

  function majMembre(i, champ, valeur) {
    setMembres(membres.map((m, index) => (index === i ? { ...m, [champ]: valeur } : m)));
  }

  function ajouterMembre() {
    setMembres([...membres, { prenom: "", detestes: "" }]);
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
    const compatibles = PLATS.filter((plat) => platEstOk(plat, interditsActuels));
    setMenu(composerMenu(compatibles));
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
    const candidats = PLATS.filter((plat) => platEstOk(plat, interditsActuels));
    clearInterval(minuteur.current);
    setNumeroSurprise(numeroSurprise + 1);
    if (candidats.length === 0) {
      setSurprise({ vide: true });
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

  // Le bouton "Partager" : sur téléphone, il ouvre le partage habituel (WhatsApp, SMS...)
  async function partager() {
    if (navigator.share) {
      try {
        await navigator.share({ title: TXT.partagerTitre, text: texteListe });
        return;
      } catch (erreur) {
        if (erreur && erreur.name === "AbortError") return; // la personne a simplement fermé la fenêtre
      }
    }
    setPanneau(true); // sinon, on affiche nos propres boutons
  }

  async function copier() {
    try {
      await navigator.clipboard.writeText(texteListe);
      setEtatCopie("ok");
    } catch (erreur) {
      setEtatCopie("echec");
    }
  }

  const liens = {
    whatsapp: "https://wa.me/?text=" + encodeURIComponent(texteListe),
    sms: "sms:?&body=" + encodeURIComponent(texteListe),
    email: "mailto:?subject=" + encodeURIComponent(TXT.partagerTitre) + "&body=" + encodeURIComponent(texteListe),
  };

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
              <p className="info">{TXT.aucunSurprise}</p>
            ) : (
              <>
                <div className={surprise.enCours ? "surprise-nom tourne" : "surprise-nom"}>{surprise.plat.nom}</div>
                {!surprise.enCours && (
                  <>
                    <p className="surprise-prix">
                      {prixTexte(prixDuPlat(surprise.plat, personnes)) + " · " + libellePersonnes(personnes)}
                    </p>
                    <ul className="ingredients">
                      {surprise.plat.ingredients.map((id) => (
                        <li key={id}>{INGREDIENTS[id].nom}</li>
                      ))}
                    </ul>
                  </>
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
            {menu.length === 0 && <p className="info">{TXT.aucun}</p>}
            {menu.length > 0 && menu.length < 7 && <p className="info">{TXT.pasAssez.replace("{n}", menu.length)}</p>}
            {menu.map((plat, i) => (
              <div className="jour" key={plat.id}>
                <div className="jour-ligne">
                  <div className="pastille">{TXT.jours[i].slice(0, 3)}</div>
                  <button type="button" className="jour-texte" aria-expanded={ouverts[i] ? "true" : "false"} onClick={() => basculer(i)}>
                    <span className="jour-nom">{plat.nom}</span>
                    <span className="jour-sous">
                      <span className="jour-prix">{"≈ " + prixTexte(prixDuPlat(plat, personnes))}</span>
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
                {ouverts[i] && (
                  <ul className="ingredients jour-ingredients" aria-label={TXT.ingredients}>
                    {plat.ingredients.map((id) => (
                      <li key={id}>{INGREDIENTS[id].nom}</li>
                    ))}
                  </ul>
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
                        {l.repas > 1 && <small>{TXT.repas.replace("{n}", l.repas)}</small>}
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

            <button type="button" className="bouton bouton-principal" onClick={partager}>
              {TXT.partager}
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
                    <textarea readOnly rows={8} value={texteListe} onFocus={(e) => e.target.select()} />
                  </>
                )}
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}