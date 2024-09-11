package middleware

import (
	"net/http"
	"server/utils"

	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Extract the token from the Authorization header
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			// If no token is provided, return an unauthorized status
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization token not provided",
			})
			c.Abort()
			return
		}

		token := tokenString[7:]

		// Validate the JWT token
		if !utils.ValidateJWT(token) {
			// If the token is invalid, return an unauthorized status
			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
