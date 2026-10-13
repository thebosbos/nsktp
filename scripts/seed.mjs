// One-time (safe to re-run) seed script.
// Usage: npm run seed   (reads .env.local via `node --env-file`)
// Content collections are replaced so a rebrand can refresh the live CMS data.
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI. Fill it in .env.local first.");
  process.exit(1);
}

const projects = [
  {
    title: "Réhabilitation de voirie — Kadiria",
    category: "Voirie & routes",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&auto=format&fit=crop&q=80",
    description:
      "Reprise de chaussée, couches de forme, enrobés et signalisation horizontale sur un axe urbain.",
    results: [
      { value: "2,4 km", label: "Linéaire traité" },
      { value: "Délai", label: "Respecté" },
    ],
    order: 1,
  },
  {
    title: "VRD d'un lotissement",
    category: "Terrassement & VRD",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
    description:
      "Terrassements, plateformes, réseaux secs et humides, et voirie interne pour un lotissement.",
    results: [
      { value: "12 ha", label: "Surface aménagée" },
      { value: "VRD", label: "Complets" },
    ],
    order: 2,
  },
  {
    title: "Réseau d'assainissement — centre-ville",
    category: "Assainissement & réseaux",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80",
    description:
      "Pose de collecteurs, regards, raccordements et récolement. Maintien de la circulation pendant les travaux.",
    results: [
      { value: "3,1 km", label: "Réseau posé" },
      { value: "0", label: "Coupure longue" },
    ],
    order: 3,
  },
  {
    title: "Murs de soutènement et dalots",
    category: "Génie civil",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80",
    description:
      "Ouvrages en béton armé : murs de soutènement, dalots et têtes d'aqueduc le long d'une déviation.",
    results: [
      { value: "850 m³", label: "Béton coulé" },
      { value: "Réception", label: "Sans réserve" },
    ],
    order: 4,
  },
  {
    title: "Plateforme logistique",
    category: "Terrassement & VRD",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80",
    description:
      "Déblais-remblais, compactage, voirie lourde et assainissement pluvial d'une plateforme industrielle.",
    results: [
      { value: "6 ha", label: "Plateforme" },
      { value: "PL", label: "Trafic lourd" },
    ],
    order: 5,
  },
  {
    title: "Aménagement d'un giratoire",
    category: "Voirie & routes",
    image:
      "https://images.unsplash.com/photo-1473445730015-841f29a9490b?w=800&auto=format&fit=crop&q=80",
    description:
      "Création d'un carrefour giratoire, îlots, bordures, enrobés et signalisation verticale.",
    results: [
      { value: "1", label: "Giratoire livré" },
      { value: "Sécurité", label: "Améliorée" },
    ],
    order: 6,
  },
];

const services = [
  {
    slug: "voirie",
    badge: "Métier 01",
    title: "Voirie & routes",
    problem:
      "Une chaussée dégradée, un axe saturé ou un nouveau tracé demandent un dimensionnement juste, une exécution soignée et une gestion de la circulation pendant les travaux.",
    solutionIntro: "Nous réalisons la création et la réhabilitation de voiries urbaines et extra-urbaines :",
    features: [
      "Terrassements et couches de forme",
      "Structures de chaussée et enrobés",
      "Bordures, trottoirs et accotements",
      "Signalisation horizontale et verticale",
      "Giratoires, carrefours et aménagements urbains",
    ],
    methodology: [
      { title: "Étude & implantation", text: "Lecture des plans, piquetage et phasage chantier" },
      { title: "Exécution", text: "Mise en œuvre des couches, compactage et nivellement" },
      { title: "Réception", text: "Contrôles, signalisation et remise en service" },
    ],
    benefits: [
      { highlight: "Durabilité", text: "structures adaptées au trafic" },
      { highlight: "Sécurité", text: "usagers et riverains protégés" },
      { highlight: "Délais", text: "phasage pour limiter les coupures" },
    ],
    ctaText: "Demander un devis voirie",
    order: 1,
  },
  {
    slug: "vrd",
    badge: "Métier 02",
    title: "Terrassement & VRD",
    problem:
      "Un projet immobilier ou industriel ne démarre pas sans plateformes stables, réseaux bien posés et voiries internes dimensionnées.",
    solutionIntro: "Nous prenons en charge le lot VRD de A à Z :",
    features: [
      "Déblais, remblais et compactage",
      "Plateformes de bâtiments et voiries internes",
      "Réseaux secs et humides",
      "Assainissement pluvial et noues",
      "Espaces publics et parkings",
    ],
    methodology: [
      { title: "Préparation", text: "Installation de chantier, piquetage, coordination concessionnaires" },
      { title: "Terrassement", text: "Mouvements de terres et portance des plateformes" },
      { title: "Réseaux & voirie", text: "Pose, contrôles et couche de roulement" },
    ],
    benefits: [
      { highlight: "Un lot", text: "un seul interlocuteur VRD" },
      { highlight: "Portance", text: "contrôles de compactage" },
      { highlight: "Planning", text: "enchaînement des corps d'état" },
    ],
    ctaText: "Étudier mon lot VRD",
    order: 2,
  },
  {
    slug: "genie-civil",
    badge: "Métier 03",
    title: "Génie civil",
    problem:
      "Ouvrages en béton, dalots, murs de soutènement ou têtes d'aqueduc : sans exécution rigoureuse, la stabilité et la durabilité sont en jeu.",
    solutionIntro: "Nous exécutons les ouvrages de génie civil liés à la voirie et aux réseaux :",
    features: [
      "Murs de soutènement",
      "Dalots, buses et têtes d'ouvrages",
      "Ouvrages en béton armé",
      "Fondations et massifs",
      "Petits ouvrages d'art",
    ],
    methodology: [
      { title: "Coffrage", text: "Implantation, ferraillage et contrôles avant coulage" },
      { title: "Béton", text: "Coulage, cure et décoffrage selon prescriptions" },
      { title: "Finition", text: "Remblais autour des ouvrages et raccordements" },
    ],
    benefits: [
      { highlight: "Rigueur", text: "plans d'exécution suivis" },
      { highlight: "Qualité", text: "béton et ferraillage contrôlés" },
      { highlight: "Intégration", text: "ouvrages liés à la voirie" },
    ],
    ctaText: "Parler d'un ouvrage",
    order: 3,
  },
  {
    slug: "reseaux",
    badge: "Métier 04",
    title: "Assainissement & réseaux",
    problem:
      "Un réseau mal calé, mal jointé ou mal récolementé génère infiltrations, désordres de chaussée et litiges à la réception.",
    solutionIntro: "Nous posons et réhabilitons les réseaux d'eau, d'assainissement et de drainage :",
    features: [
      "Collecteurs EU / EP",
      "Regards, branchements et raccordements",
      "Adduction d'eau potable",
      "Drainage et fossés",
      "Récolements et essais",
    ],
    methodology: [
      { title: "Tranchées", text: "Ouverture, blindage et gestion des déblais" },
      { title: "Pose", text: "Calage, joints, enrobage et compactage" },
      { title: "Contrôles", text: "Tests d'étanchéité, inspections et récolement" },
    ],
    benefits: [
      { highlight: "Étanchéité", text: "essais avant remblai" },
      { highlight: "Traçabilité", text: "plans de récolement" },
      { highlight: "Circulation", text: "phasage en site occupé" },
    ],
    ctaText: "Demander un devis réseaux",
    order: 4,
  },
];

