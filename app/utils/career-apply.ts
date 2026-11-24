export type ApplyOption = string | { v: string; d?: string }

export type ApplyQuestion = {
  id: string
  ty: 'text' | 'area' | 'pick' | 'files'
  req?: boolean
  many?: boolean
  ui?: 'cards' | 'chips'
  l: string
  ph?: string
  accept?: string
  o?: ApplyOption[]
}

export type ApplyStep = {
  s: string
  time: string
  t: string
  p: string
  q: ApplyQuestion[]
}

export function optionValue(opt: ApplyOption) {
  return typeof opt === 'string' ? opt : opt.v
}

export function optionDesc(opt: ApplyOption) {
  return typeof opt === 'string' ? undefined : opt.d
}

export function isFilled(value: unknown) {
  if (Array.isArray(value)) return value.length > 0
  if (typeof FileList !== 'undefined' && value instanceof FileList) return value.length > 0
  return typeof value === 'string' && value.trim().length > 0
}

export function getApplySteps(locale: 'fr' | 'en'): ApplyStep[] {
  if (locale === 'en') {
    return [
      {
        s: 'You',
        time: '≈ 2 min',
        t: "Let's get acquainted",
        p: 'How can we reach you? Your details stay between us.',
        q: [
          { id: 'nom', ty: 'text', req: true, l: 'Full name', ph: 'E.g. Moussa Ndiaye' },
          { id: 'tel', ty: 'text', req: true, l: 'Phone / WhatsApp', ph: '+221 ...' },
          { id: 'email', ty: 'text', req: true, l: 'Email', ph: 'you@example.com' },
          { id: 'ville', ty: 'text', req: true, l: 'City / country', ph: 'E.g. Dakar, Senegal' },
        ],
      },
      {
        s: 'Background',
        time: '≈ 2 min',
        t: 'Your background',
        p: 'Your current activity and the time you can dedicate to MEGA.',
        q: [
          {
            id: 'activite',
            ty: 'text',
            req: true,
            l: 'Current activity',
            ph: 'E.g. sales, consultant, entrepreneur…',
          },
          {
            id: 'experience',
            ty: 'pick',
            req: true,
            ui: 'chips',
            l: 'Sales experience',
            o: ['None', 'Less than 2 years', '2 to 5 years', 'More than 5 years'],
          },
          {
            id: 'disponibilite',
            ty: 'pick',
            req: true,
            ui: 'chips',
            l: 'Availability',
            o: ['A few hours / week', 'Part-time', 'Full-time'],
          },
        ],
      },
      {
        s: 'Network',
        time: '≈ 2 min',
        t: 'Your network',
        p: 'Who do you know? That’s your main asset as a business introducer.',
        q: [
          {
            id: 'type_reseau',
            ty: 'pick',
            req: true,
            many: true,
            ui: 'chips',
            l: 'Your network is mostly made of… (multiple choices)',
            o: [
              'SMEs and shopkeepers',
              'Large companies',
              'Institutions and government',
              'Startups',
              'NGOs and associations',
              'Schools and universities',
            ],
          },
          {
            id: 'secteurs',
            ty: 'text',
            req: true,
            l: 'Sectors where you have the most contacts',
            ph: 'E.g. real estate, health, retail…',
          },
        ],
      },
      {
        s: 'Motivation',
        time: '≈ 1 min',
        t: 'Why MEGA?',
        p: 'Tell us in a few words what motivates you. You can attach your CV.',
        q: [
          {
            id: 'motivation',
            ty: 'area',
            req: true,
            l: 'Your motivation',
            ph: 'Tell us about yourself and your network…',
          },
          {
            id: 'cv',
            ty: 'files',
            l: 'CV or presentation (optional)',
            accept: 'image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          },
        ],
      },
    ]
  }

  return [
    {
      s: 'Vous',
      time: '≈ 2 min',
      t: 'Faisons connaissance',
      p: 'Comment pouvons-nous vous joindre ? Vos coordonnées restent entre nous.',
      q: [
        { id: 'nom', ty: 'text', req: true, l: 'Nom complet', ph: 'Ex. Moussa Ndiaye' },
        { id: 'tel', ty: 'text', req: true, l: 'Téléphone / WhatsApp', ph: '+221 ...' },
        { id: 'email', ty: 'text', req: true, l: 'E-mail', ph: 'vous@exemple.com' },
        { id: 'ville', ty: 'text', req: true, l: 'Ville / pays', ph: 'Ex. Dakar, Sénégal' },
      ],
    },
    {
      s: 'Parcours',
      time: '≈ 2 min',
      t: 'Votre parcours',
      p: 'Votre activité actuelle et le temps que vous pouvez consacrer à MEGA.',
      q: [
        {
          id: 'activite',
          ty: 'text',
          req: true,
          l: 'Activité actuelle',
          ph: 'Ex. commercial, consultant, entrepreneur...',
        },
        {
          id: 'experience',
          ty: 'pick',
          req: true,
          ui: 'chips',
          l: 'Expérience commerciale',
          o: ['Aucune', 'Moins de 2 ans', '2 à 5 ans', 'Plus de 5 ans'],
        },
        {
          id: 'disponibilite',
          ty: 'pick',
          req: true,
          ui: 'chips',
          l: 'Disponibilité',
          o: ['Quelques heures / semaine', 'Mi-temps', 'Temps plein'],
        },
      ],
    },
    {
      s: 'Réseau',
      time: '≈ 2 min',
      t: 'Votre réseau',
      p: 'Qui connaissez-vous ? C’est votre principal atout en tant qu’apporteur d’affaires.',
      q: [
        {
          id: 'type_reseau',
          ty: 'pick',
          req: true,
          many: true,
          ui: 'chips',
          l: 'Votre réseau est plutôt composé de… (plusieurs choix possibles)',
          o: [
            'PME et commerçants',
            'Grandes entreprises',
            'Institutions et État',
            'Startups',
            'ONG et associations',
            'Écoles et universités',
          ],
        },
        {
          id: 'secteurs',
          ty: 'text',
          req: true,
          l: 'Secteurs où vous avez le plus de contacts',
          ph: 'Ex. immobilier, santé, commerce...',
        },
      ],
    },
    {
      s: 'Motivation',
      time: '≈ 1 min',
      t: 'Pourquoi MEGA ?',
      p: 'Dites-nous en quelques mots ce qui vous motive. Vous pouvez joindre votre CV.',
      q: [
        {
          id: 'motivation',
          ty: 'area',
          req: true,
          l: 'Votre motivation',
          ph: 'Parlez-nous de vous et de votre réseau...',
        },
        {
          id: 'cv',
          ty: 'files',
          l: 'CV ou présentation (facultatif)',
          accept: 'image/*,.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      ],
    },
  ]
}
