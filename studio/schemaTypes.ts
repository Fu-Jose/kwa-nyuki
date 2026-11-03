import { defineField, defineType } from "sanity";
import { ui } from "../src/i18n/ui";

// Field titles and descriptions are written for the client (Italian, non-technical):
// each one says where it shows on the site and which file format it expects.
// Button names quoted here ("Pubblica", "Genera", "Carica", "Translations") match the
// Studio's Italian UI from @sanity/locale-it-it — keep them in sync if that changes.

// Shown in the Studio only (document lists, "new document" menu); ids match the site's locales.
export const LANGUAGES = [
  { id: "it", title: "Italiano" },
  { id: "fr", title: "Francese" },
  { id: "en", title: "Inglese" },
];

// Pages whose Google title the client can override; the defaults come from src/i18n/ui.ts (seo.*).
const SEO_PAGES = [
  { name: "home", title: "Home", where: "Home (quella con il video)" },
  { name: "products", title: "Prodotti", where: "Prodotti" },
  { name: "news", title: "Notizie", where: "Notizie (l'elenco degli articoli)" },
  { name: "contact", title: "Contatti", where: "Contatti" },
] as const;

const languageLabel = (language?: string) =>
  LANGUAGES.find(({ id }) => id === language)?.title ?? "Lingua non impostata";

// The site uses the original file (asset URL) and crops it itself, so the Studio's crop
// tool would have no effect: photo fields deliberately leave `hotspot` off.
const PHOTO_FORMATS = "image/jpeg,image/png,image/webp";
const PHOTO_FORMAT_HINT =
  "Formato JPG o PNG. Dal telefono: se il file non si carica, inviate prima la foto a voi stessi via email o WhatsApp e caricate quella.";

const MAX_VIDEO_MB = 20;

const photoAltField = defineField({
  name: "alt",
  title: "Descrizione della foto",
  description:
    "Descrivete con parole semplici cosa si vede, ad esempio: «Vasetto di miele di castagno su un tavolo di legno». Non compare sul sito: la leggono i programmi per persone non vedenti e Google.",
  type: "string",
});

const languageField = defineField({
  name: "language",
  type: "string",
  readOnly: true,
  hidden: true,
});

export const product = defineType({
  name: "product",
  title: "Prodotto",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "title",
      title: "Nome del prodotto",
      description: "Il nome in grande sulla scheda, nella pagina Prodotti. Esempio: «Miele di acacia».",
      type: "string",
      validation: (Rule) => [
        Rule.required().error("Scrivete il nome del prodotto."),
        Rule.max(60).warning("Nome lungo: sulla scheda potrebbe andare su più righe."),
      ],
    }),
    // Products have no page of their own yet, so this address is not used anywhere.
    // Hidden (and optional) so it does not ask the client for a step that does nothing;
    // show it again and make it required once product pages exist.
    defineField({
      name: "slug",
      title: "Indirizzo della pagina",
      type: "slug",
      options: { source: "title", documentInternationalization: { exclude: true } },
      hidden: true,
    }),
    defineField({
      name: "excerpt",
      title: "Descrizione breve",
      description:
        "Due o tre righe sotto il nome, sulla scheda prodotto. Raccontate sapore, profumo o periodo di raccolta.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(200).warning("Testo lungo: sulla scheda ne bastano due o tre righe."),
    }),
    defineField({
      name: "price",
      title: "Prezzo",
      description:
        "Scrivete solo il numero, ad esempio 18 oppure 18,50: il simbolo € si aggiunge da solo. Si vede sulla scheda, accanto al formato. Lasciate vuoto per non mostrare il prezzo.",
      type: "string",
    }),
    defineField({
      name: "format",
      title: "Formato",
      description:
        "Il peso o la confezione a cui si riferisce il prezzo, ad esempio «250 g», «500 g» o «Favo intero». Si vede sulla scheda, accanto al prezzo. Lasciate vuoto se non serve.",
      type: "string",
      validation: (Rule) => Rule.max(30).warning("Testo lungo: bastano poche parole, ad esempio «500 g»."),
    }),
    defineField({
      name: "image",
      title: "Foto",
      description: `La foto della scheda prodotto. La scheda è più alta che larga: una foto orizzontale viene tagliata ai lati, quindi tenete il vasetto al centro. Almeno 800×1000 pixel. ${PHOTO_FORMAT_HINT}`,
      type: "image",
      options: { accept: PHOTO_FORMATS },
      fields: [photoAltField],
      validation: (Rule) => Rule.required().error("Caricate una foto del prodotto."),
    }),
  ],
  preview: {
    select: { title: "title", language: "language", format: "format", price: "price", media: "image" },
    prepare: ({ title, language, format, price, media }) => ({
      title,
      subtitle: [languageLabel(language), format, price].filter(Boolean).join(" · "),
      media,
    }),
  },
});

