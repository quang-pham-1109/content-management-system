package api

import (
	"server/api/auth"
	"server/api/posts"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// initializes all routes related to the API
func RegisterRoutes(router *gin.Engine, db *gorm.DB) {
	auth.RegisterAuthRoutes(router, db)
	posts.RegisterPostRoutes(router, db)
}
