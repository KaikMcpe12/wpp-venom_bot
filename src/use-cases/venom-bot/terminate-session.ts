import { VenomClient } from '../../lib/wpp-venom'
import { UnsuccessfulActionError } from '../errors/unsuccessful-action-error'

export class TerminateSession {
  constructor(private venom: VenomClient) {}

  async execute(): Promise<void> {
    await this.venom.terminateVenom()

    if (await this.venom.isConnected()) {
      throw new UnsuccessfulActionError()
    }
  }
}
