export type BriefOption = string | { v: string; d?: string; c?: string; f?: string }

export type BriefQuestion = {
  id: string
  ty: 'text' | 'area' | 'pick' | 'files'
  req?: boolean
  opt?: boolean
  many?: boolean
  max?: number
  other?: boolean
  ui?: 'cards' | 'chips' | 'seg' | 'swatches' | 'typecards'
  g?: string
  gt?: string
  gh?: string
  l: string
  ph?: string
  accept?: string
  o?: BriefOption[]
  when?: (answers: Record<string, unknown>) => boolean
}

export type BriefStep = {
  s: string
  time: string
  t: string
  p: string
  tip: string
  q: BriefQuestion[]
}

export const LOGO_KEEP = 'Oui, à garder tel quel'
export const LOGO_NONE = 'Non, pas encore'
export const LOGO_MODERNIZE = 'Oui, à moderniser'
export const LOGO_REDO = 'Oui, à refaire complètement'

/** Besoin de définir un type / style de logo (création, modernisation ou refonte). */
export function needsLogoDesign(answers: Record<string, unknown>) {
  return (
    answers.logo === LOGO_NONE ||
    answers.logo === LOGO_MODERNIZE ||
    answers.logo === LOGO_REDO
  )
}

export function optionValue(opt: BriefOption) {
  return typeof opt === 'string' ? opt : opt.v
}

export function optionDesc(opt: BriefOption) {
  return typeof opt === 'string' ? '' : opt.d || ''
}

export function optionColor(opt: BriefOption) {
  return typeof opt === 'string' ? '' : opt.c || ''
}

export function optionFont(opt: BriefOption) {
  return typeof opt === 'string' ? '' : opt.f || ''
}

