import { makeVar } from '@apollo/client'
import { IAuthService } from './auth.types'
import { IUser } from '../../interfaces/user.interface'
import { StorageKeys } from '../../constants/storage.constants'

class AuthService implements IAuthService {
  user$ = makeVar<IUser | null>(null)
  access_token$ = makeVar('')

  constructor(private readonly storageService: Storage) {
    this.readFromStorage()
  }

  private readFromStorage() {
    const user = this.storageService.getItem(StorageKeys.User)
    const access_token = this.storageService.getItem(StorageKeys.AccessToken)
    if (user && access_token) {
      this.user$(JSON.parse(user))
      this.access_token$(access_token)
    }
  }

  login(user: IUser, access_token: string) {
    this.user$(user)
    this.access_token$(access_token)
    this.storageService.setItem(StorageKeys.User, JSON.stringify(user))
    this.storageService.setItem(StorageKeys.AccessToken, access_token)
  }

  logout() {
    this.user$(null)
    this.access_token$('')
    this.storageService.removeItem(StorageKeys.User)
    this.storageService.removeItem(StorageKeys.AccessToken)
  }

  updateAvatar(url: string) {
    const user = this.user$()!
    this.user$({
      ...user,
      profile: {
        ...user.profile,
        avatar: url,
      },
    })
  }
}

export const authService = new AuthService(sessionStorage)
