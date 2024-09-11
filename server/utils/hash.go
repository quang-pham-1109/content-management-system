package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"os"
)

// Hash data with secret key loaded from .env
func HashWithSecretKey(data string) string {
	secretKey := os.Getenv("SECRET_KEY")
	h := hmac.New(sha256.New, []byte(secretKey))
	h.Write([]byte(data))
	return hex.EncodeToString(h.Sum(nil))
}

// Check if the input password matches the hashed password
func CheckPassWordHash(inputPassword, hashedPassword string) bool {
	// Hash the input password
	inputPasswordHash := HashWithSecretKey(inputPassword)

	// Compare the hashed input password with the hashed password from the database
	return inputPasswordHash == hashedPassword
}
