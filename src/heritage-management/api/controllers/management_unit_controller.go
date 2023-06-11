package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

type ManagementUnitController struct{}

// GetAllManagementUnits trả về danh sách tất cả các địa điểm
func (lc *ManagementUnitController) GetAllManagementUnits(c *gin.Context) {
	var ManagementUnits []models.Management_Unit

	if err := db.GetDB().Find(&ManagementUnits).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get ManagementUnits")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, ManagementUnits)
}

// GetAllManagementUnits trả về danh sách tất cả các địa điểm với phân trang
func (lc *ManagementUnitController) GetPageManagementUnits(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	var total int64
	var ManagementUnits []models.Management_Unit

	// Đếm tổng số lượng địa điểm
	if err := db.GetDB().Model(&models.Management_Unit{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get ManagementUnits")
		return
	}

	// Phân trang
	offset := (page - 1) * limit
	if err := db.GetDB().Offset(offset).Limit(limit).Find(&ManagementUnits).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get ManagementUnits")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total: total,
		Page:  page,
		Limit: limit,
		Data:  ManagementUnits,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetManagementUnitByID trả về thông tin của một địa điểm dựa trên ID
func (lc *ManagementUnitController) GetManagementUnitByID(c *gin.Context) {
	id := c.Param("id")

	var ManagementUnit models.Management_Unit

	if err := db.GetDB().Where("id = ?", id).First(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "ManagementUnit not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, ManagementUnit)
}

// CreateManagementUnit tạo mới một địa điểm
func (lc *ManagementUnitController) CreateManagementUnit(c *gin.Context) {
	var ManagementUnit models.Management_Unit

	if err := c.ShouldBindJSON(&ManagementUnit); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create ManagementUnit")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, ManagementUnit)
}

// UpdateManagementUnit cập nhật thông tin của một địa điểm dựa trên ID
func (lc *ManagementUnitController) UpdateManagementUnit(c *gin.Context) {
	id := c.Param("id")

	var ManagementUnit models.Management_Unit

	if err := db.GetDB().Where("id = ?", id).First(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "ManagementUnit not found")
		return
	}

	if err := c.ShouldBindJSON(&ManagementUnit); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update ManagementUnit")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, ManagementUnit)
}

// DeleteManagementUnit xóa một địa điểm dựa trên ID
func (lc *ManagementUnitController) DeleteManagementUnit(c *gin.Context) {
	id := c.Param("id")

	var ManagementUnit models.Management_Unit

	if err := db.GetDB().Where("id = ?", id).First(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "ManagementUnit not found")
		return
	}

	if err := db.GetDB().Delete(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete ManagementUnit")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "ManagementUnit deleted successfully"})
}
