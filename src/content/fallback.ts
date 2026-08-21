import type { Lang } from '../i18n/ui';

export type Product = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  price: string;
  image: string;
  imageAlt: string;
};

export type NewsItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  image: string;
  imageAlt: string;
  body: string;
};

export type SiteSettings = {
  instagram?: string;
  facebook?: string;
  heroVideoUrl: string;
  heroPoster: string;
};

export const siteSettings: SiteSettings = {
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  heroVideoUrl:
    'https://videos.pexels.com/video-files/13556752/13556752-hd_1920_1080_30fps.mp4',
  heroPoster:
    'https://images.unsplash.com/photo-1654515722385-c684c5331c04?auto=format&fit=crop&q=80&w=1600',
};

const productImage =
  'https://images.unsplash.com/photo-1654515722385-c684c5331c04?auto=format&fit=crop&q=80&w=800';
const farmImage =
  'https://images.unsplash.com/photo-1473973266408-ed4e27abdd47?auto=format&fit=crop&q=80&w=1200';
const newsImage =
  'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80&w=800';

export const products: Record<Lang, Product[]> = {
  en: [
    {
      _id: 'wildflower',
      slug: 'wildflower-honey',
      title: 'Wildflower Honey',
      excerpt: 'A sun-warmed blend from spring meadows.',
      price: '€18',
      image: productImage,
      imageAlt: 'Glass jar of golden honey',
    },
    {
      _id: 'acacia',
      slug: 'acacia-honey',
      title: 'Acacia Honey',
      excerpt: 'Delicate, pale, and almost floral-silk.',
      price: '€22',
      image: farmImage,
      imageAlt: 'Bee hives in a field',
    },
    {
      _id: 'chestnut',
      slug: 'chestnut-honey',
      title: 'Chestnut Honey',
      excerpt: 'Deep, mineral, and distinctly woodland.',
      price: '€24',
      image: newsImage,
      imageAlt: 'Beekeeper at work',
    },
    {
      _id: 'comb',
      slug: 'honeycomb',
      title: 'Raw Honeycomb',
      excerpt: 'Wax, nectar, and texture — unfiltered.',
      price: '€28',
      image: productImage,
      imageAlt: 'Raw honeycomb and honey',
    },
  ],
  it: [
    {
      _id: 'wildflower',
      slug: 'miele-di-millefiori',
      title: 'Miele di millefiori',
      excerpt: 'Un blend caldo di sole dai prati di primavera.',
      price: '€18',
      image: productImage,
      imageAlt: 'Vasetto di miele dorato',
    },
    {
      _id: 'acacia',
      slug: 'miele-di-acacia',
      title: 'Miele di acacia',
      excerpt: 'Delicato, chiaro, quasi seta floreale.',
      price: '€22',
      image: farmImage,
      imageAlt: 'Arnie in un campo',
    },
    {
      _id: 'chestnut',
      slug: 'miele-di-castagno',
      title: 'Miele di castagno',
      excerpt: 'Profondo, minerale, dal bosco.',
      price: '€24',
      image: newsImage,
      imageAlt: 'Apicoltore al lavoro',
    },
    {
      _id: 'comb',
      slug: 'favo',
      title: 'Favo crudo',
      excerpt: 'Cera, nettare e texture — non filtrato.',
      price: '€28',
      image: productImage,
      imageAlt: 'Favo e miele crudo',
    },
  ],
  fr: [
    {
      _id: 'wildflower',
      slug: 'miel-toutes-fleurs',
      title: 'Miel toutes fleurs',
      excerpt: 'Un assemblage solaire des prairies de printemps.',
      price: '€18',
      image: productImage,
      imageAlt: 'Pot de miel doré',
    },
    {
      _id: 'acacia',
      slug: 'miel-d-acacia',
      title: 'Miel d’acacia',
      excerpt: 'Délicat, pâle, presque soie florale.',
      price: '€22',
      image: farmImage,
      imageAlt: 'Ruches dans un champ',
    },
    {
      _id: 'chestnut',
      slug: 'miel-de-chataignier',
      title: 'Miel de châtaignier',
      excerpt: 'Profond, minéral, nettement forestier.',
      price: '€24',
      image: newsImage,
      imageAlt: 'Apiculteur au travail',
    },
    {
      _id: 'comb',
      slug: 'rayon',
      title: 'Rayon brut',
      excerpt: 'Cire, nectar et texture — non filtré.',
      price: '€28',
      image: productImage,
      imageAlt: 'Rayon de miel brut',
    },
  ],
};

