package controllers

import (
	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetPagedHeritageCategories trả về danh sách tất cả loại hình di sản văn hóa với phân trang
func GetPagedHeritageCategories(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var types []models.Heritage_Category

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.Heritage_Category{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Đếm tổng số trang
	// Chia % vì nếu chia có dư thì đồng nghĩa vẫn còn trang sau nên phải tăng thêm 1
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	// Phân trang
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Find(&types).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       types,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetHeritageCategoryByID trả về thông tin về một loại hình di sản văn hóa dựa trên ID
func GetHeritageCategoryByID(c *gin.Context) {
	id := c.Param("id")

	var hCate models.Heritage_Category

	// Lấy thông tin về loại hình di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hCate).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage category not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, hCate)
}

// CreateHeritageCategory tạo một loại hình di sản văn hóa mới
func CreateHeritageCategory(c *gin.Context) {
	var hCate models.Heritage_Category

	// Parse thông tin về loại hình di sản văn hóa từ request body
	if err := c.ShouldBindJSON(&hCate); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Thêm loại hình di sản văn hóa vào cơ sở dữ liệu
	if err := db.GetDB().Create(&hCate).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create Heritage category")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, hCate)
}

// UpdateHeritageCategory cập nhật thông tin về một loại hình di sản văn hóa dựa trên ID
func UpdateHeritageCategory(c *gin.Context) {
	id := c.Param("id")

	var hCate models.Heritage_Category

	// Lấy thông tin về loại hình di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hCate).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage category not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&hCate); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&hCate).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not save Heritage category")
		return
	}
	utils.SuccessResponse(c, http.StatusOK, "Heritage category updated successfully")
}

// DeleteHeritage xóa một loại hình di sản văn hóa dựa trên ID
func DeleteHeritageCategory(c *gin.Context) {
	id := c.Param("id")

	var hCate models.Heritage_Category

	// Lấy thông tin về loại hình di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&hCate).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage category not found")
		return
	}

	// Xóa loại hình di sản văn hóa khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&hCate).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete Heritage category")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Heritage category deleted successfully"})
}
