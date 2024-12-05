package posts

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	postService Service
}

func NewHandler(postService Service) *Handler {
	return &Handler{postService: postService}
}

// validation struct for POST /posts
type postCreateInput struct {
	Title   string `json:"title" binding:"required,min=3,max=255"`
	Slug    string `json:"slug"`
	Content string `json:"content"`
	Status  string `json:"status" binding:"required,oneof=draft published archived"`
}

func (handler *Handler) CreatePost(context *gin.Context) {
	var input postCreateInput

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// token is used to get the authorId
	tokenString := context.GetHeader("Authorization")

	// [7:] is used to remove the "Bearer " prefix from the token
	err := handler.postService.CreatePost(input, tokenString[7:])
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Post created"})
}
