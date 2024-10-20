package api

import (
	"server/api/auth"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// initializes all routes related to the API
func RegisterRoutes(router *gin.Engine, db *gorm.DB) {
	auth.RegisterAuthRoutes(router, db)
}
