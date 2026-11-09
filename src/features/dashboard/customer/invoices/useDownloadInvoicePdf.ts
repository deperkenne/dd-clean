import { useMutation } from '@tanstack/react-query'
import { invoiceRepository } from '@/features/invoices/invoice.repository.index'
import { saveFile } from '@/lib/download'

type PdfTarget = { id: number; invoiceNumber: string }

/**
 * Téléchargement du PDF officiel d'une facture.
 *
 * `GET /api/invoices/{id}/pdf` part avec le jeton Keycloak (un simple lien
 * `<a href>` ne pourrait pas le joindre) ; le fichier reçu est ensuite
 * proposé au navigateur, sous le nom donné par le serveur, à défaut
 * « <numéro de facture>.pdf ».
 */
export function useDownloadInvoicePdf() {
  const mutation = useMutation({
    mutationFn: ({ id }: PdfTarget) => invoiceRepository.downloadInvoicePdf(id),
    onSuccess: ({ blob, fileName }, { invoiceNumber }) => saveFile(blob, fileName ?? `${invoiceNumber}.pdf`),
  })

  return {
    download: (target: PdfTarget) => mutation.mutate(target),
    isPending: mutation.isPending,
    isError: mutation.isError,
  }
}
