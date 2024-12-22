import type { IEmailValidator } from '../presentation/protocols'

import * as EmailValidator from 'email-validator'

export class EmailValidatorAdapter implements IEmailValidator {
	validate(email: string): boolean {
		return !EmailValidator.validate(email)
	}
}
