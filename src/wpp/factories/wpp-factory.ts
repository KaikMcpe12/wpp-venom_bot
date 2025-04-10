import { VenomClient } from '../../lib/wpp-venom'
import { WppNotInicializedError } from '../../ws/errors/wpp-not-inicialized-error'
import { WppVenomRepository } from '../repositories/wpp-venom-repository'

export class WppFactory {
  private static _venomClient: VenomClient
  private static _wppService: WppVenomRepository

  public static getVenomClient(): VenomClient {
    if (!this._venomClient) {
      this._venomClient = new VenomClient()
    }
    return this._venomClient
  }

  public static getWppService(): WppVenomRepository {
    if (!this._venomClient.client) {
      throw new WppNotInicializedError()
    }

    if (!this._wppService) {
      this._wppService = new WppVenomRepository(this._venomClient.client)
    }

    return this._wppService
  }
}
