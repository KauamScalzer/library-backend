import type { IAddUser } from '../../domain/usecases'
import type { ICheckUserByEmailRepository } from '../protocols'

export class DbAddUser implements IAddUser {
	constructor(private readonly checkUserByEmailRepository: ICheckUserByEmailRepository) {}
	async add(params: IAddUser.Params): Promise<IAddUser.Result> {
		await this.checkUserByEmailRepository.check(params.email)
		return
	}
}
