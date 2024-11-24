package posts

import (
	"server/database/model"
	"time"

	"gorm.io/gorm"
)

type Repository interface {
	CreatePost(post model.Post, authorId uint) error
}

type PostRepository struct {
	database *gorm.DB
}

func NewRepository(database *gorm.DB) *PostRepository {
	return &PostRepository{database: database}
}

func (repository *PostRepository) CreatePost(post model.Post, authorId uint) error {
	query := `
        INSERT INTO posts (title, slug, content, status, author_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    `

	createdAt := time.Now()

	return repository.database.Exec(query, post.Title, post.Slug, post.Content, post.Status, authorId, createdAt).Error
}
