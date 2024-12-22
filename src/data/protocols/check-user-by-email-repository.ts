export interface ICheckUserByEmailRepository {
	check(email: string): Promise<boolean>
}
