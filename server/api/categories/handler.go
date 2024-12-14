package categories

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	categoryService Service
}

func NewHandler(categoryService Service) *Handler {
	return &Handler{categoryService: categoryService}
}

type categoryCreateInput struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func (handler *Handler) CreateCategory(context *gin.Context) {
	var input categoryCreateInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// token is used to get the authorID
	tokenString := context.GetHeader("Authorization")

	// [7:] is used to remove the "Bearer " prefix from the token
	err := handler.categoryService.CreateCategory(input, tokenString[7:])
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	context.JSON(http.StatusOK, gin.H{"message": "Create category successfully !"})
}