const stats = [
  { group: "home", value: "120+", label: "Chantiers réalisés", order: 1 },
  { group: "home", value: "Qualité", label: "Contrôles chantier", order: 2 },
  { group: "home", value: "15+", label: "Années d'expérience", order: 3 },
  { group: "home", value: "Terrain", label: "Équipes dédiées", order: 4 },

  { group: "projects", value: "120+", label: "Chantiers réalisés", order: 1 },
  { group: "projects", value: "98%", label: "Réceptions validées", order: 2 },
  { group: "projects", value: "km", label: "de voirie livrée", order: 3 },
  { group: "projects", value: "VRD", label: "Lots complets", order: 4 },

  { group: "team", value: "40+", label: "Collaborateurs chantier", order: 1 },
  { group: "team", value: "15+", label: "Années d'expérience moyenne", order: 2 },
  { group: "team", value: "100%", label: "Encadrement présent", order: 3 },
];

const features = [
  {
    title: "Maîtrise de chantier",
    text: "Planning, phasage et coordination : un conducteur de travaux dédié jusqu'à la réception.",
    order: 1,
  },
  {
    title: "Moyens adaptés",
    text: "Engins, équipes et partenaires dimensionnés pour la voirie, le VRD et le génie civil.",
    order: 2,
  },
  {
    title: "Qualité d'exécution",
    text: "Contrôles de compactage, nivellement et récolements pour des ouvrages durables.",
    order: 3,
  },
  {
    title: "Présence locale",
    text: "Ancrage à Kadiria, réactivité terrain et connaissance des contraintes locales.",
    order: 4,
  },
];

const siteSettings = {
  key: "site",
  email: "slaheldinenciri@slaheddinensktp.me",
  hoursWeekdays: "8h00 - 17h00",
  hoursEmergency: "Astreinte chantier",
  zonesText:
    "Kadiria et wilaya de Bouira. Interventions sur tout le territoire selon les marchés.",
  copyrightText: "NSKTP — NCIRI Slaheddine Kadiria",
};

async function main() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  const projectsCol = db.collection("projects");
  const servicesCol = db.collection("services");
  const statsCol = db.collection("stats");
  const featuresCol = db.collection("features");
  const settingsCol = db.collection("settings");
  const usersCol = db.collection("users");

  const now = new Date();
  await projectsCol.deleteMany({});
  await projectsCol.insertMany(projects.map((p) => ({ ...p, createdAt: now, updatedAt: now })));
  console.log(`Replaced projects with ${projects.length} items.`);

  await servicesCol.deleteMany({});
  await servicesCol.insertMany(services);
  console.log(`Replaced services with ${services.length} items.`);

  await statsCol.deleteMany({});
  await statsCol.insertMany(stats);
  console.log(`Replaced stats with ${stats.length} items.`);

  await featuresCol.deleteMany({});
  await featuresCol.insertMany(features);
  console.log(`Replaced features with ${features.length} items.`);

  await settingsCol.updateOne(
    { key: "site" },
    { $set: siteSettings, $unset: { phone: "" } },
    { upsert: true }
  );
  console.log("Upserted site settings.");

  const adminEmail = (process.env.SEED_ADMIN_EMAIL || "").toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  const adminName = process.env.SEED_ADMIN_NAME || "Admin";

  if (adminEmail && adminPassword) {
    const existing = await usersCol.findOne({ email: adminEmail });
    if (!existing) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await usersCol.insertOne({
        name: adminName,
        email: adminEmail,
        passwordHash,
        createdAt: new Date(),
      });
      console.log(`Created admin user ${adminEmail}.`);
    } else {
      console.log(`Admin user ${adminEmail} already exists, skipping.`);
    }
  } else {
    console.log("SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD not set, skipping admin creation.");
  }

  await client.close();
  console.log("Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
