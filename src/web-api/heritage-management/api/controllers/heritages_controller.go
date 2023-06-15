package controllers

import (
	"net/http"
	"strconv"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"

	"github.com/gin-gonic/gin"
)

// GetPagedHeritages trả về danh sách tất cả các di sản văn hóa với phân trang
func GetPagedHeritages(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var heritages []models.Heritage

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.Heritage{}).Count(&total).Error; err != nil {
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
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("Management_Unit").Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(heritages) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       heritages,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
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

// SearchHeritage tìm kiếm di sản văn hóa dựa trên các thông tin như tên di sản, tên địa điểm, tên cơ sở quản lý, tên loại di sản, tên thể loại
func SearchHeritage(c *gin.Context) {
	hq := models.HeritageQuery{}
	if err := c.ShouldBindQuery(&hq); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid search parameters")
		return
	}

	query := db.GetDB().Model(&models.Heritage{})

	if hq.Key != "" {
		query = query.
			Joins("JOIN locations ON heritages.location_id = locations.id").
			Joins("JOIN management_units ON heritages.management_unit_id = management_units.id").
			Joins("JOIN heritage_types ON heritages.heritage_type_id = heritage_types.id").
			Joins("JOIN heritage_categories ON heritages.heritage_category_id = heritage_categories.id").
			Where("heritages.name LIKE ? OR locations.name LIKE ? OR management_units.name LIKE ? OR heritage_types.name LIKE ? OR heritage_categories.name LIKE ?",
				"%"+hq.Key+"%", "%"+hq.Key+"%", "%"+hq.Key+"%", "%"+hq.Key+"%", "%"+hq.Key+"%")
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))

	offset := (page - 1) * limit

	var heritages []models.Heritage
	if err := query.Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("Management_Unit").Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       heritages,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}
