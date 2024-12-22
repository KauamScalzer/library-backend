export interface IInsertUserRepository {
	insert(params: IInsertUserRepository.Params): Promise<void>
}

export namespace IInsertUserRepository {
	export type Params = {
		name: string
		email: string
		password: string
	}
}
