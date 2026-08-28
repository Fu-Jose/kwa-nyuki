export const languages = {
  it: "IT",
  fr: "FR",
  en: "EN",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "it";

export const locales = Object.keys(languages) as Lang[];

export const ui = {
  en: {
    brand: "KWA NYUKI",
    brandAccent: "HONEY",
    nav: {
      home: "Home",
      products: "Products",
      news: "News",
      contact: "Contact",
    },
    hero: {
      kicker: "Family-owned bee farm",
      title: "Honey, crafted with quiet care.",
      subtitle:
        "Small-batch, organic-premium honey from our hives to your table.",
      cta: "Explore the harvest",
    },
    story: {
      kicker: "Our story",
      title: "A heritage kept in the hive.",
      body: "Kwa Nyuki is a family farm devoted to bees, land, and time. We harvest slowly, bottle with intention, and protect the wild edges where our colonies thrive.",
    },
    products: {
      kicker: "The pantry",
      title: "Seasonal harvests",
      empty: "Products will appear here once the apiary updates the catalogue.",
    },
    news: {
      kicker: "Journal",
      title: "From the meadow",
      empty: "No stories yet — check back after the next harvest.",
    },
    contact: {
      kicker: "Visit",
      title: "Come to the farm.",
      addressLabel: "Address",
      address: "Via delle Api 12, 53024 Montalcino, Italy",
      emailLabel: "Email",
      email: "hello@kwanyuki.com",
      hoursLabel: "Farm shop",
      hours: "Fri–Sun, 10:00–18:00",
    },
    footer: {
      rights: "All rights reserved.",
      note: "Boutique honey from a family hive.",
    },
    theme: {
      light: "Light mode",
      dark: "Dark mode",
    },
    menu: {
      open: "Open menu",
      close: "Close menu",
    },
    notFound: {
      kicker: "404",
      title: "Page not found…",
      cta: "Back to home",
    },
  },
  it: {
    brand: "KWA NYUKI",
    brandAccent: "MIELE",
    nav: {
      home: "Home",
      products: "Prodotti",
      news: "Notizie",
      contact: "Contatti",
    },
    hero: {
      kicker: "Azienda apistica di famiglia",
      title: "Miele, con cura silenziosa.",
      subtitle:
        "Miele biologico premium, in piccole partite, dalle nostre arnie alla tavola.",
      cta: "Scopri il raccolto",
    },
    story: {
      kicker: "La nostra storia",
      title: "Un’eredità custodita nell’alveare.",
      body: "Kwa Nyuki è una fattoria di famiglia dedicata alle api, alla terra e al tempo. Raccogliamo con lentezza, imbottigliamo con intenzione e proteggiamo i margini selvatici dove le colonie prosperano.",
    },
    products: {
      kicker: "La dispensa",
      title: "Raccolti di stagione",
      empty: "I prodotti appariranno qui quando l’apiario aggiornerà il catalogo.",
    },
    news: {
      kicker: "Diario",
      title: "Dal prato",
      empty: "Nessuna storia ancora — torna dopo il prossimo raccolto.",
    },
    contact: {
      kicker: "Visita",
      title: "Vieni in fattoria.",
      addressLabel: "Indirizzo",
      address: "Via delle Api 12, 53024 Montalcino, Italia",
      emailLabel: "Email",
      email: "hello@kwanyuki.com",
      hoursLabel: "Bottega",
      hours: "Ven–Dom, 10:00–18:00",
    },
    footer: {
      rights: "Tutti i diritti riservati.",
      note: "Miele boutique da un alveare di famiglia.",
    },
    theme: {
      light: "Modalità chiara",
      dark: "Modalità scura",
    },
    menu: {
      open: "Apri menu",
      close: "Chiudi menu",
    },
    notFound: {
      kicker: "404",
      title: "Pagina non trovata…",
      cta: "Torna alla home",
    },
  },
  fr: {
    brand: "KWA NYUKI",
    brandAccent: "MIEL",
    nav: {
      home: "Accueil",
      products: "Produits",
      news: "Actualités",
      contact: "Contact",
    },
    hero: {
      kicker: "Ferme apicole familiale",
      title: "Le miel, avec un soin tranquille.",
      subtitle:
        "Miel bio premium en petits lots, de nos ruches à votre table.",
      cta: "Découvrir la récolte",
    },
    story: {
      kicker: "Notre histoire",
      title: "Un héritage gardé dans la ruche.",
      body: "Kwa Nyuki est une ferme familiale dédiée aux abeilles, à la terre et au temps. Nous récoltons lentement, mettons en pot avec intention, et protégeons les lisières sauvages où nos colonies s’épanouissent.",
    },
    products: {
      kicker: "Le cellier",
      title: "Récoltes de saison",
      empty: "Les produits apparaîtront ici lorsque le rucher mettra à jour le catalogue.",
    },
    news: {
      kicker: "Journal",
      title: "Depuis la prairie",
      empty: "Pas encore d’histoires — revenez après la prochaine récolte.",
    },
    contact: {
      kicker: "Visite",
      title: "Venez à la ferme.",
      addressLabel: "Adresse",
      address: "Via delle Api 12, 53024 Montalcino, Italie",
      emailLabel: "Email",
      email: "hello@kwanyuki.com",
      hoursLabel: "Boutique",
      hours: "Ven–Dim, 10:00–18:00",
    },
    footer: {
      rights: "Tous droits réservés.",
      note: "Miel boutique d’une ruche familiale.",
    },
    theme: {
      light: "Mode clair",
      dark: "Mode sombre",
    },
    menu: {
      open: "Ouvrir le menu",
      close: "Fermer le menu",
    },
    notFound: {
      kicker: "404",
      title: "Page introuvable…",
      cta: "Retour à l’accueil",
    },
  },
} as const;
