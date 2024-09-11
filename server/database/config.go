package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	// Load environment variables from .env file
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Get database configuration from environment variables
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")
	sslmode := "disable"
	timezone := "Asia/Bangkok"

	// Create DSN (Data Source Name)
	dsn := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " port=" + port + " sslmode=" + sslmode + " TimeZone=" + timezone

	// Connect to the database
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		PrepareStmt: false, // Disable prepared statement as it is not supported by supabase
	})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Update the DB schema
	err = Migrate(db)
	if err != nil {
		log.Fatal("Failed to migrate the schema:", err)
	}
	return db
}
