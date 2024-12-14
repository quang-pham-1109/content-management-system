package categories

import (
	"server/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterCategoryRoutes(router *gin.Engine, database *gorm.DB) {
	categoryRepository := NewRepository(database)
	categoryService := NewService(categoryRepository)
	categoryHanlder := NewHandler(categoryService)

	categoryRoutes := router.Group("/category")
	{
		categoryRoutes.POST("", middleware.Authenticate(), categoryHanlder.CreateCategory)
	}
}
