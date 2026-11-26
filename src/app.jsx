import { useState } from "react";

const PLATS = [
  { nom: "Pâtes à la bolognaise", ingredients: ["pâtes", "viande hachée", "sauce tomate"], tags: ["viande", "pates"] },
  { nom: "Poulet rôti et pommes de terre", ingredients: ["poulet", "pommes de terre"], tags: ["viande"] },
  { nom: "Gratin de courgettes", ingredients: ["courgettes", "crème", "fromage râpé"], tags: ["legumes"] },
  { nom: "Riz sauté aux légumes", ingredients: ["riz", "carottes", "poivrons", "oeufs"], tags: ["legumes", "riz"] },
  { nom: "Omelette et salade", ingredients: ["oeufs", "salade", "tomates"], tags: ["oeufs", "legumes"] },
  { nom: "Saumon et haricots verts", ingredients: ["saumon", "haricots verts", "citron"], tags: ["poisson"] },
  { nom: "Tacos maison", ingredients: ["galettes", "viande hachée", "salade", "fromage râpé"], tags: ["viande"] },
  { nom: "Soupe de légumes et croûtons", ingredients: ["carottes", "poireaux", "pommes de terre", "pain"], tags: ["legumes"] },
  { nom: "Pizza maison", ingredients: ["pâte à pizza", "sauce tomate", "mozzarella", "jambon"], tags: ["pizza", "viande"] },
];

export  function App() {
  const [membres, setMembres] = useState([{ prenom: "", detestes: "" }]);
  const [menu, setMenu] = useState(null);

  function majMembre(i, champ, valeur) {
    const copie = [...membres];
    copie[i][champ] = valeur;
    setMembres(copie);
  }

  function genererMenu() {
    const interdits = membres
      .flatMap((m) => m.detestes.split(","))
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const ok = PLATS.filter(
      (p) => !p.ingredients.some((ing) => interdits.some((x) => ing.includes(x)))
    );
    const melange = [...ok].sort(() => Math.random() - 0.5).slice(0, 7);
    const courses = [...new Set(melange.flatMap((p) => p.ingredients))];
    setMenu({ plats: melange, courses });
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16, fontFamily: "sans-serif" }}>
      <h1>Menus de la semaine</h1>
      <h2>Qui mange à la maison ?</h2>
      {membres.map((m, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <input placeholder="Prénom" value={m.prenom} onChange={(e) => majMembre(i, "prenom", e.target.value)} />
          <input placeholder="Ce qu'il/elle déteste (séparé par des virgules)" value={m.detestes} onChange={(e) => majMembre(i, "detestes", e.target.value)} style={{ width: "100%" }} />
        </div>
      ))}
      <button onClick={() => setMembres([...membres, { prenom: "", detestes: "" }])}>+ Ajouter une personne</button>
      <button onClick={genererMenu} style={{ marginLeft: 8 }}>Générer mon menu</button>

      {menu && (
        <>
          <h2>Menu de la semaine</h2>
          <ol>{menu.plats.map((p) => <li key={p.nom}>{p.nom}</li>)}</ol>
          <h2>Liste de courses</h2>
          <ul>{menu.courses.map((c) => <li key={c}>{c}</li>)}</ul>
        </>
      )}
    </div>
  );
}