const stepsFr: BriefStep[] = [
  {
    s: 'Vous & votre projet',
    time: '2 min',
    t: 'Faisons connaissance',
    p: "Qui êtes-vous et où en est votre marque ? On commence par l'essentiel.",
    tip: 'Vos coordonnées restent entre nous : elles servent uniquement à vous recontacter.',
    q: [
      {
        id: 'nom',
        ty: 'text',
        req: true,
        g: 'contact',
        gt: 'Comment pouvons-nous vous joindre ?',
        gh: 'Vos coordonnées restent entre nous : elles servent uniquement à vous recontacter.',
        l: 'Nom et prénom',
        ph: 'Ex. Awa Diop',
      },
      {
        id: 'tel',
        ty: 'text',
        req: true,
        g: 'contact',
        l: 'Téléphone / WhatsApp',
        ph: '+221 …',
      },
      {
        id: 'email',
        ty: 'text',
        req: true,
        g: 'contact',
        l: 'E-mail',
        ph: 'vous@exemple.com',
      },
      {
        id: 'marque',
        ty: 'text',
        l: "Comment s'appelle votre marque ?",
        ph: 'Le nom de votre projet',
      },
      {
        id: 'secteur',
        ty: 'pick',
        ui: 'chips',
        other: true,
        l: "Votre secteur d'activité",
        o: [
          'Mode, beauté, cosmétique',
          'Restauration, alimentation',
          'Commerce, boutique',
          'Services aux entreprises, conseil',
          'Technologie, digital',
          'Santé, bien-être',
          'Immobilier, BTP',
          'Éducation, formation',
          'Événementiel, culture',
          'Autre',
        ],
      },
      {
        id: 'etat',
        ty: 'pick',
        ui: 'cards',
        other: true,
        l: "Où en est votre marque aujourd'hui ?",
        o: [
          { v: 'Nouveau projet', d: "Rien n'existe encore" },
          { v: 'Rebranding', d: 'La marque existe, je veux la moderniser' },
          { v: 'Compléter mes supports', d: 'La marque existe, il me manque des supports' },
          { v: 'Autre', d: 'Une autre situation' },
        ],
      },
      {
        id: 'presence',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Où êtes-vous déjà présent ?',
        o: [
          'Facebook',
          'Instagram',
          'TikTok',
          'LinkedIn',
          'WhatsApp Business',
          'Site web',
          "Nulle part pour l'instant",
        ],
      },
    ],
  },
  {
    s: 'Votre ADN',
    time: '2 min',
    t: 'Votre entreprise et ses valeurs',
    p: "Ce que vous proposez, ce qui vous rend unique et jusqu'où vous voulez aller.",
    tip: 'Ne choisissez que 3 valeurs : c’est ce qui rendra votre marque claire et mémorable.',
    q: [
      {
        id: 'offre',
        ty: 'pick',
        ui: 'cards',
        l: 'Que proposez-vous ?',
        o: [{ v: 'Des produits' }, { v: 'Des services' }, { v: 'Les deux' }],
      },
      {
        id: 'anciennete',
        ty: 'pick',
        ui: 'seg',
        l: 'Depuis quand existe votre activité ?',
        o: ['Pas encore lancée', "Moins d'un an", '1 à 3 ans', 'Plus de 3 ans'],
      },
      {
        id: 'valeurs',
        ty: 'pick',
        ui: 'chips',
        many: true,
        max: 3,
        l: 'Quelles sont les valeurs qui comptent le plus pour vous ?',
        o: [
          'Qualité',
          'Confiance',
          'Innovation',
          'Proximité',
          'Excellence',
          'Simplicité',
          'Rapidité',
          'Engagement social',
          'Fierté africaine',
        ],
      },
      {
        id: 'distinction',
        ty: 'pick',
        ui: 'chips',
        many: true,
        other: true,
        l: 'Qu’est-ce qui vous distingue de vos concurrents ?',
        o: [
          'Les prix',
          'La qualité',
          'Le service client',
          'La rapidité',
          "L'expertise",
          "L'originalité",
          'Autre',
        ],
      },
      {
        id: 'ambition',
        ty: 'pick',
        ui: 'chips',
        other: true,
        l: 'Quelle est votre ambition dans 3 à 5 ans ?',
        o: [
          'Rester une marque locale',
          'Devenir une référence nationale',
          "S'étendre en Afrique de l'Ouest",
          "Aller à l'international",
          'Autre',
        ],
      },
    ],
  },
  {
    s: 'Public & marché',
    time: '2 min',
    t: 'Votre public et votre marché',
    p: 'À qui vous parlez, et comment vous voulez vous démarquer.',
    tip: 'Plus le portrait de votre client est précis, plus l’identité sera juste.',
    q: [
      {
        id: 'cible',
        ty: 'pick',
        ui: 'cards',
        many: true,
        max: 2,
        l: 'À qui vous adressez-vous ?',
        o: [
          { v: 'Des particuliers', d: 'B2C' },
          { v: 'Des entreprises', d: 'B2B' },
          { v: 'Des organisations étatiques', d: 'B2G' },
          { v: 'Les trois', d: 'B2C · B2B · B2G' },
        ],
      },
      {
        id: 'age',
        ty: 'pick',
        ui: 'seg',
        many: true,
        l: "Quelle est la tranche d'âge de vos clients ?",
        o: ['18 – 25 ans', '25 – 35 ans', '35 – 50 ans', '50 ans et +'],
      },
      {
        id: 'genre',
        ty: 'pick',
        ui: 'seg',
        l: 'Quel est leur genre ?',
        o: ['Plutôt des femmes', 'Plutôt des hommes', 'Les deux'],
      },
      {
        id: 'pouvoir',
        ty: 'pick',
        ui: 'seg',
        many: true,
        l: "Quel est leur pouvoir d'achat ?",
        o: ['Modeste', 'Moyen', 'Élevé'],
      },
      {
        id: 'canaux',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Comment vos clients vous trouvent-ils ?',
        o: [
          'Réseaux sociaux',
          'Bouche-à-oreille',
          'En boutique / sur place',
          'Salons et événements',
          'Recherche Google',
          'Radio / télévision',
        ],
      },
      {
        id: 'gamme',
        ty: 'pick',
        ui: 'cards',
        l: 'Comment voulez-vous être perçu en termes de gamme ?',
        o: [
          { v: 'Accessible', d: 'Prix abordables' },
          { v: 'Milieu de gamme', d: 'Bon rapport qualité-prix' },
          { v: 'Haut de gamme', d: 'Premium' },
          { v: 'Luxe', d: 'Exclusif' },
        ],
      },
      {
        id: 'paraitre',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Par rapport à vos concurrents, vous voulez paraître :',
        o: [
          'Plus moderne',
          'Plus sérieux et fiable',
          'Plus accessible',
          'Plus haut de gamme',
          'Plus original',
        ],
      },
      {
        id: 'concurrents',
        ty: 'area',
        opt: true,
        l: '1 à 3 concurrents',
        ph: 'Noms, pages ou sites de vos concurrents…',
      },
    ],
  },
  {
    s: 'Personnalité',
    time: '1 min',
    t: 'Si votre marque était une personne…',
    p: 'Quel serait son caractère, sa façon de parler, et ce qu’elle ferait ressentir ?',
    tip: 'Il n’y a pas de mauvaise réponse : fiez-vous à votre première intuition.',
    q: [
      {
        id: 'perso',
        ty: 'pick',
        ui: 'cards',
        many: true,
        l: 'Quelle personnalité vous correspond le mieux ?',
        o: [
          { v: 'Moderne et innovante' },
          { v: 'Classique et intemporelle' },
          { v: 'Élégante et raffinée' },
          { v: 'Fun et dynamique' },
          { v: 'Chaleureuse et proche' },
          { v: 'Sérieuse et professionnelle' },
          { v: 'Audacieuse et originale' },
          { v: 'Naturelle et authentique' },
          { v: 'Ancrée dans la culture locale' },
        ],
      },
      {
        id: 'ressenti',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Que doivent ressentir vos clients ?',
        o: ['Confiance', 'Sérénité', 'Fierté', 'Joie', 'Admiration', 'Envie', 'Sécurité'],
      },
      {
        id: 'eviter',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Qu’est-ce que votre marque ne doit surtout pas évoquer ?',
        o: [
          'Bon marché',
          'Vieillotte',
          'Froide, distante',
          'Compliquée',
          'Trop sérieuse',
          'Agressive',
        ],
      },
      {
        id: 'ton',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Quel ton pour s’adresser à vos clients ?',
        o: [
          'Vouvoiement, ton formel',
          'Tutoiement, ton décontracté',
          'Inspirant et motivant',
          'Humoristique',
          'Expert et pédagogue',
        ],
      },
    ],
  },
  {
    s: 'Identité visuelle',
    time: '2 min',
    t: 'Votre identité visuelle',
    p: 'Dites-nous d’abord où vous en êtes avec votre logo : la suite s’adapte à votre réponse.',
    tip: 'Captures d’écran, logos, photos… tout ce qui vous inspire nous aide.',
    q: [
      {
        id: 'logo',
        ty: 'pick',
        ui: 'cards',
        l: 'Avez-vous déjà un logo ?',
        o: [
          { v: LOGO_NONE, d: 'On le crée ensemble' },
          { v: LOGO_KEEP, d: 'On construit autour' },
          { v: LOGO_MODERNIZE, d: 'On le rafraîchit' },
          { v: LOGO_REDO, d: 'On repart de zéro' },
        ],
      },
      {
        id: 'logo_files',
        ty: 'files',
        opt: true,
        accept: 'image/*,.pdf,application/pdf',
        gt: 'Joignez votre logo actuel',
        gh: 'Parfait ! Nous construirons vos supports autour de votre logo actuel.',
        l: 'Logo actuel',
        when: (a) => !!a.logo && a.logo !== LOGO_NONE,
      },
      {
        id: 'type_logo',
        ty: 'pick',
        ui: 'chips',
        l: 'Quel type de logo préférez-vous ?',
        // Option 2 « Oui, à garder tel quel » : saute type, couleurs, style, typo, inspirations.
        when: (a) => needsLogoDesign(a),
        o: [
          'Le nom seul, écrit avec une belle typographie',
          'Les initiales (monogramme)',
          'Un symbole / icône seul',
          'Un symbole + le nom',
          'Un emblème (type badge)',
          'Je laisse le designer proposer',
        ],
      },
      {
        id: 'couleurs',
        ty: 'pick',
        ui: 'swatches',
        many: true,
        l: 'Les couleurs qui vous attirent',
        when: (a) => needsLogoDesign(a),
        o: [
          { v: 'Bleu', c: 'linear-gradient(135deg, #1d4ed8, #60a5fa)' },
          { v: 'Vert', c: 'linear-gradient(135deg, #15803d, #4ade80)' },
          { v: 'Rouge', c: 'linear-gradient(135deg, #b91c1c, #f87171)' },
          { v: 'Orange', c: 'linear-gradient(135deg, #c2410c, #fb923c)' },
          { v: 'Jaune / doré', c: 'linear-gradient(135deg, #ca8a04, #fde047)' },
          { v: 'Violet', c: 'linear-gradient(135deg, #6d28d9, #c084fc)' },
          { v: 'Rose', c: 'linear-gradient(135deg, #be185d, #f9a8d4)' },
          { v: 'Noir', c: 'linear-gradient(135deg, #111111, #525252)' },
          { v: 'Blanc / beige', c: 'linear-gradient(135deg, #f8f4ef, #e7dccf)' },
          { v: 'Marron / tons terre', c: 'linear-gradient(135deg, #7c4a2d, #c4a484)' },
          { v: 'Pas de préférence', c: 'conic-gradient(from 90deg, #ef4444, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444)' },
        ],
      },
      {
        id: 'style',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Quel style visuel vous attire ?',
        when: (a) => needsLogoDesign(a),
        o: [
          'Minimaliste et épuré',
          'Coloré et vivant',
          'Sombre et chic',
          'Doux et pastel',
          'Graphique, avec motifs (wax, bogolan, kente)',
          'Illustré / dessiné à la main',
        ],
      },
      {
        id: 'typo',
        ty: 'pick',
        ui: 'typecards',
        many: true,
        l: 'Quel style de typographie ?',
        when: (a) => needsLogoDesign(a),
        o: [
          { v: 'Moderne et arrondie', f: '"Nunito", system-ui, sans-serif' },
          {
            v: 'Classique avec empattements (style magazine)',
            f: '"Playfair Display", Georgia, serif',
          },
          { v: 'Manuscrite / signature', f: '"Great Vibes", cursive' },
          { v: 'Grasse et impactante', f: '"Archivo Black", Impact, sans-serif' },
        ],
      },
      {
        id: 'couleurs_eviter',
        ty: 'text',
        opt: true,
        g: 'inspi',
        gt: 'Des inspirations à nous partager ?',
        gh: 'Tout est facultatif, mais tout nous aide : couleurs à éviter, liens, images…',
        l: 'Couleurs à éviter',
        ph: 'Ex. le violet, le rose fluo…',
        when: (a) => needsLogoDesign(a),
      },
      {
        id: 'inspi',
        ty: 'text',
        opt: true,
        g: 'inspi',
        l: 'Lien qui vous inspire',
        ph: 'https://…',
        when: (a) => needsLogoDesign(a),
      },
    ],
  },
  {
    s: 'Besoins & budget',
    time: '2 min',
    t: 'Vos besoins, budget et délais',
    p: 'Dernière ligne droite ! Ce dont vous avez besoin, pour quand, et avec quel budget.',
    tip: 'Pas sûr de votre budget ? Choisissez « À définir ensemble », nous vous conseillerons.',
    q: [
      {
        id: 'base',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: "Quels éléments d'identité de base souhaitez-vous ?",
        o: [
          'Logo et ses déclinaisons',
          'Palette de couleurs',
          'Choix des typographies',
          'Charte graphique / guide de marque',
        ],
      },
      {
        id: 'imprimes',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Quels supports imprimés souhaitez-vous ?',
        o: [
          'Cartes de visite',
          'Papier en-tête, factures, devis',
          'Flyers / affiches / brochures',
          'Packaging, étiquettes, sacs',
          'Kakemono / banderole',
          'Textile (t-shirts, tenues)',
        ],
      },
      {
        id: 'digitaux',
        ty: 'pick',
        ui: 'chips',
        many: true,
        l: 'Quels supports digitaux souhaitez-vous ?',
        o: [
          'Photos de profil et bannières',
          'Modèles de posts et stories',
          'Signature e-mail',
          'Site web ou page de présentation',
          'Vidéo / animation du logo',
        ],
      },
      {
        id: 'budget',
        ty: 'pick',
        ui: 'cards',
        l: 'Quel est votre budget (en FCFA) ?',
        o: [
          { v: 'Moins de 100 000' },
          { v: '100 000 à 250 000' },
          { v: '250 000 à 500 000' },
          { v: '500 000 à 1 000 000' },
          { v: 'Plus de 1 000 000' },
          { v: 'À définir ensemble' },
        ],
      },
      {
        id: 'urgence',
        ty: 'pick',
        ui: 'cards',
        l: 'Le projet est-il urgent ?',
        o: [
          { v: 'Urgent', d: 'Moins de 2 semaines' },
          { v: 'Normal', d: '2 à 4 semaines' },
          { v: 'Pas pressé', d: "Plus d'un mois" },
        ],
      },
      {
        id: 'evenement',
        ty: 'pick',
        ui: 'chips',
        l: 'Y a-t-il un événement lié ?',
        o: [
          'Non',
          'Lancement de la marque',
          "Ouverture d'une boutique / d'un local",
          'Salon ou événement',
        ],
      },
      {
        id: 'validation',
        ty: 'pick',
        ui: 'seg',
        l: 'Qui validera les propositions ?',
        o: ['Moi seul(e)', 'Moi et un associé', 'Une direction / un comité'],
      },
      {
        id: 'pref_contact',
        ty: 'pick',
        ui: 'seg',
        l: 'Quel est votre moyen de contact préféré ?',
        o: [{ v: 'WhatsApp' }, { v: 'Appel' }, { v: 'E-mail' }],
      },
      {
        id: 'source',
        ty: 'pick',
        ui: 'chips',
        other: true,
        l: 'Comment avez-vous connu MEGA-SN ?',
        o: [
          'Réseaux sociaux',
          'Bouche-à-oreille',
          "Recommandation d'un client",
          'Événement',
          'Autre',
        ],
      },
      {
        id: 'message',
        ty: 'area',
        opt: true,
        l: 'Autre chose à nous dire ? (autre besoin, précision…)',
        ph: 'Votre message…',
      },
    ],
  },
]

