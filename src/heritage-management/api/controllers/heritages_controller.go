package controllers

import (
	"net/http"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"

	"github.com/gin-gonic/gin"
)

// GetAllHeritages trả về danh sách tất cả các di sản văn hóa
func GetAllHeritages(c *gin.Context) {
	var heritages []models.Heritage

	if err := db.GetDB().Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritages")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritages)
}

// GetHeritageByID trả về thông tin của một di sản văn hóa dựa trên ID
func GetHeritageByID(c *gin.Context) {
	id := c.Param("id")

	var heritage models.Heritage

	if err := db.GetDB().Where("id = ?", id).First(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritage)
}

// CreateHeritage tạo mới một di sản văn hóa
func CreateHeritage(c *gin.Context) {
	var heritage models.Heritage

	if err := c.ShouldBindJSON(&heritage); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create heritage")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, heritage)
}

// UpdateHeritage cập nhật thông tin của một di sản văn hóa dựa trên ID
func UpdateHeritage(c *gin.Context) {
	id := c.Param("id")

	var heritage models.Heritage

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&heritage); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update heritage")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritage)
}

// DeleteHeritage xóa một di sản văn hóa dựa trên ID
func DeleteHeritage(c *gin.Context) {
	id := c.Param("id")

	var heritage models.Heritage

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	// Xóa di sản văn hóa khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete heritage")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Heritage deleted successfully"})
}
