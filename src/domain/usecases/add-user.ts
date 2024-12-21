export interface IAddUser {
	add(params: IAddUser.Params): Promise<IAddUser.Result>
}

export namespace IAddUser {
	export type Params = {
		name: string
		email: string
		password: string
	}
	export type Result = boolean
}
