package auth

import (
	"errors"
	"server/utils"
)

// Service interface for auth business logic
type Service interface {
	Login(email, password string) (string, error)
}

// AuthService struct implements the Service interface
type AuthService struct {
	repo Repository
}

// NewService initializes a new AuthService
func NewService(repo Repository) *AuthService {
	return &AuthService{repo: repo}
}

// Login handles the user authentication logic
func (s *AuthService) Login(email, password string) (string, error) {
	// Check if the user exists
	user, err := s.repo.GetUserByEmail(email)
	if err != nil {
		return "", errors.New("database error")
	}
	if user.Email == "" {
		return "", errors.New("invalid email or password")
	}

	// Verify password
	if !utils.CheckPassWordHash(password, user.Password) {
		return "", errors.New("invalid email or password")
	}

	// Generate JWT token
	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		return "", errors.New("failed to generate token")
	}

	return token, nil
}
