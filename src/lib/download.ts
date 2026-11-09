/**
 * Propose un fichier reçu en mémoire au téléchargement du navigateur.
 * Le lien temporaire est libéré juste après le clic.
 */
export function saveFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.rel = 'noopener'
  document.body.append(link)
  link.click()
  link.remove()
  // Libéré un peu plus tard : certains navigateurs lisent le lien après le clic.
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
