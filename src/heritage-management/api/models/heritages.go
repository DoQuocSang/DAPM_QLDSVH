package models

// Heritage struct
type Heritage struct {
	ID               int    `json:"id" gorm:"column:id;"`
	Name             string `json:"name" gorm:"column:name;"`
	Description      string `json:"description" gorm:"column:description;"`
	Address          string `json:"address" gorm:"column:address;"`
	ImageURL         string `json:"image_url" gorm:"column:image_url;"`
	Heritage_Type_ID int    `json:"heritage_type_id" gorm:"column:heritage_type_id;"`
}
