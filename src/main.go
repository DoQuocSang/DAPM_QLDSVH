package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

//////////////Người dùng

type NguoiDung struct {
	Id           int        `json:"id" gorm:"column:Id;"`
	Ten          string     `json:"ten" gorm:"column:Ten;"`
	DiaChi       string     `json:"diachi" gorm:"column:DiaChi;"`
	Email        string     `json:"email" gorm:"column:Email;"`
	MatKhau      string     `json:"matkhau" gorm:"column:MatKhau;"`
	QuyenTruyCap bool       `json:"quyentruycap" gorm:"column:QuyenTruyCap;"`
	CreateAt     *time.Time `json:"create_at" gorm:"column:create_at;"`
	UpdateAt     *time.Time `json:"update_at,omitempty" gorm:"column:update_at;"`
}

func (NguoiDung) TableName() string {
	return "NguoiDung"
}

type NguoiDungCreation struct {
	Id      int    `json:"-"  gorm:"column:Id;"`
	Ten     string `json:"ten" gorm:"column:Ten;"`
	Email   string `json:"email" gorm:"column:Email;"`
	MatKhau string `json:"matkhau" gorm:"column:MatKhau;"`
	//QuyenTruyCap bool   `json:"quyentruycap" gorm:"column:QuyenTruyCap;"`
}

func (NguoiDungCreation) TableName() string {
	return NguoiDung{}.TableName()
}

type NguoiDungUpdate struct {
	Ten     *string `json:"ten" gorm:"column:Ten;"`
	Email   string  `json:"email" gorm:"column:Email;"`
	DiaChi  *string `json:"diachi" gorm:"column:DiaChi;"`
	MatKhau string  `json:"matkhau" gorm:"column:MatKhau;"`
}

func (NguoiDungUpdate) TableName() string {
	return NguoiDung{}.TableName()
}

type Paging struct {
	Page  int   `json:"page" form:"page"`
	Limit int   `json:"limit" form:"limit"`
	Total int64 `json:"total" form:"-"`
}

func (p *Paging) Process() {
	if p.Page <= 0 {
		p.Page = 1
	}

	if p.Limit <= 0 || p.Limit >= 100 {
		p.Limit = 10
	}
}
func main() {
	dsn := "root:my-secret-pw@tcp(127.0.0.1:3307)/QLDSVH?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	r := gin.Default()

	v1 := r.Group("/v1")
	{
		NguoiDung := v1.Group("/nguoidung")
		{
			NguoiDung.POST("", CreateNguoiDung(db))
			NguoiDung.GET("", ListNguoiDung(db))
			NguoiDung.GET("/:id", GetNguoiDung(db))
			NguoiDung.PATCH("/:id", UpdateNguoiDung(db))
			NguoiDung.DELETE("/:id", DeleteNguoiDung(db))

		}

		BaiViet := v1.Group("/baiviet")
		{
			BaiViet.POST("", CreateBaiViet(db))
			BaiViet.GET("", ListBaiViet(db))
			BaiViet.GET("/:id", GetBaiViet(db))
			BaiViet.PATCH("/:id", UpdateBaiViet(db))
			BaiViet.DELETE("/:id", DeleteBaiViet(db))

		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	r.Run(":3000")
}

func CreateNguoiDung(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data NguoiDungCreation

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": data.Id,
		})
	}
}

func GetNguoiDung(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data NguoiDung

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Where("id=?", id).First(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": data,
		})
	}
}

func UpdateNguoiDung(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data NguoiDungUpdate

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Where("id=?", id).Updates(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func DeleteNguoiDung(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Table(NguoiDung{}.TableName()).Where("id=?", id).Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func ListNguoiDung(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		paging.Process()

		var result []NguoiDung

		if err := db.Table(NguoiDung{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data":   result,
			"paging": paging,
		})
	}
}

/////////////////Bài viết

type BaiViet struct {
	Id       int        `json:"id" gorm:"column:Id;"`
	TieuDe   string     `json:"tieude" gorm:"column:TieuDe;"`
	NoiDung  string     `json:"noidung" gorm:"column:NoiDung;"`
	HinhAnh  string     `json:"hinhanh" gorm:"column:HinhAnh;"`
	CreateAt *time.Time `json:"create_at" gorm:"column:create_at;"`
	UpdateAt *time.Time `json:"update_at,omitempty" gorm:"column:update_at;"`
}

func (BaiViet) TableName() string {
	return "BaiViet"
}

type BaiVietCreation struct {
	Id      int    `json:"-"  gorm:"column:Id;"`
	TieuDe  string `json:"tieude" gorm:"column:TieuDe;"`
	NoiDung string `json:"noidung" gorm:"column:NoiDung;"`
	//HinhAnh        string     `json:"hinhanh" gorm:"column:HinhAnh;"`
}

func (BaiVietCreation) TableName() string {
	return BaiViet{}.TableName()
}

type BaiVietUpdate struct {
	TieuDe  string `json:"tieude" gorm:"column:TieuDe;"`
	NoiDung string `json:"noidung" gorm:"column:NoiDung;"`
}

func (BaiVietUpdate) TableName() string {
	return BaiViet{}.TableName()
}

func CreateBaiViet(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data BaiVietCreation

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": data.Id,
		})
	}
}

func GetBaiViet(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data BaiViet

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Where("id=?", id).First(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": data,
		})
	}
}

func UpdateBaiViet(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data BaiVietUpdate

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Where("id=?", id).Updates(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func DeleteBaiViet(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {

		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Table(BaiViet{}.TableName()).Where("id=?", id).Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func ListBaiViet(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		paging.Process()

		var result []BaiViet

		if err := db.Table(BaiViet{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if err := db.Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data":   result,
			"paging": paging,
		})
	}
}