export const news = defineType({
  name: "news",
  title: "Notizia",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "title",
      title: "Titolo",
      description:
        "Il titolo della notizia: si vede nell'elenco Notizie, in cima all'articolo e nei risultati di Google. Meglio restare sotto i 60 caratteri.",
      type: "string",
      validation: (Rule) => [
        Rule.required().error("Scrivete il titolo della notizia."),
        Rule.max(70).warning("Titolo lungo: Google potrebbe tagliarlo nei risultati di ricerca."),
      ],
    }),
    defineField({
      name: "slug",
      title: "Indirizzo della pagina",
      description:
        "L'indirizzo web dell'articolo, creato a partire dal titolo. Dopo aver scritto il titolo premete «Genera». Va generato di nuovo in ogni lingua. Dopo la pubblicazione non cambiatelo: chi ha condiviso il vecchio indirizzo troverebbe una pagina di errore.",
      type: "slug",
      options: { source: "title", documentInternationalization: { exclude: true } },
      validation: (Rule) =>
        Rule.required().error("Premete «Genera» per creare l'indirizzo della pagina."),
    }),
    defineField({
      name: "excerpt",
      title: "Riassunto",
      description:
        "Due o tre frasi che invogliano a leggere. Si vede nell'elenco Notizie, nei risultati di Google e nell'anteprima quando l'articolo viene condiviso su WhatsApp o Facebook. Meglio restare sotto i 160 caratteri.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning("Riassunto lungo: Google e WhatsApp potrebbero tagliarlo."),
    }),
    defineField({
      name: "publishedAt",
      title: "Data di pubblicazione",
      description:
        "La data che si vede sopra il titolo. Le notizie sono in ordine di data: la più recente è in cima. Si compila da sola con la data di oggi, ma potete cambiarla.",
      type: "datetime",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm" },
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("Indicate la data della notizia."),
    }),
    defineField({
      name: "image",
      title: "Foto di copertina",
      description: `La foto nell'elenco Notizie e in grande in cima all'articolo. Meglio orizzontale, larga almeno 1600 pixel. ${PHOTO_FORMAT_HINT}`,
      type: "image",
      options: { accept: PHOTO_FORMATS },
      fields: [photoAltField],
      validation: (Rule) => Rule.required().error("Caricate una foto di copertina."),
    }),
    defineField({
      name: "body",
      title: "Testo dell'articolo",
      description:
        "Il testo completo, che si legge dopo aver aperto la notizia. Per andare a capo premete Invio; per separare due paragrafi lasciate una riga vuota. Grassetto, titoletti e video non sono ancora disponibili in questo campo.",
      type: "text",
      rows: 12,
    }),
  ],
  preview: {
    select: { title: "title", language: "language", date: "publishedAt", media: "image" },
    prepare: ({ title, language, date, media }) => ({
      title,
      subtitle: [languageLabel(language), date && new Date(date).toLocaleDateString("it-IT")]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});

// One per language, like products and news. Every field is optional: an empty field keeps
// the site's built-in text or photo, so the client can experiment without breaking the page.
export const home = defineType({
  name: "home",
  title: "Pagina Home",
  type: "document",
  fieldsets: [
    { name: "hero", title: "In cima alla pagina, sopra il video" },
    { name: "story", title: "Il racconto della fattoria" },
  ],
  fields: [
    languageField,
    defineField({
      name: "heroTitle",
      title: "Titolo grande",
      fieldset: "hero",
      description:
        "La frase grande sopra il video, la prima cosa che si legge. Breve: meglio restare sotto i 45 caratteri. Se lasciate vuoto resta «Miele, con cura silenziosa.»",
      type: "string",
      validation: (Rule) =>
        Rule.max(45).warning("Frase lunga: sul telefono andrà su molte righe e coprirà il video."),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Frase sotto il titolo",
      fieldset: "hero",
      description:
        "Una o due righe che spiegano cosa trova qui chi visita. Meglio restare sotto i 140 caratteri. Viene usata anche come anteprima su Google.",
      type: "text",
      rows: 2,
      validation: (Rule) =>
        Rule.max(140).warning("Frase lunga: Google potrebbe tagliarla e sul telefono copre il video."),
    }),
    defineField({
      name: "heroButton",
      title: "Testo del pulsante",
      fieldset: "hero",
      description:
        "Il pulsante sopra il video porta sempre alla pagina Prodotti: qui scegliete solo le parole, ad esempio «Scopri il raccolto». Poche parole.",
      type: "string",
      validation: (Rule) => Rule.max(30).warning("Testo lungo per un pulsante: bastano due o tre parole."),
    }),
    defineField({
      name: "storyTitle",
      title: "Titolo del racconto",
      fieldset: "story",
      description: "Il titolo della sezione subito sotto il video, accanto alla foto.",
      type: "string",
      validation: (Rule) => Rule.max(60).warning("Titolo lungo: meglio restare sotto i 60 caratteri."),
    }),
    defineField({
      name: "storyText",
      title: "Testo del racconto",
      fieldset: "story",
      description:
        "Poche frasi che spiegano perché il vostro miele è diverso. Per andare a capo premete Invio. Sotto il testo c'è sempre un link al diario della fattoria (pagina Notizie).",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.max(600).warning("Testo lungo: in home ne bastano poche righe."),
    }),
    defineField({
      name: "storyImage",
      title: "Foto del racconto",
      fieldset: "story",
      description: `La foto accanto al racconto. Viene mostrata in formato orizzontale (4:3): meglio una foto orizzontale, larga almeno 1200 pixel. Potete cambiarla quando volete per vedere come sta. Basta caricarla nella versione italiana: le versioni in francese e inglese senza foto usano la stessa. ${PHOTO_FORMAT_HINT}`,
      type: "image",
      options: { accept: PHOTO_FORMATS },
      fields: [photoAltField],
    }),
  ],
  preview: {
    select: { language: "language", media: "storyImage" },
    prepare: ({ language, media }) => ({ title: "Pagina Home", subtitle: languageLabel(language), media }),
  },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni del sito",
  type: "document",
  fieldsets: [
    { name: "brand", title: "Logo" },
    { name: "homeVideo", title: "Video in cima alla Home" },
    { name: "contact", title: "Contatti" },
    { name: "business", title: "Dati dell'attività" },
    { name: "social", title: "Profili social" },
    {
      name: "seo",
      title: "Titoli per Google",
      description:
        "Il titolo di ogni pagina come appare nei risultati di Google e nella scheda del browser. Non cambia le voci del menu. Ogni campo vuoto usa il titolo scritto in grigio.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      fieldset: "brand",
      description:
        "Il logo in alto a sinistra in ogni pagina, in fondo alla pagina e nella pagina di errore. Formato consigliato SVG, che resta nitido a ogni dimensione; altrimenti PNG con sfondo trasparente. Viene mostrato piccolo, alto come una riga di testo: scegliete una versione orizzontale e semplice. Compare sia su sfondo chiaro sia sopra il video scuro della Home: usate una versione che si legga su entrambi. Se lasciate vuoto, resta la scritta KWA NYUKI.",
      type: "image",
      options: { accept: "image/svg+xml,image/png,image/webp" },
      fields: [
        defineField({
          name: "alt",
          title: "Descrizione del logo",
          description:
            "Scrivete il nome dell'azienda, ad esempio «Kwa Nyuki». Non compare sul sito: la leggono i programmi per persone non vedenti.",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "heroVideo",
      title: "Video (carica il file)",
      fieldset: "homeVideo",
      description: `Il video a tutto schermo in cima alla Home, in tutte le lingue. Premete «Carica» e scegliete il file dal computer. Formato MP4: i video .MOV dell'iPhone vanno prima convertiti in MP4. Il video parte sempre senza audio e ricomincia da capo. Consigli: 10–30 secondi, orizzontale, file sotto i ${MAX_VIDEO_MB} MB, perché un video più pesante rallenta il sito sui telefoni.`,
      type: "file",
      options: { accept: "video/mp4" },
      validation: (Rule) =>
        Rule.custom(async (value: { asset?: { _ref?: string } } | undefined, context) => {
          const ref = value?.asset?._ref;
          if (!ref) return true;
          const size = await context
            .getClient({ apiVersion: "2025-08-01" })
            .fetch<number | null>("*[_id == $ref][0].size", { ref });
          if (!size || size <= MAX_VIDEO_MB * 1_000_000) return true;
          return `Il video pesa ${Math.round(size / 1_000_000)} MB: il massimo è ${MAX_VIDEO_MB} MB. Accorciatelo o riducetene la qualità, oppure chiedete a chi gestisce il sito di prepararlo.`;
        }),
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Video (link a un file già online)",
      fieldset: "homeVideo",
      description:
        "In alternativa al caricamento: incollate il link diretto a un file video MP4 già online, che finisce con .mp4. I link di YouTube o Vimeo qui non funzionano. Questo campo sparisce quando caricate un file qui sopra.",
      type: "url",
      hidden: ({ parent }) => Boolean(parent?.heroVideo?.asset),
      validation: (Rule) =>
        Rule.custom((url: string | undefined) =>
          !url || /\.mp4(\?|#|$)/i.test(url)
            ? true
            : "Il link non finisce con .mp4: controllate che sia il file del video e non una pagina web.",
        ).warning(),
    }),
    defineField({
      name: "heroPoster",
      title: "Immagine di anteprima del video",
      fieldset: "homeVideo",
      description: `La foto che si vede mentre il video si carica. È anche l'immagine che compare quando qualcuno condivide il sito su WhatsApp o Facebook. Orizzontale, almeno 1920×1080 pixel: l'ideale è un fotogramma del video. ${PHOTO_FORMAT_HINT}`,
      type: "image",
      options: { accept: PHOTO_FORMATS },
    }),
    defineField({
      name: "address",
      title: "Indirizzo della fattoria",
      fieldset: "contact",
      description:
        "Via, numero, CAP e paese, ad esempio «Via Roma 1, 53024 Montalcino (SI), Italia». Si scrive una volta sola e vale per tutte le lingue. Compare nelle pagine Contatti e Prodotti, e la mappa e il link «Indicazioni stradali» puntano qui. Controllatelo bene: chi viene in fattoria segue questo indirizzo.",
      type: "string",
    }),
    defineField({
      name: "hours",
      title: "Orari della bottega",
      fieldset: "contact",
      description:
        "Quando si può venire a comprare in fattoria, scritto per ogni lingua, ad esempio «Ven–Dom, 10:00–18:00». Una lingua lasciata vuota mostra gli orari scritti in italiano.",
      type: "object",
      options: { collapsible: false },
      fields: [
        defineField({ name: "it", title: "In italiano", type: "string" }),
        defineField({ name: "fr", title: "In francese", type: "string" }),
        defineField({ name: "en", title: "In inglese", type: "string" }),
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      fieldset: "contact",
      description:
        "L'indirizzo a cui i clienti vi scrivono per ordinare o chiedere informazioni. Compare nella pagina Contatti e nel riquadro «Come acquistare» della pagina Prodotti. Se lasciate vuoto, resta hello@kwanyuki.com.",
      type: "string",
      validation: (Rule) =>
        Rule.email().error("Controllate l'indirizzo email: deve essere del tipo nome@dominio.it."),
    }),
    defineField({
      name: "phone",
      title: "Telefono",
      fieldset: "contact",
      description:
        "Il numero da chiamare, scritto come volete che appaia, ad esempio +39 0577 123456. Compare nella pagina Contatti e nella pagina Prodotti; dal cellulare basta toccarlo per chiamare. Lasciate vuoto per non mostrarlo.",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^\+?[\d\s().-]{6,}$/).error(
          "Scrivete solo il numero, con eventuale prefisso, ad esempio +39 0577 123456.",
        ),
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      fieldset: "social",
      description:
        "Incollate l'indirizzo completo del vostro profilo, ad esempio https://www.instagram.com/kwanyuki. Compare come icona in fondo a ogni pagina. Lasciate vuoto per nascondere l'icona.",
      type: "url",
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      fieldset: "social",
      description:
        "Incollate l'indirizzo completo della vostra pagina, ad esempio https://www.facebook.com/kwanyuki. Compare come icona in fondo a ogni pagina. Lasciate vuoto per nascondere l'icona.",
      type: "url",
    }),
    defineField({
      name: "legalName",
      title: "Ragione sociale",
      fieldset: "business",
      description:
        "Il nome ufficiale dell'attività, come sulla visura o in fattura (ad esempio «Azienda Agricola Rossi Maria»). Compare in fondo a ogni pagina accanto alla Partita IVA e nella pagina Privacy. Se lasciate vuoto resta «Kwa Nyuki».",
      type: "string",
    }),
    defineField({
      name: "vatNumber",
      title: "Partita IVA",
      fieldset: "business",
      description:
        "Le 11 cifre della Partita IVA, senza «IT» davanti. Per legge deve comparire sul sito di un'attività: la mostriamo in fondo a ogni pagina.",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^\d{11}$/).error("La Partita IVA è fatta di 11 cifre, senza spazi né lettere."),
    }),
    defineField({
      name: "seoTitles",
      title: "Titoli delle pagine",
      fieldset: "seo",
      type: "object",
      fields: SEO_PAGES.map(({ name, title, where }) =>
        defineField({
          name,
          title,
          description: `Il titolo della pagina ${where}. Meglio restare sotto i 60 caratteri, con il nome «Kwa Nyuki».`,
          type: "object",
          fields: LANGUAGES.map(({ id, title: language }) =>
            defineField({
              name: id,
              title: `In ${language.toLowerCase()}`,
              type: "string",
              placeholder: ui[id as keyof typeof ui].seo[name],
              validation: (Rule) =>
                Rule.max(60).warning("Titolo lungo: Google potrebbe tagliarlo nei risultati di ricerca."),
            }),
          ),
        }),
      ),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impostazioni del sito" }),
  },
});
