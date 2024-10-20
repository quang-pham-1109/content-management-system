package posts

import (
	"server/database/model"
	"server/utils"
)

type Service interface {
	CreatePost(input postCreateInput, token string) error
}

type PostService struct {
	repo Repository
}

func NewService(repo Repository) *PostService {
	return &PostService{repo: repo}
}

// CreatePost get the post input and the token, and call the repository to create a new post
func (s *PostService) CreatePost(input postCreateInput, token string) error {
	post := model.Post{
		Title:   input.Title,
		Slug:    input.Slug,
		Content: input.Content,
		Status:  input.Status,
	}

	authorId, err := utils.GetUserIdFromJWT(token)
	if err != nil {
		return err
	}

	err = s.repo.CreatePost(post, authorId)
	if err != nil {
		return err
	}

	return nil
}
