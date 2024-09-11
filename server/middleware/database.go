package middleware

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// InjectDatabase injects the database connection into the context, and is used as a middleware
func InjectDatabase(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	}
}
