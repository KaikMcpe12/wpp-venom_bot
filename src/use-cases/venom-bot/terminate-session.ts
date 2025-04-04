import { Venom } from '../../lib/wpp-venom'

export class TerminateSession {
  constructor(private venom: Venom) {}

  async execute(): Promise<void> {
    await this.venom.terminateVenom()

    if (this.venom.isConnected()) {
      throw new Error('Venom is already connected')
    }
  }
}
