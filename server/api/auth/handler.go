package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	authService Service
}

func NewHandler(authService Service) *Handler {
	return &Handler{authService: authService}
}

type SignInInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

/*
POST /auth/login
*/
func (handler *Handler) Login(context *gin.Context) {
	var signinInput SignInInput

	if err := context.ShouldBindJSON(&signinInput); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, err := handler.authService.Login(signinInput.Email, signinInput.Password)
	if err != nil {
		context.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"token": token})
}

/*
GET /auth
It is here to verify authentication
the frontend can use this endpoint to check if the user is authenticated
*/
func (handler *Handler) GetAuth(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"message": "Authenticated",
	})
}
