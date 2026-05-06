import { createError, readBody } from 'h3'
import { sendQuoteEmail } from '../../utils/mailer'

type Locale = 'fr' | 'en'
type Role = 'user' | 'assistant'
type Message = { role: Role; content: string }
type AssistantState = {
  profile: {
    goal: string
    target: string
    features: string
    budget: string
    timeline: string
  }
  contact: {
    fullName: string
    email: string
    phone: string
  }
  brief: string
  isBriefReady: boolean
  isSent: boolean
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'

function defaultState(): AssistantState {
  return {
    profile: { goal: '', target: '', features: '', budget: '', timeline: '' },
    contact: { fullName: '', email: '', phone: '' },
    brief: '',
    isBriefReady: false,
    isSent: false,
  }
}

function normalizeState(input: unknown): AssistantState {
  const base = defaultState()
  if (!input || typeof input !== 'object') return base
  const raw = input as Partial<AssistantState>
  return {
    profile: {
      goal: String(raw.profile?.goal ?? '').trim(),
      target: String(raw.profile?.target ?? '').trim(),
      features: String(raw.profile?.features ?? '').trim(),
      budget: String(raw.profile?.budget ?? '').trim(),
      timeline: String(raw.profile?.timeline ?? '').trim(),
    },
    contact: {
      fullName: String(raw.contact?.fullName ?? '').trim(),
      email: String(raw.contact?.email ?? '').trim(),
      phone: String(raw.contact?.phone ?? '').trim(),
    },
    brief: String(raw.brief ?? '').trim(),
    isBriefReady: Boolean(raw.isBriefReady),
    isSent: Boolean(raw.isSent),
  }
}

function normalizeMessages(input: unknown): Message[] {
  if (!Array.isArray(input)) return []
  return input
    .map((item) => {
      const role = item?.role === 'assistant' ? 'assistant' : item?.role === 'user' ? 'user' : null
      const content = typeof item?.content === 'string' ? item.content.trim() : ''
      if (!role || !content) return null
      return { role, content }
    })
    .filter((item): item is Message => Boolean(item))
    .slice(-14)
}

function generateFallbackBrief(locale: Locale, state: AssistantState) {
  if (locale === 'en') {
    return `PROJECT BRIEF - MEGA

1) Context
- Goal: ${state.profile.goal}
- Target audience/market: ${state.profile.target}

2) Objectives
- Deliver a first version solving the core business need quickly.
- Validate product-market fit with real users.

3) MVP scope
- Priority features: ${state.profile.features}

4) Constraints
- Budget: ${state.profile.budget}
- Timeline: ${state.profile.timeline}

5) Recommended execution
- Discovery & framing
- UX/UI design
- Development and QA
- Launch and monitoring

6) Next steps
- Functional workshop with MEGA
- Final planning and quotation`
  }

  return `CAHIER DE CHARGES - MEGA

1) Contexte
- Objectif: ${state.profile.goal}
- Cible/marche: ${state.profile.target}

2) Objectifs
- Livrer une premiere version qui repond au besoin principal.
- Valider rapidement la valeur avec de vrais utilisateurs.

3) Perimetre MVP
- Fonctionnalites prioritaires: ${state.profile.features}

4) Contraintes
- Budget: ${state.profile.budget}
- Delai: ${state.profile.timeline}

5) Plan recommande
- Cadrage fonctionnel
- Design UX/UI
- Developpement et recette
- Mise en production et suivi

6) Prochaines etapes
- Atelier de cadrage avec MEGA
- Planification finale et devis`
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return { firstName: 'Client', lastName: 'MEGA' }
  if (parts.length === 1) return { firstName: parts[0], lastName: 'Client' }
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') }
}

function extractJsonObject(input: string) {
  const first = input.indexOf('{')
  const last = input.lastIndexOf('}')
  if (first === -1 || last === -1 || last <= first) return null
  const raw = input.slice(first, last + 1)
  try {
    return JSON.parse(raw) as Record<string, unknown>
  } catch {
    return null
  }
}

async function runConversationModel(locale: Locale, state: AssistantState, messages: Message[]) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null

  const systemPrompt =
    locale === 'en'
      ? `You are MEGA's AI assistant on a website. Have a natural conversation, understand free-form user input, and guide them toward a project brief.
You must ask focused follow-up questions only for missing key information: goal, target, features, budget, timeline.
When user confirms they want the brief generated, ask for name, email, and optional phone.
Always output valid JSON only with this shape:
{
  "reply": "string shown to user",
  "profile_updates": { "goal":"", "target":"", "features":"", "budget":"", "timeline":"" },
  "contact_updates": { "fullName":"", "email":"", "phone":"" },
  "generate_brief_now": boolean,
  "request_contact_now": boolean,
  "send_email_now": boolean
}
Use empty strings for unknown update fields. Keep reply concise.`
      : `Tu es l assistant IA de MEGA sur un site web. Tu dois converser naturellement, comprendre les messages libres et orienter le visiteur vers un cahier de charges.
Pose des relances precises seulement pour les informations manquantes : objectif, cible, fonctionnalites, budget, delai.
Quand le visiteur confirme qu il veut le cahier, demande nom, email et telephone (optionnel).
Tu dois retourner uniquement du JSON valide avec cette structure :
{
  "reply": "string shown to user",
  "profile_updates": { "goal":"", "target":"", "features":"", "budget":"", "timeline":"" },
  "contact_updates": { "fullName":"", "email":"", "phone":"" },
  "generate_brief_now": boolean,
  "request_contact_now": boolean,
  "send_email_now": boolean
}
Mets des chaines vides pour les champs inconnus. Reponse courte et claire.`

  const basePayload = {
    model: 'gpt-4o-mini',
    temperature: 0.4,
    messages: [
      { role: 'system', content: systemPrompt },
      {
        role: 'system',
        content: `Current state:\n${JSON.stringify(state)}`,
      },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
  }

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...basePayload,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'mega_assistant_response',
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              reply: { type: 'string' },
              profile_updates: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  goal: { type: 'string' },
                  target: { type: 'string' },
                  features: { type: 'string' },
                  budget: { type: 'string' },
                  timeline: { type: 'string' },
                },
                required: ['goal', 'target', 'features', 'budget', 'timeline'],
              },
              contact_updates: {
                type: 'object',
                additionalProperties: false,
                properties: {
                  fullName: { type: 'string' },
                  email: { type: 'string' },
                  phone: { type: 'string' },
                },
                required: ['fullName', 'email', 'phone'],
              },
              generate_brief_now: { type: 'boolean' },
              request_contact_now: { type: 'boolean' },
              send_email_now: { type: 'boolean' },
            },
            required: [
              'reply',
              'profile_updates',
              'contact_updates',
              'generate_brief_now',
              'request_contact_now',
              'send_email_now',
            ],
          },
        },
      },
    }),
  })
  if (response.ok) {
    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content
    if (typeof content === 'string') {
      try {
        return JSON.parse(content) as Record<string, unknown>
      } catch {
        const extracted = extractJsonObject(content)
        if (extracted) return extracted
      }
    }
  }

  // Retry in a more tolerant mode without strict response_format.
  const retry = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...basePayload,
      messages: [
        {
          role: 'system',
          content:
            systemPrompt +
            '\nReturn valid JSON only with fields: reply, profile_updates, contact_updates, generate_brief_now, request_contact_now, send_email_now.',
        },
        {
          role: 'system',
          content: `Current state:\n${JSON.stringify(state)}`,
        },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  })

  if (!retry.ok) return null
  const retryData = await retry.json()
  const retryContent = retryData?.choices?.[0]?.message?.content
  if (typeof retryContent !== 'string') return null
  try {
    return JSON.parse(retryContent) as Record<string, unknown>
  } catch {
    return extractJsonObject(retryContent)
  }
}

