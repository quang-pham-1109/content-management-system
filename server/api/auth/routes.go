package auth

import (
	"server/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Registers authentication-related routes
func RegisterAuthRoutes(router *gin.Engine, db *gorm.DB) {
	authReposity := NewRepository(db)
	authService := NewService(authReposity)
	authHandler := NewHandler(authService)

	authRoutes := router.Group("/auth")
	{
		authRoutes.POST("/login", authHandler.Login)
		authRoutes.GET("", middleware.Authenticate(), authHandler.GetAuth)
	}
}
