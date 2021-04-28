package middleware

import (
	"gopkg.in/go-playground/validator.v9"
)

func ValidateNull(field validator.FieldLevel) bool {
	return field.Field().String() != ""
}
