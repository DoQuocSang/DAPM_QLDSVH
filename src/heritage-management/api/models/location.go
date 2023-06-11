package models

type Location struct {
	ID   int    `json:"id" gorm:"column:id;"`
	Name string `json:"name" gorm:"column:name;"`
}
