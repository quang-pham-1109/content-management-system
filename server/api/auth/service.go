package auth

import (
	"server/database/model"
	"server/utils"

	"gorm.io/gorm"
)

// CheckUserExistsByEmail checks if a user with the given email already exists in the database
func CheckUserExistsByEmail(db *gorm.DB, email string) (bool, error) {
	var user model.User
	err := db.Raw("SELECT * FROM users WHERE email = ? LIMIT 1", email).Scan(&user).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return false, err
	}
	return user.Email != "", nil
}

// CreateUser creates a new user in the database
func CreateUser(db *gorm.DB, username, email, password string) error {
	// Hash the password
	hashedPassword := utils.HashWithSecretKey(password)

	newUser := model.User{
		Username: username,
		Email:    email,
		Password: hashedPassword, // You should hash the password before saving
	}

	return db.Create(&newUser).Error
}

// GetUserByEmail retrieves a userID by email from the database
func GetUserByEmail(db *gorm.DB, email string) (model.User, error) {
	var user model.User
	err := db.Raw("SELECT * FROM users WHERE email = ? LIMIT 1", email).Scan(&user).Error
	return user, err
}
