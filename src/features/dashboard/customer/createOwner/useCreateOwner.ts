import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import type { CreateOwnerRequest } from '@/features/properties/owner.dto'
import { ownerRepository } from '@/features/properties/owner.repository.index'
import { createOwnerSchema } from '@/features/properties/owner.schema'
import type { CreateOwnerFormValues } from '@/features/properties/owner.types'
import { myOwnersKey } from '../owners/useMyOwners'
import { myPropertiesKey } from '../properties/useMyProperties'
import { emptyOwner, emptyProperty } from './createOwner.defaults'
import { toCreateOwnerFailure, toServerFieldPaths } from './createOwner.errors'
import type { CreatedOwnerSummary } from './createOwner.types'

function summarize(request: CreateOwnerRequest): CreatedOwnerSummary {
  const properties = request.properties ?? []
  return {
    name: request.name,
    propertyCount: properties.length,
    roomCount: properties.reduce((total, property) => total + (property.rooms?.length ?? 0), 0),
  }
}

/**
 * Logique de création d'un propriétaire, avec ses logements et leurs chambres.
 *
 * 1. React Hook Form garde la saisie ; Zod (`createOwnerSchema`, mêmes règles
 *    que le back-end) la vérifie à l'envoi. Tant qu'un champ est invalide,
 *    AUCUNE requête ne part.
 * 2. La mutation TanStack Query envoie `POST /api/owners` via le repository ;
 *    le jeton Keycloak est joint par `lib/http.ts`, et le back-end rattache le
 *    propriétaire à l'identité du jeton.
 * 3. Si le serveur refuse des champs (400), ils sont signalés sous chaque champ.
 * 4. Après une création réussie, « Mes propriétaires » et « Mes logements » sont rechargés.
 */
export function useCreateOwner() {
  const form = useForm<CreateOwnerFormValues, unknown, CreateOwnerRequest>({
    resolver: zodResolver(createOwnerSchema),
    defaultValues: emptyOwner(),
    mode: 'onTouched',
  })
  const properties = useFieldArray({ control: form.control, name: 'properties' })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (request: CreateOwnerRequest) => ownerRepository.createOwner(request),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: myOwnersKey }),
        queryClient.invalidateQueries({ queryKey: myPropertiesKey }),
      ]),
    onError: (error) => {
      for (const path of toServerFieldPaths(error)) form.setError(path, { type: 'server', message: 'server' })
    },
  })

  return {
    form,
    properties: {
      fields: properties.fields,
      add: () => properties.append(emptyProperty()),
      remove: properties.remove,
    },
    submit: form.handleSubmit((request) => mutation.mutate(request)),
    isPending: mutation.isPending,
    failure: toCreateOwnerFailure(mutation.error),
    created: mutation.isSuccess ? summarize(mutation.variables) : undefined,
    /** Nouveau formulaire vide après une création réussie. */
    startOver: () => {
      mutation.reset()
      form.reset(emptyOwner())
    },
  }
}
