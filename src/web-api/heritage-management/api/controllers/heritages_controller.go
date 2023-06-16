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
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").Find(&heritages).Error; err != nil {
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

// GetRandomHeritages trả về danh sách ngẫu nhiên của di sản văn hóa với số lượng lấy được chỉ định
func GetRandomHeritages(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "3"))

	var heritages []models.Heritage

	if err := db.GetDB().Model(&models.Heritage{}).Order("RAND()").Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritages)
}

// GetHeritageParagraphsByHeritageID trả về danh sách các đoạn mô tả di sản dựa trên ID di sản
func GetHeritageParagraphsByHeritageID(c *gin.Context) {
	heritageID := c.Param("id")

	// Kiểm tra xem di sản có tồn tại không
	var heritage models.Heritage
	if err := db.GetDB().First(&heritage, heritageID).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	var heritageParagraphs []models.Heritage_Paragraph

	if err := db.GetDB().Where("heritage_id = ?", heritageID).Find(&heritageParagraphs).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritageParagraphs)
}

// GetAllImagesByHeritageID trả về danh sách tất cả các hình ảnh dựa trên ID di sản
func GetAllImagesByHeritageID(c *gin.Context) {
	heritageID := c.Param("id") // Lấy ID di sản từ route parameter

	// Kiểm tra xem di sản có tồn tại không
	var heritage models.Heritage
	if err := db.GetDB().First(&heritage, heritageID).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	var heritageParagraphs []models.Heritage_Paragraph

	if err := db.GetDB().Where("heritage_id = ?", heritageID).Find(&heritageParagraphs).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
		return
	}

	images := make([]string, 0)

	for _, paragraph := range heritageParagraphs {
		images = append(images, paragraph.ImageURL)
	}

	utils.SuccessResponse(c, http.StatusOK, images)
}

// CreateHeritageAndParagraphs tạo một di sản mới và các mô tả di sản cho di sản đó
func CreateHeritageAndParagraphs(c *gin.Context) {
	var requestData struct {
		Heritage   models.Heritage             `json:"heritage"`
		Paragraphs []models.Heritage_Paragraph `json:"paragraphs"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request data")
		return
	}

	// Thêm di sản vào cơ sở dữ liệu
	if err := db.GetDB().Create(&requestData.Heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create heritage")
		return
	}

	// Gán heritage_id cho các mô tả di sản
	for i := range requestData.Paragraphs {
		requestData.Paragraphs[i].Heritage_ID = requestData.Heritage.ID
	}

	// Thêm các mô tả di sản vào cơ sở dữ liệu
	if err := db.GetDB().Create(&requestData.Paragraphs).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create heritage paragraphs")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, gin.H{
		"heritage":   requestData.Heritage,
		"paragraphs": requestData.Paragraphs,
	})
}

// GetHeritageWithParagraphsBySlug lấy thông tin di sản và các đoạn mô tả của di sản dựa trên slug di sản
func GetHeritageWithParagraphsBySlug(c *gin.Context) {
	heritageSlug := c.Param("urlSlug")

	var heritage models.Heritage
	if err := db.GetDB().Where("urlslug = ?", heritageSlug).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").First(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	var paragraphs []models.Heritage_Paragraph
	if err := db.GetDB().Where("heritage_id = ?", heritage.ID).Find(&paragraphs).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
		return
	}

	response := gin.H{
		"heritage":   heritage,
		"paragraphs": paragraphs,
	}

	utils.SuccessResponse(c, http.StatusOK, response)
}

// GetPagedHeritagesWithImages trả về danh sách phân trang di sản cùng với các hình ảnh của mỗi di sản
func GetPagedHeritagesWithImages(c *gin.Context) {
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
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(heritages) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Lấy danh sách hình ảnh cho mỗi di sản
	for i := range heritages {
		var heritageParagraphs []models.Heritage_Paragraph

		if err := db.GetDB().Where("heritage_id = ?", heritages[i].ID).Find(&heritageParagraphs).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
			return
		}

		images := make([]string, 0)

		for _, paragraph := range heritageParagraphs {
			images = append(images, paragraph.ImageURL)
		}

		// Gán danh sách hình ảnh vào thuộc tính Images của di sản tương ứng
		heritages[i].Images = images
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
