package auth

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var signinInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// POST /auth/login
func Login(c *gin.Context) {
	// Validate input
	if err := c.ShouldBindJSON(&signinInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	db, exists := c.MustGet("db").(*gorm.DB)
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database connection not found"})
		return
	}

	// Check if the user exists
	user, err := GetUserByEmail(db, signinInput.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}
	if user.Email == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Check if the password is correct
	if !utils.CheckPassWordHash(signinInput.Password, user.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// Generate JWT token
	token, err := utils.GenerateJWT(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

// GET /auth to test the JWT middleware
func GetAuth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Authenticated",
	})
}
