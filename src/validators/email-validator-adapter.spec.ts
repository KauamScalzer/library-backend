import { EmailValidatorAdapter } from './email-validator-adapter'

describe('EmailValidator Adapter', () => {
	test('Should return true if email is invalid', () => {
		const sut = new EmailValidatorAdapter()
		const result = sut.validate('invalid_mail')
		expect(result).toBe(true)
	})

	test('Should return false if email is valid', () => {
		const sut = new EmailValidatorAdapter()
		const result = sut.validate('valid_mail@email.com')
		expect(result).toBe(false)
	})
})
