/** Une ou deux lettres pour un monogramme : « Marie Dupont » → « MD », « Studio » → « S ». */
export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  const letters = words.length > 1 ? [words[0], words[words.length - 1]] : words
  return letters.map((word) => word.charAt(0).toLocaleUpperCase()).join('') || '?'
}
