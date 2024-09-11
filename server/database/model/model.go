package model

type User struct {
	ID       uint   `gorm:"primarykey"`
	Username string `gorm:"uniqueIndex;not null"`
	Email    string `gorm:"uniqueIndex;not null"`
	Password string `gorm:"not null"`
}

type Post struct {
	ID        uint   `gorm:"primarykey"`
	Title     string `gorm:"not null"`
	SourceUrl string `gorm:"not null"`
}
