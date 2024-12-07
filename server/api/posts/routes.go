package posts

import (
	"server/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterPostRoutes(router *gin.Engine, database *gorm.DB) {
	postRepository := NewRepository(database)
	postService := NewService(postRepository)
	postHandler := NewHandler(postService)

	postRoutes := router.Group("/posts")
	{
		postRoutes.POST("", middleware.Authenticate(), postHandler.CreatePost)
		postRoutes.GET("/all", postHandler.GetAllPost)
		postRoutes.GET("/:pid", postHandler.GetPostByID)
	}
}
