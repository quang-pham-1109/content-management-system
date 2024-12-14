package posts

import (
	"database/sql"
	"fmt"
	"server/database/model"
	"time"

	"gorm.io/gorm"
)

type Repository interface {
	CreatePost(post model.Post, authorId uint) error
	GetAllPosts() (error, []model.Post)
	GetPostByID(id uint) (model.Post, error)
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

// FUNCTION TO GET ALL POSTS
func (reposistory *PostRepository) GetAllPosts() (error, []model.Post) {
	var err error
	var catID sql.NullInt64
	var updateTime sql.NullTime
	//var categoryID sql.NullInt64
	var posts []model.Post
	query := "SELECT * FROM posts"
	results := reposistory.database.Raw(query)
	if results == nil {
		err = fmt.Errorf("Fail to fetch posts !")
		return err, nil
	}
	rows, err := results.Rows()
	// Fetch all the posts from DB and assign to the posts slice
	for rows.Next() {
		var post model.Post
		err := rows.Scan(&post.ID, &post.Title, &post.Slug, &post.AuthorID, &catID, &post.Status, &post.CreatedAt, &updateTime, &post.Content)
		if err != nil {
			fmt.Println(err.Error())
			return err, nil
		}
		if catID.Valid {
			post.CategoryID = uint(catID.Int64)
		} else {
			post.CategoryID = 1
		}
		if updateTime.Valid {
			timeString := updateTime.Time.Format("2006-01-02 15:04:05")
			post.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", timeString)
		} else {
			post.UpdatedAt = time.Time{}
		}
		posts = append(posts, post)
	}
	return err, posts
}

func (reposistory *PostRepository) GetPostByID(id uint) (model.Post, error) {
	var post model.Post
	var catID sql.NullInt64     // use this to handle nil value of category when fetch data from database
	var updateTime sql.NullTime // use this to handle nil value of updateTime when fetch data from database
	query := `SELECT * FROM posts WHERE id=?`

	result := reposistory.database.Raw(query, id)
	if result == nil {
		err := fmt.Errorf("Fail to execute query !")
		return model.Post{}, err
	}
	rows, err := result.Rows()
	if err != nil {
		fmt.Println(err.Error())
		return model.Post{}, err
	}
	if rows.Next() {
		err = rows.Scan(&post.ID, &post.Title, &post.Slug, &post.AuthorID, &catID, &post.Status, &post.CreatedAt, &updateTime, &post.Content)
		if err != nil {
			fmt.Println(err.Error())
			return model.Post{}, err
		}
		if catID.Valid {
			post.CategoryID = uint(catID.Int64)
		} else {
			post.CategoryID = 1
		}
		if updateTime.Valid {
			post.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updateTime.Time.Format("2006-01-02 15:04:05"))
		} else {
			post.UpdatedAt = time.Time{}
		}
	}
	return post, err
}
