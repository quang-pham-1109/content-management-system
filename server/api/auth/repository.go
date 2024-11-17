package auth

import (
	"server/database/model"

	"gorm.io/gorm"
)

// Repository interface for all user-related database operations
type Repository interface {
	GetUserByEmail(email string) (model.User, error)
	CheckUserExistsByEmail(email string) (bool, error)
	CreateUser(username, email, password string) error
}

// AuthRepository struct implements the Repository interface
type AuthRepository struct {
	db *gorm.DB
}

// Initializes a new AuthRepository
func NewRepository(db *gorm.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

// Retrieves a user by email from the database
func (r *AuthRepository) GetUserByEmail(email string) (model.User, error) {
	var user model.User
	err := r.db.Raw("SELECT * FROM users WHERE email = ? LIMIT 1", email).Scan(&user).Error
	return user, err
}

// Checks if a user with the given email already exists in the database
func (r *AuthRepository) CheckUserExistsByEmail(email string) (bool, error) {
	var user model.User
	err := r.db.Raw("SELECT * FROM users WHERE email = ? LIMIT 1", email).Scan(&user).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false, err
	}
	return user.Email != "", nil
}

// CreateUser creates a new user in the database
func (r *AuthRepository) CreateUser(username, email, password string) error {
	newUser := model.User{
		Username: username,
		Email:    email,
		Password: password, // Password should already be hashed before calling this function
	}
	return r.db.Create(&newUser).Error
}