export const news: Record<Lang, NewsItem[]> = {
  en: [
    {
      _id: 'spring',
      slug: 'spring-harvest',
      title: 'The first frames of spring',
      excerpt: 'Warm light, early nectar, and a quieter rhythm in the yard.',
      publishedAt: '2026-04-12',
      image: newsImage,
      imageAlt: 'Beekeeper inspecting a hive',
      body: 'We opened the first hives under a pale April sky. The colonies had wintered well, and the wildflowers along the ridge were already drawing forage. This season we are leaving more stores on the frames — a slower harvest, a stronger hive.',
    },
    {
      _id: 'meadow',
      slug: 'meadow-restoration',
      title: 'Restoring the meadow edge',
      excerpt: 'Native planting to feed bees beyond the boxes.',
      publishedAt: '2026-03-02',
      image: farmImage,
      imageAlt: 'Hives in a restored meadow',
      body: 'Beyond the apiary, we have been stitching native flora back into the field margins. It is unglamorous work — seed, soil, patience — and it is the most important thing we do for the bees.',
    },
    {
      _id: 'cellar',
      slug: 'in-the-honey-house',
      title: 'Notes from the honey house',
      excerpt: 'How we settle, never rush, and bottle by hand.',
      publishedAt: '2026-01-18',
      image: productImage,
      imageAlt: 'Honey jars on a wooden table',
      body: 'Nothing is heated past the warmth of the room. We let the honey rest, then jar it in small lots with the date of the yard written on each label. That is the entire method.',
    },
  ],
  it: [
    {
      _id: 'spring',
      slug: 'raccolto-di-primavera',
      title: 'I primi telaini di primavera',
      excerpt: 'Luce calda, nettare precoce, e un ritmo più quieto in apiario.',
      publishedAt: '2026-04-12',
      image: newsImage,
      imageAlt: 'Apicoltore che ispeziona un’arnia',
      body: 'Abbiamo aperto le prime arnie sotto un cielo d’aprile. Le colonie hanno svernato bene e i fiori lungo il crinale già richiamavano il bottino. Questa stagione lasciamo più scorte sui telaini: un raccolto più lento, un alveare più forte.',
    },
    {
      _id: 'meadow',
      slug: 'ripristino-del-prato',
      title: 'Ripristinare il margine del prato',
      excerpt: 'Piante native per nutrire le api oltre le cassette.',
      publishedAt: '2026-03-02',
      image: farmImage,
      imageAlt: 'Arnie in un prato restaurato',
      body: 'Oltre l’apiario, stiamo ricucendo la flora nativa ai margini dei campi. È un lavoro senza gloria — seme, terra, pazienza — ed è la cosa più importante che facciamo per le api.',
    },
    {
      _id: 'cellar',
      slug: 'nella-mieleia',
      title: 'Note dalla mieleia',
      excerpt: 'Come lasciamo riposare, senza fretta, e imbottigliamo a mano.',
      publishedAt: '2026-01-18',
      image: productImage,
      imageAlt: 'Vasetti di miele su un tavolo di legno',
      body: 'Nulla viene scaldato oltre la temperatura della stanza. Lasciamo riposare il miele, poi lo invasamo in piccole partite con la data dell’apiario su ogni etichetta. Questo è l’intero metodo.',
    },
  ],
  fr: [
    {
      _id: 'spring',
      slug: 'recolte-de-printemps',
      title: 'Les premiers cadres du printemps',
      excerpt:
        'Lumière chaude, nectar précoce, et un rythme plus calme au rucher.',
      publishedAt: '2026-04-12',
      image: newsImage,
      imageAlt: 'Apiculteur inspectant une ruche',
      body: 'Nous avons ouvert les premières ruches sous un ciel d’avril pâle. Les colonies ont bien hiverné, et les fleurs le long de la crête attiraient déjà le butin. Cette saison, nous laissons plus de réserves sur les cadres — une récolte plus lente, une ruche plus forte.',
    },
    {
      _id: 'meadow',
      slug: 'restauration-de-la-prairie',
      title: 'Restaurer la lisière de la prairie',
      excerpt:
        'Plantations natives pour nourrir les abeilles au-delà des ruches.',
      publishedAt: '2026-03-02',
      image: farmImage,
      imageAlt: 'Ruches dans une prairie restaurée',
      body: 'Au-delà du rucher, nous recousons la flore native dans les marges des champs. C’est un travail sans éclat — semence, sol, patience — et c’est le plus important que nous fassions pour les abeilles.',
    },
    {
      _id: 'cellar',
      slug: 'dans-la-miellerie',
      title: 'Notes de la miellerie',
      excerpt:
        'Comment nous laissons reposer, sans presser, et mettons en pot à la main.',
      publishedAt: '2026-01-18',
      image: productImage,
      imageAlt: 'Pots de miel sur une table en bois',
      body: 'Rien n’est chauffé au-delà de la chaleur de la pièce. Nous laissons le miel reposer, puis le mettons en pots par petits lots, avec la date du rucher sur chaque étiquette. C’est toute la méthode.',
    },
  ],
};
