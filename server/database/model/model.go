package model

import (
	"time"
)

// User Model
type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"uniqueIndex;not null"`
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
	Posts    []Post `gorm:"foreignKey:AuthorID"` // One-to-Many relationship with Posts
}

// Post Model
type Post struct {
	ID         uint   `gorm:"primaryKey"`
	Title      string `gorm:"not null"`
	Slug       string `gorm:"uniqueIndex;not null"` // SEO-friendly slug
	SourceUrl  string `gorm:"not null"`             // URL for markdown file (S3 URL)
	AuthorID   uint   // Foreign Key for User (Author)
	CategoryID uint   // Foreign Key for Category
	Status     string `gorm:"type:varchar(20);not null;default:'draft';check:status IN ('draft', 'published', 'archived')"`
	Tags       []Tag  `gorm:"many2many:post_tags"` // Many-to-many relationship with Tags
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

// Category Model
type Category struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"uniqueIndex;not null"`
	Description string
	Posts       []Post `gorm:"foreignKey:CategoryID"` // One-to-Many relationship with Posts
	CreatedAt   time.Time
	UpdatedAt   time.Time
}

// Tag Model
type Tag struct {
	ID        uint   `gorm:"primaryKey"`
	Name      string `gorm:"uniqueIndex;not null"`
	Posts     []Post `gorm:"many2many:post_tags"` // Many-to-many relationship with Posts
	CreatedAt time.Time
	UpdatedAt time.Time
}

// PostTags Model (junction table for many-to-many Post and Tag relationship)
type PostTags struct {
	PostID uint `gorm:"primaryKey"`
	TagID  uint `gorm:"primaryKey"`
}

// Media Model
type Media struct {
	ID         uint   `gorm:"primaryKey"`
	FileName   string `gorm:"not null"`
	FilePath   string `gorm:"not null"`
	UploadedBy uint   // Foreign Key for User (Uploader)
	CreatedAt  time.Time
}
