package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Handler struct
type Handler struct {
	authService Service
}

// NewHandler initializes the handler with the auth service
func NewHandler(authService Service) *Handler {
	return &Handler{authService: authService}
}

// validation struct for POST /auth/login
type SignInInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

/*
Login user
*/
func (h *Handler) Login(c *gin.Context) {
	var signinInput SignInInput

	// Validate input
	if err := c.ShouldBindJSON(&signinInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Call service to handle login logic
	token, err := h.authService.Login(signinInput.Email, signinInput.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": token})
}

// GetAuth handler to test authentication
func (h *Handler) GetAuth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Authenticated",
	})
}
