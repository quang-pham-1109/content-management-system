package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	sslmode := "disable"
	timezone := "Asia/Bangkok"

	// Create DSN (Data Source Name)
	dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=" + port + " sslmode=" + sslmode + " TimeZone=" + timezone

	// Open conntection to the database
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		PrepareStmt: false, // Disable prepared statement as it is not supported by supabase
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Update the DB schema based on the struct in model/model.go
	err = Migrate(database)
	if err != nil {
		log.Fatal("Failed to migrate the schema:", err)
	}
	return database
}
