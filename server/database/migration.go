package database

import (
	"server/database/model"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	var models = []interface{}{
		model.User{},
		model.Post{},
	}

	// Migrate the schema, create the tables, if the tables do not exist
	for _, model := range models {
		if !db.Migrator().HasTable(model) {
			db.AutoMigrate(model)
		}
	}

	return nil
}
