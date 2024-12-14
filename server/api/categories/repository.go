package categories

import (
	"server/database/model"
	"time"

	"gorm.io/gorm"
)

type Repository interface {
	CreateCategory(category model.Category, authorID uint) error
}

type CategoryRepository struct {
	database *gorm.DB
}

func NewRepository(database *gorm.DB) *CategoryRepository {
	return &CategoryRepository{database: database}
}

func (repository *CategoryRepository) CreateCategory(category model.Category, authorID uint) error {
	query := `INSERT INTO categories (name , description,created_at,updated_at) VALUES (?,?,?,?)`
	create_update_At := time.Now()
	return repository.database.Exec(query, category.Name, category.Description, create_update_At, create_update_At).Error
}
