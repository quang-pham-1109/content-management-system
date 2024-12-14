package api

import (
	"server/api/auth"
	"server/api/categories"
	"server/api/posts"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, database *gorm.DB) {
	auth.RegisterAuthRoutes(router, database)
	posts.RegisterPostRoutes(router, database)
	categories.RegisterCategoryRoutes(router,database)
}
