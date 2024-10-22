package posts

import (
	"server/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterPostRoutes(router *gin.Engine, db *gorm.DB) {
	postRepository := NewRepository(db)
	postService := NewService(postRepository)
	postHandler := NewHandler(postService)

	postRoutes := router.Group("/posts")
	{
		postRoutes.POST("", middleware.Authenticate(), postHandler.CreatePost)
	}
}
