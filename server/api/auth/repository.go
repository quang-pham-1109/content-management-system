package auth

import (
	"server/database/model"

	"gorm.io/gorm"
)

type Repository interface {
	GetUserByEmail(email string) (model.User, error)
	CheckUserExistsByEmail(email string) (bool, error)
	CreateUser(username, email, password string) error
}

type AuthRepository struct {
	database *gorm.DB
}

func NewRepository(database *gorm.DB) *AuthRepository {
	return &AuthRepository{database: database}
}

func (repository *AuthRepository) GetUserByEmail(email string) (model.User, error) {
	var user model.User
	err := repository.database.Raw("SELECT * FROM users WHERE email = ? LIMIT 1", email).Scan(&user).Error
	return user, err
}

func (repository *AuthRepository) CheckUserExistsByEmail(email string) (bool, error) {
	var user model.User
	err := repository.database.Raw("SELECT * FROM users WHERE email = ? LIMIT 1", email).Scan(&user).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false, err
	}
	return user.Email != "", nil
}

func (repository *AuthRepository) CreateUser(username, email, password string) error {
	newUser := model.User{
		Username: username,
		Email:    email,
		Password: password, // Password should already be hashed before calling this function
	}
	return repository.database.Create(&newUser).Error
}
