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

func (h *Handler) CreatePost(c *gin.Context) {
	var input postCreateInput

	// Validate input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Call service to handle login logic
	tokenString := c.GetHeader("Authorization")

	err := h.postService.CreatePost(input, tokenString[7:])
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Post created"})
}
