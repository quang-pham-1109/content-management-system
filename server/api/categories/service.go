package categories

import (
	"server/database/model"
	"server/utils"
)

type Service interface {
	CreateCategory(input categoryCreateInput, token string) error
}

type CategoryService struct {
	repository Repository
}

func NewService(repository Repository) *CategoryService {
	return &CategoryService{repository: repository}
}

func (service *CategoryService) CreateCategory(input categoryCreateInput, token string) error {
	if input.Description == "" {
		input.Description = "N/A"
	}
	category := model.Category{
		Name:        input.Name,
		Description: input.Description,
	}

	authorID, err := utils.GetUserIdFromJWT(token)
	if err != nil {
		return err
	}

	err = service.repository.CreateCategory(category, authorID)
	if err != nil {
		return err
	}
	return nil
}
