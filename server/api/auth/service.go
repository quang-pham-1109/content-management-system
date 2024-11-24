package auth

import (
	"errors"
	"server/utils"
)

type Service interface {
	Login(email, password string) (string, error)
}

type AuthService struct {
	repository Repository
}

func NewService(repository Repository) *AuthService {
	return &AuthService{repository: repository}
}

func (service *AuthService) Login(email, password string) (string, error) {
	user, err := service.repository.GetUserByEmail(email)
	if err != nil {
		return "", errors.New("database error")
	}
	if user.Email == "" {
		return "", errors.New("invalid email or password")
	}

	if !utils.CheckPassWordHash(password, user.Password) {
		return "", errors.New("invalid email or password")
	}

	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		return "", errors.New("failed to generate token")
	}

	return token, nil
}
