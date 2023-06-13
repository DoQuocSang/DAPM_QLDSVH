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

// GetHeritageByCategorySlug trả về danh sách di sản văn hóa dựa trên URL slug của thể loại
func GetHeritageByCategorySlug(c *gin.Context) {
	categorySlug := c.Param("urlSlug")

	var heritage_category models.Heritage_Category
	if err := db.GetDB().Where("urlslug = ?", categorySlug).First(&heritage_category).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage Category not found")
		return
	}

	var heritage []models.Heritage
	if err := db.GetDB().Where("heritage_category_id = ?", heritage_category.ID).Find(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritage)
}

// GetPagedHeritageByCategorySlug trả về danh sách di sản văn hóa dựa trên URL slug của thể loại có phân trang
func GetPagedHeritageByCategorySlug(c *gin.Context) {
	categorySlug := c.Param("urlSlug")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	// Lấy thông tin của thể loại dựa trên URL slug
	var heritage_category models.Heritage_Category
	if err := db.GetDB().Where("urlslug = ?", categorySlug).First(&heritage_category).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage Category not found")
		return
	}

	// Tìm tổng số lượng di sản văn hóa dựa trên ID của thể loại
	var total int64
	if err := db.GetDB().Model(&models.Heritage{}).Where("heritage_category_id = ?", heritage_category.ID).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage")
		return
	}

	// Tính toán số trang và offset
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}
	offset := (page - 1) * limit

	// Truy vấn di sản văn hóa dựa trên ID của địa điểm và phân trang
	var heritage []models.Heritage
	if err := db.GetDB().Where("heritage_type_id = ?", heritage_category.ID).Offset(offset).Limit(limit).Find(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(heritage) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No heritage available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       heritage,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// SearchCategory trả về thông tin danh mục theo tên
func SearchCategory(c *gin.Context) {
	hq := models.HeritageQuery{}
	if err := c.ShouldBindQuery(&hq); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid search parameters")
		return
	}

	query := db.GetDB().Model(&models.Heritage_Category{})

	if hq.Heritage_Category_Name != "" {
		query = query.Where("name LIKE ?", "%"+hq.Heritage_Category_Name+"%")
	}

	var categories []models.Heritage_Category
	if err := query.Find(&categories).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(categories) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, categories)
}
