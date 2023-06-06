package controllers

import (
	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetAllHeritageTypes trả về danh sách tất cả loại di sản văn hóa
func GetAllHeritageTypes(c *gin.Context) {
	var types []models.Heritage_Type

	if err := db.GetDB().Select("id, name, description").Find(&types).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage types")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, types)
}

// GetHeritageTypeByID trả về thông tin về một loại di sản văn hóa dựa trên ID
func GetHeritageTypeByID(c *gin.Context) {
	id := c.Param("id")

	var hType models.Heritage_Type

	// Lấy thông tin về loại di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage type not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, hType)
}

// CreateHeritageType tạo một loại di sản văn hóa mới
func CreateHeritageType(c *gin.Context) {
	var hType models.Heritage_Type

	// Parse thông tin về loại di sản văn hóa từ request body
	if err := c.ShouldBindJSON(&hType); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Thêm loại di sản văn hóa vào cơ sở dữ liệu
	if err := db.GetDB().Create(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create heritage type")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, hType)
}

// UpdateHeritageType cập nhật thông tin về một loại di sản văn hóa dựa trên ID
func UpdateHeritageType(c *gin.Context) {
	id := c.Param("id")

	var hType models.Heritage_Type

	// Lấy thông tin về loại di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage type not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&hType); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&hType).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not save heritage type")
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "Heritage type updated successfully")
}
