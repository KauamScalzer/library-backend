export interface IAuthenticate {
	auth(params: IAuthenticate.Params): Promise<IAuthenticate.Result>
}

export namespace IAuthenticate {
	export type Params = {
		email: string
		password: string
	}
	export type Result =
		| {
				token: string
		  }
		| boolean
}
