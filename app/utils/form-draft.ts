type StoredValue =
  | null
  | boolean
  | number
  | string
  | StoredValue[]
  | { [key: string]: StoredValue }

export const FORM_DRAFT_KEYS = {
  branding: 'mega:form-draft:branding:v1',
  career: 'mega:form-draft:career:v1',
} as const

function toStoredValue(value: unknown): StoredValue | undefined {
  if (
    (typeof File !== 'undefined' && value instanceof File) ||
    (typeof Blob !== 'undefined' && value instanceof Blob)
  ) {
    return undefined
  }

  if (
    value === null ||
    typeof value === 'boolean' ||
    typeof value === 'number' ||
    typeof value === 'string'
  ) {
    return value
  }

  if (Array.isArray(value)) {
    return value
      .map(toStoredValue)
      .filter((item): item is StoredValue => item !== undefined)
  }

  if (typeof value === 'object') {
    const result: Record<string, StoredValue> = {}
    for (const [key, item] of Object.entries(value)) {
      const stored = toStoredValue(item)
      if (stored !== undefined) result[key] = stored
    }
    return result
  }

  return undefined
}

export function loadFormDraft<T>(key: string): T | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    window.localStorage.removeItem(key)
    return null
  }
}

export function saveFormDraft(key: string, value: unknown) {
  if (typeof window === 'undefined') return

  try {
    const stored = toStoredValue(value)
    if (stored !== undefined) window.localStorage.setItem(key, JSON.stringify(stored))
  } catch {
    // Le formulaire reste utilisable si le stockage est désactivé ou plein.
  }
}

export function clearFormDraft(key: string) {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(key)
}
