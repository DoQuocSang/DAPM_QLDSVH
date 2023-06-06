package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

type UserController struct{}

// RegisterUser đăng ký tài khoản mới
func (uc *UserController) RegisterUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Kiểm tra xem tên đăng nhập đã tồn tại chưa
	var existingUser models.User
	if err := db.GetDB().Where("user_name = ?", user.User_Name).First(&existingUser).Error; err == nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Username already exists")
		return
	}

	if err := db.GetDB().Create(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create user")
		return
	}

	// Ẩn mật khẩu trong phản hồi
	user.Password = ""
	utils.SuccessResponse(c, http.StatusCreated, user)
}

// ResetPassword đặt lại mật khẩu của người dùng
func (uc *UserController) ResetPassword(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	var newPassword models.ResetPasswordRequest
	if err := c.ShouldBindJSON(&newPassword); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	user.Password = newPassword.Password
	if err := db.GetDB().Save(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not reset password")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Password reset successful"})
}

// GetUsers trả về danh sách tất cả người dùng (không bao gồm mật khẩu)
func (uc *UserController) GetUsers(c *gin.Context) {
	var users []models.User

	if err := db.GetDB().Select("id, user_name, permission").Find(&users).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get users")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, users)
}

// UpdateUser cập nhật thông tin của một người dùng dựa trên ID
func (uc *UserController) UpdateUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update user")
		return
	}

	// Ẩn mật khẩu trong phản hồi
	user.Password = ""
	utils.SuccessResponse(c, http.StatusOK, user)
}

// DeleteUser xóa một người dùng dựa trên ID
func (uc *UserController) DeleteUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	if err := db.GetDB().Delete(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete user")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "User deleted successfully"})
}
