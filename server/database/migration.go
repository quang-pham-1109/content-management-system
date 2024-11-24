package database

import (
	"server/database/model"

	"gorm.io/gorm"
)

func Migrate(database *gorm.DB) error {
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
		if !database.Migrator().HasTable(model) {
			database.AutoMigrate(model)
		}
	}

	return nil
}
