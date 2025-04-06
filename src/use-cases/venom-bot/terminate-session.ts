import { Venom } from '../../lib/wpp-venom'
import { UnsuccessfulActionError } from '../errors/unsuccessful-action-error'

export class TerminateSession {
  constructor(private venom: Venom) {}

  async execute(): Promise<void> {
    await this.venom.terminateVenom()

    if (this.venom.isConnected()) {
      throw new UnsuccessfulActionError()
    }
  }
}
