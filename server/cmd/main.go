package main

import (
	"server/api"
	"server/database"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	db := database.Connect()

	router := gin.Default()

	// Cors middleware
	router.Use(middleware.Cors())

	// Init the routes
	api.RegisterRoutes(router, db)

	// Server will run on port 3001
	router.Run(":3001")
}
