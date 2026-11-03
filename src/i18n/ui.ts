export const languages = {
  it: "IT",
  fr: "FR",
  en: "EN",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "it";

/** The business name as written in titles, social previews and structured data. */
export const siteName = "Kwa Nyuki";

export const locales = Object.keys(languages) as Lang[];

export const ui = {
  en: {
    brand: "KWA NYUKI",
    brandAccent: "HONEY",
    nav: {
      home: "Home",
      farm: "Farm",
      products: "Products",
      news: "News",
      contact: "Contact",
    },
    hero: {
      title: "Honey, crafted with quiet care.",
      subtitle:
        "Small-batch, organic-premium honey from our hives to your table.",
      cta: "Explore the harvest",
    },
    story: {
      title: "Honey from a regenerative Shamba",
      body: "Shamba is a Swahili word for a small field where trees, shrubs and herbs grow together. Kwa Nyuki farms this way, with no synthetic chemicals and many different plants that flower at different times of the year. A habitat made for bees and other pollinators, and the source of our honey.",
      link: "Read the farm journal",
      imageAlt: "Beekeeper in a protective suit working at an open hive, with more hives in a row in the meadow",
    },
    products: {
      title: "Seasonal harvests",
      description: "Kwa Nyuki honey, sold at the farm shop or on request.",
      homeTitle: "The harvest",
      homeLink: "All products",
      empty: "Products will appear here once the apiary updates the catalogue.",
    },
    news: {
      title: "From the meadow",
      description: "The Kwa Nyuki farm journal: the project, the bees and the regenerative Shamba.",
      empty: "No stories yet — check back after the next harvest.",
    },
    contact: {
      title: "Come to the farm.",
      addressLabel: "Address",
      address: "Via delle Api 12, 53024 Montalcino, Italy",
      emailLabel: "Email",
      email: "hello@kwanyuki.com",
      hoursLabel: "Farm shop",
      hours: "Fri–Sun, 10:00–18:00",
      phoneLabel: "Phone",
      directions: "Get directions",
      mapTitle: "Map: how to reach the farm",
      openMap: "Open in Google Maps",
      mapNotice: "Showing the map loads content from Google, which will receive your IP address.",
      mapShow: "Show map",
    },
    untranslated: "Some items aren’t translated yet, so they’re shown in Italian.",
    shop: {
      title: "How to buy",
      intro: "Our honey is sold at the farm shop, or on request: write to us and we’ll tell you what’s available.",
      cta: "Ask for honey",
      emailSubject: "Honey enquiry",
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
    seo: {
      home: "Kwa Nyuki · Honey from a regenerative farm",
      products: "Our honey · Kwa Nyuki",
      farm: "The farm · Kwa Nyuki",
      news: "Farm journal · Kwa Nyuki",
      contact: "Contact and farm shop · Kwa Nyuki",
      privacy: "Privacy policy · Kwa Nyuki",
    },
    a11y: {
      skip: "Skip to content",
      navPrimary: "Main menu",
      navMobile: "Menu",
      languages: "Language",
      videoPause: "Pause video",
      videoPlay: "Play video",
    },
    article: {
      back: "All news",
      next: "Next article",
    },
    legal: {
      vat: "VAT no.",
      privacy: "Privacy",
    },
    notFound: {
      title: "Page not found…",
      cta: "Back to home",
    },
  },
  it: {
    brand: "KWA NYUKI",
    brandAccent: "MIELE",
    nav: {
      home: "Home",
      farm: "Fattoria",
      products: "Prodotti",
      news: "Notizie",
      contact: "Contatti",
    },
    hero: {
      title: "Miele, con cura silenziosa.",
      subtitle:
        "Miele biologico premium, in piccole partite, dalle nostre arnie alla tavola.",
      cta: "Scopri il raccolto",
    },
    story: {
      title: "Il miele di una Shamba rigenerativa",
      body: "Shamba è una parola swahili: indica un piccolo campo dove alberi, arbusti ed erbe crescono insieme. Kwa Nyuki coltiva così, senza prodotti chimici di sintesi e con tante piante diverse che fioriscono in momenti diversi dell’anno. Un ambiente pensato per le api e gli altri impollinatori, da cui nasce il nostro miele.",
      link: "Leggi il diario della fattoria",
      imageAlt: "Apicoltore con la tuta protettiva al lavoro su un’arnia aperta, con altre arnie in fila nel prato",
    },
    products: {
      title: "Raccolti di stagione",
      description: "Il miele di Kwa Nyuki, in vendita nella bottega in fattoria o su richiesta.",
      homeTitle: "Il raccolto",
      homeLink: "Tutti i prodotti",
      empty: "I prodotti appariranno qui quando l’apiario aggiornerà il catalogo.",
    },
    news: {
      title: "Dal prato",
      description: "Il diario della fattoria Kwa Nyuki: il progetto, le api e la Shamba rigenerativa.",
      empty: "Nessuna storia ancora — torna dopo il prossimo raccolto.",
    },
    contact: {
      title: "Vieni in fattoria.",
      addressLabel: "Indirizzo",
      address: "Via delle Api 12, 53024 Montalcino, Italia",
      emailLabel: "Email",
      email: "hello@kwanyuki.com",
      hoursLabel: "Bottega",
      hours: "Ven–Dom, 10:00–18:00",
      phoneLabel: "Telefono",
      directions: "Indicazioni stradali",
      mapTitle: "Mappa: come raggiungere la fattoria",
      openMap: "Apri in Google Maps",
      mapNotice: "Per mostrare la mappa vengono caricati contenuti di Google, che riceverà il vostro indirizzo IP.",
      mapShow: "Mostra la mappa",
    },
    untranslated: "Alcuni contenuti non sono ancora tradotti e sono mostrati in italiano.",
    shop: {
      title: "Come acquistare",
      intro: "Il nostro miele si acquista in bottega, qui in fattoria, oppure su richiesta: scriveteci e vi diciamo cosa è disponibile.",
      cta: "Richiedi il miele",
      emailSubject: "Richiesta miele",
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
    seo: {
      home: "Kwa Nyuki · Miele da una fattoria rigenerativa",
      products: "Il nostro miele · Kwa Nyuki",
      farm: "La fattoria · Kwa Nyuki",
      news: "Diario della fattoria · Kwa Nyuki",
      contact: "Contatti e bottega · Kwa Nyuki",
      privacy: "Privacy · Kwa Nyuki",
    },
    a11y: {
      skip: "Vai al contenuto",
      navPrimary: "Menu principale",
      navMobile: "Menu",
      languages: "Lingua",
      videoPause: "Metti in pausa il video",
      videoPlay: "Riproduci il video",
    },
    article: {
      back: "Tutte le notizie",
      next: "Articolo successivo",
    },
    legal: {
      vat: "P.IVA",
      privacy: "Privacy",
    },
    notFound: {
      title: "Pagina non trovata…",
      cta: "Torna alla home",
    },
  },
  fr: {
    brand: "KWA NYUKI",
    brandAccent: "MIEL",
    nav: {
      home: "Accueil",
      farm: "Ferme",
      products: "Produits",
      news: "Actualités",
      contact: "Contact",
    },
    hero: {
      title: "Le miel, avec un soin tranquille.",
      subtitle:
        "Miel bio premium en petits lots, de nos ruches à votre table.",
      cta: "Découvrir la récolte",
    },
    story: {
      title: "Le miel d’une Shamba régénératrice",
      body: "Shamba est un mot swahili : il désigne un petit champ où arbres, arbustes et herbes poussent ensemble. Kwa Nyuki cultive ainsi, sans produits chimiques de synthèse et avec de nombreuses plantes qui fleurissent à différents moments de l’année. Un milieu pensé pour les abeilles et les autres pollinisateurs, d’où naît notre miel.",
      link: "Lire le journal de la ferme",
      imageAlt: "Apiculteur en combinaison de protection au travail sur une ruche ouverte, d’autres ruches alignées dans le pré",
    },
    products: {
      title: "Récoltes de saison",
      description: "Le miel de Kwa Nyuki, en vente à la boutique de la ferme ou sur demande.",
      homeTitle: "La récolte",
      homeLink: "Tous les produits",
      empty: "Les produits apparaîtront ici lorsque le rucher mettra à jour le catalogue.",
    },
    news: {
      title: "Depuis la prairie",
      description: "Le journal de la ferme Kwa Nyuki : le projet, les abeilles et la Shamba régénératrice.",
      empty: "Pas encore d’histoires — revenez après la prochaine récolte.",
    },
    contact: {
      title: "Venez à la ferme.",
      addressLabel: "Adresse",
      address: "Via delle Api 12, 53024 Montalcino, Italie",
      emailLabel: "Email",
      email: "hello@kwanyuki.com",
      hoursLabel: "Boutique",
      hours: "Ven–Dim, 10:00–18:00",
      phoneLabel: "Téléphone",
      directions: "Itinéraire",
      mapTitle: "Carte : comment rejoindre la ferme",
      openMap: "Ouvrir dans Google Maps",
      mapNotice: "Afficher la carte charge du contenu de Google, qui recevra votre adresse IP.",
      mapShow: "Afficher la carte",
    },
    untranslated: "Certains contenus ne sont pas encore traduits : ils sont affichés en italien.",
    shop: {
      title: "Comment acheter",
      intro: "Notre miel s’achète à la boutique, ici à la ferme, ou sur demande : écrivez-nous et nous vous dirons ce qui est disponible.",
      cta: "Demander du miel",
      emailSubject: "Demande de miel",
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
    seo: {
      home: "Kwa Nyuki · Miel d’une ferme régénératrice",
      products: "Notre miel · Kwa Nyuki",
      farm: "La ferme · Kwa Nyuki",
      news: "Journal de la ferme · Kwa Nyuki",
      contact: "Contact et boutique · Kwa Nyuki",
      privacy: "Confidentialité · Kwa Nyuki",
    },
    a11y: {
      skip: "Aller au contenu",
      navPrimary: "Menu principal",
      navMobile: "Menu",
      languages: "Langue",
      videoPause: "Mettre la vidéo en pause",
      videoPlay: "Lire la vidéo",
    },
    article: {
      back: "Toutes les actualités",
      next: "Article suivant",
    },
    legal: {
      vat: "N° TVA",
      privacy: "Confidentialité",
    },
    notFound: {
      title: "Page introuvable…",
      cta: "Retour à l’accueil",
    },
  },
} as const;
