package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

type LocationController struct{}

// GetAllLocations trả về danh sách tất cả các địa điểm
func (lc *LocationController) GetAllLocations(c *gin.Context) {
	var locations []models.Location

	if err := db.GetDB().Find(&locations).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get locations")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, locations)
}

// GetAllLocations trả về danh sách tất cả các địa điểm với phân trang
func (lc *LocationController) GetPageLocations(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	var total int64
	var locations []models.Location

	// Đếm tổng số lượng địa điểm
	if err := db.GetDB().Model(&models.Location{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get locations")
		return
	}

	// Phân trang
	offset := (page - 1) * limit
	if err := db.GetDB().Offset(offset).Limit(limit).Find(&locations).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get locations")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total: total,
		Page:  page,
		Limit: limit,
		Data:  locations,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetLocationByID trả về thông tin của một địa điểm dựa trên ID
func (lc *LocationController) GetLocationByID(c *gin.Context) {
	id := c.Param("id")

	var location models.Location

	if err := db.GetDB().Where("id = ?", id).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, location)
}

// CreateLocation tạo mới một địa điểm
func (lc *LocationController) CreateLocation(c *gin.Context) {
	var location models.Location

	if err := c.ShouldBindJSON(&location); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create location")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, location)
}

// UpdateLocation cập nhật thông tin của một địa điểm dựa trên ID
func (lc *LocationController) UpdateLocation(c *gin.Context) {
	id := c.Param("id")

	var location models.Location

	if err := db.GetDB().Where("id = ?", id).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	if err := c.ShouldBindJSON(&location); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update location")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, location)
}

// DeleteLocation xóa một địa điểm dựa trên ID
func (lc *LocationController) DeleteLocation(c *gin.Context) {
	id := c.Param("id")

	var location models.Location

	if err := db.GetDB().Where("id = ?", id).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	if err := db.GetDB().Delete(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete location")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Location deleted successfully"})
}