function firstMissingProfileField(state: AssistantState): keyof AssistantState['profile'] | null {
  if (!state.profile.goal) return 'goal'
  if (!state.profile.target) return 'target'
  if (!state.profile.features) return 'features'
  if (!state.profile.budget) return 'budget'
  if (!state.profile.timeline) return 'timeline'
  return null
}

function fallbackQuestionForField(locale: Locale, field: keyof AssistantState['profile'] | null) {
  if (locale === 'en') {
    if (field === 'goal') return 'Great, what is your main project goal?'
    if (field === 'target') return 'Who is your primary target audience?'
    if (field === 'features') return 'What are the priority features for your MVP?'
    if (field === 'budget') return 'What approximate budget do you have in mind?'
    if (field === 'timeline') return 'What timeline are you targeting for launch?'
    return 'Do you want me to generate your project brief now?'
  }

  if (field === 'goal') return 'Parfait, quel est votre objectif principal ?'
  if (field === 'target') return 'Qui est votre cible principale ?'
  if (field === 'features') return 'Quelles sont les fonctionnalites prioritaires de votre MVP ?'
  if (field === 'budget') return 'Quel budget approximatif envisagez-vous ?'
  if (field === 'timeline') return 'Quel delai ciblez-vous pour la mise en ligne ?'
  return 'Souhaitez-vous que je genere votre cahier de charges maintenant ?'
}

