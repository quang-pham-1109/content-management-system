package posts

import (
	"server/database/model"
	"server/utils"
)

type Service interface {
	CreatePost(input postCreateInput, token string) error
}

type PostService struct {
	repository Repository
}

func NewService(repository Repository) *PostService {
	return &PostService{repository: repository}
}

func (service *PostService) CreatePost(input postCreateInput, token string) error {
	if input.Slug == "" {
		input.Slug = utils.GenerateSlug(input.Title)
	}

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

	err = service.repository.CreatePost(post, authorId)
	if err != nil {
		return err
	}

	return nil
}
