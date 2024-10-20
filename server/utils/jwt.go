package utils

import (
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// GenereateJWT create a JWT Token with the secret key loaded from .env, and userID as the payload
func GenerateJWT(userID uint) (string, error) {
	secretKey := os.Getenv("SECRET_KEY")

	// Create a new token object, specifying signing method, the claims, and the payload
	// you would like it to contain.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": userID,
		"nbf":    time.Now().Unix(),
		"exp":    time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(secretKey))

	return tokenString, err
}

// ValidateJWT validates a JWT token and returns a boolean
func ValidateJWT(tokenString string) bool {
	secretKey := os.Getenv("SECRET_KEY")

	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Make sure that the token method conforms to "SigningMethodHS256"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secretKey), nil
	})

	// Check if there were any errors in parsing the token or if the token is invalid
	if err != nil {
		return false
	}

	// Validate the claims and ensure the token is valid
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// You can add additional checks for claims if necessary
		// For example, check the issuer (iss) or expiration (exp)
		if claims.VerifyExpiresAt(time.Now().Unix(), true) {
			return true
		}
	}

	return false
}

// GetUserIdFromJWT returns the userID from the JWT tokens
func GetUserIdFromJWT(tokenString string) (uint, error) {
	secretKey := os.Getenv("SECRET_KEY")

	// Parse the token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Validate the signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		// Return the secret key as []byte
		return []byte(secretKey), nil
	})

	if err != nil {
		return 0, err
	}

	// Check if the token is valid and extract the claims
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		// Extract the userID from the claims
		if userID, ok := claims["userID"].(float64); ok {
			return uint(userID), nil
		}
		return 0, errors.New("userID not found in token")
	}

	return 0, errors.New("invalid token")
}
