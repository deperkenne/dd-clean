/** Agent proposé dans une liste de choix, avec sa charge déjà prévue ce jour-là. */
export type AgentOption = {
  id: string
  name: string
  jobsThatDay: number
  minutesThatDay: number
}