function seemsLikeYes(input: string) {
  const v = input.toLowerCase()
  return ['oui', 'yes', 'ok', 'go', 'confirme', 'confirm', 'vas-y', 'allons-y'].some((k) => v.includes(k))
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const locale: Locale = body?.locale === 'en' ? 'en' : 'fr'
  const userMessage = String(body?.message ?? '').trim()
  const state = normalizeState(body?.state)
  const messages = normalizeMessages(body?.messages)

  if (!userMessage) {
    return {
      reply:
        locale === 'en'
          ? 'Hi, I am MEGA AI assistant. Tell me about your project and I will guide you step by step.'
          : 'Bonjour, je suis l assistant IA de MEGA. Parlez-moi de votre projet et je vous guide etape par etape.',
      state: defaultState(),
    }
  }

  const modelOut = await runConversationModel(locale, state, messages.length ? messages : [{ role: 'user', content: userMessage }])

  if (modelOut) {
    const profileUpdates = (modelOut.profile_updates as Record<string, unknown> | undefined) ?? {}
    const contactUpdates = (modelOut.contact_updates as Record<string, unknown> | undefined) ?? {}
    const mergedState: AssistantState = {
      ...state,
      profile: {
        goal: String(profileUpdates.goal ?? state.profile.goal ?? '').trim(),
        target: String(profileUpdates.target ?? state.profile.target ?? '').trim(),
        features: String(profileUpdates.features ?? state.profile.features ?? '').trim(),
        budget: String(profileUpdates.budget ?? state.profile.budget ?? '').trim(),
        timeline: String(profileUpdates.timeline ?? state.profile.timeline ?? '').trim(),
      },
      contact: {
        fullName: String(contactUpdates.fullName ?? state.contact.fullName ?? '').trim(),
        email: String(contactUpdates.email ?? state.contact.email ?? '').trim(),
        phone: String(contactUpdates.phone ?? state.contact.phone ?? '').trim(),
      },
    }

    if (Boolean(modelOut.generate_brief_now) && !mergedState.isBriefReady) {
      mergedState.brief = generateFallbackBrief(locale, mergedState)
      mergedState.isBriefReady = true
    }

    const shouldSend = Boolean(modelOut.send_email_now) && mergedState.isBriefReady && !mergedState.isSent
    if (shouldSend) {
      if (!mergedState.contact.fullName || !emailRegex.test(mergedState.contact.email)) {
        return {
          reply:
            locale === 'en'
              ? 'Before I send it, I still need your full name and a valid email address.'
              : "Avant l envoi, j ai encore besoin de votre nom complet et d une adresse email valide.",
          state: mergedState,
        }
      }

      const { firstName, lastName } = splitName(mergedState.contact.fullName)
      try {
        await sendQuoteEmail({
          firstName,
          lastName,
          email: mergedState.contact.email,
          phone: mergedState.contact.phone || undefined,
          serviceTitle: locale === 'en' ? 'AI Project Brief' : 'Cahier de charges IA',
          projectDescription: mergedState.brief,
        })
        mergedState.isSent = true
      } catch {
        throw createError({
          statusCode: 500,
          message: locale === 'en' ? 'Email sending failed.' : "Echec d'envoi de l'email.",
        })
      }

      return {
        reply:
          locale === 'en'
            ? 'Your project brief has been generated and sent to the MEGA team at contact@mega-sn.com. We will get back to you within 24 hours maximum.'
            : 'Votre cahier de charges a ete genere et envoye a l equipe MEGA sur contact@mega-sn.com. Nous reviendrons vers vous sous 24h maximum.',
        state: mergedState,
      }
    }

    const reply = String(modelOut.reply ?? '').trim()
    return {
      reply:
        reply ||
        (locale === 'en'
          ? 'Tell me more about your project and I will guide you.'
          : 'Parlez-moi davantage de votre projet et je vous guide.'),
      state: mergedState,
    }
  }

  return {
    reply:
      locale === 'en'
        ? 'Tell me your main goal, target users, and desired features. I will guide you from there and prepare your project brief.'
        : 'Donnez-moi votre objectif principal, votre cible et les fonctionnalites souhaitees. Je vous guide ensuite et je prepare votre cahier de charges.',
    state,
  }
})
