package models

// Heritage struct
type Heritage struct {
	ID                 int    `json:"id" gorm:"column:id;"`
	Name               string `json:"name" gorm:"column:name;"`
	Description        string `json:"description" gorm:"column:description;"`
	Times              string `json:"time" gorm:"column:times;"`
	ImageURL           string `json:"image_url" gorm:"column:image_url;"`
	Location_ID        int    `json:"location" gorm:"column:location_id;"`
	Management_Unit_ID int    `json:"management_unit_id" gorm:"column:management_unit_id;"`
	Heritage_Type_ID   int    `json:"heritage_type_id" gorm:"column:heritage_type_id;"`
}
