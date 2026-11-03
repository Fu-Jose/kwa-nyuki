import type { Lang } from "./ui";

// DRAFT privacy notice (GDPR art. 13), written from how the site actually works:
// static pages on Vercel, images and video from Sanity's CDN, self-hosted fonts, no analytics,
// no cookies, Google Maps loaded only on request, contact by email/phone.
// It must be reviewed by a privacy consultant before launch. If the site changes (analytics,
// a contact form, a newsletter, embedded videos…), this text has to change too.

export interface PrivacyOwner {
  name: string;
  address: string;
  email: string;
  vatNumber: string | null;
  /** Video host of the home video when it is not Sanity (e.g. the stock video on Pexels). */
  externalVideoHost: string | null;
}

export interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

export const privacyUpdated = "2026-11-03";

export function getPrivacyText(lang: Lang, owner: PrivacyOwner): { title: string; updated: string; sections: PrivacySection[] } {
  const vat = owner.vatNumber;
  const video = owner.externalVideoHost;

  if (lang === "en") {
    return {
      title: "Privacy policy",
      updated: "Last updated",
      sections: [
        {
          heading: "Who is responsible for your data",
          paragraphs: [
            `The data controller is ${owner.name}${vat ? ` (VAT no. ${vat})` : ""}, ${owner.address}. You can contact us at ${owner.email}.`,
          ],
        },
        {
          heading: "What data we process and why",
          paragraphs: [
            "Browsing data: when you visit the site, the server automatically records technical data such as your IP address, the date and time, the page requested and your browser type. We use it only to deliver the site, keep it secure and fix errors (legitimate interest, art. 6(1)(f) GDPR).",
            "Data you send us: if you write to us by email or call us, we use your name, contact details and message to reply and, if you order honey, to handle the order (pre-contractual and contractual measures, art. 6(1)(b) GDPR, and legal obligations such as invoicing, art. 6(1)(c)).",
            "Map: the map on the Contact page is loaded only if you press “Show map”. Only then does your browser connect to Google, which receives your IP address and may set its own cookies under its privacy policy (consent, art. 6(1)(a) GDPR).",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "This site uses no profiling or analytics cookies. Your browser stores two technical preferences on your device only: light or dark mode, and whether the opening animation was already shown. They are never sent to us or to anyone else and need no consent.",
          ],
        },
        {
          heading: "Who else handles the data",
          paragraphs: [
            `To run the site we use providers acting on our behalf: Vercel Inc. (hosting) and Sanity (content, images and video)${video ? `; the home page video is currently served by ${video}` : ""}. Your browser connects directly to their servers to load some files. Some of them are based outside the European Union: data is transferred under the safeguards required by the GDPR (adequacy decisions or standard contractual clauses).`,
            "We do not sell or share your data for marketing purposes.",
          ],
        },
        {
          heading: "How long we keep it",
          paragraphs: [
            "Technical browsing logs are kept by the hosting provider for a short period. Emails and order data are kept for as long as needed to answer you and handle the order, and for the period required by tax law where an order is placed.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            `You can ask us at any time to access, correct or delete your data, to restrict or object to its use, and to receive it in a portable format, by writing to ${owner.email}. If you consented to something (for example the map), you can withdraw consent at any time.`,
            "You also have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
          ],
        },
      ],
    };
  }

  if (lang === "fr") {
    return {
      title: "Politique de confidentialité",
      updated: "Dernière mise à jour",
      sections: [
        {
          heading: "Qui est responsable de vos données",
          paragraphs: [
            `Le responsable du traitement est ${owner.name}${vat ? ` (n° TVA ${vat})` : ""}, ${owner.address}. Vous pouvez nous écrire à ${owner.email}.`,
          ],
        },
        {
          heading: "Quelles données et pourquoi",
          paragraphs: [
            "Données de navigation : lors de votre visite, le serveur enregistre automatiquement des données techniques comme votre adresse IP, la date et l’heure, la page demandée et le type de navigateur. Elles servent uniquement à afficher le site, à le protéger et à corriger les erreurs (intérêt légitime, art. 6.1.f RGPD).",
            "Données que vous nous envoyez : si vous nous écrivez ou nous appelez, nous utilisons votre nom, vos coordonnées et votre message pour vous répondre et, si vous commandez du miel, pour gérer la commande (mesures précontractuelles et contractuelles, art. 6.1.b RGPD, et obligations légales comme la facturation, art. 6.1.c).",
            "Carte : la carte de la page Contact n’est chargée que si vous appuyez sur « Afficher la carte ». Votre navigateur se connecte alors à Google, qui reçoit votre adresse IP et peut déposer ses propres cookies selon sa politique de confidentialité (consentement, art. 6.1.a RGPD).",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "Ce site n’utilise aucun cookie de profilage ni de statistiques. Votre navigateur conserve seulement, sur votre appareil, deux préférences techniques : le mode clair ou sombre, et si l’animation d’ouverture a déjà été affichée. Elles ne sont jamais envoyées et ne nécessitent pas de consentement.",
          ],
        },
        {
          heading: "Qui d’autre traite les données",
          paragraphs: [
            `Pour faire fonctionner le site, nous faisons appel à des prestataires agissant pour notre compte : Vercel Inc. (hébergement) et Sanity (contenus, images et vidéo)${video ? ` ; la vidéo de la page d’accueil est actuellement fournie par ${video}` : ""}. Votre navigateur se connecte directement à leurs serveurs pour charger certains fichiers. Certains sont établis hors de l’Union européenne : les transferts s’appuient sur les garanties prévues par le RGPD (décisions d’adéquation ou clauses contractuelles types).`,
            "Nous ne vendons ni ne partageons vos données à des fins de marketing.",
          ],
        },
        {
          heading: "Durée de conservation",
          paragraphs: [
            "Les journaux techniques sont conservés peu de temps par l’hébergeur. Les e-mails et les données de commande sont conservés le temps nécessaire pour vous répondre et gérer la commande, et pendant la durée imposée par la loi fiscale en cas de commande.",
          ],
        },
        {
          heading: "Vos droits",
          paragraphs: [
            `Vous pouvez à tout moment demander l’accès à vos données, leur rectification ou leur effacement, la limitation du traitement ou vous y opposer, et les recevoir dans un format portable, en écrivant à ${owner.email}. Si vous avez donné votre consentement (par exemple pour la carte), vous pouvez le retirer à tout moment.`,
            "Vous pouvez également introduire une réclamation auprès de l’autorité italienne de protection des données (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
          ],
        },
      ],
    };
  }

  return {
    title: "Informativa sulla privacy",
    updated: "Ultimo aggiornamento",
    sections: [
      {
        heading: "Chi è il titolare dei dati",
        paragraphs: [
          `Il titolare del trattamento è ${owner.name}${vat ? ` (P.IVA ${vat})` : ""}, ${owner.address}. Potete scriverci a ${owner.email}.`,
        ],
      },
      {
        heading: "Quali dati trattiamo e perché",
        paragraphs: [
          "Dati di navigazione: quando visitate il sito, il server registra automaticamente dati tecnici come l’indirizzo IP, la data e l’ora, la pagina richiesta e il tipo di browser. Li usiamo solo per mostrare il sito, proteggerlo e correggere errori (legittimo interesse, art. 6.1.f GDPR).",
          "Dati che ci inviate: se ci scrivete via email o ci telefonate, usiamo nome, recapiti e messaggio per rispondervi e, se ordinate il miele, per gestire l’ordine (misure precontrattuali e contrattuali, art. 6.1.b GDPR, e obblighi di legge come la fatturazione, art. 6.1.c).",
          "Mappa: la mappa nella pagina Contatti viene caricata solo se premete «Mostra la mappa». Solo allora il vostro browser si collega a Google, che riceve il vostro indirizzo IP e può impostare propri cookie secondo la sua informativa (consenso, art. 6.1.a GDPR).",
        ],
      },
      {
        heading: "Cookie",
        paragraphs: [
          "Questo sito non usa cookie di profilazione né statistici. Il browser conserva solo sul vostro dispositivo due preferenze tecniche: la modalità chiara o scura, e se l’animazione iniziale è già stata mostrata. Non vengono mai inviate a noi né ad altri e non richiedono consenso.",
        ],
      },
      {
        heading: "Chi altro tratta i dati",
        paragraphs: [
          `Per far funzionare il sito ci affidiamo a fornitori che agiscono per nostro conto: Vercel Inc. (hosting) e Sanity (contenuti, immagini e video)${video ? `; il video della home è al momento fornito da ${video}` : ""}. Il vostro browser si collega direttamente ai loro server per caricare alcuni file. Alcuni hanno sede fuori dall’Unione Europea: i dati sono trasferiti con le garanzie previste dal GDPR (decisioni di adeguatezza o clausole contrattuali standard).`,
          "Non vendiamo né cediamo i vostri dati per scopi di marketing.",
        ],
      },
      {
        heading: "Per quanto tempo li conserviamo",
        paragraphs: [
          "I log tecnici di navigazione sono conservati dal fornitore dell’hosting per un periodo breve. Le email e i dati degli ordini sono conservati per il tempo necessario a rispondervi e gestire l’ordine e, in caso di ordine, per il periodo richiesto dalle norme fiscali.",
        ],
      },
      {
        heading: "I vostri diritti",
        paragraphs: [
          `Potete chiederci in qualsiasi momento di accedere ai vostri dati, correggerli o cancellarli, limitarne o opporvi al trattamento e riceverli in un formato portabile, scrivendo a ${owner.email}. Se avete dato un consenso (ad esempio per la mappa), potete revocarlo quando volete.`,
          "Avete anche il diritto di presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
        ],
      },
    ],
  };
}
