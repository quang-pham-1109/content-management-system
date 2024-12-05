package main

import (
	"server/api"
	"server/database"
	"server/middleware"

	"github.com/gin-gonic/gin"
)

func main() {
	database := database.Connect()

	router := gin.Default()

	router.Use(middleware.Cors())

	api.RegisterRoutes(router, database)

	router.Run(":3001")
}