export type BriefScreen = {
  g?: string
  gt?: string
  gh?: string
  items: BriefQuestion[]
}

export function visibleQuestions(step: BriefStep, answers: Record<string, unknown>) {
  return step.q.filter((q) => !q.when || q.when(answers))
}

export function screensOf(step: BriefStep, answers: Record<string, unknown>): BriefScreen[] {
  const out: BriefScreen[] = []
  for (const q of visibleQuestions(step, answers)) {
    const last = out[out.length - 1]
    if (q.g && last && last.g === q.g) last.items.push(q)
    else out.push({ g: q.g, gt: q.gt, gh: q.gh, items: [q] })
  }
  return out
}

export function isFilled(value: unknown) {
  if (Array.isArray(value)) return value.length > 0
  if (typeof FileList !== 'undefined' && value instanceof FileList) return value.length > 0
  return typeof value === 'string' && value.trim().length > 0
}

export function isQuestionRequired(q: BriefQuestion) {
  if (q.opt) return false
  if (q.req) return true
  // Choix multiples : au moins une réponse pour pouvoir continuer
  return !!q.many
}

export function screenComplete(screen: BriefScreen, answers: Record<string, unknown>) {
  return screen.items.every((q) => {
    if (!isQuestionRequired(q)) return true
    if (!isFilled(answers[q.id])) return false
    if (q.other) {
      const val = answers[q.id]
      const selected = Array.isArray(val) ? val : [val]
      if (selected.some((v) => String(v).toLowerCase().includes('autre'))) {
        return isFilled(answers[`${q.id}_other`])
      }
    }
    return true
  })
}

export function getBriefSteps(_locale: 'fr' | 'en' = 'fr') {
  // Formulaire aligné sur la maquette FR ; l’UI chrome est traduite dans la page.
  return stepsFr
}
