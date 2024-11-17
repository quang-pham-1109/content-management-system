package database

import (
	"server/database/model"

	"gorm.io/gorm"
)

// Detects if the models in model.go have been migrated to the database
func Migrate(db *gorm.DB) error {
	var models = []interface{}{
		model.User{},
		model.Post{},
		model.Media{},
		model.Category{},
		model.Tag{},
		model.PostTags{},
	}

	// Migrate the schema, create the tables, if the tables do not exist
	// TODO: Update so that migration is happening if there are changes in the models
	for _, model := range models {
		if !db.Migrator().HasTable(model) {
			db.AutoMigrate(model)
		}
	}

	return nil
}
