package models

// Heritage struct
type Heritage struct {
	ID                 int             `json:"id" gorm:"column:id;"`
	Name               string          `json:"name" gorm:"column:name;"`
	Description        string          `json:"description" gorm:"column:description;"`
	Times              string          `json:"time" gorm:"column:time;"`
	ImageURL           string          `json:"image_url" gorm:"column:image_url;"`
	UrlSlug            string          `json:"urlslug" gorm:"column:urlslug;"`
	Location_ID        int             `json:"location_id" gorm:"column:location_id;"`
	Management_Unit_ID int             `json:"management_unit_id" gorm:"column:management_unit_id;"`
	Heritage_Type_ID   int             `json:"heritage_type_id" gorm:"column:heritage_type_id;"`
	HeritageType       Heritage_Type   `json:"heritage_type" gorm:"foreignKey:heritage_type_id"`
	Location           Location        `json:"location" gorm:"foreignKey:location_id"`
	Management_Unit    Management_Unit `json:"management_unit" gorm:"foreignKey:management_unit_id"`
}
