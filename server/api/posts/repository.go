package posts

import (
	"server/database/model"

	"gorm.io/gorm"
)

type Repository interface {
	CreatePost(post model.Post, authorId uint) error
}

type PostRepository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *PostRepository {
	return &PostRepository{db: db}
}

// CreatePost creates a new post in the database
func (r *PostRepository) CreatePost(post model.Post, authorId uint) error {
	query := `
        INSERT INTO posts (title, slug, content, status, author_id)
        VALUES (?, ?, ?, ?, ?)
    `

	// Execute the raw SQL query
	return r.db.Exec(query, post.Title, post.Slug, post.Content, post.Status, authorId).Error
}
