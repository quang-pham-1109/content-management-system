package main

import (
	"server/api/auth"
	"server/database"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	db := database.Connect()

	router := gin.Default()

	router.Use(middleware.InjectDatabase(db))

	router.Use(middleware.Cors())

	authRoutes := router.Group("/auth")
	{
		authRoutes.POST("/login", auth.Login)
		authRoutes.GET("", middleware.Authenticate(), auth.GetAuth)
	}

	// Server will run on port 3001
	router.Run(":3001")
}
