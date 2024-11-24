package auth

import (
	"server/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterAuthRoutes(router *gin.Engine, database *gorm.DB) {
	authReposity := NewRepository(database)
	authService := NewService(authReposity)
	authHandler := NewHandler(authService)

	authRoutes := router.Group("/auth")
	{
		authRoutes.POST("/login", authHandler.Login)
		authRoutes.GET("", middleware.Authenticate(), authHandler.GetAuth)
	}
}
