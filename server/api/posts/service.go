package posts

import (
	"fmt"
	"server/database/model"
	"server/utils"
)

type Service interface {
	CreatePost(input postCreateInput, token string) error
	GetAllPost() (error, []model.Post)
	GetPostByID(id uint) (model.Post, error)
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

func (service *PostService) GetAllPost() (error, []model.Post) {
	var err error
	err, posts := service.repository.GetAllPosts()
	return err, posts
}

func (service *PostService) GetPostByID(id uint) (model.Post, error) {
	post, err := service.repository.GetPostByID(id)
	if err != nil {
		fmt.Println(err.Error())
		return model.Post{}, err
	}
	return post, err
}
